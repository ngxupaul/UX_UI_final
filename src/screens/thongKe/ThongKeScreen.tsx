import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const STUDENTS = [
  { id: '1', name: 'Trần Thị Bích Ngọc', initials: null, avatar: 'https://www.figma.com/api/mcp/asset/b3bff294-d025-48e2-bec7-f25aeb9942c0', score: 9.5, grade: 'Xuất sắc', gradeColor: '#16A34A', bgColor: '#DCFCE7', time: '09:15 AM' },
  { id: '2', name: 'Lê Minh', initials: 'LM', avatar: null, score: 8.8, grade: 'Giỏi', gradeColor: '#16A34A', bgColor: '#DCFCE7', time: '09:20 AM' },
  { id: '3', name: 'Nguyễn Văn An', initials: null, avatar: 'https://www.figma.com/api/mcp/asset/73a3eaa9-8ed5-409f-8335-6eaa55cf1124', score: 7.5, grade: 'Khá', gradeColor: '#16A34A', bgColor: '#F0FDF4', time: '10:05 AM' },
  { id: '4', name: 'Trần Hùng', initials: 'TH', avatar: null, score: 4.5, grade: 'Yếu', gradeColor: '#EF4444', bgColor: '#FEF2F2', time: '10:45 AM' },
  { id: '5', name: 'Phạm Văn Cường', initials: null, avatar: 'https://www.figma.com/api/mcp/asset/af50f0e6-786a-4341-a183-f85bc123b9f6', score: 3.0, grade: 'Kém', gradeColor: '#DC2626', bgColor: '#FEE2E2', time: '11:00 AM' },
];

// Score distribution bars — max height 192px
const SCORE_DIST = [
  { range: '0-2', count: 2, maxCount: 28, color: '#F0FDF4' },
  { range: '2-4', count: 8, maxCount: 28, color: '#DCFCE7' },
  { range: '4-6', count: 15, maxCount: 28, color: '#86EFAC' },
  { range: '6-8', count: 28, maxCount: 28, color: Colors.primary },
  { range: '8-10', count: 12, maxCount: 28, color: '#4ADE80' },
];

export const ThongKeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thống kê lớp 6A1</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => Alert.alert('Thông báo', 'Chức năng đang phát triển')}
          >
            <Ionicons name="filter-outline" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="ellipsis-horizontal" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <View style={[styles.statCircle, { backgroundColor: Colors.primaryLight }]} />
            </View>
            <Text style={styles.statLabel}>Trung bình</Text>
            <Text style={styles.statValue}>7.8</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <View style={[styles.statCircle, { backgroundColor: Colors.primaryLight }]} />
            </View>
            <Text style={styles.statLabel}>Tỉ lệ đạt</Text>
            <Text style={styles.statValue}>85%</Text>
          </View>
        </View>

        {/* Score Distribution Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Phân phối điểm số</Text>
            <TouchableOpacity
              style={styles.detailBtn}
              onPress={() => Alert.alert('Thông báo', 'Chức năng đang phát triển')}
            >
              <Text style={styles.detailBtnText}>Chi tiết</Text>
              <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Bar Chart */}
          <View style={styles.barChart}>
            {SCORE_DIST.map((bar, i) => (
              <View key={i} style={styles.barCol}>
                <View style={styles.barWrap}>
                  <View
                    style={[
                      styles.bar,
                      {
                        backgroundColor: bar.color,
                        height: Math.round((bar.count / bar.maxCount) * 192),
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.barLabel, i === 3 && styles.barLabelActive]}>
                  {bar.range}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Student List */}
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Danh sách học sinh</Text>
            <TouchableOpacity
              style={styles.sortBtn}
              onPress={() => Alert.alert('Thông báo', 'Chức năng đang phát triển')}
            >
              <Ionicons name="swap-vertical" size={14} color="#475569" />
              <Text style={styles.sortBtnText}>Điểm cao nhất</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.studentCard}>
            {STUDENTS.map((student, i) => (
              <View key={student.id}>
                {i > 0 && <View style={styles.studentDivider} />}
                <View style={styles.studentRow}>
                  <View style={styles.studentLeft}>
                    {student.avatar ? (
                      <Image source={{ uri: student.avatar }} style={styles.studentAvatar} />
                    ) : (
                      <View style={[styles.studentAvatarInit, { backgroundColor: student.bgColor }]}>
                        <Text style={[styles.studentInitials, { color: student.gradeColor }]}>
                          {student.initials}
                        </Text>
                      </View>
                    )}
                    <View style={styles.studentInfo}>
                      <Text style={styles.studentName}>{student.name}</Text>
                      <View style={styles.studentTimeRow}>
                        <Ionicons name="time-outline" size={11.7} color={Colors.textSecondary} />
                        <Text style={styles.studentTime}>{student.time}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.scoreWrap}>
                    <View style={[styles.scoreBadge, { backgroundColor: student.bgColor }]}>
                      <Text style={[styles.scoreValue, { color: '#15803D' }]}>
                        {student.score}
                      </Text>
                    </View>
                    <Text style={[styles.gradeLabel, { color: student.gradeColor }]}>
                      {student.grade}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* View all */}
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => Alert.alert('Thông báo', 'Danh sách đầy đủ đang được tải...')}
          >
            <Text style={styles.viewAllText}>Xem tất cả 45 học sinh</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Export FAB */}
      <TouchableOpacity
        style={styles.exportFab}
        onPress={() => Alert.alert('Thông báo', 'Báo cáo đang được xuất...')}
      >
        <Ionicons name="download-outline" size={16} color={Colors.white} />
        <Text style={styles.exportFabText}>Xuất báo cáo</Text>
      </TouchableOpacity>
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
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 21,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  statIconWrap: { marginBottom: 4 },
  statCircle: { width: 40, height: 40, borderRadius: 20 },
  statLabel: { fontSize: 14, fontWeight: '500', color: Colors.textSecondary, marginBottom: 12 },
  statValue: { fontSize: 30, fontWeight: '700', color: Colors.textPrimary },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 21,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
    marginBottom: 24,
  },
  chartTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 4,
  },
  detailBtnText: { fontSize: 12, fontWeight: '600', color: Colors.primary },
  barChart: {
    flexDirection: 'row',
    height: 192,
    gap: 12,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
  },
  barWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 8,
  },
  barLabelActive: { color: '#16A34A' },
  listSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  listTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.white,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sortBtnText: { fontSize: 12, fontWeight: '600', color: '#475569' },
  studentCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  studentLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  studentAvatarInit: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentInitials: { fontSize: 14, fontWeight: '700' },
  studentInfo: {},
  studentName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  studentTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  studentTime: { fontSize: 12, color: Colors.textSecondary },
  studentDivider: { height: 1, backgroundColor: '#F8FAFC', marginLeft: 80 },
  scoreWrap: { alignItems: 'flex-end', gap: 4 },
  scoreBadge: {
    height: 36,
    minWidth: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  scoreValue: { fontSize: 16, fontWeight: '700' },
  gradeLabel: { fontSize: 10, fontWeight: '500' },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  viewAllText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  exportFab: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
    shadowColor: 'rgba(34,197,94,0.3)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 8,
  },
  exportFabText: { fontSize: 14, fontWeight: '700', color: Colors.white },
});