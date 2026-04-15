import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDraftExam } from '../../context/DraftExamContext';
import { Colors } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

type Props = NativeStackScreenProps<DashboardStackParamList, 'ChinhSuaCauHoi'>;

export const ChinhSuaCauHoiScreen: React.FC<Props> = ({ navigation, route }) => {
  const { getQuestionById, updateQuestion, deleteQuestion } = useDraftExam();
  const draftQuestion = getQuestionById(route.params.questionId);
  const [question, setQuestion] = useState(
    draftQuestion?.content ?? 'Việt Nam nằm ở phía nào của bán đảo Đông Dương?'
  );
  const [options, setOptions] = useState(
    draftQuestion?.options ?? [
      { letter: 'A', text: 'Phía Đông', isCorrect: true },
      { letter: 'B', text: 'Phía Nam', isCorrect: false },
      { letter: 'C', text: 'Phía Bắc', isCorrect: false },
      { letter: 'D', text: 'Phía Tây', isCorrect: false },
    ]
  );
  const [explanation, setExplanation] = useState(
    draftQuestion?.explanation ??
      'Số 17 chỉ có hai ước số là 1 và chính nó (17), do đó 17 là số nguyên tố. Các số còn lại: 25 chia hết cho 5; 49 chia hết cho 7; 9 chia hết cho 3.'
  );
  const canDeleteOption = options.length > 2;
  const correctAnswer = useMemo(
    () => options.find((option) => option.isCorrect)?.text ?? options[0]?.text ?? '',
    [options]
  );

  const toggleCorrect = (idx: number) => {
    setOptions(options.map((o, i) => ({ ...o, isCorrect: i === idx })));
  };

  const handleDeleteOption = (idx: number) => {
    if (!canDeleteOption) return;
    const nextOptions = options.filter((_, optionIndex) => optionIndex !== idx);
    const normalized = nextOptions.map((option, optionIndex) => ({
      ...option,
      letter: String.fromCharCode(65 + optionIndex),
    }));
    if (!normalized.some((option) => option.isCorrect) && normalized[0]) {
      normalized[0].isCorrect = true;
    }
    setOptions(normalized);
  };

  const handleAddOption = () => {
    setOptions((current) => [
      ...current,
      {
        letter: String.fromCharCode(65 + current.length),
        text: '',
        isCorrect: false,
      },
    ]);
  };

  const handleSave = () => {
    updateQuestion(route.params.questionId, {
      content: question,
      answer: correctAnswer,
      explanation,
      options,
    });
    navigation.goBack();
  };

  const handleDeleteQuestion = () => {
    deleteQuestion(route.params.questionId);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={16} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Biên soạn Câu hỏi</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveBtn}>Lưu</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Question content section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>NỘI DUNG CÂU HỎI</Text>
            <TouchableOpacity style={styles.aiRewriteBtn}>
              <Ionicons name="bulb-outline" size={14} color={Colors.primary} />
              <Text style={styles.aiRewriteText}>Viết lại với AI</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.questionArea}>
            <TextInput
              style={styles.questionInput}
              value={question}
              onChangeText={setQuestion}
              multiline
              textAlignVertical="top"
            />
            <View style={styles.toolbar}>
              <TouchableOpacity style={styles.toolBtn}><Text style={styles.toolBtnB}>B</Text></TouchableOpacity>
              <TouchableOpacity style={styles.toolBtn}><Text style={[styles.toolBtnB, styles.toolBtnI]}>I</Text></TouchableOpacity>
              <TouchableOpacity style={styles.toolBtn}><Ionicons name="image-outline" size={14} color="#999" /></TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Options */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CÁC PHƯƠNG ÁN</Text>
          {options.map((opt, i) => (
            <View key={opt.letter} style={styles.optionRow}>
              <TouchableOpacity
                style={[styles.optionCheck, opt.isCorrect ? styles.optionCheckActive : styles.optionCheckInactive]}
                onPress={() => toggleCorrect(i)}
              >
                {opt.isCorrect && <Ionicons name="checkmark" size={12} color={Colors.white} />}
              </TouchableOpacity>
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <View style={[styles.optionLetterBadge, opt.isCorrect && styles.optionLetterActive]}>
                    <Text style={[styles.optionLetterText, opt.isCorrect && styles.optionLetterTextActive]}>
                      Phương án {opt.letter}{opt.isCorrect ? ' (Đúng)' : ''}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.optionDelete}
                    onPress={() => handleDeleteOption(i)}
                    disabled={!canDeleteOption}
                  >
                    <Ionicons name="close-outline" size={14} color="#94A3B8" />
                  </TouchableOpacity>
                </View>
                <View style={[styles.optionInput, opt.isCorrect && styles.optionInputActive]}>
                  <TextInput
                    style={styles.optionInputField}
                    value={opt.text}
                    onChangeText={(text) => {
                      const updated = [...options];
                      updated[i] = { ...updated[i], text };
                      setOptions(updated);
                    }}
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addOptionBtn} onPress={handleAddOption}>
            <Ionicons name="add-circle-outline" size={18} color={Colors.primary} />
            <Text style={styles.addOptionText}>Thêm phương án</Text>
          </TouchableOpacity>
        </View>

        {/* Explanation */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>GIẢI THÍCH CHI TIẾT</Text>
          <View style={styles.explanationBox}>
            <View style={styles.explanationIcon}>
              <Ionicons name="bulb" size={18} color={Colors.primary} />
            </View>
            <TextInput
              style={styles.explanationInput}
              value={explanation}
              onChangeText={setExplanation}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteQuestion}>
          <Ionicons name="trash-outline" size={16} color="#475569" />
          <Text style={styles.deleteBtnText}>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveChangesBtn} onPress={handleSave}>
          <Ionicons name="checkmark-outline" size={16} color={Colors.white} />
          <Text style={styles.saveChangesText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 17,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.gray10, alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  saveBtn: { fontSize: 16, fontWeight: '600', color: Colors.primary },
  scrollContent: { paddingBottom: 200 },
  section: { paddingHorizontal: 20, paddingTop: 20 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 14, fontWeight: '600', color: Colors.textSecondary,
    letterSpacing: 0.7, textTransform: 'uppercase',
  },
  aiRewriteBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
  },
  aiRewriteText: { fontSize: 12, fontWeight: '600', color: Colors.primary },
  questionArea: {
    backgroundColor: Colors.white, borderRadius: 16,
    borderWidth: 1, borderColor: '#CBD5E1',
    overflow: 'hidden', minHeight: 160,
    shadowColor: 'rgba(0,0,0,0.05)', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1, shadowRadius: 8, elevation: 1,
  },
  questionInput: {
    fontSize: 18, color: '#1E293B', padding: 21, minHeight: 120, lineHeight: 29,
  },
  toolbar: {
    flexDirection: 'row', justifyContent: 'flex-end',
    paddingHorizontal: 8, paddingBottom: 8, opacity: 0.6,
  },
  toolBtn: {
    width: 28, height: 28, borderRadius: 4,
    backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0',
    alignItems: 'center', justifyContent: 'center',
  },
  toolBtnB: { fontSize: 14, fontWeight: '700', color: '#475569' },
  toolBtnI: { fontStyle: 'italic' },
  optionRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: Colors.white, borderRadius: 16, padding: 9, marginBottom: 12,
    borderWidth: 1, borderColor: '#E2E8F0',
    shadowColor: 'rgba(0,0,0,0.05)', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1, shadowRadius: 2, elevation: 1,
    gap: 16,
  },
  optionCheck: {
    width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4,
  },
  optionCheckActive: { backgroundColor: Colors.primary },
  optionCheckInactive: { backgroundColor: Colors.white, borderWidth: 2, borderColor: '#CBD5E1' },
  optionContent: { flex: 1 },
  optionHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 8,
  },
  optionLetterBadge: {
    backgroundColor: '#F0FDF4', paddingHorizontal: 9, paddingVertical: 3, borderRadius: 4,
    borderWidth: 1, borderColor: '#DCFCE7',
  },
  optionLetterActive: { borderColor: Colors.primary },
  optionLetterText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  optionLetterTextActive: { color: Colors.primary },
  optionDelete: { padding: 4, opacity: 0.5 },
  optionInput: {
    backgroundColor: Colors.white, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', overflow: 'hidden',
  },
  optionInputActive: { borderColor: Colors.primary },
  optionInputField: {
    fontSize: 16, color: '#1E293B', paddingHorizontal: 17, paddingVertical: 15,
  },
  addOptionBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: 'rgba(248,250,252,0.5)', borderRadius: 16,
    borderWidth: 2, borderColor: '#CBD5E1', borderStyle: 'dashed',
    paddingVertical: 18, marginBottom: 12,
  },
  addOptionText: { fontSize: 16, fontWeight: '600', color: Colors.primary },
  explanationBox: {
    flexDirection: 'row', backgroundColor: 'rgba(240,253,244,0.5)',
    borderRadius: 16, borderWidth: 1, borderColor: '#DCFCE7', padding: 21, gap: 16,
  },
  explanationIcon: {
    width: 40, height: 40, borderRadius: 999, backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#F0FDF4', flexShrink: 0,
  },
  explanationInput: {
    flex: 1, fontSize: 16, color: '#334155', lineHeight: 26, minHeight: 80,
  },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: 16,
    padding: 20, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: '#E2E8F0',
    shadowColor: 'rgba(0,0,0,0.05)', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1, shadowRadius: 6, elevation: 4,
  },
  deleteBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    flex: 1, backgroundColor: '#F1F5F9', paddingVertical: 17, borderRadius: 16,
  },
  deleteBtnText: { fontSize: 16, fontWeight: '600', color: '#475569' },
  saveChangesBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    flex: 2, backgroundColor: Colors.primary, paddingVertical: 17, borderRadius: 16,
    shadowColor: 'rgba(34,197,94,0.2)', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1, shadowRadius: 15, elevation: 4,
  },
  saveChangesText: { fontSize: 16, fontWeight: '700', color: Colors.white },
});
