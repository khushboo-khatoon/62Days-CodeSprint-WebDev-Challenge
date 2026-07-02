import { Subject, Exam, StudyPlan, RevisionSession } from '../types/study';

/**
 * Simple deterministic mock AI service for study planning.
 * The logic is rule‑based so tests can rely on repeatable output.
 */
export const mockStudyPlannerService = {
  /**
   * Generate a daily study plan for the given date.
   * Picks subjects ordered by priority and remaining topics.
   */
  generateDailyPlan: (date: string, subjects: Subject[], exams: Exam[]): StudyPlan => {
    // Sort subjects by priority (High > Medium > Low) and then by remaining topics.
    const priorityWeight = { High: 3, Medium: 2, Low: 1 } as const;
    const sorted = [...subjects]
      .filter((s) => s.completedTopics < s.totalTopics)
      .sort((a, b) => {
        const pDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
        if (pDiff !== 0) return pDiff;
        const aRemaining = a.totalTopics - a.completedTopics;
        const bRemaining = b.totalTopics - b.completedTopics;
        return bRemaining - aRemaining;
      })
      .slice(0, 3); // limit to three subjects per day

    const items = sorted.map((subject) => {
      const remaining = subject.totalTopics - subject.completedTopics;
      // Allocate at most 2 topics per day, proportional to difficulty.
      const difficultyFactor = subject.difficulty === 'Hard' ? 0.5 : subject.difficulty === 'Medium' ? 0.75 : 1;
      const topicCount = Math.max(1, Math.min(remaining, Math.round(2 * difficultyFactor)));
      const durationHours = Math.round((subject.estimatedHours / subject.totalTopics) * topicCount);
      return { subjectId: subject.id, topicCount, durationHours };
    });

    return { date, items };
  },

  /**
   * Generate revision sessions for each subject based on exam dates.
   */
  generateRevisionSessions: (subjects: Subject[], exams: Exam[]): RevisionSession[] => {
    const sessions: RevisionSession[] = [];
    subjects.forEach((subject) => {
      const exam = exams.find((e) => e.subjectId === subject.id);
      if (!exam) return;
      const examDate = new Date(exam.date);
      // Simple spaced‑repetition: 3 sessions before exam at 70%, 40%, 10% of remaining time.
      const today = new Date();
      const diffDays = Math.max(0, Math.round((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
      if (diffDays < 1) return;
      const percentages = [0.7, 0.4, 0.1];
      percentages.forEach((p, idx) => {
        const offset = Math.round(diffDays * p);
        const scheduled = new Date();
        scheduled.setDate(today.getDate() + offset);
        sessions.push({
          subjectId: subject.id,
          revisionRound: (idx + 1) as 1 | 2 | 3,
          scheduledDate: scheduled.toISOString().split('T')[0],
        });
      });
    });
    return sessions;
  },
};
