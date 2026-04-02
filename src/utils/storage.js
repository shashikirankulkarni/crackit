import { STORAGE_KEYS } from './constants';

export function getData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getProblems() {
  return getData(STORAGE_KEYS.PROBLEMS) || [];
}

export function setProblems(problems) {
  setData(STORAGE_KEYS.PROBLEMS, problems);
}

export function getNotes() {
  return getData(STORAGE_KEYS.NOTES) || {};
}

export function setNotes(notes) {
  setData(STORAGE_KEYS.NOTES, notes);
}

export function getStreaks() {
  return getData(STORAGE_KEYS.STREAKS) || {
    solveStreak: 0,
    revisionStreak: 0,
    lastSolveDate: null,
    lastRevisionDate: null,
  };
}

export function setStreaks(streaks) {
  setData(STORAGE_KEYS.STREAKS, streaks);
}

export function getMilestones() {
  return getData(STORAGE_KEYS.MILESTONES) || [];
}

export function setMilestones(milestones) {
  setData(STORAGE_KEYS.MILESTONES, milestones);
}

export function getMockHistory() {
  return getData(STORAGE_KEYS.MOCK_HISTORY) || [];
}

export function setMockHistory(history) {
  setData(STORAGE_KEYS.MOCK_HISTORY, history);
}

export function getStudyPlan() {
  return getData(STORAGE_KEYS.STUDY_PLAN) || null;
}

export function setStudyPlan(plan) {
  setData(STORAGE_KEYS.STUDY_PLAN, plan);
}

export function exportAllData() {
  const data = {};
  Object.values(STORAGE_KEYS).forEach(key => {
    data[key] = getData(key);
  });
  return data;
}

export function importAllData(data) {
  Object.entries(data).forEach(([key, value]) => {
    if (Object.values(STORAGE_KEYS).includes(key)) {
      setData(key, value);
    }
  });
}

export function resetAllData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
