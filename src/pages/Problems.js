import React, { useState, useMemo } from 'react';
import { format, addDays } from 'date-fns';
import toast from 'react-hot-toast';
import { getProblems, setProblems, getStreaks } from '../utils/storage';
import { updateSolveStreak } from '../utils/streaks';
import { checkAndAwardMilestones } from '../utils/milestones';
import { getPatterns, getCompanies, DIFFICULTIES, STATUSES, CONFIDENCES } from '../utils/constants';
import AddProblemModal from '../components/AddProblemModal';

export default function Problems() {
  const PATTERNS = getPatterns();
  const COMPANIES = getCompanies();
  const [problems, setLocalProblems] = useState(getProblems());
  const [showModal, setShowModal] = useState(false);
  const [editProblem, setEditProblem] = useState(null);
  const [search, setSearch] = useState('');
  const [filterPattern, setFilterPattern] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterConfidence, setFilterConfidence] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');

  const handleSave = (formData) => {
    let updatedProblems;
    const isSolved = formData.status === 'Solved' || formData.status === 'Mastered';

    // Only update solve streak if the problem is actually solved/mastered
    const streaks = isSolved ? updateSolveStreak() : getStreaks();

    if (editProblem) {
      updatedProblems = problems.map(p => p.id === editProblem.id ? { ...formData, id: editProblem.id, revisionSchedule: editProblem.revisionSchedule } : p);
      // Update revision schedule if status changed to solved/mastered
      if ((formData.status === 'Solved' || formData.status === 'Mastered') && editProblem.status !== 'Solved' && editProblem.status !== 'Mastered') {
        const dateBase = formData.dateAdded;
        updatedProblems = updatedProblems.map(p => p.id === editProblem.id ? {
          ...p,
          revisionSchedule: {
            rev1: format(addDays(new Date(dateBase), 3), 'yyyy-MM-dd'),
            rev2: format(addDays(new Date(dateBase), 7), 'yyyy-MM-dd'),
            rev3: format(addDays(new Date(dateBase), 21), 'yyyy-MM-dd'),
            rev1Done: false, rev2Done: false, rev3Done: false,
          }
        } : p);
      }
      toast.success('Problem updated!');
    } else {
      const newProblem = {
        ...formData,
        id: Date.now().toString(),
        revisionSchedule: null,
      };
      // Set revision schedule if already solved
      if (formData.status === 'Solved' || formData.status === 'Mastered') {
        const dateBase = formData.dateAdded;
        newProblem.revisionSchedule = {
          rev1: format(addDays(new Date(dateBase), 3), 'yyyy-MM-dd'),
          rev2: format(addDays(new Date(dateBase), 7), 'yyyy-MM-dd'),
          rev3: format(addDays(new Date(dateBase), 21), 'yyyy-MM-dd'),
          rev1Done: false, rev2Done: false, rev3Done: false,
        };
      }
      updatedProblems = [...problems, newProblem];
      toast.success('Problem added!');
    }

    setProblems(updatedProblems);
    setLocalProblems(updatedProblems);
    checkAndAwardMilestones(updatedProblems, streaks, toast);
    setEditProblem(null);
  };

  const handleDelete = (id) => {
    const updatedProblems = problems.filter(p => p.id !== id);
    setProblems(updatedProblems);
    setLocalProblems(updatedProblems);
    toast.success('Problem deleted');
  };

  const filtered = useMemo(() => {
    let result = [...problems];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(s) ||
        String(p.leetcodeNumber).includes(s)
      );
    }
    if (filterPattern) result = result.filter(p => (p.patterns || []).includes(filterPattern));
    if (filterCompany) result = result.filter(p => (p.companies || []).includes(filterCompany));
    if (filterDifficulty) result = result.filter(p => p.difficulty === filterDifficulty);
    if (filterStatus) result = result.filter(p => p.status === filterStatus);
    if (filterConfidence) result = result.filter(p => p.confidence === filterConfidence);

    result.sort((a, b) => {
      if (sortBy === 'dateAdded') return new Date(b.dateAdded) - new Date(a.dateAdded);
      if (sortBy === 'difficulty') {
        const order = { Easy: 1, Medium: 2, Hard: 3 };
        return order[a.difficulty] - order[b.difficulty];
      }
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

    return result;
  }, [problems, search, filterPattern, filterCompany, filterDifficulty, filterStatus, filterConfidence, sortBy]);

  const diffBadge = (d) => d === 'Easy' ? 'bg-green-900/50 text-green-400' : d === 'Medium' ? 'bg-amber-900/50 text-amber-400' : 'bg-red-900/50 text-red-400';
  const confBadge = (c) => c === 'Confident' ? 'bg-green-900/50 text-green-400' : c === 'Okay' ? 'bg-amber-900/50 text-amber-400' : 'bg-red-900/50 text-red-400';
  const statusBadge = (s) => s === 'Mastered' ? 'bg-green-900/50 text-green-400' : s === 'Solved' ? 'bg-blue-900/50 text-blue-400' : s === 'Attempted' ? 'bg-amber-900/50 text-amber-400' : 'bg-gray-800 text-gray-400';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Problems</h1>
        <button onClick={() => { setEditProblem(null); setShowModal(true); }} className="btn-primary">
          + Add Problem
        </button>
      </div>

      {/* Search & Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3">
          <input className="input-field" placeholder="Search name or #..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="select-field" value={filterPattern} onChange={e => setFilterPattern(e.target.value)}>
            <option value="">All Patterns</option>
            {PATTERNS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select className="select-field" value={filterCompany} onChange={e => setFilterCompany(e.target.value)}>
            <option value="">All Companies</option>
            {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="select-field" value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)}>
            <option value="">All Difficulties</option>
            {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="select-field" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select-field" value={filterConfidence} onChange={e => setFilterConfidence(e.target.value)}>
            <option value="">All Confidence</option>
            {CONFIDENCES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="select-field" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="dateAdded">Sort: Date Added</option>
            <option value="difficulty">Sort: Difficulty</option>
            <option value="status">Sort: Status</option>
          </select>
        </div>
      </div>

      {/* Problem cards */}
      {filtered.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 text-lg mb-2">No problems found</p>
          <p className="text-gray-600 text-sm">
            {problems.length === 0 ? "Add your first problem to get started!" : "Try adjusting your filters."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="card hover:border-gray-700 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">#{p.leetcodeNumber}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${diffBadge(p.difficulty)}`}>{p.difficulty}</span>
                  </div>
                  <h3 className="font-medium truncate">{p.name}</h3>
                </div>
                <div className="flex gap-1 ml-2">
                  <button onClick={() => { setEditProblem(p); setShowModal(true); }} className="p-1.5 text-gray-500 hover:text-white rounded">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-500 hover:text-red-400 rounded">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {(p.patterns || []).map(pat => (
                  <span key={pat} className="px-2 py-0.5 bg-indigo-900/30 text-indigo-400 rounded text-xs">{pat}</span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2 py-0.5 rounded-full font-medium ${statusBadge(p.status)}`}>{p.status}</span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${confBadge(p.confidence)}`}>{p.confidence}</span>
                {p.timeTaken > 0 && <span className="text-gray-500">{p.timeTaken}m</span>}
              </div>

              {p.revisionSchedule && (
                <div className="mt-2 text-xs text-gray-500">
                  Next revision: {
                    !p.revisionSchedule.rev1Done ? p.revisionSchedule.rev1 :
                    !p.revisionSchedule.rev2Done ? p.revisionSchedule.rev2 :
                    !p.revisionSchedule.rev3Done ? p.revisionSchedule.rev3 : 'All done!'
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <AddProblemModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditProblem(null); }}
        onSave={handleSave}
        editProblem={editProblem}
      />
    </div>
  );
}
