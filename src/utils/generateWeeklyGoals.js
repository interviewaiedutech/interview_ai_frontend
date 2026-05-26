import { WEEKLY_GOAL_TEMPLATES } from "../data/weeklyGoalTemplates";

export const generateWeeklyGoals = (analytics, streak, moduleStats) => {
  if (!analytics) return [];

  const shuffledGoals = [...WEEKLY_GOAL_TEMPLATES].sort(
    () => Math.random() - 0.5,
  );

  const selectedGoals = [];

  shuffledGoals.forEach((goal) => {
    switch (goal.type) {
      // =====================================
      // PRACTICE SESSIONS
      // =====================================

      case "sessions":
        selectedGoals.push({
          ...goal,
          current: analytics.totalSessions || 0,
        });
        break;

      // =====================================
      // TECHNICAL
      // =====================================

      case "technical":
        if ((moduleStats?.technical?.score || 0) < 75) {
          selectedGoals.push({
            ...goal,
            current: analytics.technicalSessions || 0,
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
            current: analytics.aptitudeSessions || 0,
          });
        }
        break;

      case "aptitude_score":
        selectedGoals.push({
          ...goal,
          current: moduleStats?.aptitude?.score || 0,
        });
        break;

      // =====================================
      // COMMUNICATION
      // =====================================

      case "communication":
        if ((moduleStats?.communication?.score || 0) < 80) {
          selectedGoals.push({
            ...goal,
            current: analytics.communicationSessions || 0,
          });
        }
        break;

      case "professional":
        selectedGoals.push({
          ...goal,
          current: moduleStats?.professional?.sessions || 0,
        });
        break;

      case "hr":
        selectedGoals.push({
          ...goal,
          current: moduleStats?.hr?.sessions || 0,
        });
        break;

      case "presentation":
        selectedGoals.push({
          ...goal,
          current: moduleStats?.presentation?.sessions || 0,
        });
        break;

      // =====================================
      // EMAIL
      // =====================================

      case "email":
        selectedGoals.push({
          ...goal,
          current: analytics.emailSessions || 0,
        });
        break;

      // =====================================
      // JD PREP
      // =====================================

      case "jdprep":
        selectedGoals.push({
          ...goal,
          current: analytics.jdprepSessions || 0,
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
          current: analytics.avgScore || 0,
        });
        break;

      // =====================================
      // PRACTICE TIME
      // =====================================

      case "practice_time":
        selectedGoals.push({
          ...goal,
          current: Number(((analytics.totalSessions || 0) * 0.5).toFixed(1)),
        });
        break;

      // =====================================
      // DAILY CONSISTENCY
      // =====================================

      case "daily_consistency":
        selectedGoals.push({
          ...goal,
          current: analytics.activeDays || 0,
        });
        break;

      // =====================================
      // PERFECT SCORE
      // =====================================

      case "perfect_score":
        selectedGoals.push({
          ...goal,
          current: analytics.highestScore || 0,
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
          current: practicedModules,
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
