import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDraftExam } from '../../context/DraftExamContext';
import { Colors } from '../../theme';
import type { DashboardStackParamList } from '../../types';

type Props = NativeStackScreenProps<DashboardStackParamList, 'PhatDeThanhCong'>;

export const PhatDeThanhCongScreen: React.FC<Props> = ({ navigation, route }) => {
  const { draftExam } = useDraftExam();

  const selectedClasses = useMemo(
    () => route.params.selectedClasses.filter((item) => item.selected),
    [route.params.selectedClasses]
  );

  const totalStudents = useMemo(
    () => selectedClasses.reduce((sum, item) => sum + item.students, 0),
    [selectedClasses]
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Phát đề thành công</Text>
          <View style={styles.headerButton} />
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <View style={styles.heroIconWrap}>
            <Ionicons name="paper-plane" size={34} color={Colors.white} />
          </View>
          <Text style={styles.heroTitle}>Đề thi đã được phát hành</Text>
          <Text style={styles.heroSubtitle}>
            Học sinh có thể truy cập ngay bằng đường link hoặc quét mã QR để bắt đầu làm bài.
          </Text>

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeValue}>{selectedClasses.length}</Text>
              <Text style={styles.badgeLabel}>Lớp</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeValue}>{totalStudents}</Text>
              <Text style={styles.badgeLabel}>Học sinh</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeValue}>{draftExam.duration}</Text>
              <Text style={styles.badgeLabel}>Phút</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View>
              <Text style={styles.infoLabel}>TÊN ĐỀ THI</Text>
              <Text style={styles.infoTitle}>{draftExam.title}</Text>
            </View>
            <View style={styles.subjectPill}>
              <Text style={styles.subjectPillText}>{draftExam.subject}</Text>
            </View>
          </View>

          <View style={styles.linkCard}>
            <View style={styles.linkIconWrap}>
              <Ionicons name="link-outline" size={18} color={Colors.primary} />
            </View>
            <View style={styles.linkBody}>
              <Text style={styles.linkLabel}>Liên kết làm bài</Text>
              <Text style={styles.linkValue}>hocmai.vn/exam/{draftExam.examId || 'new'}</Text>
            </View>
            <TouchableOpacity style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Sao chép</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.qrPlaceholder}>
            <View style={styles.qrSquare} />
            <Text style={styles.qrText}>QR tham gia bài thi</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đã giao cho lớp</Text>
          {selectedClasses.map((item) => (
            <View key={item.code} style={styles.classCard}>
              <View style={styles.classBadge}>
                <Text style={styles.classBadgeText}>{item.code}</Text>
              </View>
              <View style={styles.classBody}>
                <Text style={styles.className}>{item.name}</Text>
                <Text style={styles.classMeta}>{item.students} học sinh</Text>
              </View>
              <View style={styles.classStatus}>
                <Ionicons name="checkmark-circle" size={18} color={Colors.primary} />
                <Text style={styles.classStatusText}>Đã phát</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <SafeAreaView style={styles.footerSafe} edges={['bottom']}>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('KhoDeDetail', { tab: 'open' })}
          >
            <Text style={styles.secondaryButtonText}>Xem kho đề</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('MainTabs')}>
            <Text style={styles.primaryButtonText}>Về trang chủ</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  safeArea: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.45,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 120,
    gap: 16,
  },
  heroCard: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 22,
  },
  heroGlow: {
    position: 'absolute',
    top: -40,
    right: -20,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(34,197,94,0.28)',
  },
  heroIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: 'rgba(34,197,94,0.35)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 6,
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.78)',
    marginBottom: 18,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  badgeValue: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
    color: Colors.white,
  },
  badgeLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  infoTitle: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '800',
    color: Colors.textPrimary,
    maxWidth: 240,
  },
  subjectPill: {
    backgroundColor: Colors.primaryBg,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  subjectPillText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 16,
    padding: 12,
    gap: 10,
    marginBottom: 16,
  },
  linkIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkBody: {
    flex: 1,
  },
  linkLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  linkValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  copyButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray20,
  },
  copyButtonText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  qrPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    paddingVertical: 18,
    backgroundColor: '#FCFDFD',
  },
  qrSquare: {
    width: 140,
    height: 140,
    borderRadius: 16,
    borderWidth: 8,
    borderColor: '#111827',
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  qrText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  classBadge: {
    minWidth: 56,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
  },
  classBadgeText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  classBody: {
    flex: 1,
  },
  className: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  classMeta: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  classStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  classStatusText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  footerSafe: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    color: '#334155',
  },
  primaryButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(34,197,94,0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '800',
    color: Colors.white,
  },
});
