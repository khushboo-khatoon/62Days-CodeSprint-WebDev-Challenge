export interface Subject {
  id: string;
  name: string;
  totalTopics: number;
  completedTopics: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedHours: number;
  examDate?: string; // ISO date string
  priority: 'Low' | 'Medium' | 'High';
}

export interface Exam {
  id: string;
  subjectId: string;
  date: string; // ISO date string
  priority: 'Low' | 'Medium' | 'High';
}

export interface StudyPlanItem {
  subjectId: string;
  topicCount: number;
  durationHours: number;
}

export interface StudyPlan {
  date: string; // ISO date string
  items: StudyPlanItem[];
}

export interface RevisionSession {
  subjectId: string;
  revisionRound: 1 | 2 | 3; // 1st, 2nd, final revision
  scheduledDate: string; // ISO date string
}

export interface ProductivityInsight {
  title: string;
  value: string;
  description?: string;
}
