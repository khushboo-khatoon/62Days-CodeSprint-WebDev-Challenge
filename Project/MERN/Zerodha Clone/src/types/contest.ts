// src/types/contest.ts

/**
 * Types for Programming Contest Management System
 */

export enum ContestVisibility {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
  INVITE_ONLY = 'Invite Only',
  SCHEDULED = 'Scheduled',
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export enum SubmissionStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  TIME_LIMIT_EXCEEDED = 'Time Limit Exceeded',
  MEMORY_LIMIT_EXCEEDED = 'Memory Limit Exceeded',
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  visibility: ContestVisibility;
  organizerId: string;
  problems: Problem[];
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  timeLimit: number; // seconds
  memoryLimit: number; // MB
}

export interface Participant {
  id: string;
  userId: string;
  contestId: string;
  joinedAt: string; // ISO string
}

export interface Submission {
  id: string;
  participantId: string;
  problemId: string;
  contestId: string;
  language: string;
  code: string;
  submittedAt: string; // ISO string
  status: SubmissionStatus;
  runtime?: number; // ms
  memory?: number; // KB
}

export interface LeaderboardEntry {
  participantId: string;
  username: string;
  solvedCount: number;
  totalTime: number; // sum of runtimes for solved problems
  rank?: number;
}

export interface ContestAnalytics {
  submissionsPerHour: Record<string, number>;
  languageUsage: Record<string, number>;
  difficultyDistribution: Record<Difficulty, number>;
  participantGrowth: Record<string, number>;
}
