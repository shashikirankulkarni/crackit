import { PATTERNS } from './constants';

export function calculateReadinessScore(problems) {
  if (problems.length === 0) return { total: 0, dsaDepth: 0, revisionConsistency: 0, patternCoverage: 0, solveSpeed: 0 };

  const solved = problems.filter(p => p.status === 'Solved' || p.status === 'Mastered');

  // DSA Depth (30 pts): based on number of solved problems
  const dsaDepth = Math.min(30, Math.round((solved.length / 100) * 30));

  // Revision Consistency (25 pts): % of scheduled revisions completed on time
  let totalRevisions = 0;
  let completedRevisions = 0;
  solved.forEach(p => {
    if (p.revisionSchedule) {
      if (p.revisionSchedule.rev1) { totalRevisions++; if (p.revisionSchedule.rev1Done) completedRevisions++; }
      if (p.revisionSchedule.rev2) { totalRevisions++; if (p.revisionSchedule.rev2Done) completedRevisions++; }
      if (p.revisionSchedule.rev3) { totalRevisions++; if (p.revisionSchedule.rev3Done) completedRevisions++; }
    }
  });
  const revisionConsistency = totalRevisions > 0 ? Math.round((completedRevisions / totalRevisions) * 25) : 0;

  // Pattern Coverage (25 pts): how many of 18 patterns have 5+ solved
  const patternCounts = {};
  PATTERNS.forEach(p => { patternCounts[p] = 0; });
  solved.forEach(p => {
    (p.patterns || []).forEach(pat => {
      if (patternCounts[pat] !== undefined) patternCounts[pat]++;
    });
  });
  const coveredPatterns = Object.values(patternCounts).filter(c => c >= 5).length;
  const patternCoverage = Math.round((coveredPatterns / PATTERNS.length) * 25);

  // Solve Speed (20 pts): average time for medium problems trending down
  const mediumSolved = solved.filter(p => p.difficulty === 'Medium' && p.timeTaken > 0);
  let solveSpeed = 0;
  if (mediumSolved.length >= 3) {
    const avgTime = mediumSolved.reduce((sum, p) => sum + p.timeTaken, 0) / mediumSolved.length;
    // Under 20 min = full marks, over 60 min = 0
    solveSpeed = Math.round(Math.max(0, Math.min(20, ((60 - avgTime) / 40) * 20)));
  }

  const total = dsaDepth + revisionConsistency + patternCoverage + solveSpeed;

  return { total, dsaDepth, revisionConsistency, patternCoverage, solveSpeed };
}

export function getScoreColor(score) {
  if (score < 40) return 'text-red-500';
  if (score <= 70) return 'text-amber-500';
  return 'text-green-500';
}

export function getScoreRingColor(score) {
  if (score < 40) return '#ef4444';
  if (score <= 70) return '#f59e0b';
  return '#22c55e';
}

export function getCompanyReadiness(score) {
  const companies = [];
  if (score >= 40) companies.push('Flipkart', 'Swiggy');
  if (score >= 60) companies.push('Microsoft', 'Amazon');
  if (score >= 80) companies.push('Google', 'Meta');
  return companies;
}

export function getWeakestArea(scoreBreakdown) {
  const areas = [
    { name: 'DSA Depth', score: scoreBreakdown.dsaDepth, max: 30, tip: 'Solve more problems across different patterns to improve depth.' },
    { name: 'Revision Consistency', score: scoreBreakdown.revisionConsistency, max: 25, tip: 'Complete your scheduled revisions on time to retain what you learn.' },
    { name: 'Pattern Coverage', score: scoreBreakdown.patternCoverage, max: 25, tip: 'Focus on underrepresented patterns. Aim for 5+ solved per pattern.' },
    { name: 'Solve Speed', score: scoreBreakdown.solveSpeed, max: 20, tip: 'Practice timed solving. Target under 20 minutes for medium problems.' },
  ];

  let weakest = areas[0];
  let lowestPct = areas[0].score / areas[0].max;
  areas.forEach(a => {
    const pct = a.score / a.max;
    if (pct < lowestPct) {
      lowestPct = pct;
      weakest = a;
    }
  });

  return weakest;
}
