import React, { useState } from 'react';
import { getPatterns, PATTERN_TEMPLATES } from '../utils/constants';
import { getNotes, setNotes } from '../utils/storage';

export default function Notes() {
  const PATTERNS = getPatterns();
  const [notes, setLocalNotes] = useState(() => {
    const saved = getNotes();
    const merged = {};
    PATTERNS.forEach(p => {
      const key = p.toLowerCase().replace(/[^a-z0-9]/g, '-');
      merged[key] = saved[key] || PATTERN_TEMPLATES[p] || `## ${p}\n\nYour notes here...`;
    });
    return merged;
  });
  const [activePattern, setActivePattern] = useState(PATTERNS[0]);
  const [showAll, setShowAll] = useState(false);

  const getKey = (p) => p.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const handleNoteChange = (pattern, value) => {
    const key = getKey(pattern);
    const updated = { ...notes, [key]: value };
    setLocalNotes(updated);
    setNotes(updated);
  };

  const exportNotes = () => {
    let text = 'CrackIt - Pattern Notes\n' + '='.repeat(50) + '\n\n';
    PATTERNS.forEach(p => {
      const key = getKey(p);
      text += notes[key] + '\n\n' + '-'.repeat(50) + '\n\n';
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crackit-notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showAll) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Quick Reference</h1>
          <div className="flex gap-2">
            <button onClick={() => setShowAll(false)} className="btn-secondary text-sm">Back to Editor</button>
            <button onClick={exportNotes} className="btn-primary text-sm">Export as .txt</button>
          </div>
        </div>
        <div className="space-y-4">
          {PATTERNS.map(p => (
            <div key={p} className="card">
              <div className="prose prose-invert prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-300 leading-relaxed">
                  {notes[getKey(p)]}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notes & Cheat Sheet</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowAll(true)} className="btn-secondary text-sm">Quick Reference</button>
          <button onClick={exportNotes} className="btn-primary text-sm">Export as .txt</button>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Pattern list */}
        <div className="w-48 flex-shrink-0 space-y-1 hidden md:block">
          {PATTERNS.map(p => (
            <button
              key={p}
              onClick={() => setActivePattern(p)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activePattern === p
                  ? 'bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Mobile pattern select */}
        <div className="md:hidden w-full">
          <select
            className="select-field mb-4"
            value={activePattern}
            onChange={e => setActivePattern(e.target.value)}
          >
            {PATTERNS.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>

        {/* Editor */}
        <div className="flex-1 card hidden md:block">
          <h3 className="text-lg font-medium mb-3">{activePattern}</h3>
          <textarea
            className="w-full min-h-[500px] bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-200 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            value={notes[getKey(activePattern)] || ''}
            onChange={e => handleNoteChange(activePattern, e.target.value)}
            placeholder="Write your notes here... (supports markdown-style formatting)"
          />
        </div>
      </div>

      {/* Mobile editor */}
      <div className="md:hidden card">
        <h3 className="text-lg font-medium mb-3">{activePattern}</h3>
        <textarea
          className="w-full min-h-[400px] bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-200 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          value={notes[getKey(activePattern)] || ''}
          onChange={e => handleNoteChange(activePattern, e.target.value)}
        />
      </div>
    </div>
  );
}
