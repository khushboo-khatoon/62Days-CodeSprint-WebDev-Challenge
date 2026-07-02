import React, { useEffect } from 'react';
import { useTeam } from '../context/TeamContext';
import TeamDashboard from '../components/TeamFormation/TeamDashboard';

const TeamFormationPage: React.FC = () => {
  const { loadTeams, loadAnalytics } = useTeam();

  useEffect(() => {
    loadTeams();
    loadAnalytics();
  }, []);

  return (
    <div className="p-6">
      <TeamDashboard />
    </div>
  );
};

export default TeamFormationPage;
