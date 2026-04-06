import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'HocSinhLamBai'>;
}

const QUESTIONS = [
  {
    id: '1',
    content: 'Giải phương trình x² - 5x + 6 = 0',
    options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = -6'],
  },
  {
    id: '2',
    content: 'Tìm tổng các nghiệm của phương trình x² - 3x + 2 = 0',
    options: ['1', '2', '3', '4'],
  },
  {
    id: '3',
    content: 'Phương trình x² + 1 = 0 có nghiệm là?',
    options: ['x = 1', 'x = -1', 'Không có nghiệm thực', 'x = ±1'],
  },
  {
    id: '4',
    content: 'Cho phương trình 2x² - 4x - 6 = 0. Tìm tích các nghiệm.',
    options: ['-3', '-6', '3', '6'],
  },
];

export const HocSinhLamBaiScreen: React.FC<Props> = ({ navigation, route }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);

  const selectAnswer = (qId: string, idx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
  };

  const handleSubmit = () => {
    navigation.navigate('KetQuaBaiThi', { examId: route.params?.examId || '1' });
  };

  const currentQuestion = QUESTIONS[currentQ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Toán học - HKI</Text>
        <Ionicons name="help-circle-outline" size={24} color={Colors.textPrimary} />
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          {/* Progress fill width calculated inline to avoid TS type mismatch */}
          <View
            style={{ width: `${Math.round(((currentQ + 1) / QUESTIONS.length) * 100)}%`, height: '100%', backgroundColor: Colors.primary, borderRadius: 3 }}
          />
        </View>
        <Text style={styles.progressText}>{currentQ + 1} / {QUESTIONS.length}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Question */}
        <View style={styles.questionSection}>
          <Text style={styles.questionText}>{currentQuestion.content}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsSection}>
          {currentQuestion.options.map((opt, i) => {
            const isSelected = answers[currentQuestion.id] === i;
            return (
              <TouchableOpacity
                key={i}
                style={isSelected ? styles.optionCardSelected : styles.optionCard}
                onPress={() => selectAnswer(currentQuestion.id, i)}
              >
                <View style={isSelected ? styles.optionLetterSelected : styles.optionLetter}>
                  <Text style={isSelected ? styles.optionLetterTextSelected : styles.optionLetterTextDefault}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={isSelected ? styles.optionTextSelected : styles.optionText}>
                  {opt}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Navigation */}
        <View style={styles.navSection}>
          <TouchableOpacity
            style={currentQ === 0 ? styles.navBtnDisabled : styles.navBtn}
            disabled={currentQ === 0}
            onPress={() => setCurrentQ((q) => q - 1)}
          >
            <Ionicons name="chevron-back" size={20} color={currentQ === 0 ? Colors.gray30 : Colors.primary} />
            <Text style={currentQ === 0 ? styles.navBtnTextDisabled : styles.navBtnText}>Câu trước</Text>
          </TouchableOpacity>

          {currentQ < QUESTIONS.length - 1 ? (
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => setCurrentQ((q) => q + 1)}
            >
              <Text style={styles.navBtnText}>Câu tiếp</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Nộp bài</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Question navigator dots */}
        <View style={styles.dotsSection}>
          {QUESTIONS.map((q, i) => {
            const isActive = i === currentQ;
            const isAnswered = answers[q.id] !== undefined;
            let dotStyle: StyleProp<ViewStyle> = styles.dot;
            if (isActive) dotStyle = styles.dotActive;
            else if (isAnswered) dotStyle = styles.dotAnswered;
            return (
              <TouchableOpacity
                key={q.id}
                style={dotStyle}
                onPress={() => setCurrentQ(i)}
              />
            );
          })}
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray20,
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  progressSection: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  progressBar: { flex: 1, height: 6, backgroundColor: Colors.gray20, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  progressText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  questionSection: { padding: 20, paddingBottom: 8 },
  questionText: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary, lineHeight: 28 },
  optionsSection: { padding: 20, paddingTop: 8 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.gray30,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  optionCardSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  optionLetter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.gray20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetterSelected: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetterTextDefault: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary },
  optionLetterTextSelected: { fontSize: 13, fontWeight: '700', color: Colors.white },
  optionText: { flex: 1, fontSize: 15, color: Colors.textPrimary },
  optionTextSelected: { flex: 1, fontSize: 15, color: Colors.primary, fontWeight: '600' },
  navSection: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', marginTop: 8 },
  navBtn: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 4 },
  navBtnDisabled: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 4, opacity: 0.5 },
  navBtnText: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
  navBtnTextDisabled: { fontSize: 14, color: Colors.gray30, fontWeight: '600' },
  submitBtn: { backgroundColor: Colors.primary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  submitBtnText: { fontSize: 14, color: Colors.white, fontWeight: '700' },
  dotsSection: { flexDirection: 'row', justifyContent: 'center', gap: 8, padding: 20 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.gray30 },
  dotActive: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.primary },
  dotAnswered: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.success },
});
