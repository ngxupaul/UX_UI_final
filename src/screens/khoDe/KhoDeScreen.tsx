import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList, Exam } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

type TabKey = 'all' | 'open' | 'draft' | 'closed';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'open', label: 'Đang mở' },
  { key: 'draft', label: 'Bản nháp' },
  { key: 'closed', label: 'Đã đóng' },
];

const MOCK_EXAMS: (Exam & { subjectColor: string; studentCount?: number; aiBadge?: boolean })[] = [
  {
    id: '1',
    title: 'Kiểm tra 15 phút - Chương 1',
    subject: 'Toán học 12',
    grade: '12',
    duration: 15,
    status: 'open',
    questionCount: 0,
    createdAt: '20/10/2025',
    updatedAt: '20/10/2025',
    subjectColor: '#DCFCE7',
    studentCount: 45,
  },
  {
    id: '2',
    title: 'Đề thi giữa kỳ I - Hóa học',
    subject: 'Hóa học 10',
    grade: '10',
    duration: 45,
    status: 'draft',
    questionCount: 0,
    createdAt: '15/10/2025',
    updatedAt: '15/10/2025',
    subjectColor: '#FFF7ED',
  },
  {
    id: '3',
    title: 'Ôn tập văn học hiện đại',
    subject: 'Ngữ Văn 11',
    grade: '11',
    duration: 90,
    status: 'closed',
    questionCount: 0,
    createdAt: '10/10/2025',
    updatedAt: '10/10/2025',
    subjectColor: '#EFF6FF',
  },
  {
    id: '4',
    title: 'Đề thi Tiếng Anh (AI)',
    subject: 'Tiếng Anh 12',
    grade: '12',
    duration: 60,
    status: 'draft',
    questionCount: 0,
    createdAt: 'Vừa tạo',
    updatedAt: 'Vừa tạo',
    subjectColor: '#C4EDD4',
    aiBadge: true,
  },
];

const STATUS_STYLES = {
  open: { bg: '#ECFDF5', text: '#047857', dot: '#21C05D' },
  draft: { bg: '#FFF7ED', text: '#B45309', dot: '#F59E0B' },
  closed: { bg: '#F1F5F9', text: '#5C697B', dot: '#94A3B8' },
};

const STATUS_LABELS = { open: 'Đang mở', draft: 'Bản nháp', closed: 'Đã đóng' };

// Subject icon map
const SUBJECT_ICONS: Record<string, string> = {
  'Toán': 'calculator',
  'Hóa': 'flask',
  'Văn': 'book',
  'Anh': 'language',
  'Sử': 'time',
  'Địa': 'globe',
  'Lý': 'flash',
  'Sinh': 'leaf',
};

export const KhoDeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_EXAMS.filter((e) => {
    const tabMatch = activeTab === 'all' || e.status === activeTab;
    const searchMatch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase());
    return tabMatch && searchMatch;
  });

  const getSubjectIcon = (subject: string): string => {
    for (const [key, icon] of Object.entries(SUBJECT_ICONS)) {
      if (subject.includes(key)) return icon;
    }
    return 'document-text';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
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
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.pillTab, isActive && styles.pillTabActive]}
                onPress={() => setActiveTab(tab.key)}
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
          {filtered.map((exam) => {
            const status = STATUS_STYLES[exam.status];
            const subjectLower = exam.subject.toLowerCase();
            const iconName = Object.entries(SUBJECT_ICONS).reduce<string>((acc, [k, v]) => {
              if (subjectLower.includes(k.toLowerCase())) return v;
              return acc;
            }, 'document-text');

            return (
              <TouchableOpacity
                key={exam.id}
                style={[
                  styles.examCard,
                  exam.aiBadge && styles.examCardAi,
                ]}
                onPress={() => navigation.navigate('KhoDeDetail', { tab: exam.status })}
                activeOpacity={0.8}
              >
                {/* More button */}
                <TouchableOpacity style={styles.moreBtn} onPress={() => {}}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#6C757D" />
                </TouchableOpacity>

                {/* Subject icon badge */}
                <View style={[styles.subjectBadge, { backgroundColor: exam.subjectColor }]}>
                  <Ionicons
                    name={iconName as any}
                    size={22}
                    color={exam.aiBadge ? Colors.primary : '#6C757D'}
                  />
                </View>

                {/* Main info */}
                <Text style={styles.examTitle}>{exam.title}</Text>
                <Text style={styles.examSubject}>{exam.subject}</Text>
                <Text style={styles.examDate}>{exam.createdAt}</Text>

                {/* Bottom row */}
                <View style={styles.examBottom}>
                  {/* Status chip */}
                  <View style={[styles.statusChip, { backgroundColor: status.bg }]}>
                    <View style={[styles.statusDot, { backgroundColor: status.dot }]} />
                    <Text style={[styles.statusText, { color: status.text }]}>
                      {STATUS_LABELS[exam.status]}
                    </Text>
                  </View>

                  {/* Student count or AI badge */}
                  {exam.aiBadge ? (
                    <View style={styles.aiBadgeWrap}>
                      <Ionicons name="bulb" size={18} color={Colors.primary} />
                      <Text style={styles.aiBadgeText}>Tạo bởi AI</Text>
                    </View>
                  ) : exam.studentCount ? (
                    <View style={styles.studentCountWrap}>
                      <Ionicons name="people-outline" size={18} color="#6C757D" />
                      <Text style={styles.studentCountText}>{exam.studentCount} học sinh</Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
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
    backgroundColor: Colors.screenBg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.6,
  },
  addBtn: { width: 35, height: 35, alignItems: 'center', justifyContent: 'center' },
  addBtnBg: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: Colors.primaryLight,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 17,
    marginTop: 12,
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  tabsWrap: {
    flexDirection: 'row',
    paddingHorizontal: 17,
    marginTop: 15,
    gap: 6,
  },
  pillTab: {
    height: 40,
    borderRadius: 50,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  pillTabActive: {
    backgroundColor: Colors.primary,
  },
  pillTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B9299',
  },
  pillTabTextActive: {
    fontWeight: '700',
    color: Colors.white,
  },
  listWrap: {
    paddingHorizontal: 17,
    marginTop: 15,
    gap: 10,
  },
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
  examCardAi: {
    borderWidth: 1,
    borderColor: 'rgba(33,196,93,0.2)',
  },
  moreBtn: {
    position: 'absolute',
    top: 10,
    right: 12,
    padding: 2,
    zIndex: 1,
  },
  subjectBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  examSubject: {
    fontSize: 12,
    color: '#6E6E6E',
    marginBottom: 2,
  },
  examDate: {
    fontSize: 12,
    color: '#6E6E6E',
    marginBottom: 10,
  },
  examBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    borderRadius: 5,
    paddingHorizontal: 10,
    gap: 5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  studentCountWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  studentCountText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6C757D',
  },
  aiBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  aiBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
  },
});