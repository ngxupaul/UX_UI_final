import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Card } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const STATS = [
  { label: 'Tổng đề thi', value: '12', icon: 'document-text-outline' as const, color: Colors.primary },
  { label: 'Đề đang mở', value: '5', icon: 'play-circle-outline' as const, color: Colors.success },
  { label: 'Tổng lượt làm', value: '1,248', icon: 'people-outline' as const, color: Colors.info },
  { label: 'Điểm trung bình', value: '7.8', icon: 'trending-up-outline' as const, color: Colors.warning },
];

const CLASS_STATS = [
  { name: '10A1', avgScore: 8.2, completion: '92%', exams: 5 },
  { name: '11B2', avgScore: 7.5, completion: '85%', exams: 3 },
  { name: '12C1', avgScore: 7.9, completion: '88%', exams: 4 },
  { name: '10A2', avgScore: 6.8, completion: '75%', exams: 2 },
];

export const ThongKeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thống kê & Phân tích</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          {/* Overview stats */}
          <View style={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <View key={i} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Score distribution */}
          <Card style={styles.chartCard}>
            <Text style={styles.cardTitle}>Phân bố điểm</Text>
            <View style={styles.barChart}>
              {[
                { range: '0-4', value: 0.05, color: Colors.error },
                { range: '5-6', value: 0.15, color: Colors.warning },
                { range: '7-8', value: 0.40, color: Colors.info },
                { range: '9-10', value: 0.40, color: Colors.success },
              ].map((bar, i) => (
                <View key={i} style={styles.barRow}>
                  <Text style={styles.barLabel}>{bar.range}</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${bar.value * 100}%`, backgroundColor: bar.color }]} />
                  </View>
                  <Text style={styles.barPct}>{Math.round(bar.value * 100)}%</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Class breakdown */}
          <Text style={styles.sectionTitle}>Theo lớp học</Text>
          {CLASS_STATS.map((cls, i) => (
            <Card key={i} style={styles.classCard}>
              <View style={styles.classHeader}>
                <Text style={styles.className}>{cls.name}</Text>
                <View style={styles.classBadge}>
                  <Text style={styles.classBadgeText}>{cls.completion} hoàn thành</Text>
                </View>
              </View>
              <View style={styles.classStats}>
                <View style={styles.classStat}>
                  <Text style={styles.classStatValue}>{cls.avgScore}</Text>
                  <Text style={styles.classStatLabel}>Điểm TB</Text>
                </View>
                <View style={styles.classStat}>
                  <Text style={styles.classStatValue}>{cls.exams}</Text>
                  <Text style={styles.classStatLabel}>Đề thi</Text>
                </View>
                <TouchableOpacity style={styles.viewBtn}>
                  <Text style={styles.viewBtnText}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray20,
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  content: { padding: 20 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.gray20,
    alignItems: 'center',
  },
  statIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  statValue: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  statLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  chartCard: { marginTop: 20 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  barChart: {},
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  barLabel: { fontSize: 12, color: Colors.textSecondary, width: 36 },
  barTrack: { flex: 1, height: 12, backgroundColor: Colors.gray20, borderRadius: 6, marginHorizontal: 8 },
  barFill: { height: '100%', borderRadius: 6 },
  barPct: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary, width: 32, textAlign: 'right' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginTop: 24, marginBottom: 12 },
  classCard: { marginBottom: 12 },
  classHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  className: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  classBadge: { backgroundColor: Colors.primaryLight, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  classBadgeText: { fontSize: 12, color: Colors.primary, fontWeight: '500' },
  classStats: { flexDirection: 'row', alignItems: 'center' },
  classStat: { marginRight: 24 },
  classStatValue: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  classStatLabel: { fontSize: 11, color: Colors.textSecondary },
  viewBtn: { marginLeft: 'auto', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: Colors.primary },
  viewBtnText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
});