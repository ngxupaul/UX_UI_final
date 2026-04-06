import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Avatar, Card, Chip } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar name="Giáo Viên" size={48} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.greeting}>Xin chào! 👋</Text>
              <Text style={styles.userName}>Nguyễn Văn A</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsRow}>
          {[
            { label: 'Đề thi', value: '12', icon: 'document-text-outline' as const, color: Colors.primary },
            { label: 'Lớp học', value: '5', icon: 'people-outline' as const, color: Colors.info },
            { label: 'Học sinh', value: '148', icon: 'school-outline' as const, color: Colors.warning },
            { label: 'Hoàn thành', value: '89%', icon: 'checkmark-circle-outline' as const, color: Colors.success },
          ].map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: stat.color + '20' }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
        </View>
        <View style={styles.quickActions}>
          {[
            { label: 'Tạo đề thi', icon: 'add-outline' as const, bg: Colors.primaryLight, color: Colors.primary, onPress: () => navigation.navigate('TaoDeThi') },
            { label: 'Kho đề', icon: 'library-outline' as const, bg: '#DBEAFE', color: Colors.info, onPress: () => navigation.navigate('KhoDeDetail', { tab: 'open' }) },
            { label: 'AI Generator', icon: 'sparkles-outline' as const, bg: '#FEF3C7', color: Colors.warning, onPress: () => navigation.navigate('AIGenerator') },
            { label: 'Thống kê', icon: 'bar-chart-outline' as const, bg: '#EDE9FE', color: '#7C3AED', onPress: () => navigation.navigate('ThongKe') },
          ].map((action, i) => (
            <TouchableOpacity key={i} style={styles.quickAction} onPress={action.onPress}>
              <View style={[styles.quickActionIcon, { backgroundColor: action.bg }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Exams */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Đề thi gần đây</Text>
          <TouchableOpacity onPress={() => navigation.navigate('KhoDeDetail', { tab: 'open' })}>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        {[
          { id: '1', title: 'Toán học - HKI', subject: 'Toán', grade: 'Lớp 10', status: 'open', questions: 20, time: '60 phút' },
          { id: '2', title: 'Vật lý - HKII', subject: 'Vật lý', grade: 'Lớp 11', status: 'draft', questions: 15, time: '45 phút' },
          { id: '3', title: 'Hóa học - HKI', subject: 'Hóa', grade: 'Lớp 12', status: 'closed', questions: 25, time: '90 phút' },
        ].map((exam) => (
          <Card key={exam.id} style={styles.examCard} onPress={() => navigation.navigate('KhoDeDetail', { tab: exam.status as any })}>
            <View style={styles.examHeader}>
              <View>
                <Text style={styles.examTitle}>{exam.title}</Text>
                <Text style={styles.examMeta}>{exam.subject} · {exam.grade}</Text>
              </View>
              <Chip
                label={exam.status === 'open' ? 'Đang mở' : exam.status === 'draft' ? 'Bản nháp' : 'Đã đóng'}
                color={exam.status === 'open' ? Colors.success : exam.status === 'draft' ? Colors.warning : Colors.gray50}
                active
              />
            </View>
            <View style={styles.examFooter}>
              <View style={styles.examMetaRow}>
                <Ionicons name="help-circle-outline" size={14} color={Colors.gray50} />
                <Text style={styles.examMetaText}>{exam.questions} câu</Text>
              </View>
              <View style={styles.examMetaRow}>
                <Ionicons name="time-outline" size={14} color={Colors.gray50} />
                <Text style={styles.examMetaText}>{exam.time}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('PhatDe', { examId: exam.id })}>
                <Ionicons name="share-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBg },
  scroll: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  greeting: { fontSize: 13, color: Colors.textSecondary },
  userName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  iconBtn: { padding: 8, marginLeft: 4 },
  statsRow: { paddingHorizontal: 12, marginBottom: 8 },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    borderColor: Colors.gray20,
  },
  statIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  statValue: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  statLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  seeAll: { fontSize: 14, color: Colors.primary, fontWeight: '500' },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: Colors.gray20,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionLabel: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary, textAlign: 'center' },
  examCard: { marginHorizontal: 20, marginBottom: 12 },
  examHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  examTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  examMeta: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  examFooter: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  examMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  examMetaText: { fontSize: 12, color: Colors.gray50 },
});
