import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { exportAllData, importAllData, resetAllData, getMilestones, getProblems, setProblems } from '../utils/storage';
import { MILESTONES_LIST, getPatterns, setPatterns, getCompanies, setCompanies, getTopics, setTopics } from '../utils/constants';
import SEED_PROBLEMS from '../utils/risingbrain-seed';

function TagManager({ title, description, items, onUpdate }) {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    if (items.includes(trimmed)) {
      toast.error('Already exists');
      return;
    }
    const updated = [...items, trimmed];
    onUpdate(updated);
    setNewTag('');
    toast.success(`Added "${trimmed}"`);
  };

  const removeTag = (tag) => {
    const updated = items.filter(t => t !== tag);
    onUpdate(updated);
    toast.success(`Removed "${tag}"`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>

      <div className="flex gap-2 mb-4">
        <input
          className="input-field"
          placeholder="Add new tag..."
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTag} className="btn-primary whitespace-nowrap text-sm" disabled={!newTag.trim()}>
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 group hover:border-red-800 transition-colors"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="text-gray-600 hover:text-red-400 transition-colors"
              title={`Remove "${tag}"`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Settings() {
  const fileInputRef = useRef(null);
  const milestones = getMilestones();
  const earnedIds = new Set(milestones.map(m => m.id));
  const [patterns, setLocalPatterns] = useState(getPatterns());
  const [companies, setLocalCompanies] = useState(getCompanies());
  const [topics, setLocalTopics] = useState(getTopics());

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crackit-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported!');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        importAllData(data);
        toast.success('Data imported! Refreshing...');
        setTimeout(() => window.location.reload(), 1000);
      } catch {
        toast.error('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure? This will delete ALL your data permanently.')) {
      resetAllData();
      toast.success('All data reset!');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  const handleImportSeed = () => {
    const existing = getProblems();
    const existingNumbers = new Set(existing.filter(p => p.leetcodeNumber > 0).map(p => p.leetcodeNumber));
    const existingNames = new Set(existing.map(p => p.name.toLowerCase()));
    const today = format(new Date(), 'yyyy-MM-dd');

    const newProblems = SEED_PROBLEMS
      .filter(p => {
        // Skip if already exists by LeetCode number (for numbered problems)
        if (p.leetcodeNumber > 0 && existingNumbers.has(p.leetcodeNumber)) return false;
        // Skip if already exists by name (for non-LeetCode problems)
        if (existingNames.has(p.name.toLowerCase())) return false;
        return true;
      })
      .map(p => ({
        id: `seed_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        leetcodeNumber: p.leetcodeNumber,
        name: p.name,
        url: p.leetcodeNumber > 0
          ? `https://leetcode.com/problems/${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}/`
          : '',
        topic: p.topic || '',
        difficulty: p.difficulty,
        patterns: p.patterns,
        companies: p.companies || [],
        status: 'Unsolved',
        confidence: 'Okay',
        feltDifficulty: 'As expected',
        timeTaken: 0,
        notes: p.leetcodeNumber === 0 ? 'Practice on GFG / implement from scratch' : '',
        dateAdded: today,
        revisionSchedule: null,
      }));

    if (newProblems.length === 0) {
      toast.success('All problems from this sheet are already in your tracker!');
      return;
    }

    setProblems([...existing, ...newProblems]);
    toast.success(`Imported ${newProblems.length} new problems! (${SEED_PROBLEMS.length - newProblems.length} duplicates skipped)`);
  };

  const handleUpdatePatterns = (updated) => {
    setPatterns(updated);
    setLocalPatterns(updated);
  };

  const handleUpdateCompanies = (updated) => {
    setCompanies(updated);
    setLocalCompanies(updated);
  };

  const handleUpdateTopics = (updated) => {
    setTopics(updated);
    setLocalTopics(updated);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Topic Tags */}
      <TagManager
        title="Topic Tags (Data Structures)"
        description="Add or remove topic tags like Array, String, Tree, Graph, etc."
        items={topics}
        onUpdate={handleUpdateTopics}
      />

      {/* Pattern Tags */}
      <TagManager
        title="Pattern Tags (Techniques)"
        description="Add or remove technique tags like Two Pointers, Sliding Window, BFS, etc."
        items={patterns}
        onUpdate={handleUpdatePatterns}
      />

      {/* Company Tags */}
      <TagManager
        title="Company Tags"
        description="Add or remove company tags used when logging problems."
        items={companies}
        onUpdate={handleUpdateCompanies}
      />

      {/* Problem Sheet Import */}
      <div className="card">
        <h3 className="text-lg font-medium mb-1">Import Problem Sheet</h3>
        <p className="text-sm text-gray-500 mb-4">Pre-built curated problem sets to jumpstart your prep.</p>
        <div className="flex items-center justify-between p-4 bg-indigo-900/10 border border-indigo-800/30 rounded-lg">
          <div>
            <p className="font-medium">RisingBrain DSA Sheet</p>
            <p className="text-sm text-gray-500">{SEED_PROBLEMS.length} problems across all major patterns & topics</p>
          </div>
          <button onClick={handleImportSeed} className="btn-primary text-sm whitespace-nowrap">Import Sheet</button>
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <h3 className="text-lg font-medium mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-gray-500">Download all your data as JSON</p>
            </div>
            <button onClick={handleExport} className="btn-primary text-sm">Export</button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Import Data</p>
              <p className="text-sm text-gray-500">Restore from a JSON backup</p>
            </div>
            <div>
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
              <button onClick={() => fileInputRef.current.click()} className="btn-secondary text-sm">Import</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
            <div>
              <p className="font-medium text-red-400">Reset All Data</p>
              <p className="text-sm text-gray-500">Permanently delete everything</p>
            </div>
            <button onClick={handleReset} className="btn-danger text-sm">Reset</button>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="card">
        <h3 className="text-lg font-medium mb-4">Milestones & Badges</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MILESTONES_LIST.map(m => {
            const earned = earnedIds.has(m.id);
            const milestone = milestones.find(em => em.id === m.id);
            return (
              <div
                key={m.id}
                className={`p-4 rounded-lg border ${
                  earned ? 'bg-indigo-900/20 border-indigo-800/50' : 'bg-gray-800/30 border-gray-800 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <p className={`font-medium text-sm ${earned ? 'text-indigo-400' : 'text-gray-500'}`}>{m.name}</p>
                    <p className="text-xs text-gray-500">{m.description}</p>
                    {earned && milestone && (
                      <p className="text-xs text-gray-600 mt-1">Earned {new Date(milestone.earnedDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* About */}
      <div className="card">
        <h3 className="text-lg font-medium mb-2">About CrackIt</h3>
        <p className="text-sm text-gray-400">
          Personal FAANG DSA preparation tracker. All data is stored locally in your browser.
          No accounts, no tracking, no backend.
        </p>
        <p className="text-xs text-gray-600 mt-2">Built with React + Tailwind CSS</p>
      </div>
    </div>
  );
}
