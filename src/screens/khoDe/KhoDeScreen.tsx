import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { SearchBar, Chip, Card } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList, Exam } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const TABS = [
  { key: 'open', label: 'Đang mở' },
  { key: 'draft', label: 'Bản nháp' },
  { key: 'closed', label: 'Đã đóng' },
];

const MOCK_EXAMS: Exam[] = [
  { id: '1', title: 'Toán học - HKI', subject: 'Toán', grade: 'Lớp 10', duration: 60, status: 'open', questionCount: 20, createdAt: '2026-03-01', updatedAt: '2026-03-15' },
  { id: '2', title: 'Vật lý - HKII', subject: 'Vật lý', grade: 'Lớp 11', duration: 45, status: 'open', questionCount: 15, createdAt: '2026-02-20', updatedAt: '2026-03-10' },
  { id: '3', title: 'Ngữ văn - HKI', subject: 'Ngữ văn', grade: 'Lớp 12', duration: 90, status: 'open', questionCount: 30, createdAt: '2026-02-15', updatedAt: '2026-03-05' },
  { id: '4', title: 'Hóa học - HKI', subject: 'Hóa', grade: 'Lớp 12', duration: 60, status: 'draft', questionCount: 25, createdAt: '2026-03-10', updatedAt: '2026-03-12' },
  { id: '5', title: 'Sinh học - HKII', subject: 'Sinh', grade: 'Lớp 11', duration: 45, status: 'draft', questionCount: 20, createdAt: '2026-03-08', updatedAt: '2026-03-09' },
  { id: '6', title: 'Lịch sử - HKI', subject: 'Sử', grade: 'Lớp 10', duration: 60, status: 'closed', questionCount: 25, createdAt: '2026-01-10', updatedAt: '2026-02-01' },
  { id: '7', title: 'Địa lý - HKII', subject: 'Địa', grade: 'Lớp 11', duration: 45, status: 'closed', questionCount: 20, createdAt: '2026-01-05', updatedAt: '2026-01-28' },
];

export const KhoDeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'open' | 'draft' | 'closed'>('open');
  const [search, setSearch] = useState('');

  const filtered = MOCK_EXAMS.filter(
    (e) =>
      e.status === activeTab &&
      (e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.subject.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    if (status === 'open') return Colors.success;
    if (status === 'draft') return Colors.warning;
    return Colors.gray50;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Kho đề thi</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('TaoDeThi')}>
          <Ionicons name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <SearchBar value={search} onChangeText={setSearch} style={{ flex: 1 }} placeholder="Tìm kiếm đề thi..." />
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {TABS.map((tab) => (
          <Chip
            key={tab.key}
            label={tab.label}
            active={activeTab === tab.key}
            color={Colors.primary}
            onPress={() => setActiveTab(tab.key as any)}
            style={{ marginRight: 8 }}
          />
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={48} color={Colors.gray30} />
            <Text style={styles.emptyText}>Không có đề thi nào</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('KhoDeDetail', { tab: item.status })}>
            <View style={styles.cardTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMeta}>{item.subject} · {item.grade}</Text>
              </View>
              <Chip
                label={activeTab === 'open' ? 'Đang mở' : activeTab === 'draft' ? 'Bản nháp' : 'Đã đóng'}
                color={getStatusColor(item.status)}
                active
              />
            </View>
            <View style={styles.cardFooter}>
              <View style={styles.cardMetaRow}>
                <Ionicons name="help-circle-outline" size={14} color={Colors.gray50} />
                <Text style={styles.cardMetaText}>{item.questionCount} câu hỏi</Text>
              </View>
              <View style={styles.cardMetaRow}>
                <Ionicons name="time-outline" size={14} color={Colors.gray50} />
                <Text style={styles.cardMetaText}>{item.duration} phút</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('PhatDe', { examId: item.id })}
              >
                <Ionicons name="share-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            {/* Action buttons */}
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => navigation.navigate('SoanThaoCauHoi', { examId: item.id })}
              >
                <Ionicons name="create-outline" size={16} color={Colors.info} />
                <Text style={[styles.actionText, { color: Colors.info }]}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => navigation.navigate('ChinhSuaCauHoi', { examId: item.id, questionId: '1' })}
              >
                <Ionicons name="help-buoy-outline" size={16} color={Colors.warning} />
                <Text style={[styles.actionText, { color: Colors.warning }]}>Câu hỏi</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRow: { paddingHorizontal: 20, paddingVertical: 8 },
  tabsRow: { flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 8 },
  list: { paddingHorizontal: 20, paddingBottom: 120 },
  card: { marginBottom: 12 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  cardMeta: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardMetaText: { fontSize: 12, color: Colors.gray50 },
  cardActions: { flexDirection: 'row', marginTop: 12, borderTopWidth: 1, borderTopColor: Colors.gray20, paddingTop: 10, gap: 24 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { fontSize: 13, fontWeight: '500' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 15, color: Colors.gray50, marginTop: 12 },
});
