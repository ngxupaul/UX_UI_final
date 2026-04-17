import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { DeleteConfirmDialog, ExamFlowHeader } from '../../components';
import { useDraftExam } from '../../context/DraftExamContext';
import { useMockSession } from '../../context/MockSessionContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

type Props = NativeStackScreenProps<DashboardStackParamList, 'SoanThaoCauHoi'>;

export const SoanThaoCauHoiScreen: React.FC<Props> = ({ navigation, route }) => {
  const { draftExam, deleteQuestion } = useDraftExam();
  const { currentUser } = useMockSession();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const hidePublishAction = currentUser.role === 'student';

  const handleDeletePress = (questionId: string) => setDeleteTarget(questionId);
  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteQuestion(deleteTarget);
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
      <ExamFlowHeader
        title="Tạo đề thi mới"
        currentStep={2}
        onBack={() => navigation.goBack()}
        onSaveDraft={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* List header */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Danh sách câu hỏi ({draftExam.questions.length})</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.iconActionBtn, viewMode === 'grid' && styles.iconActionBtnActive]}
              onPress={() => setViewMode('grid')}
            >
              <Ionicons name="grid-outline" size={16} color="#64748B" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconActionBtn, viewMode === 'list' && styles.iconActionBtnActive]}
              onPress={() => setViewMode('list')}
            >
              <Ionicons name="list-outline" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Exam info banner */}
        <View style={styles.examBanner}>
          <Text style={styles.examBannerTitle}>{draftExam.title}</Text>
          <TouchableOpacity
            style={styles.editLink}
            onPress={() => navigation.navigate('TaoDeThi')}
          >
            <Ionicons name="pencil" size={12} color="#64748B" />
            <Text style={styles.editLinkText}>Sửa</Text>
          </TouchableOpacity>
        </View>

        {/* Question cards */}
        {draftExam.questions.map((q) => (
          <View
            key={q.id}
            style={[styles.questionCard, viewMode === 'list' && styles.questionCardCompact]}
          >
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
                onPress={() =>
                  navigation.navigate('ChinhSuaCauHoi', {
                    examId: draftExam.examId,
                    questionId: q.id,
                  })
                }
              >
                <Ionicons name="pencil" size={12} color="#64748B" />
                <Text style={styles.actionBtnText}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleDeletePress(q.id)}>
                <Ionicons name="trash-outline" size={12} color="#94A3B8" />
                <Text style={styles.actionBtnTextMuted}>Xóa</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.cardMenuBtn}>
              <Ionicons name="ellipsis-vertical" size={14} color={Colors.gray30} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add question buttons */}
        <View style={styles.addRow}>
          <TouchableOpacity
            style={styles.addBtnGreen}
            onPress={() => navigation.navigate('ThemCauHoi', { examId: draftExam.examId })}
          >
            <Ionicons name="add" size={20} color={Colors.white} />
            <Text style={styles.addBtnGreenText}>Thêm câu hỏi mới</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtnGreen}
            onPress={() => navigation.navigate('LamThuDeThi')}
          >
            <Ionicons name="document-text-outline" size={20} color={Colors.white} />
            <Text style={styles.addBtnGreenText}>Làm thử</Text>
          </TouchableOpacity>
        </View>

        {/* Publish button */}
        {!hidePublishAction ? (
          <TouchableOpacity
            style={styles.publishBtn}
            onPress={() => navigation.navigate('ThietLapDeThi', { examId: draftExam.examId })}
          >
            <Ionicons name="paper-plane-outline" size={18} color={Colors.white} />
            <Text style={styles.publishBtnText}>Phát hành đề thi</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 108 },
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
  iconActionBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryBg,
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
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  questionCardCompact: {
    paddingVertical: 14,
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
    right: 34,
    flexDirection: 'row',
    gap: 16,
  },
  cardMenuBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 2,
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
