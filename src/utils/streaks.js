import { format } from 'date-fns';
import { getStreaks, setStreaks } from './storage';

export function updateSolveStreak() {
  const streaks = getStreaks();
  const today = format(new Date(), 'yyyy-MM-dd');

  if (streaks.lastSolveDate === today) return streaks;

  const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');

  if (streaks.lastSolveDate === yesterday) {
    streaks.solveStreak += 1;
  } else if (streaks.lastSolveDate !== today) {
    streaks.solveStreak = 1;
  }
  streaks.lastSolveDate = today;
  setStreaks(streaks);
  return streaks;
}

export function updateRevisionStreak() {
  const streaks = getStreaks();
  const today = format(new Date(), 'yyyy-MM-dd');

  if (streaks.lastRevisionDate === today) return streaks;

  const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');

  if (streaks.lastRevisionDate === yesterday) {
    streaks.revisionStreak += 1;
  } else if (streaks.lastRevisionDate !== today) {
    streaks.revisionStreak = 1;
  }
  streaks.lastRevisionDate = today;
  setStreaks(streaks);
  return streaks;
}

export function checkStreakValidity() {
  const streaks = getStreaks();
  const today = format(new Date(), 'yyyy-MM-dd');
  const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');

  if (streaks.lastSolveDate && streaks.lastSolveDate !== today && streaks.lastSolveDate !== yesterday) {
    streaks.solveStreak = 0;
  }
  if (streaks.lastRevisionDate && streaks.lastRevisionDate !== today && streaks.lastRevisionDate !== yesterday) {
    streaks.revisionStreak = 0;
  }

  setStreaks(streaks);
  return streaks;
}
