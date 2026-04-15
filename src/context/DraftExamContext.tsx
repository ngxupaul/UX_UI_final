import React, { createContext, useContext, useMemo, useState } from 'react';

export type DraftOption = {
  letter: string;
  text: string;
  isCorrect: boolean;
};

export type DraftQuestion = {
  id: string;
  num: string;
  type: string;
  difficulty: string;
  points: string;
  content: string;
  answer: string;
  explanation: string;
  options: DraftOption[];
};

type DraftExamState = {
  examId: string;
  title: string;
  subject: string;
  duration: string;
  questions: DraftQuestion[];
};

type DraftExamContextValue = {
  draftExam: DraftExamState;
  updateExamInfo: (payload: Partial<Pick<DraftExamState, 'title' | 'subject' | 'duration'>>) => void;
  addQuestion: (question: Omit<DraftQuestion, 'id' | 'num' | 'answer'>) => void;
  updateQuestion: (questionId: string, payload: Partial<Omit<DraftQuestion, 'id' | 'num'>>) => void;
  deleteQuestion: (questionId: string) => void;
  getQuestionById: (questionId?: string) => DraftQuestion | undefined;
};

const INITIAL_QUESTIONS: DraftQuestion[] = [
  {
    id: 'q-1',
    num: '01',
    type: 'Trắc nghiệm',
    difficulty: 'Dễ',
    points: '2.0 điểm',
    content: 'Việt Nam nằm ở phía nào của bán đảo Đông Dương?',
    answer: 'Phía Đông',
    explanation:
      'Việt Nam nằm ở rìa phía đông của bán đảo Đông Dương, tiếp giáp Biển Đông và tạo thành dải lãnh thổ kéo dài theo hướng bắc nam.',
    options: [
      { letter: 'A', text: 'Phía Đông', isCorrect: true },
      { letter: 'B', text: 'Phía Nam', isCorrect: false },
      { letter: 'C', text: 'Phía Bắc', isCorrect: false },
      { letter: 'D', text: 'Phía Tây', isCorrect: false },
    ],
  },
  {
    id: 'q-2',
    num: '02',
    type: 'Trắc nghiệm',
    difficulty: 'Dễ',
    points: '2.0 điểm',
    content: 'Đảo lớn nhất Việt Nam là đảo nào?',
    answer: 'Phú Quốc',
    explanation:
      'Phú Quốc là đảo lớn nhất của Việt Nam, nằm trong vịnh Thái Lan và thuộc tỉnh Kiên Giang.',
    options: [
      { letter: 'A', text: 'Cát Bà', isCorrect: false },
      { letter: 'B', text: 'Phú Quốc', isCorrect: true },
      { letter: 'C', text: 'Lý Sơn', isCorrect: false },
      { letter: 'D', text: 'Cồn Cỏ', isCorrect: false },
    ],
  },
  {
    id: 'q-3',
    num: '03',
    type: 'Trắc nghiệm',
    difficulty: 'Dễ',
    points: '2.0 điểm',
    content: 'Loại đá nào được hình thành từ xác động vật?',
    answer: 'Đá vôi',
    explanation:
      'Đá vôi được hình thành chủ yếu từ xác sinh vật biển như san hô, vỏ sò và các loại sinh vật có chứa canxi cacbonat.',
    options: [
      { letter: 'A', text: 'Đá vôi', isCorrect: true },
      { letter: 'B', text: 'Đá granit', isCorrect: false },
      { letter: 'C', text: 'Đá bazan', isCorrect: false },
      { letter: 'D', text: 'Đá phiến', isCorrect: false },
    ],
  },
  {
    id: 'q-4',
    num: '04',
    type: 'Trắc nghiệm',
    difficulty: 'Dễ',
    points: '2.0 điểm',
    content:
      'So với các vùng khác về sản xuất nông nghiệp, Đồng bằng Sông Hồng là vùng có',
    answer: 'Năng suất lúa cao nhất',
    explanation:
      'Đồng bằng Sông Hồng có trình độ thâm canh cao, cơ sở hạ tầng tốt và mật độ lao động lớn nên năng suất lúa luôn ở mức cao.',
    options: [
      { letter: 'A', text: 'Diện tích lớn nhất', isCorrect: false },
      { letter: 'B', text: 'Năng suất lúa cao nhất', isCorrect: true },
      { letter: 'C', text: 'Sản lượng cà phê lớn nhất', isCorrect: false },
      { letter: 'D', text: 'Đất đỏ bazan nhiều nhất', isCorrect: false },
    ],
  },
  {
    id: 'q-5',
    num: '05',
    type: 'Trắc nghiệm',
    difficulty: 'Dễ',
    points: '2.0 điểm',
    content: 'Loại đất nào có diện tích lớn nhất Đồng bằng Sông Cửu Long?',
    answer: 'Đất phèn',
    explanation:
      'Đất phèn phân bố trên diện tích rộng ở Đồng bằng Sông Cửu Long, đặc biệt tại các vùng trũng thấp và ngập nước theo mùa.',
    options: [
      { letter: 'A', text: 'Đất đỏ bazan', isCorrect: false },
      { letter: 'B', text: 'Đất phù sa cổ', isCorrect: false },
      { letter: 'C', text: 'Đất phèn', isCorrect: true },
      { letter: 'D', text: 'Đất mùn', isCorrect: false },
    ],
  },
];

const INITIAL_STATE: DraftExamState = {
  examId: 'new',
  title: 'Kiểm tra 15 phút - Chương 1',
  subject: 'Toán',
  duration: '45',
  questions: INITIAL_QUESTIONS,
};

const DraftExamContext = createContext<DraftExamContextValue | null>(null);

const renumberQuestions = (questions: DraftQuestion[]) =>
  questions.map((question, index) => ({
    ...question,
    num: String(index + 1).padStart(2, '0'),
  }));

export const DraftExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draftExam, setDraftExam] = useState<DraftExamState>(INITIAL_STATE);

  const value = useMemo<DraftExamContextValue>(
    () => ({
      draftExam,
      updateExamInfo: (payload) => {
        setDraftExam((current) => ({ ...current, ...payload }));
      },
      addQuestion: (question) => {
        setDraftExam((current) => {
          const appended: DraftQuestion = {
            ...question,
            id: `q-${Date.now()}`,
            num: '',
            answer:
              question.options.find((option) => option.isCorrect)?.text ??
              question.options[0]?.text ??
              '',
          };
          return {
            ...current,
            questions: renumberQuestions([...current.questions, appended]),
          };
        });
      },
      updateQuestion: (questionId, payload) => {
        setDraftExam((current) => ({
          ...current,
          questions: renumberQuestions(
            current.questions.map((question) => {
              if (question.id !== questionId) return question;
              const nextQuestion = { ...question, ...payload };
              return {
                ...nextQuestion,
                answer:
                  nextQuestion.options.find((option) => option.isCorrect)?.text ??
                  nextQuestion.answer,
              };
            })
          ),
        }));
      },
      deleteQuestion: (questionId) => {
        setDraftExam((current) => ({
          ...current,
          questions: renumberQuestions(
            current.questions.filter((question) => question.id !== questionId)
          ),
        }));
      },
      getQuestionById: (questionId) =>
        draftExam.questions.find((question) => question.id === questionId),
    }),
    [draftExam]
  );

  return (
    <DraftExamContext.Provider value={value}>
      {children}
    </DraftExamContext.Provider>
  );
};

export const useDraftExam = () => {
  const context = useContext(DraftExamContext);
  if (!context) {
    throw new Error('useDraftExam must be used inside DraftExamProvider');
  }
  return context;
};
