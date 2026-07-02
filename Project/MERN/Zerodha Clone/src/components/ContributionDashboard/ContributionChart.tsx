// src/components/ContributionDashboard/ContributionChart.tsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { ContributionChartData } from "../../types/github";

interface Props {
  data: ContributionChartData[];
  title: string;
}

export const ContributionChart: React.FC<Props> = ({ data, title }) => {
  return (
    <section className="bg-card dark:bg-card-dark rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-medium mb-3 text-foreground">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="label" stroke="var(--tw-text-muted-foreground)" />
          <YAxis stroke="var(--tw-text-muted-foreground)" />
          <Tooltip />
          <Bar dataKey="contributions" fill="var(--tw-bg-primary)" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};
