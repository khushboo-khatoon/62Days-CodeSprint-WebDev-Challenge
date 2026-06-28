// src/types/github.ts

export interface ContributionSummary {
  totalContributions: number;
  commits: number;
  pullRequests: number;
  openPullRequests: number;
  mergedPullRequests: number;
  issuesOpened: number;
  issuesClosed: number;
  repositoryCount: number;
  contributionStreak: number;
}

export interface RepositoryContribution {
  name: string;
  commits: number;
  pullRequests: number;
  issues: number;
  lastContribution: string; // ISO date string
  status: 'active' | 'archived';
}

export interface TimelineEvent {
  id: string;
  type: 'commit' | 'pull_request' | 'merge' | 'issue_open' | 'issue_close' | 'review';
  title: string;
  date: string; // ISO date string
}

export interface ContributionChartData {
  label: string; // e.g., week or month
  contributions: number;
}

export interface ContributionInsight {
  title: string;
  value: string | number;
}

export interface GitHubUser {
  username: string;
  avatarUrl?: string;
}
