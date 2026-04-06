import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

export const KetQuaBaiThiScreen: React.FC<Props> = ({ navigation }) => {
  const score = 8.5;
  const total = 10;
  const correct = 17;
  const wrong = 2;
  const skipped = 1;
  const percentage = Math.round((score / total) * 100);

  const gradeColor = '#16A34A';

  return (
    <View style={styles.wrapper}>
      {/* Status Bar */}
      <SafeAreaView style={styles.statusBarArea} edges={['top']}>
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>12:34</Text>
          <View style={styles.statusIcons}>
            <View style={styles.wifiIcon} />
            <View style={styles.signalIcon} />
            <View style={styles.batteryIcon} />
          </View>
        </View>
      </SafeAreaView>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Ionicons name="chevron-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kết quả bài thi</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <View style={styles.scrollWrapper}>
        {/* Score Circle */}
        <View style={styles.scoreSection}>
          {/* Glow */}
          <View style={styles.scoreGlow} />
          {/* Circle */}
          <View style={styles.scoreCircle}>
            <Text style={[styles.scoreValue, { color: gradeColor }]}>{score}</Text>
            <Text style={styles.scoreTotal}>/{total}</Text>
          </View>
          <Text style={styles.scoreLabel}>Tuyệt vời!</Text>
          <Text style={styles.scoreSubtext}>
            Bạn đã nắm vững kiến thức cơ bản. Hãy tiếp tục phát huy nhé!
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statCardGreen]}>
            <Text style={styles.statValue}>17</Text>
            <Text style={styles.statLabel}>Đúng</Text>
          </View>
          <View style={[styles.statCard, styles.statCardRed]}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Sai</Text>
          </View>
          <View style={[styles.statCard, styles.statCardGray]}>
            <Text style={styles.statValue}>1</Text>
            <Text style={styles.statLabel}>Bỏ qua</Text>
          </View>
        </View>

        {/* Detail Section */}
        <View style={styles.detailSection}>
          <View style={styles.detailHeader}>
            <Text style={styles.detailTitle}>Chi tiết điểm số</Text>
            <TouchableOpacity>
              <Text style={styles.detailLink}>Xem biểu đồ</Text>
            </TouchableOpacity>
          </View>

          {/* Subject breakdown */}
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownSubject}>Đại số</Text>
              <Text style={styles.breakdownScore}>8/10</Text>
              <View style={styles.breakdownBarTrack}>
                <View style={[styles.breakdownBarFill, { width: '80%' }]} />
              </View>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownSubject}>Hình học</Text>
              <Text style={styles.breakdownScore}>9/10</Text>
              <View style={styles.breakdownBarTrack}>
                <View style={[styles.breakdownBarFill, styles.breakdownBarFillTeal, { width: '90%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnPrimary}>
            <Ionicons name="document-text-outline" size={18} color={Colors.white} />
            <Text style={styles.btnPrimaryText}>Xem lại bài làm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.btnOutlineText}>Về trang chủ</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Nav placeholder */}
        <View style={styles.bottomNavBar}>
          <TouchableOpacity style={styles.navTab}>
            <Ionicons name="home-outline" size={22} color={Colors.textSecondary} />
            <Text style={styles.navTabText}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navTab, styles.navTabActive]}>
            <View style={styles.navTabActiveDot} />
            <Ionicons name="document-text" size={22} color={Colors.primary} />
            <Text style={[styles.navTabText, styles.navTabTextActive]}>Bài thi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
            <Text style={styles.navTabText}>Thông báo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab}>
            <Ionicons name="person-outline" size={22} color={Colors.textSecondary} />
            <Text style={styles.navTabText}>Cá nhân</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.white },
  statusBarArea: { backgroundColor: Colors.white },
  statusBar: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
  },
  statusTime: { fontSize: 15, fontWeight: '600', color: '#000' },
  statusIcons: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  wifiIcon: { width: 14, height: 14, backgroundColor: '#000', borderRadius: 3 },
  signalIcon: { width: 10, height: 14, backgroundColor: '#000', borderRadius: 2 },
  batteryIcon: { width: 22, height: 10, borderWidth: 1, borderColor: '#000', borderRadius: 2 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  scrollWrapper: { flex: 1 },
  scoreSection: { alignItems: 'center', paddingVertical: 32 },
  scoreGlow: {
    position: 'absolute',
    top: 0,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(74,222,128,0.1)',
    top: 16,
  },
  scoreCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  scoreValue: { fontSize: 56, fontWeight: '800', letterSpacing: -2 },
  scoreTotal: { fontSize: 24, fontWeight: '600', color: '#94A3B8', marginTop: 10 },
  scoreLabel: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16A34A',
    marginBottom: 6,
  },
  scoreSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 17,
    alignItems: 'center',
  },
  statCardGreen: { backgroundColor: '#EEFCF6', borderWidth: 1, borderColor: 'rgba(220,252,231,0.5)' },
  statCardRed: { backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: 'rgba(254,226,226,0.5)' },
  statCardGray: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#F1F5F9' },
  statValue: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  detailSection: { paddingHorizontal: 20 },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  detailLink: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
  breakdownCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  breakdownSubject: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, width: 80 },
  breakdownScore: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, width: 40 },
  breakdownBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.gray20,
    borderRadius: 3,
    overflow: 'hidden',
  },
  breakdownBarFill: { height: '100%', backgroundColor: Colors.success, borderRadius: 3 },
  breakdownBarFillTeal: { backgroundColor: '#14B8A6' },
  actions: { paddingHorizontal: 20, paddingTop: 24, gap: 12 },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 14,
    shadowColor: 'rgba(33,196,93,0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  btnPrimaryText: { fontSize: 15, fontWeight: '700', color: Colors.white },
  btnOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  btnOutlineText: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  bottomNavBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 24,
  },
  navTab: { flex: 1, alignItems: 'center', paddingVertical: 12, gap: 4 },
  navTabActive: {},
  navTabActiveDot: {
    position: 'absolute',
    top: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  navTabText: { fontSize: 10, color: Colors.textSecondary, fontWeight: '500' },
  navTabTextActive: { color: Colors.primary },
});