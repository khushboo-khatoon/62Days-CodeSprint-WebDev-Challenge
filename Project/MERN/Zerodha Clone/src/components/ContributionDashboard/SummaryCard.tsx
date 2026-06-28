// src/components/ContributionDashboard/SummaryCard.tsx
import React from 'react';

interface SummaryCardProps {
  title: string;
  value: number | string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => {
  return (
    <div className="bg-card dark:bg-card-dark rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <h3 className="text-2xl font-semibold text-foreground">{value}</h3>
    </div>
  );
};
