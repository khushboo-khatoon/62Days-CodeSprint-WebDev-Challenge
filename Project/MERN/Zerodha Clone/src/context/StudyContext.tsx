import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Subject, Exam } from '../types/study';

interface StudyContextProps {
  subjects: Subject[];
  exams: Exam[];
  addSubject: (subject: Subject) => void;
  editSubject: (subject: Subject) => void;
  removeSubject: (id: string) => void;
  addExam: (exam: Exam) => void;
  editExam: (exam: Exam) => void;
  removeExam: (id: string) => void;
}

const StudyContext = createContext<StudyContextProps | undefined>(undefined);

export const StudyProvider = ({ children }: { children: ReactNode }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);

  const addSubject = (subject: Subject) => setSubjects((prev) => [...prev, subject]);
  const editSubject = (subject: Subject) =>
    setSubjects((prev) => prev.map((s) => (s.id === subject.id ? subject : s)));
  const removeSubject = (id: string) => setSubjects((prev) => prev.filter((s) => s.id !== id));

  const addExam = (exam: Exam) => setExams((prev) => [...prev, exam]);
  const editExam = (exam: Exam) =>
    setExams((prev) => prev.map((e) => (e.id === exam.id ? exam : e)));
  const removeExam = (id: string) => setExams((prev) => prev.filter((e) => e.id !== id));

  return (
    <StudyContext.Provider
      value={{ subjects, exams, addSubject, editSubject, removeSubject, addExam, editExam, removeExam }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
