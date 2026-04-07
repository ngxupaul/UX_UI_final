import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'KhoDeDetail'>;
}

type TabKey = 'all' | 'open' | 'draft' | 'closed';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'open', label: 'Đang mở' },
  { key: 'draft', label: 'Bản nháp' },
  { key: 'closed', label: 'Đã đóng' },
];

const MOCK_EXAMS: Record<string, { id: string; title: string; subject: string; date: string; status: 'open' | 'draft' | 'closed'; subjectColor: string; studentCount: number }[]> = {
  open: [
    { id: '1', title: 'Kiểm tra 15 phút - Chương 1', subject: 'Địa lý 6', date: '20/10/2025', status: 'open', subjectColor: '#DCFCE7', studentCount: 45 },
  ],
  draft: [
    { id: '2', title: 'Đề thi giữa kỳ I - Hóa học', subject: 'Hóa học 10', date: '15/10/2025', status: 'draft', subjectColor: '#FFF7ED', studentCount: 0 },
  ],
  closed: [
    { id: '3', title: 'Ôn tập văn học hiện đại', subject: 'Ngữ Văn 11', date: '10/10/2025', status: 'closed', subjectColor: '#EFF6FF', studentCount: 38 },
  ],
};

const STATUS_STYLES = {
  open: { bg: '#ECFDF5', text: '#047857', dot: '#21C05D' },
  draft: { bg: '#FFF7ED', text: '#B45309', dot: '#F59E0B' },
  closed: { bg: '#F1F5F9', text: '#5C697B', dot: '#94A3B8' },
};

const STATUS_LABELS: Record<string, string> = {
  open: 'Đang mở',
  draft: 'Bản nháp',
  closed: 'Đã đóng',
};

export const KhoDeDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const initialTab = route.params?.tab || 'open';
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab as TabKey);
  const [search, setSearch] = useState('');

  const allExams = Object.values(MOCK_EXAMS).flat();
  const exams = activeTab === 'all' ? allExams : (MOCK_EXAMS[activeTab] || []);

  const filtered = exams.filter(
    (e) =>
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kho đề thi</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('TaoDeThi')}
          >
            <View style={styles.addBtnBg} />
            <Ionicons name="add" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color="#6C757D" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm đề thi, môn học"
            placeholderTextColor="#6C757D"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Pill Tabs */}
        <View style={styles.tabsWrap}>
          {TABS.filter((t) => t.key === 'all' || t.key === activeTab).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.pillTab, isActive && styles.pillTabActive]}
                onPress={() => setActiveTab(tab.key as TabKey)}
              >
                <Text style={[styles.pillTabText, isActive && styles.pillTabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Exam List */}
        <View style={styles.listWrap}>
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="folder-open-outline" size={48} color={Colors.gray30} />
              <Text style={styles.emptyText}>Không có đề thi nào</Text>
            </View>
          ) : (
            filtered.map((exam) => {
              const status = STATUS_STYLES[exam.status];
              return (
                <TouchableOpacity
                  key={exam.id}
                  style={styles.examCard}
                  onPress={() => navigation.navigate('SoanThaoCauHoi', { examId: exam.id })}
                  activeOpacity={0.8}
                >
                  <TouchableOpacity style={styles.moreBtn} onPress={() => {}}>
                    <Ionicons name="ellipsis-horizontal" size={20} color="#6C757D" />
                  </TouchableOpacity>
                  <View style={[styles.subjectBadge, { backgroundColor: exam.subjectColor }]}>
                    <Ionicons name="calculator-outline" size={22} color="#6C757D" />
                  </View>
                  <Text style={styles.examTitle}>{exam.title}</Text>
                  <Text style={styles.examSubject}>{exam.subject}</Text>
                  <Text style={styles.examDate}>{exam.date}</Text>
                  <View style={styles.examBottom}>
                    <View style={[styles.statusChip, { backgroundColor: status.bg }]}>
                      <View style={[styles.statusDot, { backgroundColor: status.dot }]} />
                      <Text style={[styles.statusText, { color: status.text }]}>
                        {STATUS_LABELS[exam.status]}
                      </Text>
                    </View>
                    {exam.studentCount > 0 && (
                      <View style={styles.studentCountWrap}>
                        <Ionicons name="people-outline" size={18} color="#6C757D" />
                        <Text style={styles.studentCountText}>{exam.studentCount} học sinh</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: Colors.screenBg,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.6 },
  addBtn: { width: 35, height: 35, alignItems: 'center', justifyContent: 'center' },
  addBtnBg: {
    position: 'absolute',
    width: 35, height: 35,
    borderRadius: 17.5,
    backgroundColor: Colors.primaryLight,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 17,
    marginTop: 4,
    paddingHorizontal: 14,
    height: 50,
    borderRadius: 12,
    gap: 12,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  tabsWrap: { flexDirection: 'row', paddingHorizontal: 17, marginTop: 15, gap: 6 },
  pillTab: {
    height: 40, borderRadius: 50,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 14,
  },
  pillTabActive: { backgroundColor: Colors.primary },
  pillTabText: { fontSize: 14, fontWeight: '500', color: '#8B9299' },
  pillTabTextActive: { fontWeight: '700', color: Colors.white },
  listWrap: { paddingHorizontal: 17, marginTop: 15, gap: 10 },
  examCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    position: 'relative',
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  moreBtn: { position: 'absolute', top: 10, right: 12, padding: 2, zIndex: 1 },
  subjectBadge: {
    width: 48, height: 48, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  examTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  examSubject: { fontSize: 12, color: '#6E6E6E', marginBottom: 2 },
  examDate: { fontSize: 12, color: '#6E6E6E', marginBottom: 10 },
  examBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusChip: {
    flexDirection: 'row', alignItems: 'center',
    height: 30, borderRadius: 5,
    paddingHorizontal: 10, gap: 5,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 14, fontWeight: '500' },
  studentCountWrap: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  studentCountText: { fontSize: 12, fontWeight: '500', color: '#6C757D' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 15, color: Colors.gray50, marginTop: 12 },
});