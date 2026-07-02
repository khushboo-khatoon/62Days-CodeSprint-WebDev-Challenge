export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  experience: number; // years of experience
  skills: string[];
  preferredRole: string;
  lookingFor: string[]; // roles they are looking for
  timezone: string;
  availability: string; // e.g., "Weekends", "Evenings"
  interests: string[]; // hackathon topics
  github: string;
  portfolio: string;
}

export interface Team {
  id: string;
  name: string;
  hackathon: string;
  members: UserProfile[];
  openRoles: string[]; // roles needed
  requiredSkills: string[];
  size: number; // max size
  status: 'Open' | 'In Progress' | 'Completed';
  createdAt: string; // ISO date
}

export type JoinRequestStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Cancelled';

export interface JoinRequest {
  id: string;
  teamId: string;
  userId: string;
  status: JoinRequestStatus;
  createdAt: string; // ISO date
}

export interface Message {
  id: string;
  teamId: string;
  senderId: string;
  content: string;
  timestamp: string; // ISO date
  read: boolean;
}

export interface AnalyticsData {
  membersBySkill: Record<string, number>;
  popularTech: Record<string, number>;
  teamCompletion: { completed: number; total: number };
  participationHistory: Array<{
    hackathon: string;
    year: number;
    role: string;
    teamName: string;
    result: string;
    project: string;
    technologies: string[];
  }>;
  matchScoreDistribution: Record<number, number>; // score -> count
}
