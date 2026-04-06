// Navigation & data types for Flazers app

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  MainTabs: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  DashboardTab: undefined;
  KhoDeTab: undefined;
  LopHocTab: undefined;
  ThongKeTab: undefined;
  CaiDatTab: undefined;
};

export type DashboardStackParamList = {
  Dashboard: undefined;
  KhoDeDetail: { tab?: 'open' | 'draft' | 'closed' };
  TaoDeThi: undefined;
  TaoDeThiChiTiet: undefined;
  PhatDe: { examId: string };
  ThietLapDeThi: { examId?: string };
  TaoDeThuCong: undefined;
  SoanThaoCauHoi: { examId?: string };
  ThemCauHoi: { examId?: string; questionId?: string };
  ChinhSuaCauHoi: { examId: string; questionId: string };
  AIGenerator: undefined;
  AILoading: undefined;
  Splash: undefined;
  ThongKe: undefined;
  LopHocDetail: { classId: string };
  HocSinhLamBai: { examId: string };
  KetQuaBaiThi: { examId: string };
  MainTabs: undefined;
};

export interface Exam {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: number; // minutes
  status: 'open' | 'draft' | 'closed';
  questionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  name: string;
  studentCount: number;
  examCount: number;
  createdAt: string;
}

export interface Question {
  id: string;
  content: string;
  type: 'multiple_choice' | 'essay' | 'true_false';
  options?: string[];
  correctAnswer?: number | string;
  points: number;
  examId: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  classId: string;
  avatar?: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  score: number;
  totalPoints: number;
  submittedAt: string;
  status: 'completed' | 'pending';
}
