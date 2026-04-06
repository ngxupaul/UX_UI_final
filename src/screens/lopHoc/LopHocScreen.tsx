import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { SearchBar, Card, Avatar } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList, Class } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const MOCK_CLASSES: Class[] = [
  { id: '1', name: '10A1 - Toán nâng cao', studentCount: 42, examCount: 5, createdAt: '2025-09-01' },
  { id: '2', name: '11B2 - Vật lý', studentCount: 38, examCount: 3, createdAt: '2025-09-01' },
  { id: '3', name: '12C1 - Hóa học', studentCount: 40, examCount: 4, createdAt: '2025-09-01' },
  { id: '4', name: '10A2 - Ngữ văn', studentCount: 45, examCount: 2, createdAt: '2025-09-01' },
  { id: '5', name: '11B1 - Sinh học', studentCount: 35, examCount: 3, createdAt: '2025-09-01' },
];

export const LopHocScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filtered = MOCK_CLASSES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý lớp học</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Tìm kiếm lớp học..." />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('LopHocDetail', { classId: item.id })}>
            <View style={styles.cardContent}>
              <Avatar name={item.name} size={52} />
              <View style={styles.cardInfo}>
                <Text style={styles.className}>{item.name}</Text>
                <View style={styles.cardStats}>
                  <View style={styles.statBadge}>
                    <Ionicons name="people-outline" size={14} color={Colors.gray50} />
                    <Text style={styles.statText}>{item.studentCount} học sinh</Text>
                  </View>
                  <View style={styles.statBadge}>
                    <Ionicons name="document-text-outline" size={14} color={Colors.gray50} />
                    <Text style={styles.statText}>{item.examCount} đề thi</Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.gray50} />
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
  list: { paddingHorizontal: 20, paddingBottom: 120 },
  card: { marginBottom: 12 },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  cardInfo: { flex: 1, marginLeft: 12 },
  className: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 6 },
  cardStats: { flexDirection: 'row', gap: 12 },
  statBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 12, color: Colors.gray50 },
});
