import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Team, JoinRequest, Message, AnalyticsData } from '../types/team';
import { fetchTeams as fetchTeamsService, createTeam as createTeamService, sendJoinRequest as sendJoinRequestService, updateJoinRequestStatus as updateJoinRequestStatusService, fetchMessages as fetchMessagesService, sendMessage as sendMessageService, fetchAnalytics as fetchAnalyticsService, getRecommendedTeams as getRecommendedTeamsService } from '../services/teamService';

interface TeamContextProps {
  teams: Team[];
  joinRequests: JoinRequest[];
  messages: Message[];
  analytics: AnalyticsData | null;
  loadTeams: () => Promise<void>;
  createTeam: (team: Omit<Team, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  requestToJoin: (teamId: string, userId: string) => Promise<void>;
  changeJoinRequestStatus: (requestId: string, status: JoinRequest['status']) => Promise<void>;
  loadMessages: (teamId: string) => Promise<void>;
  postMessage: (teamId: string, content: string, senderId: string) => Promise<void>;
  loadAnalytics: () => Promise<void>;
  getRecommendedTeams: (userId: string) => Promise<Array<{ team: Team; score: number }>>;
}

const TeamContext = createContext<TeamContextProps | undefined>(undefined);

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const loadTeams = async () => {
    const data = await fetchTeamsService();
    setTeams(data);
  };

  const createTeam = async (team: Omit<Team, 'id' | 'createdAt' | 'status'>) => {
    const newTeam = await createTeamService(team);
    setTeams((prev) => [...prev, newTeam]);
  };

  const requestToJoin = async (teamId: string, userId: string) => {
    const req = await sendJoinRequestService(teamId, userId);
    setJoinRequests((prev) => [...prev, req]);
  };

  const changeJoinRequestStatus = async (requestId: string, status: JoinRequest['status']) => {
    const updated = await updateJoinRequestStatusService(requestId, status);
    setJoinRequests((prev) => prev.map((r) => (r.id === requestId ? updated : r)));
  };

  const loadMessages = async (teamId: string) => {
    const msgs = await fetchMessagesService(teamId);
    setMessages(msgs);
  };

  const postMessage = async (teamId: string, content: string, senderId: string) => {
    const msg = await sendMessageService(teamId, content, senderId);
    setMessages((prev) => [...prev, msg]);
  };

  const getRecommendedTeams = async (userId: string) => {
    const recoms = await getRecommendedTeamsService(userId);
    return recoms;
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        joinRequests,
        messages,
        analytics,
        loadTeams,
        createTeam,
        requestToJoin,
        changeJoinRequestStatus,
        loadMessages,
        postMessage,
        loadAnalytics,
        getRecommendedTeams,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};
