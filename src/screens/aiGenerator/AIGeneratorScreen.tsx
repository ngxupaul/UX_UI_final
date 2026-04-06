import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const SUBJECTS = [
  { label: 'Toán', selected: true },
  { label: 'Tiếng Anh', selected: false },
  { label: 'Lịch sử', selected: false },
  { label: 'Địa lý', selected: false },
  { label: 'Ngữ văn', selected: false },
  { label: 'Hóa học', selected: false },
  { label: 'Vật lý', selected: false },
];

const DIFFICULTIES = [
  { label: 'Dễ', selected: true },
  { label: 'Trung bình', selected: false },
  { label: 'Khó', selected: false },
];

const QUESTION_TYPES = [
  { label: 'Trắc nghiệm', desc: 'Chọn 1 đáp án đúng duy nhất', selected: true, icon: 'radio-button-on' },
  { label: 'Nhiều lựa chọn', desc: 'Có thể có nhiều hơn 1 đáp án đúng', selected: false, icon: 'checkbox' },
  { label: 'Tự luận', desc: 'Câu hỏi mở yêu cầu viết câu trả lời', selected: false, icon: 'create-outline' },
];

export const AIGeneratorScreen: React.FC<Props> = ({ navigation }) => {
  const [prompt, setPrompt] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [subjects, setSubjects] = useState(SUBJECTS);
  const [difficulties, setDifficulties] = useState(DIFFICULTIES);
  const [qTypes, setQTypes] = useState(QUESTION_TYPES);

  const toggleSubject = (idx: number) => {
    setSubjects(subjects.map((s, i) => ({ ...s, selected: i === idx })));
  };
  const toggleDifficulty = (idx: number) => {
    setDifficulties(difficulties.map((d, i) => ({ ...d, selected: i === idx })));
  };
  const toggleQType = (idx: number) => {
    setQTypes(qTypes.map((t, i) => ({ ...t, selected: i === idx })));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo đề thi với AI</Text>
        <TouchableOpacity>
          <Ionicons name="time-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Prompt input */}
        <View style={styles.inputWrap}>
          <View style={styles.inputLabel}>
            <Ionicons name="bulb" size={18} color={Colors.primary} />
            <Text style={styles.inputLabelText}>Nhập yêu cầu của bạn</Text>
          </View>
          <View style={styles.textArea}>
            <TextInput
              style={styles.textInput}
              placeholder="Ví dụ: Tạo 10 câu trắc nghiệm Toán lớp 10 chuyên đề Vector, mức độ vận dụng cao, có lời giải chi tiết ..."
              placeholderTextColor="#B7B7B7"
              value={prompt}
              onChangeText={setPrompt}
              multiline
              textAlignVertical="top"
            />
            {/* Toolbar */}
            <View style={styles.toolbar}>
              <TouchableOpacity style={styles.toolBtn}>
                <Ionicons name="image-outline" size={20} color="#999" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolBtn}>
                <Ionicons name="document-text-outline" size={22} color="#999" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolBtn}>
                <Ionicons name="mic-outline" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Subject pills (horizontal scroll) */}
        <View style={styles.pillSection}>
          <View style={styles.pillRow}>
            {subjects.map((s, i) => (
              <TouchableOpacity
                key={s.label}
                style={[styles.subjectPill, s.selected && styles.subjectPillActive]}
                onPress={() => toggleSubject(i)}
              >
                <Text style={[styles.subjectPillText, s.selected && styles.subjectPillTextActive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Config */}
        <View style={styles.configSection}>
          <Text style={styles.configSectionTitle}>CẤU HÌNH ĐỀ THI</Text>

          {/* Difficulty */}
          <Text style={styles.fieldLabel}>Độ khó</Text>
          <View style={styles.difficultyRow}>
            {difficulties.map((d, i) => (
              <TouchableOpacity
                key={d.label}
                style={[styles.difficultyPill, d.selected && styles.difficultyPillActive]}
                onPress={() => toggleDifficulty(i)}
              >
                <Text style={[styles.difficultyText, d.selected && styles.difficultyTextActive]}>
                  {d.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Question type */}
          <Text style={styles.fieldLabel}>Dạng câu hỏi</Text>
          {qTypes.map((t, i) => (
            <TouchableOpacity
              key={t.label}
              style={[styles.typeCard, t.selected && styles.typeCardActive]}
              onPress={() => toggleQType(i)}
            >
              <View style={[styles.typeIcon, t.selected && styles.typeIconActive]}>
                <Ionicons
                  name={t.icon as any}
                  size={20}
                  color={t.selected ? Colors.primary : '#999'}
                />
              </View>
              <View style={styles.typeInfo}>
                <Text style={styles.typeTitle}>{t.label}</Text>
                <Text style={styles.typeDesc}>{t.desc}</Text>
              </View>
              {t.selected && (
                <View style={styles.typeCheckmark}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}

          {/* Question count */}
          <View style={styles.countRow}>
            <Text style={styles.countLabel}>Số lượng câu hỏi</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setQuestionCount(Math.max(1, questionCount - 1))}
              >
                <Text style={styles.counterBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{questionCount}</Text>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setQuestionCount(questionCount + 1)}
              >
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Generate button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.generateBtn}>
          <Ionicons name="bulb" size={18} color={Colors.white} />
          <Text style={styles.generateBtnText}>Tạo đề ngay</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.6 },
  scrollContent: { paddingBottom: 100 },
  inputWrap: { paddingHorizontal: 16, paddingTop: 16 },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  inputLabelText: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  textArea: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    overflow: 'hidden',
    minHeight: 141,
  },
  textInput: {
    fontSize: 16,
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 100,
    lineHeight: 25,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 8,
    gap: 4,
  },
  toolBtn: {
    backgroundColor: '#EEE',
    borderRadius: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectPill: {
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  subjectPillActive: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  subjectPillText: { fontSize: 14, fontWeight: '500', color: '#8C95A1' },
  subjectPillTextActive: { fontWeight: '700', color: Colors.primary },
  configSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  configSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.7,
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 10,
    marginTop: 12,
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyPill: {
    flex: 1,
    height: 41,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  difficultyPillActive: {
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  difficultyText: { fontSize: 14, fontWeight: '500', color: '#8C95A1' },
  difficultyTextActive: { fontWeight: '700', color: Colors.primary },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(149,149,149,0.3)',
  },
  typeCardActive: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.gray10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  typeIconActive: {
    backgroundColor: Colors.primaryBg,
  },
  typeInfo: { flex: 1 },
  typeTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 2 },
  typeDesc: { fontSize: 13, color: Colors.textSecondary },
  typeCheckmark: { marginLeft: 8 },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 17,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    marginTop: 8,
    marginBottom: 24,
  },
  countLabel: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  counterValue: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, minWidth: 24, textAlign: 'center' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray20,
  },
  generateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 15,
    shadowColor: 'rgba(33,196,93,0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  generateBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },
});