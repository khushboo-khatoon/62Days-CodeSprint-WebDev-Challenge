import { Subject, Exam, StudyPlan, RevisionSession } from '../types/study';
import { mockStudyPlannerService } from './mockStudyPlannerService';

/**
 * Service layer for study planning. Currently forwards to the mock implementation.
 * Allows swapping to a real AI API later without changing callers.
 */
export const studyPlannerService = {
  generateDailyPlan: (date: string, subjects: Subject[], exams: Exam[]): StudyPlan => {
    return mockStudyPlannerService.generateDailyPlan(date, subjects, exams);
  },
  generateRevisionSessions: (subjects: Subject[], exams: Exam[]): RevisionSession[] => {
    return mockStudyPlannerService.generateRevisionSessions(subjects, exams);
  },
};
