import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import toast from 'react-hot-toast';
import { getProblems, setProblems, getStreaks } from '../utils/storage';
import { updateRevisionStreak } from '../utils/streaks';
import { checkAndAwardMilestones } from '../utils/milestones';

export default function Revisions() {
  const [problems, setLocalProblems] = useState(getProblems());
  const streaks = getStreaks();
  const today = format(new Date(), 'yyyy-MM-dd');

  const dueProblems = problems.filter(p => {
    if (!p.revisionSchedule) return false;
    const rs = p.revisionSchedule;
    return (rs.rev1 && !rs.rev1Done && rs.rev1 <= today) ||
           (rs.rev2 && !rs.rev2Done && rs.rev2 <= today) ||
           (rs.rev3 && !rs.rev3Done && rs.rev3 <= today);
  }).map(p => {
    const rs = p.revisionSchedule;
    let revisionNumber = 1;
    if (rs.rev1Done && !rs.rev2Done) revisionNumber = 2;
    if (rs.rev1Done && rs.rev2Done && !rs.rev3Done) revisionNumber = 3;
    return { ...p, currentRevision: revisionNumber };
  });

  const handleRevision = (problemId, result) => {
    const updated = problems.map(p => {
      if (p.id !== problemId) return p;
      const rs = { ...p.revisionSchedule };

      if (result === 'confident') {
        if (!rs.rev1Done) rs.rev1Done = true;
        else if (!rs.rev2Done) rs.rev2Done = true;
        else if (!rs.rev3Done) rs.rev3Done = true;
      } else if (result === 'shaky') {
        // Reset schedule from today
        if (!rs.rev1Done) rs.rev1Done = true;
        else if (!rs.rev2Done) rs.rev2Done = true;
        else if (!rs.rev3Done) rs.rev3Done = true;
        // Add new revision cycle
        rs.rev1 = format(addDays(new Date(), 3), 'yyyy-MM-dd');
        rs.rev2 = format(addDays(new Date(), 7), 'yyyy-MM-dd');
        rs.rev3 = format(addDays(new Date(), 21), 'yyyy-MM-dd');
        rs.rev1Done = false;
        rs.rev2Done = false;
        rs.rev3Done = false;
      }

      return { ...p, revisionSchedule: rs };
    });

    setProblems(updated);
    setLocalProblems(updated);
    const newStreaks = updateRevisionStreak();
    checkAndAwardMilestones(updated, newStreaks, toast);
    toast.success(result === 'confident' ? 'Revision marked confident!' : 'Schedule reset — you\'ll see this again soon.');
  };

  const handleSnooze = (problemId) => {
    const updated = problems.map(p => {
      if (p.id !== problemId) return p;
      const rs = { ...p.revisionSchedule };
      const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
      if (!rs.rev1Done) rs.rev1 = tomorrow;
      else if (!rs.rev2Done) rs.rev2 = tomorrow;
      else if (!rs.rev3Done) rs.rev3 = tomorrow;
      return { ...p, revisionSchedule: rs };
    });

    setProblems(updated);
    setLocalProblems(updated);
    toast.success('Snoozed until tomorrow');
  };

  const diffBadge = (d) => d === 'Easy' ? 'bg-green-900/50 text-green-400' : d === 'Medium' ? 'bg-amber-900/50 text-amber-400' : 'bg-red-900/50 text-red-400';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Today's Revisions</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Revision Streak:</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 rounded-full font-bold">{streaks.revisionStreak} days</span>
        </div>
      </div>

      {dueProblems.length === 0 ? (
        <div className="card text-center py-16">
          <div className="text-4xl mb-4">🎉</div>
          <p className="text-gray-400 text-lg">No revisions due today!</p>
          <p className="text-gray-600 text-sm mt-2">Keep solving problems to build your revision schedule.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {dueProblems.map(p => (
            <div key={p.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">#{p.leetcodeNumber}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${diffBadge(p.difficulty)}`}>{p.difficulty}</span>
                    <span className="px-2 py-0.5 bg-purple-900/50 text-purple-400 rounded-full text-xs font-medium">
                      Revision {p.currentRevision}/3
                    </span>
                  </div>
                  <h3 className="font-medium text-lg">{p.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(p.patterns || []).map(pat => (
                      <span key={pat} className="px-2 py-0.5 bg-indigo-900/30 text-indigo-400 rounded text-xs">{pat}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Originally solved: {p.dateAdded}</p>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => handleRevision(p.id, 'confident')}
                    className="px-4 py-2 bg-green-900/50 hover:bg-green-800/50 text-green-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Done (Confident)
                  </button>
                  <button
                    onClick={() => handleRevision(p.id, 'shaky')}
                    className="px-4 py-2 bg-red-900/50 hover:bg-red-800/50 text-red-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Done (Shaky)
                  </button>
                  <button
                    onClick={() => handleSnooze(p.id)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Snooze 1 day
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
