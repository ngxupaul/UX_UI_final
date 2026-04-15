export type AppRole = "admin" | "teacher" | "student";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AppRole;
  school: string;
  title: string;
  classIds: string[];
}

export interface MockClass {
  id: string;
  name: string;
  teacherId: string;
  studentIds: string[];
}

export interface MockExam {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: number;
  status: "open" | "draft" | "closed";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  classIds: string[];
  assignedStudentIds: string[];
  questionCount: number;
  aiBadge?: boolean;
}

export interface MockQuestion {
  id: string;
  examId: string;
  subject: string;
  content: string;
  options: string[];
  correctIndex: number;
  hasArtwork?: boolean;
}

export interface MockResult {
  id: string;
  examId: string;
  studentId: string;
  score: number;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  submittedAt: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "admin-1",
    name: "Nguyễn Văn Admin",
    email: "admin@flazers.vn",
    password: "admin123",
    role: "admin",
    school: "Phòng Giáo dục Quận 3",
    title: "Quản trị viên hệ thống",
    classIds: ["class-10a1", "class-10a2", "class-11a1"],
  },
  {
    id: "teacher-1",
    name: "Nguyễn Thị Mai",
    email: "giaovien@flazers.vn",
    password: "teacher123",
    role: "teacher",
    school: "THPT Chuyên Lê Hồng Phong",
    title: "Giáo viên",
    classIds: ["class-10a1", "class-10a2", "class-11a1"],
  },
  {
    id: "student-1",
    name: "Lê Minh Học Sinh",
    email: "hocsinh@flazers.vn",
    password: "student123",
    role: "student",
    school: "THPT Chuyên Lê Hồng Phong",
    title: "Học sinh lớp 10A1",
    classIds: ["class-10a1"],
  },
  {
    id: "student-2",
    name: "Trần Thị Bích Ngọc",
    email: "bichngoc@flazers.vn",
    password: "student123",
    role: "student",
    school: "THPT Chuyên Lê Hồng Phong",
    title: "Học sinh lớp 10A1",
    classIds: ["class-10a1"],
  },
  {
    id: "student-3",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@flazers.vn",
    password: "student123",
    role: "student",
    school: "THPT Chuyên Lê Hồng Phong",
    title: "Học sinh lớp 10A2",
    classIds: ["class-10a2"],
  },
];

export const MOCK_CLASSES: MockClass[] = [
  {
    id: "class-10a1",
    name: "Lớp 10A1",
    teacherId: "teacher-1",
    studentIds: ["student-1", "student-2"],
  },
  {
    id: "class-10a2",
    name: "Lớp 10A2",
    teacherId: "teacher-1",
    studentIds: ["student-3"],
  },
  {
    id: "class-11a1",
    name: "Lớp 11A1",
    teacherId: "teacher-1",
    studentIds: [],
  },
];

export const MOCK_EXAMS: MockExam[] = [
  {
    id: "exam-1",
    title: "Bài thi Vật lý dao động",
    subject: "Vật lý 12",
    grade: "12",
    duration: 15,
    status: "open",
    createdAt: "20/10/2025",
    updatedAt: "20/10/2025",
    createdBy: "teacher-1",
    classIds: ["class-10a1"],
    assignedStudentIds: ["student-1", "student-2"],
    questionCount: 4,
  },
  {
    id: "exam-2",
    title: "Kiểm tra Địa lý cuối tuần",
    subject: "Địa lý 6",
    grade: "6",
    duration: 20,
    status: "open",
    createdAt: "22/10/2025",
    updatedAt: "22/10/2025",
    createdBy: "teacher-1",
    classIds: ["class-10a1", "class-10a2"],
    assignedStudentIds: ["student-1", "student-2", "student-3"],
    questionCount: 4,
  },
  {
    id: "exam-3",
    title: "Đề thi Hóa học giữa kỳ I",
    subject: "Hóa học 10",
    grade: "10",
    duration: 45,
    status: "draft",
    createdAt: "15/10/2025",
    updatedAt: "15/10/2025",
    createdBy: "teacher-1",
    classIds: ["class-10a2"],
    assignedStudentIds: ["student-3"],
    questionCount: 6,
    aiBadge: true,
  },
  {
    id: "exam-4",
    title: "Ôn tập Ngữ văn hiện đại",
    subject: "Ngữ văn 11",
    grade: "11",
    duration: 60,
    status: "closed",
    createdAt: "10/10/2025",
    updatedAt: "10/10/2025",
    createdBy: "teacher-1",
    classIds: ["class-11a1"],
    assignedStudentIds: [],
    questionCount: 5,
  },
];

export const MOCK_QUESTIONS: MockQuestion[] = [
  {
    id: "q-1",
    examId: "exam-1",
    subject: "Vật lý 12",
    content:
      "Một vật dao động điều hòa với tần số góc ω = 10 rad/s. Tại thời điểm t=0, vật đi qua vị trí cân bằng theo chiều dương. Phương trình dao động của vật là gì?",
    options: [
      "x = 10cos(10t - π/2) cm",
      "x = 5cos(10t + π/2) cm",
      "x = 10cos(10t + π) cm",
      "x = 5cos(10t) cm",
    ],
    correctIndex: 0,
    hasArtwork: true,
  },
  {
    id: "q-2",
    examId: "exam-1",
    subject: "Địa lý 6",
    content: "Đảo lớn nhất Việt Nam là đảo nào?",
    options: ["Cát Bà", "Phú Quốc", "Lý Sơn", "Cồn Cỏ"],
    correctIndex: 1,
  },
  {
    id: "q-3",
    examId: "exam-1",
    subject: "Hóa học 10",
    content: "Công thức hóa học của nước là gì?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctIndex: 1,
  },
  {
    id: "q-4",
    examId: "exam-1",
    subject: "Ngữ văn 11",
    content: "Tác giả của tác phẩm 'Lão Hạc' là ai?",
    options: ["Nam Cao", "Tô Hoài", "Nguyễn Du", "Xuân Diệu"],
    correctIndex: 0,
  },
];

export const MOCK_RESULTS: MockResult[] = [
  {
    id: "result-1",
    examId: "exam-1",
    studentId: "student-1",
    score: 8,
    total: 10,
    correct: 4,
    wrong: 1,
    skipped: 0,
    submittedAt: "09:15 AM",
  },
  {
    id: "result-2",
    examId: "exam-1",
    studentId: "student-2",
    score: 9.5,
    total: 10,
    correct: 5,
    wrong: 0,
    skipped: 0,
    submittedAt: "09:10 AM",
  },
  {
    id: "result-3",
    examId: "exam-2",
    studentId: "student-3",
    score: 7.5,
    total: 10,
    correct: 3,
    wrong: 1,
    skipped: 1,
    submittedAt: "10:05 AM",
  },
];

export const getUserByRole = (role: AppRole) =>
  MOCK_USERS.find((user) => user.role === role);

export const getUserByEmail = (email: string) =>
  MOCK_USERS.find((user) => user.email.toLowerCase() === email.toLowerCase());

export const getClassesForUser = (userId: string) =>
  MOCK_CLASSES.filter(
    (item) => item.teacherId === userId || item.studentIds.includes(userId)
  );

export const getTeacherExams = (userId: string) =>
  MOCK_EXAMS.filter((exam) => exam.createdBy === userId);

export const getStudentExams = (userId: string) =>
  MOCK_EXAMS.filter((exam) => exam.assignedStudentIds.includes(userId));

export const getExamById = (examId: string) =>
  MOCK_EXAMS.find((exam) => exam.id === examId);

export const getQuestionsForExam = (examId: string) =>
  MOCK_QUESTIONS.filter((question) => question.examId === examId);

export const getResultForStudentExam = (studentId: string, examId: string) =>
  MOCK_RESULTS.find(
    (result) => result.studentId === studentId && result.examId === examId
  );

export const getResultsForStudent = (studentId: string) =>
  MOCK_RESULTS.filter((result) => result.studentId === studentId);

export const getResultsForTeacher = (teacherId: string) => {
  const examIds = new Set(getTeacherExams(teacherId).map((exam) => exam.id));
  return MOCK_RESULTS.filter((result) => examIds.has(result.examId));
};
