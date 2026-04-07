import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { DeleteConfirmDialog } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

// 3-step progress bar: step 2 = Câu hỏi (active)
const WizardStep = () => (
  <View style={styles.wizardWrap}>
    {/* Step 1: Thông tin */}
    <View style={styles.wizardLeft}>
      <View style={styles.stepCircle}>
        <Text style={styles.stepDone}>✓</Text>
      </View>
      <Text style={styles.stepLabel}>Thông tin</Text>
    </View>
    {/* Line */}
    <View style={styles.wizardLineFilled} />
    {/* Step 2: Câu hỏi */}
    <View style={styles.wizardCenter}>
      <View style={styles.stepCircleActive}>
        <Text style={styles.stepNum}>2</Text>
      </View>
      <Text style={styles.stepLabelActive}>Câu hỏi</Text>
    </View>
    {/* Line */}
    <View style={styles.wizardLineEmpty} />
    {/* Step 3: Cài đặt */}
    <View style={styles.wizardRight}>
      <View style={styles.stepCirclePending}>
        <Text style={styles.stepNumPending}>3</Text>
      </View>
      <Text style={styles.stepLabelPending}>Cài đặt</Text>
    </View>
  </View>
);

const MOCK_QUESTIONS_DATA = [
  {
    num: '01',
    type: 'Trắc nghiệm',
    difficulty: 'Dễ',
    points: '2.0 điểm',
    content: 'Việt Nam nằm ở phía nào của bán đảo Đông Dương?',
    answer: 'Phía Đông',
  },
  {
    num: '02',
    type: 'Trắc nghiệm',
    difficulty: 'Dễ',
    points: '2.0 điểm',
    content: 'Đảo lớn nhất Việt Nam là đảo nào?',
    answer: 'Phú Quốc',
  },
  {
    num: '03',
    type: 'Trắc nghiệm',
    difficulty: 'Dễ',
    points: '2.0 điểm',
    content: 'Loại đá nào được hình thành từ xác động vật?',
    answer: 'Đá vôi',
  },
  {
    num: '04',
    type: 'Trắc nghiệm',
    difficulty: 'Dễ',
    points: '2.0 điểm',
    content: 'So với các vùng khác về sản xuất nông nghiệp, Đồng bằng Sông Hồng là vùng có',
    answer: 'Năng suất lúa cao nhất',
  },
  {
    num: '05',
    type: 'Trắc nghiệm',
    difficulty: 'Dễ',
    points: '2.0 điểm',
    content: 'Loại đất nào có diện tích lớn nhất Đồng bằng Sông Cửu Long?',
    answer: 'Đất phèn',
  },
];

export const SoanThaoCauHoiScreen: React.FC<Props> = ({ navigation }) => {
  const [questions, setQuestions] = useState(MOCK_QUESTIONS_DATA);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleDeletePress = (num: string) => setDeleteTarget(num);
  const handleDeleteConfirm = () => {
    if (deleteTarget !== null) {
      setQuestions(questions.filter((q) => q.num !== deleteTarget));
    }
    setDeleteTarget(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DeleteConfirmDialog
        visible={deleteTarget !== null}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={18} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo đề thi mới</Text>
        <TouchableOpacity>
          <Text style={styles.saveDraft}>Lưu nháp</Text>
        </TouchableOpacity>
      </View>

      {/* Wizard */}
      <WizardStep />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* List header */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Danh sách câu hỏi ({questions.length})</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconActionBtn}>
              <Ionicons name="grid-outline" size={16} color="#64748B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconActionBtn}>
              <Ionicons name="list-outline" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Exam info banner */}
        <View style={styles.examBanner}>
          <Text style={styles.examBannerTitle}>Kiểm tra 15 phút - Chương 1</Text>
          <TouchableOpacity style={styles.editLink}>
            <Ionicons name="pencil" size={12} color="#64748B" />
            <Text style={styles.editLinkText}>Sửa</Text>
          </TouchableOpacity>
        </View>

        {/* Question cards */}
        {questions.map((q) => (
          <View key={q.num} style={styles.questionCard}>
            {/* Question number */}
            <View style={styles.qNumBadge}>
              <Text style={styles.qNumText}>{q.num}</Text>
            </View>

            {/* Content */}
            <View style={styles.qContent}>
              {/* Tags */}
              <View style={styles.qTags}>
                <View style={styles.typeTag}>
                  <Text style={styles.typeTagText}>{q.type}</Text>
                </View>
                <Text style={styles.difficultyText}>{q.difficulty} • {q.points}</Text>
              </View>

              {/* Question text */}
              <Text style={styles.qText}>{q.content}</Text>

              {/* Answer preview */}
              <View style={styles.answerPreview}>
                <Ionicons name="checkmark-circle" size={14} color="#475569" />
                <Text style={styles.answerText}>{q.answer}</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.qActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => navigation.navigate('ChinhSuaCauHoi', { examId: '1', questionId: q.num })}
              >
                <Ionicons name="pencil" size={12} color="#64748B" />
                <Text style={styles.actionBtnText}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleDeletePress(q.num)}>
                <Ionicons name="trash-outline" size={12} color="#94A3B8" />
                <Text style={styles.actionBtnTextMuted}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add question buttons */}
        <View style={styles.addRow}>
          <TouchableOpacity
            style={styles.addBtnGreen}
            onPress={() => navigation.navigate('ThemCauHoi', { examId: '1' })}
          >
            <Ionicons name="add" size={20} color={Colors.white} />
            <Text style={styles.addBtnGreenText}>Thêm câu hỏi mới</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtnGreen}
            onPress={() => navigation.navigate('AIGenerator')}
          >
            <Ionicons name="document-text-outline" size={20} color={Colors.white} />
            <Text style={styles.addBtnGreenText}>Làm thử</Text>
          </TouchableOpacity>
        </View>

        {/* Publish button */}
        <TouchableOpacity
          style={styles.publishBtn}
          onPress={() => navigation.navigate('PhatDe', { examId: '1' })}
        >
          <Ionicons name="paper-plane-outline" size={18} color={Colors.white} />
          <Text style={styles.publishBtnText}>Phát hành đề thi</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  saveDraft: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  wizardWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  wizardLeft: { alignItems: 'center' },
  wizardCenter: { alignItems: 'center' },
  wizardRight: { alignItems: 'center' },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDone: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  stepCircleActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(33,196,93,0.15)',
  },
  stepCirclePending: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray20,
    borderWidth: 1,
    borderColor: Colors.gray30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  stepNumPending: { color: Colors.textMuted, fontSize: 14, fontWeight: '700' },
  stepLabel: { fontSize: 10, fontWeight: '500', color: Colors.primary, marginTop: 4 },
  stepLabelActive: { fontSize: 10, fontWeight: '700', color: Colors.primary, marginTop: 4 },
  stepLabelPending: { fontSize: 10, fontWeight: '500', color: Colors.textMuted, marginTop: 4 },
  wizardLineFilled: {
    width: 80,
    height: 2,
    backgroundColor: Colors.primary,
    marginHorizontal: 8,
    opacity: 0.8,
  },
  wizardLineEmpty: {
    width: 80,
    height: 2,
    backgroundColor: Colors.gray20,
    marginHorizontal: 8,
  },
  scrollContent: { padding: 16, paddingBottom: 120 },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  listTitle: { fontSize: 20, fontWeight: '700', color: '#1E293B' },
  headerActions: { flexDirection: 'row', gap: 4 },
  iconActionBtn: {
    backgroundColor: Colors.white,
    padding: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray20,
  },
  examBanner: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 17,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  examBannerTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, flex: 1 },
  editLink: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  editLinkText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  questionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 17,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    position: 'relative',
  },
  qNumBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(33,196,93,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  qNumText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  qContent: {},
  qTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  typeTag: {
    backgroundColor: 'rgba(33,196,93,0.1)',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(33,196,93,0.1)',
  },
  typeTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  difficultyText: { fontSize: 10, fontWeight: '500', color: '#64748B' },
  qText: { fontSize: 14, fontWeight: '500', color: '#334155', lineHeight: 22, marginBottom: 10 },
  answerPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.gray20,
  },
  answerText: { fontSize: 12, color: '#475569' },
  qActions: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 16,
  },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionBtnText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  actionBtnTextMuted: { fontSize: 12, fontWeight: '500', color: '#94A3B8' },
  addRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    marginBottom: 16,
  },
  addBtnGreen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: 'rgba(33,196,93,0.25)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  addBtnGreenText: { fontSize: 16, fontWeight: '700', color: Colors.white },
  publishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: 'rgba(33,196,93,0.25)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  publishBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },
});