import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getProblems, getStudyPlan } from '../utils/storage';
import { calculateReadinessScore, getCompanyReadiness, getWeakestArea } from '../utils/scoring';
import { checkStreakValidity } from '../utils/streaks';
import ScoreCircle from '../components/ScoreCircle';
import { PATTERNS } from '../utils/constants';

export default function Dashboard() {
  const problems = getProblems();
  const streaks = checkStreakValidity();
  const studyPlan = getStudyPlan();

  const score = useMemo(() => calculateReadinessScore(problems), [problems]);
  const readyCompanies = getCompanyReadiness(score.total);
  const weakest = getWeakestArea(score);

  // Today's revisions
  const today = format(new Date(), 'yyyy-MM-dd');
  const dueRevisions = problems.filter(p => {
    if (!p.revisionSchedule) return false;
    const rs = p.revisionSchedule;
    return (rs.rev1 && !rs.rev1Done && rs.rev1 <= today) ||
           (rs.rev2 && !rs.rev2Done && rs.rev2 <= today) ||
           (rs.rev3 && !rs.rev3Done && rs.rev3 <= today);
  });

  // Today's study plan
  const todayPlan = studyPlan?.days?.find(d => d.date === today);

  // Recent problems
  const recentProblems = [...problems].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 5);

  // Weak patterns
  const solved = problems.filter(p => p.status === 'Solved' || p.status === 'Mastered');
  const patternCounts = {};
  PATTERNS.forEach(p => { patternCounts[p] = 0; });
  solved.forEach(p => (p.patterns || []).forEach(pat => { if (patternCounts[pat] !== undefined) patternCounts[pat]++; }));
  const weakPatterns = PATTERNS.filter(p => patternCounts[p] < 3).slice(0, 3);

  const difficultyBadge = (d) => {
    if (d === 'Easy') return 'bg-green-900/50 text-green-400';
    if (d === 'Medium') return 'bg-amber-900/50 text-amber-400';
    return 'bg-red-900/50 text-red-400';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Readiness Score */}
        <div className="card col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center py-6">
          <ScoreCircle score={score.total} />
          <p className="text-sm text-gray-400 mt-3">Interview Readiness</p>
          <div className="flex flex-wrap gap-1 mt-2 justify-center">
            {readyCompanies.map(c => (
              <span key={c} className="px-2 py-0.5 bg-indigo-900/50 text-indigo-400 rounded-full text-xs">{c}</span>
            ))}
          </div>
        </div>

        {/* Streaks */}
        <div className="card flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-900/30 flex items-center justify-center text-orange-400 text-lg">🔥</div>
            <div>
              <p className="text-2xl font-bold">{streaks.solveStreak}</p>
              <p className="text-xs text-gray-500">Solve Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400 text-lg">🔄</div>
            <div>
              <p className="text-2xl font-bold">{streaks.revisionStreak}</p>
              <p className="text-xs text-gray-500">Revision Streak</p>
            </div>
          </div>
        </div>

        {/* Revisions Due */}
        <Link to="/revisions" className="card hover:border-indigo-700 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-400">{dueRevisions.length}</span>
            </div>
            <div>
              <p className="text-sm font-medium">Revisions Due</p>
              <p className="text-xs text-gray-500">Today & overdue</p>
            </div>
          </div>
        </Link>

        {/* Quick Stats */}
        <div className="card">
          <p className="text-sm text-gray-400 mb-2">Quick Stats</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Problems</span>
              <span className="font-medium">{problems.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Solved</span>
              <span className="font-medium text-green-400">{solved.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Patterns Covered</span>
              <span className="font-medium">{Object.values(patternCounts).filter(c => c >= 5).length}/{PATTERNS.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown & Today's Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Score Breakdown */}
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Score Breakdown</h3>
          {[
            { label: 'DSA Depth', value: score.dsaDepth, max: 30 },
            { label: 'Revision Consistency', value: score.revisionConsistency, max: 25 },
            { label: 'Pattern Coverage', value: score.patternCoverage, max: 25 },
            { label: 'Solve Speed', value: score.solveSpeed, max: 20 },
          ].map(item => (
            <div key={item.label} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{item.label}</span>
                <span>{item.value}/{item.max}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(item.value / item.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
          {/* Actionable tip */}
          <div className="mt-4 p-3 bg-amber-900/20 border border-amber-800/50 rounded-lg">
            <p className="text-xs text-amber-400">
              <span className="font-medium">Weakest: {weakest.name}</span> — {weakest.tip}
            </p>
          </div>
        </div>

        {/* Today's Plan */}
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Today's Plan</h3>
          {todayPlan ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-indigo-900/50 text-indigo-400 rounded text-xs">{todayPlan.pattern}</span>
                <span className="text-sm">{todayPlan.problemCount} problems to solve</span>
              </div>
              {todayPlan.revisionCount > 0 && (
                <p className="text-sm text-gray-400">{todayPlan.revisionCount} revisions scheduled</p>
              )}
              {todayPlan.completed && <span className="text-green-400 text-sm">Completed!</span>}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm mb-3">No study plan set</p>
              <Link to="/study-plan" className="btn-primary text-sm">Create Study Plan</Link>
            </div>
          )}
        </div>
      </div>

      {/* Weak Patterns & Recent Problems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weak patterns */}
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Weak Patterns ({"<"}3 solved)</h3>
          {weakPatterns.length > 0 ? (
            <div className="space-y-2">
              {weakPatterns.map(p => (
                <div key={p} className="flex justify-between items-center">
                  <span className="text-sm">{p}</span>
                  <span className="text-xs text-gray-500">{patternCounts[p]} solved</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-green-400">All patterns have 3+ problems solved!</p>
          )}
        </div>

        {/* Recent problems */}
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Problems</h3>
          {recentProblems.length > 0 ? (
            <div className="space-y-2">
              {recentProblems.map(p => (
                <div key={p.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">#{p.leetcodeNumber}</span>
                    <span className="text-sm truncate max-w-[200px]">{p.name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyBadge(p.difficulty)}`}>
                    {p.difficulty}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm mb-3">No problems yet — add your first one!</p>
              <Link to="/problems" className="btn-primary text-sm">Add Problem</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
