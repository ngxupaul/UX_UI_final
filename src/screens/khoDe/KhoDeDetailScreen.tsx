import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Chip, Card } from '../../components';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'KhoDeDetail'>;
}

const MOCK_DETAIL_EXAMS = {
  open: [
    { id: '1', title: 'Toán học - HKI', subject: 'Toán', grade: 'Lớp 10', questions: 20, duration: 60 },
    { id: '2', title: 'Vật lý - HKII', subject: 'Vật lý', grade: 'Lớp 11', questions: 15, duration: 45 },
  ],
  draft: [
    { id: '3', title: 'Hóa học - HKI', subject: 'Hóa', grade: 'Lớp 12', questions: 25, duration: 60 },
    { id: '4', title: 'Sinh học - HKII', subject: 'Sinh', grade: 'Lớp 11', questions: 20, duration: 45 },
  ],
  closed: [
    { id: '5', title: 'Lịch sử - HKI', subject: 'Sử', grade: 'Lớp 10', questions: 25, duration: 60 },
    { id: '6', title: 'Địa lý - HKII', subject: 'Địa', grade: 'Lớp 11', questions: 20, duration: 45 },
  ],
};

const TAB_LABELS = { open: 'Đang mở', draft: 'Bản nháp', closed: 'Đã đóng' };

export const KhoDeDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const initialTab = route.params?.tab || 'open';
  const [activeTab, setActiveTab] = useState<'open' | 'draft' | 'closed'>(initialTab);
  const exams = MOCK_DETAIL_EXAMS[activeTab];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Kho đề thi</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TaoDeThi')}>
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {(['open', 'draft', 'closed'] as const).map((tab) => (
          <Chip
            key={tab}
            label={TAB_LABELS[tab]}
            active={activeTab === tab}
            color={Colors.primary}
            onPress={() => setActiveTab(tab)}
            style={{ marginRight: 8 }}
          />
        ))}
      </View>

      {/* List */}
      <FlatList
        data={exams}
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
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>{item.subject} · {item.grade}</Text>
            <View style={styles.cardFooter}>
              <View style={styles.cardMetaRow}>
                <Ionicons name="help-circle-outline" size={14} color={Colors.gray50} />
                <Text style={styles.cardMetaText}>{item.questions} câu</Text>
              </View>
              <View style={styles.cardMetaRow}>
                <Ionicons name="time-outline" size={14} color={Colors.gray50} />
                <Text style={styles.cardMetaText}>{item.duration} phút</Text>
              </View>
            </View>
            <View style={styles.actions}>
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
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => navigation.navigate('PhatDe', { examId: item.id })}
              >
                <Ionicons name="share-outline" size={16} color={Colors.primary} />
                <Text style={[styles.actionText, { color: Colors.primary }]}>Phát đề</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray20,
  },
  title: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  tabsRow: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12 },
  list: { paddingHorizontal: 20, paddingBottom: 120 },
  card: { marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  cardMeta: { fontSize: 13, color: Colors.textSecondary, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', gap: 16, marginBottom: 10 },
  cardMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardMetaText: { fontSize: 12, color: Colors.gray50 },
  actions: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: Colors.gray20, paddingTop: 10, gap: 20 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { fontSize: 13, fontWeight: '500' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 15, color: Colors.gray50, marginTop: 12 },
});
