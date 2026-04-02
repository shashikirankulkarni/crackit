import { PATTERNS, COMPANY_PROBLEM_SETS } from './constants';
import { getMilestones, setMilestones } from './storage';

export function checkAndAwardMilestones(problems, streaks, toast) {
  const earned = getMilestones();
  const earnedIds = new Set(earned.map(m => m.id));
  const solved = problems.filter(p => p.status === 'Solved' || p.status === 'Mastered');
  const newMilestones = [];

  const check = (id, name, condition) => {
    if (!earnedIds.has(id) && condition) {
      newMilestones.push({ id, name, earnedDate: new Date().toISOString() });
    }
  };

  check('first_problem', 'First Step', problems.length >= 1);
  check('solve_10', 'Getting Started', solved.length >= 10);
  check('solve_25', 'Quarter Century', solved.length >= 25);
  check('solve_50', 'Half Century', solved.length >= 50);
  check('solve_100', 'Centurion', solved.length >= 100);
  check('solve_200', 'DSA Machine', solved.length >= 200);
  check('streak_7', 'Week Warrior', streaks.solveStreak >= 7);
  check('streak_30', 'Month Master', streaks.solveStreak >= 30);

  // Pattern master: any pattern with 5+ mastered problems
  const patternMastered = PATTERNS.some(pat => {
    const count = problems.filter(p => p.status === 'Mastered' && (p.patterns || []).includes(pat)).length;
    return count >= 5;
  });
  check('pattern_master', 'Pattern Master', patternMastered);

  // Company sets completion milestones
  Object.entries(COMPANY_PROBLEM_SETS).forEach(([company, problemSet]) => {
    const solvedNumbers = new Set(solved.map(p => p.leetcodeNumber));
    const completed = problemSet.filter(p => solvedNumbers.has(p.number)).length;
    const halfId = `company_${company.toLowerCase()}_50`;
    const fullId = `company_${company.toLowerCase()}_100`;
    check(halfId, `${company} 50%`, completed >= problemSet.length / 2);
    check(fullId, `${company} Complete`, completed >= problemSet.length);
  });

  if (newMilestones.length > 0) {
    setMilestones([...earned, ...newMilestones]);
    newMilestones.forEach(m => {
      if (toast) toast.success(`🏅 Milestone earned: ${m.name}!`);
    });
  }

  return [...earned, ...newMilestones];
}
