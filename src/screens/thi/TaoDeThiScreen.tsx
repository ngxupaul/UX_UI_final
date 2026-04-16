import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDraftExam } from '../../context/DraftExamContext';
import { Colors } from '../../theme';
import { ExamFlowHeader } from '../../components';
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

export const TaoDeThiScreen: React.FC<Props> = ({ navigation }) => {
  const { draftExam, updateExamInfo } = useDraftExam();
  const [title, setTitle] = useState(draftExam.title);
  const [subjects, setSubjects] = useState(SUBJECTS);
  const [duration, setDuration] = useState(draftExam.duration);

  const toggleSubject = (idx: number) => {
    setSubjects(subjects.map((s, i) => ({ ...s, selected: i === idx })));
  };

  const incDuration = () => setDuration(String(parseInt(duration || '0') + 15));
  const decDuration = () => setDuration(String(Math.max(15, parseInt(duration || '0') - 15)));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ExamFlowHeader
        title="Tạo đề thi mới"
        currentStep={1}
        onBack={() => navigation.goBack()}
        onSaveDraft={() => {
          const selectedSubject =
            subjects.find((subject) => subject.selected)?.label ?? draftExam.subject;
          updateExamInfo({ title, duration, subject: selectedSubject });
          navigation.goBack();
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Exam name card */}
        <View style={styles.examNameCard}>
          <View style={styles.examNameHeader}>
            <Text style={styles.examNameLabel}>TÊN ĐỀ THI</Text>
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.examNameInput}
            placeholder="Nhập tên đề thi..."
            placeholderTextColor="#B7B7B7"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Subject pills */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>MÔN HỌC</Text>
          <View style={styles.pillRow}>
            {subjects.map((s, i) => (
              <TouchableOpacity
                key={s.label}
                style={[styles.pill, s.selected ? styles.pillActive : styles.pillInactive]}
                onPress={() => toggleSubject(i)}
              >
                <Text style={[styles.pillText, s.selected ? styles.pillTextActive : styles.pillTextInactive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Duration */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>THỜI GIAN LÀM BÀI</Text>
          <View style={styles.durationRow}>
            <TouchableOpacity style={styles.durationBtn} onPress={decDuration}>
              <Ionicons name="remove" size={16} color={Colors.textPrimary} />
            </TouchableOpacity>
            <View style={styles.durationValue}>
              <Text style={styles.durationNum}>{duration}</Text>
              <Text style={styles.durationUnit}> phút</Text>
            </View>
            <TouchableOpacity style={styles.durationBtn} onPress={incDuration}>
              <Ionicons name="add" size={16} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => {
            const selectedSubject =
              subjects.find((subject) => subject.selected)?.label ?? draftExam.subject;
            updateExamInfo({ title, duration, subject: selectedSubject });
            navigation.navigate('SoanThaoCauHoi', { examId: draftExam.examId });
          }}
        >
          <Text style={styles.continueBtnText}>Tiếp tục tạo câu hỏi</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.white} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBg },
  scroll: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 120 },
  examNameCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 17,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  examNameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  examNameLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  examNameInput: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    padding: 0,
  },
  section: { marginBottom: 20 },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillInactive: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  pillActive: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  pillText: { fontSize: 14 },
  pillTextInactive: { fontWeight: '500', color: '#8C95A1' },
  pillTextActive: { fontWeight: '700', color: Colors.primary },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  durationBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.gray10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationValue: { flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  durationNum: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  durationUnit: { fontSize: 14, fontWeight: '500', color: Colors.textSecondary },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 24,
    shadowColor: 'rgba(33,196,93,0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  continueBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },
});
