import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  getExamById,
  getResultsForTeacher,
  MOCK_CLASSES,
  MOCK_USERS,
} from '../../mocks/appData';
import { Colors } from '../../theme';
import type { DashboardStackParamList } from '../../types';

type Props = NativeStackScreenProps<DashboardStackParamList, 'KhoDeClassAnalytics'>;

type StudentMetric = {
  id: string;
  name: string;
  submittedAt: string;
  score: number;
  badge: string;
  badgeTone: 'excellent' | 'good' | 'fair' | 'weak' | 'poor';
};

type ClassAnalyticsFixture = {
  averageScore: number;
  passRate: number;
  distribution: Array<{ label: string; value: number }>;
  students: StudentMetric[];
};

const BADGE_STYLES = {
  excellent: {
    bg: '#DCFCE7',
    score: '#15803D',
    label: '#16A34A',
  },
  good: {
    bg: '#DCFCE7',
    score: '#15803D',
    label: '#22C55E',
  },
  fair: {
    bg: '#F0FDF4',
    score: '#15803D',
    label: '#16A34A',
  },
  weak: {
    bg: '#FEF2F2',
    score: '#DC2626',
    label: '#EF4444',
  },
  poor: {
    bg: '#FEE2E2',
    score: '#B91C1C',
    label: '#DC2626',
  },
} as const;

const getBadgeTone = (score: number): StudentMetric['badgeTone'] => {
  if (score >= 9) return 'excellent';
  if (score >= 8) return 'good';
  if (score >= 6.5) return 'fair';
  if (score >= 4.5) return 'weak';
  return 'poor';
};

const getBadgeLabel = (score: number) => {
  if (score >= 9) return 'Xuất sắc';
  if (score >= 8) return 'Giỏi';
  if (score >= 6.5) return 'Khá';
  if (score >= 4.5) return 'Yếu';
  return 'Kém';
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const DUMMY_CLASS_ANALYTICS: Record<string, ClassAnalyticsFixture> = {
  'exam-2:class-10a1': {
    averageScore: 7.8,
    passRate: 85,
    distribution: [
      { label: '0-2', value: 2 },
      { label: '2-4', value: 8 },
      { label: '4-6', value: 15 },
      { label: '6-8', value: 28 },
      { label: '8-10', value: 12 },
    ],
    students: [
      {
        id: 'fixture-1',
        name: 'Trần Thị Bích Ngọc',
        submittedAt: '09:15 AM',
        score: 9.5,
        badge: 'Xuất sắc',
        badgeTone: 'excellent',
      },
      {
        id: 'fixture-2',
        name: 'Lê Minh',
        submittedAt: '09:20 AM',
        score: 8.8,
        badge: 'Giỏi',
        badgeTone: 'good',
      },
      {
        id: 'fixture-3',
        name: 'Nguyễn Văn An',
        submittedAt: '10:05 AM',
        score: 7.5,
        badge: 'Khá',
        badgeTone: 'fair',
      },
      {
        id: 'fixture-4',
        name: 'Trần Hùng',
        submittedAt: '10:45 AM',
        score: 4.5,
        badge: 'Yếu',
        badgeTone: 'weak',
      },
      {
        id: 'fixture-5',
        name: 'Phạm Văn Cường',
        submittedAt: '11:00 AM',
        score: 3.0,
        badge: 'Kém',
        badgeTone: 'poor',
      },
    ],
  },
  'exam-2:class-10a2': {
    averageScore: 6.9,
    passRate: 72,
    distribution: [
      { label: '0-2', value: 1 },
      { label: '2-4', value: 5 },
      { label: '4-6', value: 10 },
      { label: '6-8', value: 18 },
      { label: '8-10', value: 7 },
    ],
    students: [
      {
        id: 'fixture-6',
        name: 'Nguyễn Gia Hân',
        submittedAt: '09:05 AM',
        score: 8.9,
        badge: 'Giỏi',
        badgeTone: 'good',
      },
      {
        id: 'fixture-7',
        name: 'Hoàng Minh Khang',
        submittedAt: '09:18 AM',
        score: 7.6,
        badge: 'Khá',
        badgeTone: 'fair',
      },
      {
        id: 'fixture-8',
        name: 'Võ Thanh Mai',
        submittedAt: '09:41 AM',
        score: 6.8,
        badge: 'Khá',
        badgeTone: 'fair',
      },
      {
        id: 'fixture-9',
        name: 'Phan Nhật Quang',
        submittedAt: '10:12 AM',
        score: 5.1,
        badge: 'Yếu',
        badgeTone: 'weak',
      },
      {
        id: 'fixture-10',
        name: 'Lưu Bảo Trâm',
        submittedAt: '10:47 AM',
        score: 3.8,
        badge: 'Kém',
        badgeTone: 'poor',
      },
    ],
  },
};

export const KhoDeClassAnalyticsScreen: React.FC<Props> = ({ navigation, route }) => {
  const exam = getExamById(route.params.examId) ?? getExamById('exam-2') ?? getExamById('exam-1');
  const classItem = MOCK_CLASSES.find((item) => item.id === route.params.classId) ?? MOCK_CLASSES[0];
  const fixtureKey = `${exam?.id ?? 'exam-1'}:${classItem.id}`;
  const fixture = DUMMY_CLASS_ANALYTICS[fixtureKey];
  const teacherResults = getResultsForTeacher('teacher-1').filter(
    (item) => item.examId === (exam?.id ?? 'exam-1')
  );

  const students = useMemo<StudentMetric[]>(() => {
    const rows = classItem.studentIds
      .map((studentId) => {
        const user = MOCK_USERS.find((item) => item.id === studentId);
        if (!user) return null;

        const result = teacherResults.find((item) => item.studentId === studentId);
        const score = result?.score ?? 0;
        const tone = getBadgeTone(score);

        return {
          id: user.id,
          name: user.name,
          submittedAt: result?.submittedAt ?? '--:--',
          score,
          badge: getBadgeLabel(score),
          badgeTone: tone,
        };
      })
      .filter((item): item is StudentMetric => item !== null)
      .sort((a, b) => b.score - a.score);

    return rows;
  }, [classItem.studentIds, teacherResults]);

  const averageScore = useMemo(() => {
    if (fixture) return fixture.averageScore;
    if (students.length === 0) return 0;
    return students.reduce((sum, item) => sum + item.score, 0) / students.length;
  }, [fixture, students]);

  const passRate = useMemo(() => {
    if (fixture) return fixture.passRate;
    if (students.length === 0) return 0;
    return Math.round((students.filter((item) => item.score >= 5).length / students.length) * 100);
  }, [fixture, students]);

  const distribution = useMemo(() => {
    if (fixture) return fixture.distribution;
    const buckets = [
      { label: '0-2', value: 0 },
      { label: '2-4', value: 0 },
      { label: '4-6', value: 0 },
      { label: '6-8', value: 0 },
      { label: '8-10', value: 0 },
    ];

    students.forEach((item) => {
      if (item.score < 2) buckets[0].value += 1;
      else if (item.score < 4) buckets[1].value += 1;
      else if (item.score < 6) buckets[2].value += 1;
      else if (item.score < 8) buckets[3].value += 1;
      else buckets[4].value += 1;
    });

    return buckets;
  }, [fixture, students]);

  const visualizedStudents = fixture?.students ?? students;

  const maxBucket = Math.max(...distribution.map((item) => item.value), 1);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeTop} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={20} color="#334155" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Thống kê lớp {classItem.name.replace('Lớp ', '')}</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="newspaper-outline" size={18} color="#64748B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="calendar-outline" size={18} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <View style={styles.summaryIconWrap}>
                <Ionicons name="stats-chart-outline" size={16} color={Colors.primary} />
              </View>
              <Text style={styles.summaryLabel}>Trung bình</Text>
            </View>
            <Text style={styles.summaryValue}>{averageScore.toFixed(1)}</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <View style={styles.summaryIconWrap}>
                <Ionicons name="checkmark-circle-outline" size={16} color={Colors.primary} />
              </View>
              <Text style={styles.summaryLabel}>Tỉ lệ đạt</Text>
            </View>
            <Text style={styles.summaryValue}>{passRate}%</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Phân phối điểm số</Text>
            <TouchableOpacity style={styles.chartLink}>
              <Text style={styles.chartLinkText}>Chi tiết</Text>
              <Ionicons name="chevron-forward" size={12} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.chartBars}>
            {distribution.map((item, index) => {
              const isActive = item.label === '6-8';
              const height = 18 + (item.value / maxBucket) * 145;
              return (
                <View key={item.label} style={styles.chartBarCol}>
                  <View
                    style={[
                      styles.chartBar,
                      {
                        height,
                        backgroundColor: isActive
                          ? '#22C55E'
                          : index === 4
                            ? '#4ADE80'
                            : index === 2
                              ? '#86EFAC'
                              : index === 1
                                ? '#DCFCE7'
                                : '#F0FDF4',
                      },
                    ]}
                  />
                  <Text style={[styles.chartLabel, isActive && styles.chartLabelActive]}>
                    {item.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.studentsHeader}>
          <Text style={styles.studentsTitle}>Danh sách học sinh</Text>
          <View style={styles.filterChip}>
            <Ionicons name="filter-outline" size={13} color="#64748B" />
            <Text style={styles.filterChipText}>Điểm cao nhất</Text>
          </View>
        </View>

        <View style={styles.studentsList}>
          {visualizedStudents.map((student, index) => {
            const palette = BADGE_STYLES[student.badgeTone];

            return (
              <View
                key={student.id}
                style={[
                  styles.studentRow,
                  index !== visualizedStudents.length - 1 && styles.studentRowBorder,
                ]}
              >
                <View style={styles.studentLeft}>
                  <View
                    style={[
                      styles.avatar,
                      student.badgeTone === 'weak' || student.badgeTone === 'poor'
                        ? styles.avatarWarm
                        : styles.avatarCool,
                    ]}
                  >
                    <Text
                      style={[
                        styles.avatarText,
                        student.badgeTone === 'weak' || student.badgeTone === 'poor'
                          ? styles.avatarTextWarm
                          : styles.avatarTextCool,
                      ]}
                    >
                      {getInitials(student.name)}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <View style={styles.timeRow}>
                      <Ionicons name="time-outline" size={12} color="#94A3B8" />
                      <Text style={styles.studentTime}>{student.submittedAt}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.scoreWrap}>
                  <View style={[styles.scoreBadge, { backgroundColor: palette.bg }]}>
                    <Text style={[styles.scoreText, { color: palette.score }]}>
                      {student.score.toFixed(1)}
                    </Text>
                  </View>
                  <Text style={[styles.scoreLabel, { color: palette.label }]}>{student.badge}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.showAllButton}>
          <Text style={styles.showAllText}>
            Xem tất cả {fixture ? 45 : classItem.studentIds.length} học sinh
          </Text>
          <Ionicons name="chevron-down" size={14} color="#64748B" />
        </TouchableOpacity>
      </ScrollView>

      <SafeAreaView style={styles.footerSafe} edges={['bottom']}>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.exportButton}>
            <Ionicons name="download-outline" size={16} color={Colors.white} />
            <Text style={styles.exportButtonText}>Xuất báo cáo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  safeTop: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  headerTitle: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 110 },
  summaryGrid: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 16,
    padding: 21,
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  summaryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: { fontSize: 14, lineHeight: 20, fontWeight: '500', color: '#64748B' },
  summaryValue: {
    marginTop: 12,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    color: '#0F172A',
  },
  chartCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 16,
    padding: 21,
    marginBottom: 20,
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  chartTitle: { fontSize: 16, lineHeight: 24, fontWeight: '700', color: '#0F172A' },
  chartLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chartLinkText: { fontSize: 12, lineHeight: 16, fontWeight: '600', color: Colors.primary },
  chartBars: {
    height: 192,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  chartBarCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  chartBar: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  chartLabel: { fontSize: 11, lineHeight: 17, fontWeight: '600', color: '#94A3B8' },
  chartLabelActive: { color: '#16A34A', fontWeight: '700' },
  studentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  studentsTitle: { fontSize: 16, lineHeight: 24, fontWeight: '700', color: '#0F172A' },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: Colors.white,
  },
  filterChipText: { fontSize: 12, lineHeight: 16, color: '#64748B' },
  studentsList: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    marginHorizontal: -16,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  studentRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  studentLeft: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCool: { backgroundColor: '#DCFCE7' },
  avatarWarm: { backgroundColor: '#FFEDD5' },
  avatarText: { fontSize: 14, lineHeight: 20, fontWeight: '700' },
  avatarTextCool: { color: '#16A34A' },
  avatarTextWarm: { color: '#EA580C' },
  studentName: { fontSize: 14, lineHeight: 20, fontWeight: '700', color: '#0F172A' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  studentTime: { fontSize: 12, lineHeight: 16, color: '#64748B' },
  scoreWrap: { alignItems: 'flex-end', gap: 4 },
  scoreBadge: {
    minWidth: 56,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  scoreText: { fontSize: 16, lineHeight: 24, fontWeight: '700' },
  scoreLabel: { fontSize: 10, lineHeight: 15, fontWeight: '500' },
  showAllButton: {
    marginHorizontal: -16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.white,
    marginBottom: 16,
  },
  showAllText: { fontSize: 14, lineHeight: 20, fontWeight: '600', color: '#64748B' },
  footerSafe: { backgroundColor: 'transparent' },
  footer: { paddingHorizontal: 16, paddingBottom: 16, alignItems: 'center' },
  exportButton: {
    minWidth: 127,
    height: 44,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: 'rgba(34,197,94,0.2)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 4,
  },
  exportButtonText: { fontSize: 14, lineHeight: 20, fontWeight: '700', color: Colors.white },
});
