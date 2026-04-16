import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMockSession } from '../../context/MockSessionContext';
import {
  getExamById,
  getResultsForTeacher,
  MOCK_CLASSES,
} from '../../mocks/appData';
import { Colors } from '../../theme';
import type { DashboardStackParamList } from '../../types';

type Props = NativeStackScreenProps<DashboardStackParamList, 'KhoDeExamDetail'>;

const STATUS_META = {
  open: { label: 'Đang mở', bg: 'rgba(0,110,47,0.1)', text: '#006E2F' },
  draft: { label: 'Bản nháp', bg: '#FFF7ED', text: '#B45309' },
  closed: { label: 'Đã đóng', bg: '#DCE5D9', text: '#3D4A3D' },
} as const;

export const KhoDeExamDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { currentUser } = useMockSession();
  const exam = getExamById(route.params.examId) ?? getExamById('exam-2') ?? getExamById('exam-1');
  const examId = exam?.id ?? 'exam-1';
  const teacherId = currentUser.role === 'admin' ? 'teacher-1' : currentUser.id;
  const teacherResults = getResultsForTeacher(teacherId).filter((item) => item.examId === examId);

  const assignedClasses = useMemo(
    () =>
      MOCK_CLASSES.filter((item) => exam?.classIds.includes(item.id)).map((item) => {
        const submitted = teacherResults.filter((result) =>
          item.studentIds.includes(result.studentId)
        ).length;

        return {
          id: item.id,
          label: item.name.replace('Lớp ', ''),
          name: item.name,
          size: item.studentIds.length,
          submitted,
        };
      }),
    [exam?.classIds, teacherResults]
  );

  const averageScore = useMemo(() => {
    if (teacherResults.length === 0) return 0;
    const total = teacherResults.reduce((sum, item) => sum + item.score, 0);
    return total / teacherResults.length;
  }, [teacherResults]);

  const passRate = useMemo(() => {
    if (teacherResults.length === 0) return 0;
    const passed = teacherResults.filter((item) => item.score >= 5).length;
    return Math.round((passed / teacherResults.length) * 100);
  }, [teacherResults]);

  const completionRate = useMemo(() => {
    if (!exam?.assignedStudentIds.length) return 0;
    return Math.round((teacherResults.length / exam.assignedStudentIds.length) * 100);
  }, [exam?.assignedStudentIds.length, teacherResults.length]);

  const easyCount = Math.max(1, Math.round((exam?.questionCount ?? 0) * 0.6));
  const hardCount = Math.max(0, (exam?.questionCount ?? 0) - easyCount);
  const statusMeta = STATUS_META[exam?.status ?? 'open'];

  if (!exam) {
    return (
      <SafeAreaView style={styles.emptyContainer} edges={['top', 'bottom']}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Không tìm thấy đề thi</Text>
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
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết đề thi</Text>
          <View style={styles.headerSpacer} />
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroArt}>
            <View style={styles.heroArtBlockWide} />
            <View style={styles.heroArtBlockSmall} />
            <View style={styles.heroArtBlockWideBottom} />
          </View>

          <View style={styles.heroBadgeRow}>
            <View style={styles.importantBadge}>
              <Text style={styles.importantBadgeText}>QUAN TRỌNG</Text>
            </View>
            <View style={styles.codeBadge}>
              <Text style={styles.codeBadgeText}>Mã đề: #{exam.id.toUpperCase()}</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>{exam.title}</Text>

          <View style={styles.heroMetaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="book-outline" size={14} color="#006E2F" />
              <Text style={styles.metaText}>{exam.subject}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color="#006E2F" />
              <Text style={styles.metaText}>{exam.updatedAt}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color="#006E2F" />
              <Text style={styles.metaText}>{exam.duration} Phút</Text>
            </View>
          </View>
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>TỔNG SỐ CÂU HỎI</Text>
          <Text style={styles.totalValue}>{exam.questionCount}</Text>
          <View style={styles.totalBreakdownRow}>
            <View style={styles.totalBreakdownCard}>
              <Text style={styles.totalBreakdownLabel}>Dễ</Text>
              <Text style={styles.totalBreakdownValue}>{easyCount}</Text>
            </View>
            <View style={styles.totalBreakdownCard}>
              <Text style={styles.totalBreakdownLabel}>Khó</Text>
              <Text style={styles.totalBreakdownValue}>{hardCount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIconWrap, { backgroundColor: '#AFEFB4' }]}>
            <Ionicons name="star" size={18} color="#295E2A" />
          </View>
          <View>
            <Text style={styles.statLabel}>ĐIỂM TB</Text>
            <Text style={styles.statValue}>{averageScore.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIconWrap, { backgroundColor: 'rgba(33,196,93,0.2)' }]}>
            <Ionicons name="checkmark-circle" size={18} color="#006E2F" />
          </View>
          <View>
            <Text style={styles.statLabel}>TỈ LỆ ĐẠT</Text>
            <Text style={styles.statValue}>{passRate}%</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIconWrap, { backgroundColor: '#E8F0E4' }]}>
            <Ionicons name="people-outline" size={18} color="#3D4A3D" />
          </View>
          <View>
            <Text style={styles.statLabel}>LƯỢT LÀM</Text>
            <Text style={styles.statValue}>{teacherResults.length}</Text>
          </View>
        </View>

        <View style={styles.insightCard}>
          <Text style={styles.insightTitle}>Insight AI</Text>
          <View style={styles.insightDots}>
            <View style={styles.insightDotStrong} />
            <View style={styles.insightDotMid} />
            <View style={styles.insightDotLight} />
          </View>
          <Text style={styles.insightBody}>
            "Hầu hết học sinh gặp khó khăn ở các câu hỏi cuối bài. Nên dành thêm thời gian ôn tập
            phần này."
          </Text>

          <View style={styles.completionBlock}>
            <Text style={styles.completionLabel}>TỈ LỆ HOÀN THÀNH</Text>
            <View style={styles.completionTrack}>
              <View style={[styles.completionFill, { width: `${completionRate}%` }]} />
            </View>
            <Text style={styles.completionValue}>{completionRate}% Đã nộp bài</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lớp học đang gán</Text>
          <Text style={styles.sectionMeta}>
            {String(assignedClasses.length).padStart(2, '0')} LỚP TỔNG CỘNG
          </Text>
        </View>

        {assignedClasses.map((item, index) => {
          const isOpen = index === 0 && exam.status === 'open';
          const status = isOpen ? statusMeta : STATUS_META.closed;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.88}
              onPress={() =>
                navigation.navigate('KhoDeClassAnalytics', {
                  examId,
                  classId: item.id,
                })
              }
              style={[styles.classCard, !isOpen && styles.classCardMuted]}
            >
              <View style={styles.classLeft}>
                <View style={styles.classIconWrap}>
                  <Ionicons name="people-outline" size={18} color="#2B7A38" />
                </View>
                <View>
                  <Text style={styles.classTitle}>{item.name}</Text>
                  <Text style={styles.classSubtitle}>
                    Sĩ số: {item.size} • Đã làm: {item.submitted}
                  </Text>
                </View>
              </View>

              <View style={styles.classRight}>
                <View style={[styles.classStatusChip, { backgroundColor: status.bg }]}>
                  <Text style={[styles.classStatusText, { color: status.text }]}>{status.label}</Text>
                </View>
                <Ionicons name="ellipsis-vertical" size={16} color="#64748B" />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <SafeAreaView style={styles.footerSafe} edges={['bottom']}>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('SoanThaoCauHoi', { examId })}
          >
            <Ionicons name="eye-outline" size={16} color={Colors.white} />
            <Text style={styles.footerButtonText}>Xem chi tiết câu hỏi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  safeTop: { backgroundColor: '#F9FAFB' },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    color: '#161D16',
  },
  headerSpacer: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 120,
    gap: 14,
  },
  heroCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    shadowColor: 'rgba(0,0,0,0.10)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  heroArt: {
    position: 'absolute',
    right: -10,
    top: -6,
    width: 92,
    height: 92,
    opacity: 0.9,
  },
  heroArtBlockWide: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 56,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  heroArtBlockSmall: {
    position: 'absolute',
    top: 28,
    right: 20,
    width: 34,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  heroArtBlockWideBottom: {
    position: 'absolute',
    top: 46,
    right: 8,
    width: 44,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  heroBadgeRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  importantBadge: {
    backgroundColor: 'rgba(33,196,93,0.2)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  importantBadgeText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#004A1D',
    letterSpacing: 0.3,
  },
  codeBadge: {
    backgroundColor: '#E8F0E4',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  codeBadgeText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#3D4A3D',
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '800',
    color: '#161D16',
    maxWidth: 280,
    marginBottom: 16,
    letterSpacing: -0.7,
  },
  heroMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 13, lineHeight: 18, color: '#3D4A3D' },
  totalCard: {
    backgroundColor: '#006E2F',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 22,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 2.2,
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 60,
    lineHeight: 60,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 18,
  },
  totalBreakdownRow: { flexDirection: 'row', gap: 12, width: '100%' },
  totalBreakdownCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  totalBreakdownLabel: {
    fontSize: 10,
    lineHeight: 15,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  totalBreakdownValue: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    color: Colors.white,
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    paddingHorizontal: 22,
    paddingVertical: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  statIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: 'rgba(61,74,61,0.6)',
    letterSpacing: 1.2,
  },
  statValue: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    color: '#161D16',
  },
  insightCard: {
    backgroundColor: '#EDF6EA',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    padding: 22,
  },
  insightTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: '#161D16',
    marginBottom: 4,
  },
  insightDots: { flexDirection: 'row', gap: 4, marginBottom: 14 },
  insightDotStrong: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#006E2F' },
  insightDotMid: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,110,47,0.5)',
  },
  insightDotLight: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,110,47,0.2)',
  },
  insightBody: {
    fontSize: 14,
    lineHeight: 23,
    color: '#3D4A3D',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  completionBlock: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(188,203,185,0.3)',
    paddingTop: 18,
  },
  completionLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: 'rgba(61,74,61,0.6)',
    marginBottom: 10,
  },
  completionTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#E8F0E4',
    overflow: 'hidden',
  },
  completionFill: { height: '100%', backgroundColor: '#006E2F' },
  completionValue: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '600',
    color: '#161D16',
    textAlign: 'right',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#161D16',
  },
  sectionMeta: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: 'rgba(61,74,61,0.7)',
  },
  classCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  classCardMuted: { opacity: 0.75 },
  classLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  classIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: '#E8F0E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  classTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
    color: '#161D16',
  },
  classSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#3D4A3D',
  },
  classRight: { alignItems: 'center', gap: 10 },
  classStatusChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  classStatusText: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  footerSafe: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footer: { paddingHorizontal: 10, paddingTop: 12, paddingBottom: 16 },
  footerButton: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: Colors.primary,
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
  footerButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.white,
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
  },
  emptyTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
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
  emptyButtonText: { fontSize: 16, lineHeight: 24, fontWeight: '700', color: Colors.white },
});
