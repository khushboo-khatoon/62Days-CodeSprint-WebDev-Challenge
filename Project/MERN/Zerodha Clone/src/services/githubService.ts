// src/services/githubService.ts

import {
  ContributionSummary,
  RepositoryContribution,
  TimelineEvent,
  ContributionChartData,
  ContributionInsight,
} from '../types/github';
import {
  getMockStats,
  getRepoData,
  getWeeklyContributions,
} from './mockGitHubService';

// In a real implementation these would call the GitHub API.
// For now we forward the mock data.

export const getContributionSummary = async (): Promise<ContributionSummary> => {
  // Simulate async delay
  await new Promise((res) => setTimeout(res, 300));
  const data = getMockStats();
  return {
    totalContributions: data.totalContributions,
    commits: data.commits,
    pullRequests: data.pullRequests,
    openPullRequests: data.openPullRequests,
    mergedPullRequests: data.mergedPullRequests,
    issuesOpened: data.issuesOpened,
    issuesClosed: data.issuesClosed,
    repositoryCount: data.repositoryCount,
    contributionStreak: data.contributionStreak,
  };
};

export const getRepositories = async (): Promise<RepositoryContribution[]> => {
  await new Promise((res) => setTimeout(res, 300));
  return getRepoData();
};

export const getWeeklyContributions = async (): Promise<ContributionChartData[]> => {
  await new Promise((res) => setTimeout(res, 300));
  return getWeeklyContributions();
};

// Placeholder for monthly contributions – reuse weekly for mock
export const getMonthlyContributions = async (): Promise<ContributionChartData[]> => {
  await new Promise((res) => setTimeout(res, 300));
  return getWeeklyContributions();
};

export const getActivityTimeline = async (): Promise<TimelineEvent[]> => {
  await new Promise((res) => setTimeout(res, 300));
  // Generate mock timeline events based on mock data
  return [
    {
      id: '1',
      type: 'commit',
      title: 'Fixed bug in dashboard UI',
      date: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'pull_request',
      title: 'Add contribution dashboard feature',
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      type: 'issue_open',
      title: 'Documentation update needed',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
  ];
};

export const getContributionInsights = async (): Promise<ContributionInsight[]> => {
  await new Promise((res) => setTimeout(res, 300));
  // Mock insights derived from mock stats
  const stats = getMockStats();
  return [
    { title: 'Best Contribution Day', value: 'Tuesday' },
    { title: 'Longest Streak', value: `${stats.contributionStreak} days` },
    { title: 'Merge Success Rate', value: `${((stats.mergedPullRequests / stats.pullRequests) * 100).toFixed(0)}%` },
    { title: 'Most Active Repository', value: 'beta-lib' },
    { title: 'Average Weekly Contributions', value: `${Math.round(stats.totalContributions / 4)}` },
    { title: 'Monthly Growth', value: '+12%' },
  ];
};
