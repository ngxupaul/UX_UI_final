import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const MOCK_CLASSES = [
  { id: '1', name: 'Lớp 10A1', studentCount: 42, examCount: 3 },
  { id: '2', name: 'Lớp 10A2', studentCount: 40, examCount: 2 },
  { id: '3', name: 'Lớp 11A1', studentCount: 38, examCount: 4 },
  { id: '4', name: 'Lớp 12A1', studentCount: 35, examCount: 5 },
];

export const LopHocScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filtered = MOCK_CLASSES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Quản lý lớp học</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => Alert.alert('Thông báo', 'Chức năng đang phát triển')}
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

        {/* Class List */}
        <View style={styles.listWrap}>
          {filtered.map((cls) => (
            <TouchableOpacity
              key={cls.id}
              style={styles.classCard}
              onPress={() => navigation.navigate('LopHocDetail', { classId: cls.id })}
              activeOpacity={0.8}
            >
              {/* More button */}
              <TouchableOpacity style={styles.moreBtn} onPress={() => {}}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#6C757D" />
              </TouchableOpacity>

              {/* Avatar with gradient */}
              <View style={styles.avatarWrap}>
                <View style={styles.avatarBadge}>
                  <Ionicons name="school" size={22} color={Colors.white} />
                </View>
              </View>

              {/* Info */}
              <Text style={styles.className}>{cls.name}</Text>

              {/* Stats row */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="people-outline" size={14} color="#3D4A3D" />
                  <Text style={styles.statText}>{cls.studentCount} Học sinh</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="document-text-outline" size={14} color="#3D4A3D" />
                  <Text style={styles.statText}>{cls.examCount} Bài kiểm tra</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => Alert.alert('Thông báo', 'Chức năng đang phát triển')}
      >
        <Ionicons name="add" size={24} color={Colors.white} />
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
    paddingHorizontal: 17,
    paddingTop: 12,
    paddingBottom: 8,
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  listWrap: {
    paddingHorizontal: 17,
    marginTop: 16,
    gap: 10,
  },
  classCard: {
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
  moreBtn: {
    position: 'absolute',
    top: 13,
    right: 12,
    padding: 2,
    zIndex: 1,
  },
  avatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(240,253,244,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  avatarBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3D4A3D',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(34,197,94,0.4)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
});