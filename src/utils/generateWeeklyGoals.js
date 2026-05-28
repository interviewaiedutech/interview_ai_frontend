import { WEEKLY_GOAL_TEMPLATES } from "../data/weeklyGoalTemplates";

export const generateWeeklyGoals = (analytics, streak, moduleStats) => {
  const getWeekSeed = () => {
    const now = new Date();

    const firstDay = new Date(now.getFullYear(), 0, 1);

    const days = Math.floor((now - firstDay) / 86400000);

    return Math.ceil((days + firstDay.getDay() + 1) / 7);
  };

  const seededShuffle = (array, seed) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const random = Math.sin(seed + i) * 10000;

      const j = Math.floor(Math.abs(random) % (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };
  if (!analytics) return [];
  const weekSeed = getWeekSeed();

  const shuffledGoals = seededShuffle(WEEKLY_GOAL_TEMPLATES, weekSeed);
  const selectedGoals = [];

  shuffledGoals.forEach((goal) => {
    switch (goal.type) {
      // =====================================
      // PRACTICE SESSIONS
      // =====================================

      case "sessions":
        selectedGoals.push({
          ...goal,
          current: Math.min(goal.target, analytics.totalSessions || 0),
        });
        break;

      // =====================================
      // TECHNICAL
      // =====================================

      case "technical":
        if ((moduleStats?.technical?.score || 0) < 75) {
          selectedGoals.push({
            ...goal,
            current: Math.min(goal.target, analytics.totalSessions || 0),
          });
        }
        break;

      // =====================================
      // APTITUDE
      // =====================================

      case "aptitude":
        if ((moduleStats?.aptitude?.score || 0) < 75) {
          selectedGoals.push({
            ...goal,
            current: Math.min(goal.target, analytics.aptitudeSessions || 0),
          });
        }
        break;

      case "aptitude_score":
        selectedGoals.push({
          ...goal,
          current: Math.min(goal.target, moduleStats?.aptitude?.score || 0),
        });
        break;

      // =====================================
      // COMMUNICATION
      // =====================================

      case "communication":
        if ((moduleStats?.communication?.score || 0) < 80) {
          selectedGoals.push({
            ...goal,
            current: Math.min(
              goal.target,
              analytics.communicationSessions || 0,
            ),
          });
        }
        break;

      case "professional":
        selectedGoals.push({
          ...goal,
          current: Math.min(
            goal.target,
            moduleStats?.professional?.sessions || 0,
          ),
        });
        break;

      case "hr":
        selectedGoals.push({
          ...goal,
          current: Math.min(goal.target, moduleStats?.hr?.sessions || 0),
        });
        break;

      case "presentation":
        selectedGoals.push({
          ...goal,
          current: Math.min(
            goal.target,
            moduleStats?.presentation?.sessions || 0,
          ),
        });
        break;

      // =====================================
      // EMAIL
      // =====================================

      case "email":
        selectedGoals.push({
          ...goal,
          current: Math.min(goal.target, analytics.emailSessions || 0),
        });
        break;

      // =====================================
      // JD PREP
      // =====================================

      case "jdprep":
        selectedGoals.push({
          ...goal,
          current: Math.min(goal.target, analytics.jdprepSessions || 0),
        });
        break;

      // =====================================
      // STREAK
      // =====================================

      case "streak":
        selectedGoals.push({
          ...goal,
          current: Math.min(goal.target, streak?.currentStreak || 0),
        });
        break;

      // =====================================
      // SCORE
      // =====================================

      case "score":
        selectedGoals.push({
          ...goal,
          current: Math.min(goal.target, analytics.avgScore || 0),
        });
        break;

      // =====================================
      // PRACTICE TIME
      // =====================================

      case "practice_time":
        selectedGoals.push({
          ...goal,
          current: Math.min(
            goal.target,
            Number(((analytics.totalSessions || 0) * 0.5).toFixed(1)),
          ),
        });
        break;

      // =====================================
      // DAILY CONSISTENCY
      // =====================================

      case "daily_consistency":
        selectedGoals.push({
          ...goal,
          current: Math.min(goal.target, analytics.activeDays || 0),
        });
        break;

      // =====================================
      // PERFECT SCORE
      // =====================================

      case "perfect_score":
        selectedGoals.push({
          ...goal,
          current: Math.min(goal.target, analytics.highestScore || 0),
        });
        break;

      // =====================================
      // ALL MODULES
      // =====================================

      case "all_modules":
        const practicedModules = [
          analytics.technicalSessions > 0,
          analytics.communicationSessions > 0,
          analytics.aptitudeSessions > 0,
          analytics.emailSessions > 0,
          analytics.jdprepSessions > 0,
        ].filter(Boolean).length;

        selectedGoals.push({
          ...goal,
          current: Math.min(goal.target, practicedModules),
        });

        break;

      default:
        break;
    }
  });

  const uniqueGoals = [];

  const usedTypes = new Set();

  selectedGoals.forEach((goal) => {
    if (!usedTypes.has(goal.type)) {
      uniqueGoals.push(goal);
      usedTypes.add(goal.type);
    }
  });

  return uniqueGoals.slice(0, 4);
};
