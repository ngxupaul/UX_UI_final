import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Avatar } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar name="Thầy Nam" size={48} />
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Xin chào,</Text>
              <Text style={styles.userName}>Thầy Nam</Text>
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

        {/* Banner Card */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Tạo đề thi mới</Text>
            <Text style={styles.bannerSub}>Sử dụng AI để tạo đề thi trong 30s</Text>
            <TouchableOpacity
              style={styles.bannerBtn}
              onPress={() => navigation.navigate('AIGenerator')}
            >
              <Ionicons name="bulb-outline" size={20} color={Colors.white} />
              <Text style={styles.bannerBtnText}>Bắt đầu ngay</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerIcon}>
            <Ionicons name="sparkles" size={56} color={Colors.white} />
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Tổng đề thi', value: '24', color: Colors.primary },
            { label: 'Đang mở', value: '06', color: Colors.info },
            { label: 'Lượt làm bài', value: '160', color: Colors.warning },
          ].map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <View style={styles.statIconWrap}>
                <View style={[styles.statCircle, { backgroundColor: stat.color + '20' }]} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Class Performance */}
        <View style={styles.perfCard}>
          <View style={styles.perfHeader}>
            <Text style={styles.perfTitle}>Hiệu suất lớp học</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ThongKe')}>
              <Text style={styles.perfDetail}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.perfBody}>
            <View style={styles.perfLeft}>
              <View style={styles.passCircle}>
                <Text style={styles.passPercent}>80%</Text>
              </View>
              <Text style={styles.passLabel}>PASS RATE</Text>
            </View>
            <View style={styles.perfRight}>
              {[
                { color: Colors.success, label: 'Đạt (Pass)', value: '128' },
                { color: Colors.gray50, label: 'Chưa đạt', value: '32' },
              ].map((item, i) => (
                <View key={i} style={styles.perfRow}>
                  <View style={[styles.perfDot, { backgroundColor: item.color }]} />
                  <Text style={styles.perfRowLabel}>{item.label}</Text>
                  <Text style={styles.perfRowValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Hoạt động gần đây</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          {[
            {
              avatar: 'NV',
              name: 'Nguyễn Văn A',
              action: 'vừa nộp bài "Kiểm tra 15 phút"',
              time: '2 phút trước',
              icon: 'checkmark-circle',
              iconColor: Colors.success,
              bg: Colors.successBg,
            },
            {
              avatar: 'AI',
              name: 'Đề thi',
              action: 'Toán Chương 1 đã được tạo thành công',
              time: '15 phút trước',
              icon: 'bulb',
              iconColor: Colors.warning,
              bg: Colors.warningBg,
            },
            {
              avatar: '+3',
              name: '3 học sinh mới',
              action: 'đã tham gia lớp 12A1',
              time: '15 phút trước',
              icon: 'people',
              iconColor: Colors.primary,
              bg: Colors.primaryBg,
            },
          ].map((item, i) => (
            <View key={i} style={styles.activityCard}>
              <View style={styles.activityAvatarWrap}>
                <View style={styles.activityAvatar}>
                  <Text style={styles.activityAvatarText}>{item.avatar}</Text>
                </View>
                <View style={[styles.activityIconBadge, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon as any} size={16} color={item.iconColor} />
                </View>
              </View>
              <View style={styles.activityText}>
                <Text style={styles.activityName}>{item.name}</Text>
                <Text style={styles.activityAction}>{item.action}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </View>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerText: {},
  greeting: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  userName: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconBtn: { padding: 8 },
  bannerCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bannerContent: { flex: 1 },
  bannerTitle: { fontSize: 18, fontWeight: '700', color: Colors.white, marginBottom: 4 },
  bannerSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 12 },
  bannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  bannerBtnText: { fontSize: 13, fontWeight: '600', color: Colors.white },
  bannerIcon: { alignSelf: 'flex-end', opacity: 0.3 },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  statIconWrap: { marginBottom: 8 },
  statCircle: { width: 36, height: 36, borderRadius: 18 },
  statValue: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  statLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: '500' },
  perfCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
  },
  perfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  perfTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  perfDetail: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  perfBody: { flexDirection: 'row', alignItems: 'center' },
  perfLeft: { alignItems: 'center', marginRight: 24 },
  passCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  passPercent: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  passLabel: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600', letterSpacing: 1 },
  perfRight: { flex: 1 },
  perfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  perfDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  perfRowLabel: { flex: 1, fontSize: 13, color: Colors.textSecondary },
  perfRowValue: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  activitySection: { marginTop: 20, paddingHorizontal: 16 },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  seeAll: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  activityAvatarWrap: { marginRight: 12, position: 'relative' },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityAvatarText: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary },
  activityIconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  activityText: { flex: 1 },
  activityName: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, marginBottom: 2 },
  activityAction: { fontSize: 13, color: Colors.textPrimary, marginBottom: 2 },
  activityTime: { fontSize: 11, color: Colors.textMuted },
});
