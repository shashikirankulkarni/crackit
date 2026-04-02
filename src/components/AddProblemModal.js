import React, { useState } from 'react';
import { format } from 'date-fns';
import { getPatterns, getCompanies, DIFFICULTIES, STATUSES, CONFIDENCES, FELT_DIFFICULTIES } from '../utils/constants';

export default function AddProblemModal({ isOpen, onClose, onSave, editProblem }) {
  const PATTERNS = getPatterns();
  const COMPANIES = getCompanies();
  const [form, setForm] = useState(editProblem || {
    leetcodeUrl: '',
    leetcodeNumber: '',
    name: '',
    difficulty: 'Medium',
    patterns: [],
    companies: [],
    status: 'Unsolved',
    confidence: 'Okay',
    feltDifficulty: 'As expected',
    timeTaken: '',
    notes: '',
    dateAdded: format(new Date(), 'yyyy-MM-dd'),
  });
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState('');

  React.useEffect(() => {
    if (editProblem) {
      setForm({ ...editProblem, leetcodeUrl: editProblem.url || '' });
    }
  }, [editProblem]);

  const parseLeetCodeUrl = async () => {
    const url = form.leetcodeUrl.trim();
    if (!url) return;

    const match = url.match(/leetcode\.com\/problems\/([^/]+)/);
    if (!match) {
      setParseError('Invalid LeetCode URL');
      return;
    }

    const slug = match[1];
    setParsing(true);
    setParseError('');

    // Convert slug to readable name: "two-sum-ii-input-array-is-sorted" → "Two Sum II Input Array Is Sorted"
    const nameFromSlug = slug
      .split('-')
      .map(w => {
        // Keep roman numerals uppercase
        if (/^(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/i.test(w)) return w.toUpperCase();
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join(' ');

    const graphqlQuery = JSON.stringify({
      query: `query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          title
          difficulty
          topicTags { name }
        }
      }`,
      variables: { titleSlug: slug },
    });

    // Try multiple approaches to fetch from LeetCode
    const fetchAttempts = [
      // Direct fetch (works if no CORS issues)
      () => fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: graphqlQuery,
      }),
      // CORS proxy fallback
      () => fetch('https://corsproxy.io/?' + encodeURIComponent('https://leetcode.com/graphql'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: graphqlQuery,
      }),
    ];

    let fetched = false;
    for (const attempt of fetchAttempts) {
      try {
        const response = await attempt();
        const data = await response.json();
        const q = data?.data?.question;
        if (q) {
          const tagNames = q.topicTags.map(t => t.name);
          const matchedPatterns = PATTERNS.filter(p =>
            tagNames.some(t => t.toLowerCase().includes(p.toLowerCase()) || p.toLowerCase().includes(t.toLowerCase()))
          );
          setForm(f => ({
            ...f,
            name: q.title,
            leetcodeNumber: q.questionId,
            difficulty: q.difficulty,
            patterns: matchedPatterns.length > 0 ? matchedPatterns : f.patterns,
          }));
          fetched = true;
          break;
        }
      } catch {
        // Try next approach
      }
    }

    if (!fetched) {
      // Fallback: populate name from URL slug
      setForm(f => ({ ...f, name: nameFromSlug }));
      setParseError('Auto-filled name from URL. Please set difficulty, number, and tags manually.');
    }

    setParsing(false);
  };

  const toggleArrayItem = (field, item) => {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(item) ? f[field].filter(i => i !== item) : [...f[field], item],
    }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({
      ...form,
      url: form.leetcodeUrl,
      leetcodeNumber: parseInt(form.leetcodeNumber) || 0,
      timeTaken: parseInt(form.timeTaken) || 0,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-10 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl mx-4 my-8 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold">{editProblem ? 'Edit Problem' : 'Add Problem'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* URL Parser */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">LeetCode URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                className="input-field"
                placeholder="https://leetcode.com/problems/two-sum/"
                value={form.leetcodeUrl}
                onChange={e => setForm(f => ({ ...f, leetcodeUrl: e.target.value }))}
              />
              <button onClick={parseLeetCodeUrl} disabled={parsing} className="btn-secondary whitespace-nowrap">
                {parsing ? 'Parsing...' : 'Parse'}
              </button>
            </div>
            {parseError && <p className="text-red-400 text-xs mt-1">{parseError}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Problem Name *</label>
              <input className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">LeetCode #</label>
              <input className="input-field" type="number" value={form.leetcodeNumber} onChange={e => setForm(f => ({ ...f, leetcodeNumber: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Difficulty</label>
              <select className="select-field" value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}>
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Status</label>
              <select className="select-field" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Confidence</label>
              <select className="select-field" value={form.confidence} onChange={e => setForm(f => ({ ...f, confidence: e.target.value }))}>
                {CONFIDENCES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Felt Difficulty</label>
              <select className="select-field" value={form.feltDifficulty} onChange={e => setForm(f => ({ ...f, feltDifficulty: e.target.value }))}>
                {FELT_DIFFICULTIES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Time Taken (min)</label>
              <input className="input-field" type="number" value={form.timeTaken} onChange={e => setForm(f => ({ ...f, timeTaken: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Date Solved</label>
            <input className="input-field" type="date" value={form.dateAdded} onChange={e => setForm(f => ({ ...f, dateAdded: e.target.value }))} />
          </div>

          {/* Pattern tags */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Pattern Tags</label>
            <div className="flex flex-wrap gap-2">
              {PATTERNS.map(p => (
                <button
                  key={p}
                  onClick={() => toggleArrayItem('patterns', p)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    form.patterns.includes(p)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Company tags */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Company Tags</label>
            <div className="flex flex-wrap gap-2">
              {COMPANIES.map(c => (
                <button
                  key={c}
                  onClick={() => toggleArrayItem('companies', c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    form.companies.includes(c)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Notes / Approach</label>
            <textarea
              className="input-field min-h-[100px]"
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Your approach, key insights, edge cases..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-800">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} className="btn-primary" disabled={!form.name.trim()}>
            {editProblem ? 'Update' : 'Add Problem'}
          </button>
        </div>
      </div>
    </div>
  );
}
