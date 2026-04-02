import React, { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getProblems, setProblems, getMockHistory, setMockHistory } from '../utils/storage';
import { getPatterns, DIFFICULTIES } from '../utils/constants';

export default function MockInterview() {
  const PATTERNS = getPatterns();
  const [mode, setMode] = useState('setup'); // setup, active, review, history
  const [pattern, setPattern] = useState('Random');
  const [difficulty, setDifficulty] = useState('Medium');
  const [timeLimit, setTimeLimit] = useState(30);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef(null);

  const problems = getProblems();
  const history = getMockHistory();

  const startMock = useCallback(() => {
    // Find eligible problems
    let eligible = problems.filter(p =>
      p.status !== 'Mastered' && (p.confidence === 'Shaky' || p.status === 'Unsolved' || p.status === 'Attempted')
    );
    if (pattern !== 'Random') {
      eligible = eligible.filter(p => (p.patterns || []).includes(pattern));
    }
    if (difficulty !== 'Any') {
      eligible = eligible.filter(p => p.difficulty === difficulty);
    }

    if (eligible.length === 0) {
      toast.error('No eligible problems found. Add more problems or adjust filters.');
      return;
    }

    const problem = eligible[Math.floor(Math.random() * eligible.length)];
    setSelectedProblem(problem);
    setTimeLeft(timeLimit * 60);
    setStartTime(Date.now());
    setMode('active');
  }, [problems, pattern, difficulty, timeLimit]);

  useEffect(() => {
    if (mode === 'active' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setMode('review');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [mode, timeLeft]);

  const finishMock = () => {
    clearInterval(timerRef.current);
    setMode('review');
  };

  const submitResult = (result) => {
    const timeTaken = Math.round((Date.now() - startTime) / 60000);

    // Update problem confidence
    const updatedProblems = problems.map(p => {
      if (p.id !== selectedProblem.id) return p;
      let newConfidence = p.confidence;
      if (result === 'clean') newConfidence = 'Confident';
      else if (result === 'hints') newConfidence = 'Okay';
      else newConfidence = 'Shaky';
      return { ...p, confidence: newConfidence };
    });
    setProblems(updatedProblems);

    // Save mock history
    const mockEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      problemId: selectedProblem.id,
      problemName: selectedProblem.name,
      pattern: (selectedProblem.patterns || [])[0] || 'Unknown',
      difficulty: selectedProblem.difficulty,
      timeLimit,
      timeTaken,
      result,
    };
    setMockHistory([...history, mockEntry]);

    toast.success('Mock interview recorded!');
    setMode('setup');
    setSelectedProblem(null);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const passRate = history.length > 0
    ? Math.round((history.filter(h => h.result === 'clean').length / history.length) * 100)
    : 0;

  const diffBadge = (d) => d === 'Easy' ? 'bg-green-900/50 text-green-400' : d === 'Medium' ? 'bg-amber-900/50 text-amber-400' : 'bg-red-900/50 text-red-400';

  if (mode === 'active') {
    const pct = (timeLeft / (timeLimit * 60)) * 100;
    const isLow = timeLeft < 60;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Currently Solving</p>
          <h2 className="text-3xl font-bold">{selectedProblem.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xs text-gray-500">#{selectedProblem.leetcodeNumber}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${diffBadge(selectedProblem.difficulty)}`}>
              {selectedProblem.difficulty}
            </span>
          </div>
        </div>

        <div className={`text-7xl font-mono font-bold ${isLow ? 'text-red-500 animate-pulse' : 'text-indigo-400'}`}>
          {formatTime(timeLeft)}
        </div>

        <div className="w-64 bg-gray-800 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${isLow ? 'bg-red-500' : 'bg-indigo-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {selectedProblem.url && (
          <a href={selectedProblem.url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
            Open on LeetCode
          </a>
        )}

        <button onClick={finishMock} className="btn-primary text-lg px-8 py-3">
          I'm Done
        </button>
      </div>
    );
  }

  if (mode === 'review') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <h2 className="text-2xl font-bold">How did it go?</h2>
        <p className="text-gray-400">{selectedProblem.name}</p>
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button onClick={() => submitResult('clean')} className="px-6 py-4 bg-green-900/50 hover:bg-green-800/50 text-green-400 rounded-xl text-lg font-medium transition-colors border border-green-800/50">
            Solved Cleanly
          </button>
          <button onClick={() => submitResult('hints')} className="px-6 py-4 bg-amber-900/50 hover:bg-amber-800/50 text-amber-400 rounded-xl text-lg font-medium transition-colors border border-amber-800/50">
            Solved with Hints
          </button>
          <button onClick={() => submitResult('failed')} className="px-6 py-4 bg-red-900/50 hover:bg-red-800/50 text-red-400 rounded-xl text-lg font-medium transition-colors border border-red-800/50">
            Could Not Solve
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mock Interview</h1>

      {/* Setup */}
      <div className="card">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Configure Mock Interview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Pattern</label>
            <select className="select-field" value={pattern} onChange={e => setPattern(e.target.value)}>
              <option>Random</option>
              {PATTERNS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Difficulty</label>
            <select className="select-field" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              <option>Any</option>
              {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Time Limit</label>
            <select className="select-field" value={timeLimit} onChange={e => setTimeLimit(parseInt(e.target.value))}>
              <option value={20}>20 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
            </select>
          </div>
        </div>
        <button onClick={startMock} className="btn-primary mt-4 text-lg px-8 py-3">
          Start Mock Interview
        </button>
      </div>

      {/* Mock History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400">Mock History</h3>
          {history.length > 0 && (
            <span className="text-sm">
              Pass Rate: <span className={passRate >= 50 ? 'text-green-400' : 'text-red-400'}>{passRate}%</span>
            </span>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No mock interviews yet. Start your first one!</p>
        ) : (
          <div className="space-y-2">
            {[...history].reverse().map(h => (
              <div key={h.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div>
                  <p className="text-sm font-medium">{h.problemName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{new Date(h.date).toLocaleDateString()}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${diffBadge(h.difficulty)}`}>{h.difficulty}</span>
                    <span className="text-xs text-gray-500">{h.pattern}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    h.result === 'clean' ? 'bg-green-900/50 text-green-400' :
                    h.result === 'hints' ? 'bg-amber-900/50 text-amber-400' :
                    'bg-red-900/50 text-red-400'
                  }`}>
                    {h.result === 'clean' ? 'Solved' : h.result === 'hints' ? 'With Hints' : 'Failed'}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{h.timeTaken}m / {h.timeLimit}m</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
