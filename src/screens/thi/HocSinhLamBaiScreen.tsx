import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const QUESTIONS = [
  {
    id: '1',
    subject: 'Địa lý 6',
    questionNum: 1,
    totalQuestions: 5,
    progress: 0.8,
    content: 'Việt Nam nằm ở phía nào của bán đảo Đông Dương?',
    options: ['Phía Đông', 'Phía Nam', 'Phía Bắc', 'Phía Tây'],
    correct: 0,
  },
  {
    id: '2',
    subject: 'Địa lý 6',
    questionNum: 2,
    totalQuestions: 5,
    progress: 0.6,
    content: 'Đảo lớn nhất Việt Nam là đảo nào?',
    options: ['Cát Bà', 'Phú Quốc', 'Lý Sơn', 'Cồn Cỏ'],
    correct: 1,
  },
  {
    id: '3',
    subject: 'Địa lý 6',
    questionNum: 3,
    totalQuestions: 5,
    progress: 0.4,
    content: 'Loại đá nào được hình thành từ xác động vật?',
    options: ['Cẩm Thạch', 'Ba dan', 'Mác-ma', 'Đá vôi'],
    correct: 3,
  },
  {
    id: '4',
    subject: 'Địa lý 6',
    questionNum: 4,
    totalQuestions: 5,
    progress: 0.2,
    content: 'So với các vùng khác về sản xuất nông nghiệp, Đồng bằng Sông Hồng là vùng có:',
    options: ['Xuất khẩu nhiều nhất', 'Năng suất cao nhất', 'Bình quân lương thực cao nhất', 'Năng suất lúa cao nhất'],
    correct: 3,
  },
  {
    id: '5',
    subject: 'Địa lý 6',
    questionNum: 5,
    totalQuestions: 5,
    progress: 0,
    content: 'Loại đất nào có diện tích lớn nhất Đồng bằng Sông Cửu Long?',
    options: ['Đất phù sa ngọt', 'Đất cát ven biển', 'Đất phèn', 'Đất mặn'],
    correct: 0,
  },
];

export const HocSinhLamBaiScreen: React.FC<Props> = ({ navigation }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const q = QUESTIONS[currentQ];
  const answeredCount = Object.keys(answers).length;

  const selectAnswer = (optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) setCurrentQ((c) => c + 1);
  };
  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((c) => c - 1);
  };
  const handleSubmit = () => {
    navigation.navigate('KetQuaBaiThi', { examId: '1' });
  };

  const progressWidth = `${Math.round(q.progress * 100)}%`;

  return (
    <View style={styles.wrapper}>
      {/* Status Bar */}
      <SafeAreaView style={styles.statusBarArea} edges={['top']}>
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>14:50</Text>
          <View style={styles.statusIcons}>
            <View style={styles.wifiIcon} />
            <View style={styles.signalIcon} />
            <View style={styles.batteryIcon} />
          </View>
        </View>
      </SafeAreaView>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.examTitle}>Bài thi Địa lý</Text>
          <Text style={styles.questionCounter}>Câu {q.questionNum} / {q.totalQuestions} câu</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
        <Text style={styles.progressLabel}>{answeredCount} câu</Text>
      </View>

      {/* Subject Badge */}
      <View style={styles.subjectBadgeRow}>
        <View style={styles.subjectBadge}>
          <Text style={styles.subjectBadgeText}>{q.subject}</Text>
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{q.content}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Answer Options */}
      <View style={styles.optionsList}>
        {q.options.map((opt, i) => {
          const isSelected = answers[q.id] === i;
          const isCorrect = i === q.correct;
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.optionCard,
                isSelected && styles.optionCardSelected,
              ]}
              onPress={() => selectAnswer(i)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.optionLetter,
                  isSelected ? styles.optionLetterSelected : styles.optionLetterDefault,
                ]}
              >
                <Text
                  style={[
                    styles.optionLetterText,
                    isSelected ? styles.optionLetterTextSelected : styles.optionLetterTextDefault,
                  ]}
                >
                  {String.fromCharCode(65 + i)}
                </Text>
              </View>
              <Text
                style={[
                  styles.optionText,
                  isSelected ? styles.optionTextSelected : styles.optionTextDefault,
                ]}
              >
                {opt}
              </Text>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerBtn, styles.footerBtnOutline]}
          onPress={handlePrev}
          disabled={currentQ === 0}
        >
          <Text style={[styles.footerBtnText, styles.footerBtnTextOutline]}>Quay lại</Text>
        </TouchableOpacity>

        {currentQ < QUESTIONS.length - 1 ? (
          <TouchableOpacity style={styles.footerBtn} onPress={handleNext}>
            <Text style={styles.footerBtnText}>Câu tiếp theo</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.footerBtn} onPress={handleSubmit}>
            <Text style={styles.footerBtnText}>Nộp bài</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.white },
  statusBarArea: { backgroundColor: Colors.white },
  statusBar: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
  },
  statusTime: { fontSize: 15, fontWeight: '600', color: '#000' },
  statusIcons: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  wifiIcon: { width: 14, height: 14, backgroundColor: '#000', borderRadius: 3 },
  signalIcon: { width: 10, height: 14, backgroundColor: '#000', borderRadius: 2 },
  batteryIcon: { width: 22, height: 10, borderWidth: 1, borderColor: '#000', borderRadius: 2 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerCenter: { alignItems: 'center' },
  examTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  questionCounter: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  progressBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  progressLabel: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  subjectBadgeRow: { paddingHorizontal: 16, marginBottom: 12 },
  subjectBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  subjectBadgeText: { fontSize: 13, fontWeight: '600', color: Colors.white },
  questionCard: { paddingHorizontal: 20, marginBottom: 16 },
  questionText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 20, marginBottom: 16 },
  optionsList: { paddingHorizontal: 20, flex: 1 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  optionCardSelected: {
    backgroundColor: 'rgba(240,253,244,0.5)',
    borderColor: Colors.primary,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  optionLetterDefault: { backgroundColor: '#F1F5F9' },
  optionLetterSelected: { backgroundColor: Colors.primary },
  optionLetterText: { fontSize: 14, fontWeight: '700' },
  optionLetterTextDefault: { color: Colors.textSecondary },
  optionLetterTextSelected: { color: Colors.white },
  optionText: { flex: 1, fontSize: 15, color: Colors.textPrimary, fontWeight: '500', lineHeight: 22 },
  optionTextSelected: { color: Colors.primary, fontWeight: '600' },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  footerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    height: 48,
    borderRadius: 12,
    shadowColor: 'rgba(33,196,93,0.3)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  footerBtnOutline: { backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.gray30 },
  footerBtnText: { fontSize: 14, fontWeight: '600', color: Colors.white },
  footerBtnTextOutline: { color: Colors.textSecondary },
});