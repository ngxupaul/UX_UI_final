import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Avatar, Card } from '../../components';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'LopHocDetail'>;
}

const MOCK_STUDENTS = [
  { id: '1', name: 'Trần Minh Đức', email: 'tmduc@school.edu.vn', status: 'completed' },
  { id: '2', name: 'Lê Thị Hương', email: 'lthuong@school.edu.vn', status: 'completed' },
  { id: '3', name: 'Nguyễn Hoàng Nam', email: 'nhnam@school.edu.vn', status: 'pending' },
  { id: '4', name: 'Phạm Thu Trang', email: 'pttrang@school.edu.vn', status: 'completed' },
  { id: '5', name: 'Đặng Quang Minh', email: 'dqminh@school.edu.vn', status: 'pending' },
];

export const LopHocDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState<'students' | 'exams' | 'results'>('students');
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết lớp học</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Class info */}
      <View style={styles.classInfo}>
        <Text style={styles.className}>10A1 - Toán nâng cao</Text>
        <Text style={styles.classMeta}>42 học sinh · 5 đề thi · 38 lượt làm</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {([
          { key: 'students' as const, label: 'Học sinh' },
          { key: 'exams' as const, label: 'Đề thi' },
          { key: 'results' as const, label: 'Kết quả' },
        ] as const).map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={isActive ? styles.tabActive : styles.tab}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={isActive ? styles.tabTextActive : styles.tabText}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tab Content */}
      {activeTab === 'students' && (
        <FlatList
          data={MOCK_STUDENTS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <View style={styles.studentRow}>
                <Avatar name={item.name} size={44} />
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.studentEmail}>{item.email}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'completed' ? Colors.primaryLight : Colors.gray20 }]}>
                  <Text style={[styles.statusText, { color: item.status === 'completed' ? Colors.primary : Colors.gray50 }]}>
                    {item.status === 'completed' ? 'Đã nộp' : 'Chưa nộp'}
                  </Text>
                </View>
              </View>
            </Card>
          )}
        />
      )}

      {activeTab === 'exams' && (
        <View style={styles.emptyTab}>
          <Ionicons name="document-text-outline" size={48} color={Colors.gray30} />
          <Text style={styles.emptyTabText}>Chưa có đề thi nào</Text>
        </View>
      )}

      {activeTab === 'results' && (
        <View style={styles.emptyTab}>
          <Ionicons name="analytics-outline" size={48} color={Colors.gray30} />
          <Text style={styles.emptyTabText}>Chưa có kết quả nào</Text>
        </View>
      )}
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
  headerTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  classInfo: { padding: 20, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.gray20 },
  className: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  classMeta: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  tabsRow: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: Colors.white },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { flex: 1, alignItems: 'center', paddingVertical: 8, borderBottomWidth: 2, borderBottomColor: Colors.primary },
  tabText: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  tabTextActive: { color: Colors.primary, fontWeight: '600' },
  list: { paddingHorizontal: 20, paddingVertical: 12, paddingBottom: 120 },
  card: { marginBottom: 10 },
  studentRow: { flexDirection: 'row', alignItems: 'center' },
  studentInfo: { flex: 1, marginLeft: 12 },
  studentName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  studentEmail: { fontSize: 12, color: Colors.textSecondary },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  emptyTab: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  emptyTabText: { fontSize: 15, color: Colors.gray50, marginTop: 12 },
});