// src/services/mockGitHubService.ts

export interface ContributionStats {
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

export interface WeeklyContribution {
  week: string; // e.g., "2024-09-01"
  contributions: number;
}

export interface RepoInfo {
  name: string;
  commits: number;
  pullRequests: number;
  issues: number;
  lastContribution: string; // date string
  status: 'active' | 'archived';
}

export const getMockStats = (): ContributionStats => ({
  totalContributions: 1245,
  commits: 800,
  pullRequests: 200,
  openPullRequests: 15,
  mergedPullRequests: 180,
  issuesOpened: 90,
  issuesClosed: 85,
  repositoryCount: 12,
  contributionStreak: 7,
});

export const getWeeklyContributions = (): WeeklyContribution[] => [
  { week: '2024-08-01', contributions: 30 },
  { week: '2024-08-08', contributions: 45 },
  { week: '2024-08-15', contributions: 20 },
  { week: '2024-08-22', contributions: 55 },
  { week: '2024-08-29', contributions: 40 },
];

export const getRepoData = (): RepoInfo[] => [
  {
    name: 'proj-alpha',
    commits: 150,
    pullRequests: 30,
    issues: 10,
    lastContribution: '2024-08-30',
    status: 'active',
  },
  {
    name: 'beta-lib',
    commits: 300,
    pullRequests: 70,
    issues: 20,
    lastContribution: '2024-08-28',
    status: 'active',
  },
  {
    name: 'legacy-gamma',
    commits: 50,
    pullRequests: 5,
    issues: 2,
    lastContribution: '2023-12-15',
    status: 'archived',
  },
];
