import React from 'react';
import { Team } from '../../types/team';
import SkillTag from './SkillTag';

interface TeamCardProps {
  team: Team;
  onJoin?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onJoin }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{team.name}</h3>
      <p className="text-sm text-gray-600 mb-2">Hackathon: {team.hackathon}</p>
      <div className="flex flex-wrap gap-1 mb-2">
        {team.requiredSkills.map((skill) => (
          <SkillTag key={skill} label={skill} />
        ))}
      </div>
      <p className="text-sm text-gray-500 mb-2">
        Open Roles: {team.openRoles.join(', ')}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Members ({team.members.length}/{team.size})
      </p>
      <button
        onClick={onJoin}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        aria-label="Join team"
      >
        Join
      </button>
    </div>
  );
};

export default TeamCard;
