import React, { useState } from 'react';
import { COMPANY_PROBLEM_SETS } from '../utils/constants';
import { getProblems } from '../utils/storage';

export default function CompanySets() {
  const [activeCompany, setActiveCompany] = useState('Amazon');
  const problems = getProblems();
  const solvedNumbers = new Set(
    problems.filter(p => p.status === 'Solved' || p.status === 'Mastered').map(p => p.leetcodeNumber)
  );

  const companies = Object.keys(COMPANY_PROBLEM_SETS);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Company Problem Sets</h1>

      {/* Company tabs */}
      <div className="flex flex-wrap gap-2">
        {companies.map(c => {
          const total = COMPANY_PROBLEM_SETS[c].length;
          const done = COMPANY_PROBLEM_SETS[c].filter(p => solvedNumbers.has(p.number)).length;
          const pct = Math.round((done / total) * 100);
          return (
            <button
              key={c}
              onClick={() => setActiveCompany(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCompany === c
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {c}
              <span className={`ml-2 text-xs ${pct === 100 ? 'text-green-400' : pct >= 50 ? 'text-amber-400' : 'text-gray-500'}`}>
                {pct}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="card">
        {(() => {
          const set = COMPANY_PROBLEM_SETS[activeCompany];
          const done = set.filter(p => solvedNumbers.has(p.number)).length;
          const pct = Math.round((done / set.length) * 100);
          return (
            <>
              <div className="flex justify-between mb-2 text-sm">
                <span>{activeCompany} Progress</span>
                <span className="text-gray-400">{done}/{set.length} ({pct}%)</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${pct === 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </>
          );
        })()}
      </div>

      {/* Problem list */}
      <div className="space-y-2">
        {COMPANY_PROBLEM_SETS[activeCompany].map(p => {
          const isSolved = solvedNumbers.has(p.number);
          return (
            <div
              key={p.number}
              className={`card flex items-center justify-between ${isSolved ? 'border-green-800/50 bg-green-900/10' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSolved ? 'bg-green-600 border-green-600' : 'border-gray-600'
                }`}>
                  {isSolved && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <span className="text-xs text-gray-500 mr-2">#{p.number}</span>
                  <span className={`text-sm ${isSolved ? 'text-green-400' : ''}`}>{p.name}</span>
                </div>
              </div>
              <a
                href={`https://leetcode.com/problems/${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                Open
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
