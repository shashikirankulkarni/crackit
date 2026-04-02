import React, { useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { format, eachWeekOfInterval, eachDayOfInterval, subMonths } from 'date-fns';
import { getProblems, getStreaks } from '../utils/storage';
import { calculateReadinessScore } from '../utils/scoring';
import { PATTERNS } from '../utils/constants';

export default function Analytics() {
  const problems = getProblems();
  const streaks = getStreaks();
  const score = useMemo(() => calculateReadinessScore(problems), [problems]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const solved = useMemo(() => problems.filter(p => p.status === 'Solved' || p.status === 'Mastered'), [problems]);

  // Heatmap data: last 6 months
  const heatmapData = useMemo(() => {
    const end = new Date();
    const start = subMonths(end, 6);
    const days = eachDayOfInterval({ start, end });
    const solveDates = {};
    problems.forEach(p => {
      const d = p.dateAdded;
      solveDates[d] = (solveDates[d] || 0) + 1;
    });
    return days.map(d => ({
      date: format(d, 'yyyy-MM-dd'),
      count: solveDates[format(d, 'yyyy-MM-dd')] || 0,
      day: d.getDay(),
      week: Math.floor((d.getTime() - start.getTime()) / (7 * 86400000)),
    }));
  }, [problems]);

  // Weekly solve data
  const weeklyData = useMemo(() => {
    if (problems.length === 0) return [];
    const end = new Date();
    const start = subMonths(end, 3);
    const weeks = eachWeekOfInterval({ start, end });
    return weeks.map(weekStart => {
      const weekEnd = new Date(weekStart.getTime() + 7 * 86400000);
      const count = problems.filter(p => {
        const d = new Date(p.dateAdded);
        return d >= weekStart && d < weekEnd;
      }).length;
      return { week: format(weekStart, 'MMM d'), count };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problems, problems.length]);

  // Pattern bar chart
  const patternData = useMemo(() => {
    const counts = {};
    PATTERNS.forEach(p => { counts[p] = 0; });
    solved.forEach(p => (p.patterns || []).forEach(pat => { if (counts[pat] !== undefined) counts[pat]++; }));
    return PATTERNS.map(p => ({ name: p.length > 12 ? p.substring(0, 10) + '..' : p, fullName: p, count: counts[p] }));
  }, [solved]);

  // Difficulty pie
  const difficultyData = useMemo(() => {
    const counts = { Easy: 0, Medium: 0, Hard: 0 };
    solved.forEach(p => { if (counts[p.difficulty] !== undefined) counts[p.difficulty]++; });
    return Object.entries(counts).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));
  }, [solved]);
  const diffColors = { Easy: '#22c55e', Medium: '#f59e0b', Hard: '#ef4444' };

  // Solve time trend
  const timeData = useMemo(() => {
    if (solved.length === 0) return [];
    const end = new Date();
    const start = subMonths(end, 3);
    const weeks = eachWeekOfInterval({ start, end });
    return weeks.map(weekStart => {
      const weekEnd = new Date(weekStart.getTime() + 7 * 86400000);
      const weekProblems = solved.filter(p => {
        const d = new Date(p.dateAdded);
        return d >= weekStart && d < weekEnd && p.timeTaken > 0;
      });
      const avg = weekProblems.length > 0
        ? Math.round(weekProblems.reduce((s, p) => s + p.timeTaken, 0) / weekProblems.length)
        : null;
      return { week: format(weekStart, 'MMM d'), avgTime: avg };
    }).filter(d => d.avgTime !== null);
  }, [solved]);

  // Summary stats
  const avgSolveTime = solved.filter(p => p.timeTaken > 0).length > 0
    ? Math.round(solved.filter(p => p.timeTaken > 0).reduce((s, p) => s + p.timeTaken, 0) / solved.filter(p => p.timeTaken > 0).length)
    : 0;

  const patternsCovered = useMemo(() => {
    const counts = {};
    PATTERNS.forEach(p => { counts[p] = 0; });
    solved.forEach(p => (p.patterns || []).forEach(pat => { if (counts[pat] !== undefined) counts[pat]++; }));
    return Object.values(counts).filter(c => c >= 5).length;
  }, [solved]);

  const getHeatmapColor = (count) => {
    if (count === 0) return 'bg-gray-800';
    if (count === 1) return 'bg-green-900';
    if (count === 2) return 'bg-green-700';
    if (count <= 4) return 'bg-green-600';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Problems Solved', value: solved.length, color: 'text-green-400' },
          { label: 'Solve Streak', value: `${streaks.solveStreak} days`, color: 'text-orange-400' },
          { label: 'Patterns Covered', value: `${patternsCovered}/${PATTERNS.length}`, color: 'text-indigo-400' },
          { label: 'Avg Solve Time', value: `${avgSolveTime}m`, color: 'text-blue-400' },
          { label: 'Readiness Score', value: score.total, color: 'text-purple-400' },
        ].map(card => (
          <div key={card.label} className="card text-center">
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="card">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Solve Activity (Last 6 Months)</h3>
        <div className="overflow-x-auto">
          <div className="inline-grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
            {heatmapData.map((d, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${getHeatmapColor(d.count)}`}
                title={`${d.date}: ${d.count} problems`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <span>Less</span>
          {['bg-gray-800', 'bg-green-900', 'bg-green-700', 'bg-green-600', 'bg-green-500'].map(c => (
            <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly solves */}
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Problems Solved Per Week</h3>
          {weeklyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500 text-sm text-center py-12">No data yet</p>}
        </div>

        {/* Pattern distribution */}
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Problems Per Pattern</h3>
          {patternData.some(d => d.count > 0) ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={patternData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#9ca3af', fontSize: 10 }} width={80} />
                <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500 text-sm text-center py-12">No data yet</p>}
        </div>

        {/* Difficulty pie */}
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Difficulty Distribution</h3>
          {difficultyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={difficultyData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {difficultyData.map(entry => (
                    <Cell key={entry.name} fill={diffColors[entry.name]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500 text-sm text-center py-12">No data yet</p>}
        </div>

        {/* Solve time trend */}
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Average Solve Time Trend</h3>
          {timeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} unit="m" />
                <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="avgTime" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} name="Avg Time (min)" />
              </LineChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500 text-sm text-center py-12">No data yet</p>}
        </div>
      </div>
    </div>
  );
}
