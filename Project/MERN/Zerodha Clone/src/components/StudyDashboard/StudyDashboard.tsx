import React, { useEffect, useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { studyPlannerService } from '../../services/studyPlannerService';
import { StudyPlan, RevisionSession, Subject, Exam } from '../../types/study';
import SubjectCard from './SubjectCard';
import ExamCard from './ExamCard';
import StudyPlanComponent from './StudyPlan';
import RevisionPlanner from './RevisionPlanner';
import ProductivityInsights from './ProductivityInsights';
import ProgressChart from './ProgressChart';
import SubjectProgressTable from './SubjectProgressTable';
import CalendarView from './CalendarView';
import AIRecommendations from './AIRecommendations';

const StudyDashboard: React.FC = () => {
  const { subjects, exams } = useStudy();
  const [todayPlan, setTodayPlan] = useState<StudyPlan | null>(null);
  const [revisionSessions, setRevisionSessions] = useState<RevisionSession[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const plan = studyPlannerService.generateDailyPlan(today, subjects, exams);
    setTodayPlan(plan);
    const revisions = studyPlannerService.generateRevisionSessions(subjects, exams);
    setRevisionSessions(revisions);
  }, [subjects, exams]);

  return (
    <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Study Planner Dashboard</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Subjects</p>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{subjects.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming Exams</p>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{exams.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed Topics</p>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {subjects.reduce((sum, s) => sum + s.completedTopics, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Remaining Topics</p>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {subjects.reduce((sum, s) => sum + (s.totalTopics - s.completedTopics), 0)}
          </p>
        </div>
      </div>

      {/* Subject & Exam Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">Subjects</h2>
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">Exams</h2>
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>

      {/* Study Plan */}
      <div>
        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mt-6 mb-2">Today's Study Plan</h2>
        {todayPlan && <StudyPlanComponent plan={todayPlan} subjects={subjects} />}
      </div>

      {/* Revision Planner */}
      <div>
        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mt-6 mb-2">Revision Sessions</h2>
        <RevisionPlanner sessions={revisionSessions} subjects={subjects} />
      </div>

      {/* Productivity Insights */}
      <div>
        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mt-6 mb-2">Productivity Insights</h2>
        <ProductivityInsights />
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <ProgressChart />
        <SubjectProgressTable subjects={subjects} />
      </div>

      {/* Calendar View */}
      <div className="mt-6">
        <CalendarView />
      </div>

      {/* AI Recommendations */}
      <div className="mt-6">
        <AIRecommendations />
      </div>
    </div>
  );
};

export default StudyDashboard;
