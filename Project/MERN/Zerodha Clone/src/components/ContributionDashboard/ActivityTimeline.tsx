// src/components/ContributionDashboard/ActivityTimeline.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { TimelineEvent } from '../../types/github';

interface Props {
  events: TimelineEvent[];
}

export const ActivityTimeline: React.FC<Props> = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start space-x-3"
        >
          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
          <div>
            <p className="text-sm font-medium text-foreground">{event.title}</p>
            <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleString()}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
