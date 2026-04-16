import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDraftExam } from '../../context/DraftExamContext';
import { Colors } from '../../theme';
import type { DashboardStackParamList } from '../../types';

type Props = NativeStackScreenProps<DashboardStackParamList, 'LamThuDeThi'>;

const formatQuestionLabel = (value: string) => String(parseInt(value || '1', 10) || 1);
const formatRemainingTime = (duration: string) => `${String(parseInt(duration || '0', 10) || 0)}:00`;

export const LamThuDeThiScreen: React.FC<Props> = ({ navigation }) => {
  const { draftExam } = useDraftExam();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    const firstQuestion = draftExam.questions[0];
    if (!firstQuestion) return {};

    const correctIndex = firstQuestion.options.findIndex((option) => option.isCorrect);
    return correctIndex >= 0 ? { [firstQuestion.id]: correctIndex } : {};
  });

  const question = draftExam.questions[currentIndex];
  const selectedIndex = question ? answers[question.id] : undefined;
  const progress = useMemo(() => {
    if (draftExam.questions.length === 0) return 0;
    return (currentIndex + 1) / draftExam.questions.length;
  }, [currentIndex, draftExam.questions.length]);

  const handleSelectOption = (index: number) => {
    if (!question) return;
    setAnswers((previous) => ({ ...previous, [question.id]: index }));
  };

  const handleNext = () => {
    if (currentIndex >= draftExam.questions.length - 1) {
      navigation.goBack();
      return;
    }

    setCurrentIndex((previous) => previous + 1);
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      navigation.goBack();
      return;
    }

    setCurrentIndex((previous) => previous - 1);
  };

  if (!question) {
    return (
      <SafeAreaView style={styles.emptyContainer} edges={['top', 'bottom']}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Chưa có câu hỏi để làm thử</Text>
          <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.goBack()}>
            <Text style={styles.emptyButtonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeTop} edges={['top']}>
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>12:34</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="wifi" size={18} color="#0F172A" />
            <Ionicons name="cellular" size={18} color="#0F172A" />
            <Ionicons name="battery-half" size={18} color="#0F172A" />
          </View>
        </View>

        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View style={styles.timerPill}>
              <Ionicons name="time-outline" size={16} color="#0F172A" />
              <Text style={styles.timerText}>{formatRemainingTime(draftExam.duration)}</Text>
            </View>

            <TouchableOpacity style={styles.reportButton} activeOpacity={0.8}>
              <Ionicons name="flag-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.reportText}>Báo lỗi</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerMetaRow}>
            <Text style={styles.headerMetaText}>Câu {formatQuestionLabel(question.num)}</Text>
            <Text style={styles.headerMetaText}>{draftExam.questions.length} câu</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subjectPill}>
          <Text style={styles.subjectPillText}>{draftExam.subject}</Text>
        </View>

        <Text style={styles.questionText}>{question.content}</Text>

        <View style={styles.divider} />

        <View style={styles.optionsList}>
          {question.options.map((option, index) => {
            const isSelected = selectedIndex === index;

            return (
              <TouchableOpacity
                key={option.letter}
                activeOpacity={0.9}
                onPress={() => handleSelectOption(index)}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
              >
                <View style={[styles.optionLetter, isSelected && styles.optionLetterSelected]}>
                  <Text
                    style={[styles.optionLetterText, isSelected && styles.optionLetterTextSelected]}
                  >
                    {option.letter}
                  </Text>
                </View>

                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option.text}
                </Text>

                {isSelected ? (
                  <Ionicons name="checkmark-circle-outline" size={22} color="#22C55E" />
                ) : (
                  <View style={styles.optionPlaceholder} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <SafeAreaView style={styles.footerSafe} edges={['bottom']}>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={18} color="#475569" />
            <Text style={styles.secondaryButtonText}>Quay lại</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>
              {currentIndex === draftExam.questions.length - 1 ? 'Kết thúc' : 'Câu tiếp theo'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeTop: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  statusBar: {
    height: 50,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusTime: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#000000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  timerText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.35,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  reportText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  headerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerMetaText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 999,
    shadowColor: 'rgba(33,196,93,0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
    minHeight: 640,
  },
  subjectPill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryBg,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    borderRadius: 6,
    paddingHorizontal: 13,
    paddingVertical: 5,
    marginBottom: 22,
  },
  subjectPillText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '800',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  questionText: {
    fontSize: 20,
    lineHeight: 33,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 30,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginBottom: 24,
  },
  optionsList: {
    gap: 14,
  },
  optionCard: {
    minHeight: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: 'rgba(15,23,42,0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  optionCardSelected: {
    backgroundColor: 'rgba(240,253,244,0.5)',
    borderColor: '#22C55E',
    shadowColor: 'rgba(34,197,94,0.14)',
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterSelected: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  optionLetterText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  optionLetterTextSelected: {
    color: Colors.white,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#334155',
  },
  optionTextSelected: {
    color: Colors.textPrimary,
  },
  optionPlaceholder: {
    width: 22,
    height: 22,
  },
  footerSafe: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#475569',
  },
  primaryButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: 'rgba(34,197,94,0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    maxWidth: 98,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.screenBg,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  emptyTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyButton: {
    minWidth: 140,
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.white,
  },
});
