import { Team, JoinRequest, Message, AnalyticsData } from '../types/team';

// Simple deterministic mock data
const mockUsers: Team['members'] = [
  {
    id: 'u1',
    name: 'Alice',
    avatar: '',
    bio: 'Full‑stack dev',
    experience: 3,
    skills: ['React', 'Node', 'GraphQL'],
    preferredRole: 'Frontend',
    lookingFor: ['Backend'],
    timezone: 'IST',
    availability: 'Evenings',
    interests: ['AI', 'FinTech'],
    github: 'aliceGH',
    portfolio: 'alice.io',
  },
  {
    id: 'u2',
    name: 'Bob',
    avatar: '',
    bio: 'Backend engineer',
    experience: 4,
    skills: ['Node', 'Express', 'MongoDB'],
    preferredRole: 'Backend',
    lookingFor: ['Frontend'],
    timezone: 'UTC',
    availability: 'Weekends',
    interests: ['FinTech'],
    github: 'bobGH',
    portfolio: 'bob.dev',
  },
];

let teamIdCounter = 1;
let requestIdCounter = 1;
let messageIdCounter = 1;

let teams: Team[] = [
  {
    id: 't1',
    name: 'FinTech Avengers',
    hackathon: 'Hackathon 2023',
    members: [mockUsers[0]],
    openRoles: ['Backend'],
    requiredSkills: ['Node', 'Express'],
    size: 5,
    status: 'Open',
    createdAt: new Date().toISOString(),
  },
];

let joinRequests: JoinRequest[] = [];
let messages: Message[] = [];
let analytics: AnalyticsData = {
  membersBySkill: { React: 1, Node: 2, Express: 1, MongoDB: 1 },
  popularTech: { React: 1, Node: 2 },
  teamCompletion: { completed: 0, total: 1 },
  participationHistory: [],
  matchScoreDistribution: { 0: 0, 20: 0, 40: 0, 60: 0, 80: 0, 100: 0 },
};

/** Weighted random scoring based on skill overlap */
function computeMatchScore(userId: string, team: Team): number {
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) return 0;
  const overlap = user.skills.filter((s) => team.requiredSkills.includes(s)).length;
  const weight = team.requiredSkills.length || 1;
  // Base score 30, plus weighted overlap (0‑70)
  const score = 30 + Math.min(70, (overlap / weight) * 70);
  return Math.round(score);
}

export const fetchTeams = async (): Promise<Team[]> => {
  // Simulate async delay
  await new Promise((res) => setTimeout(res, 100));
  return [...teams];
};

export const createTeam = async (teamData: Omit<Team, 'id' | 'createdAt' | 'status'>): Promise<Team> => {
  const newTeam: Team = {
    ...teamData,
    id: `t${teamIdCounter++}`,
    status: 'Open',
    createdAt: new Date().toISOString(),
  };
  teams.push(newTeam);
  return newTeam;
};

export const sendJoinRequest = async (teamId: string, userId: string): Promise<JoinRequest> => {
  const newReq: JoinRequest = {
    id: `r${requestIdCounter++}`,
    teamId,
    userId,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  joinRequests.push(newReq);
  return newReq;
};

export const updateJoinRequestStatus = async (requestId: string, status: JoinRequest['status']): Promise<JoinRequest> => {
  const req = joinRequests.find((r) => r.id === requestId);
  if (!req) throw new Error('Request not found');
  req.status = status;
  return { ...req };
};

export const fetchMessages = async (teamId: string): Promise<Message[]> => {
  return messages.filter((m) => m.teamId === teamId);
};

export const sendMessage = async (teamId: string, content: string, senderId: string): Promise<Message> => {
  const msg: Message = {
    id: `m${messageIdCounter++}`,
    teamId,
    senderId,
    content,
    timestamp: new Date().toISOString(),
    read: false,
  };
  messages.push(msg);
  return msg;
};

export const fetchAnalytics = async (): Promise<AnalyticsData> => {
  return { ...analytics };
};

export const getRecommendedTeams = async (userId: string): Promise<Array<{ team: Team; score: number }>> => {
  const recoms = teams.map((team) => ({ team, score: computeMatchScore(userId, team) }));
  // Sort descending by score
  recoms.sort((a, b) => b.score - a.score);
  return recoms;
};
