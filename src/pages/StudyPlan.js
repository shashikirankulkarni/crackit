import React, { useState } from 'react';
import { format, addDays, differenceInCalendarDays } from 'date-fns';
import toast from 'react-hot-toast';
import { getStudyPlan, setStudyPlan } from '../utils/storage';
import { getPatterns, getCompanies } from '../utils/constants';

const PATTERNS = getPatterns();
const COMPANIES = getCompanies();

function generatePlan(level, hoursPerDay, targetDate, targetCompany) {
  const today = new Date();
  const target = new Date(targetDate);
  const totalDays = Math.max(1, differenceInCalendarDays(target, today));

  // Problems per day based on level and hours
  const baseProblems = level === 'Beginner' ? 2 : level === 'Intermediate' ? 3 : 4;
  const problemsPerDay = Math.max(1, Math.round(baseProblems * (hoursPerDay / 2)));

  // Pattern ordering based on level
  const patternOrder = level === 'Beginner'
    ? ['Two Pointers', 'HashMap', 'Binary Search', 'Sliding Window', 'Stack', 'Linked List', 'Tree', 'BFS', 'DFS', 'Recursion', 'Dynamic Programming', 'Greedy', 'Heap', 'Backtracking', 'Graph', 'Trie', 'Math', 'Divide & Conquer']
    : level === 'Intermediate'
    ? ['Sliding Window', 'Two Pointers', 'Binary Search', 'BFS', 'DFS', 'Dynamic Programming', 'Backtracking', 'Greedy', 'Heap', 'Stack', 'Graph', 'Trie', 'Tree', 'Linked List', 'HashMap', 'Math', 'Recursion', 'Divide & Conquer']
    : PATTERNS;

  const days = [];
  for (let i = 0; i < totalDays; i++) {
    const patternIndex = i % patternOrder.length;
    days.push({
      date: format(addDays(today, i), 'yyyy-MM-dd'),
      pattern: patternOrder[patternIndex],
      problemCount: problemsPerDay,
      revisionCount: Math.max(0, Math.floor(i / 3)), // Revisions increase over time
      completed: false,
    });
  }

  return {
    level,
    hoursPerDay,
    targetDate,
    targetCompany,
    days,
    createdAt: new Date().toISOString(),
  };
}

export default function StudyPlan() {
  const [plan, setPlan] = useState(getStudyPlan());
  const [level, setLevel] = useState(plan?.level || 'Intermediate');
  const [hoursPerDay, setHoursPerDay] = useState(plan?.hoursPerDay || 2);
  const [targetDate, setTargetDate] = useState(plan?.targetDate || format(addDays(new Date(), 30), 'yyyy-MM-dd'));
  const [targetCompany, setTargetCompany] = useState(plan?.targetCompany || 'Google');

  const today = format(new Date(), 'yyyy-MM-dd');

  const handleGenerate = () => {
    const newPlan = generatePlan(level, hoursPerDay, targetDate, targetCompany);
    setStudyPlan(newPlan);
    setPlan(newPlan);
    toast.success('Study plan generated!');
  };

  const toggleDayComplete = (date) => {
    if (!plan) return;
    const updated = {
      ...plan,
      days: plan.days.map(d => d.date === date ? { ...d, completed: !d.completed } : d),
    };
    setStudyPlan(updated);
    setPlan(updated);
  };

  const completedDays = plan?.days?.filter(d => d.completed).length || 0;
  const totalDays = plan?.days?.length || 0;
  const progress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  // Check if behind schedule
  const todayIndex = plan?.days?.findIndex(d => d.date === today) || 0;
  const expectedCompleted = todayIndex;
  const isBehind = plan && completedDays < expectedCompleted - 2;

  // Show current week of days
  const visibleDays = plan?.days?.filter(d => {
    const diff = differenceInCalendarDays(new Date(d.date), new Date());
    return diff >= -3 && diff <= 10;
  }) || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Study Plan</h1>

      {/* Generator */}
      <div className="card">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Plan Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Current Level</label>
            <select className="select-field" value={level} onChange={e => setLevel(e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Hours/Day: {hoursPerDay}</label>
            <input
              type="range"
              min="0.5"
              max="6"
              step="0.5"
              value={hoursPerDay}
              onChange={e => setHoursPerDay(parseFloat(e.target.value))}
              className="w-full mt-2 accent-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Target Date</label>
            <input type="date" className="input-field" value={targetDate} onChange={e => setTargetDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Target Company</label>
            <select className="select-field" value={targetCompany} onChange={e => setTargetCompany(e.target.value)}>
              {COMPANIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button onClick={handleGenerate} className="btn-primary mt-4">
          {plan ? 'Regenerate Plan' : 'Generate Plan'}
        </button>
      </div>

      {plan && (
        <>
          {/* Progress */}
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress: {completedDays}/{totalDays} days</span>
              <span className="text-sm text-gray-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div
                className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {isBehind && (
              <div className="mt-3 p-3 bg-amber-900/20 border border-amber-800/50 rounded-lg">
                <p className="text-sm text-amber-400">
                  You're behind schedule! Consider regenerating your plan with adjusted parameters.
                </p>
              </div>
            )}
          </div>

          {/* Day cards */}
          <div className="space-y-2">
            {visibleDays.map(day => {
              const isToday = day.date === today;
              const isPast = day.date < today;
              return (
                <div
                  key={day.date}
                  className={`card flex items-center justify-between ${isToday ? 'border-indigo-500 bg-indigo-900/10' : ''} ${day.completed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleDayComplete(day.date)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        day.completed ? 'bg-green-600 border-green-600' : 'border-gray-600 hover:border-indigo-500'
                      }`}
                    >
                      {day.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${isToday ? 'text-indigo-400' : isPast ? 'text-gray-500' : ''}`}>
                          {format(new Date(day.date), 'EEE, MMM d')}
                        </span>
                        {isToday && <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-full text-xs">TODAY</span>}
                      </div>
                      <span className="text-xs text-gray-500">{day.pattern}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{day.problemCount} problems</span>
                    {day.revisionCount > 0 && <span>{day.revisionCount} revisions</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
