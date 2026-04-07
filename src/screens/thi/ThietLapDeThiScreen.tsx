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

// 3-step wizard step 3
const WizardStep3 = () => (
  <View style={styles.wizardWrap}>
    <View style={styles.wizardLeft}>
      <View style={styles.stepCircle}><Text style={styles.stepDone}>✓</Text></View>
      <Text style={styles.stepLabel}>Thông tin</Text>
    </View>
    <View style={styles.wizardLineFilled} />
    <View style={styles.wizardLeft}>
      <View style={styles.stepCircle}><Text style={styles.stepDone}>✓</Text></View>
      <Text style={styles.stepLabel}>Câu hỏi</Text>
    </View>
    <View style={styles.wizardLineFilled} />
    <View style={styles.wizardCenter}>
      <View style={styles.stepCircleActive}><Text style={styles.stepNum}>3</Text></View>
      <Text style={styles.stepLabelActive}>Cài đặt</Text>
    </View>
  </View>
);

export const ThietLapDeThiScreen: React.FC<Props> = ({ navigation }) => {
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState('123456');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={18} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phát hành đề thi</Text>
        <TouchableOpacity><Text style={styles.saveDraft}>Lưu nháp</Text></TouchableOpacity>
      </View>

      {/* Wizard step 3 */}
      <WizardStep3 />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* QR Card */}
        <View style={styles.qrCard}>
          <Text style={styles.qrTitle}>Quét mã để làm bài</Text>
          <Text style={styles.qrExamName}>Kiểm tra 15 phút - Chương 1</Text>
          <View style={styles.qrBox}>
            <View style={styles.qrBg} />
          </View>
          <View style={styles.linkRow}>
            <Ionicons name="link" size={16} color={Colors.textSecondary} />
            <Text style={styles.linkText}>hocmai.vn/exam/che…</Text>
            <TouchableOpacity style={styles.copyBtn}>
              <Text style={styles.copyBtnText}>Sao chép</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Class Assignment */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="people" size={18} color="#1E293B" />
              <Text style={styles.sectionTitle}>Giao cho lớp</Text>
            </View>
            <TouchableOpacity><Text style={styles.selectAll}>Chọn tất cả</Text></TouchableOpacity>
          </View>

          <View style={styles.classGrid}>
            {[
              { code: '10A1', name: 'Lớp 10A1', students: 42, selected: true },
              { code: '10A2', name: 'Lớp 10A2', students: 38, selected: true },
              { code: '11B5', name: 'Lớp 11B5', students: 40, selected: false },
              { code: '12C1', name: 'Lớp 12C1', students: 35, selected: false },
            ].map((cls) => (
              <View key={cls.code} style={[styles.classCard, cls.selected && styles.classCardSelected]}>
                <View style={styles.classHeader}>
                  <View style={[styles.classBadge, cls.selected && styles.classBadgeSelected]}>
                    <Text style={[styles.classBadgeText, cls.selected && styles.classBadgeTextSelected]}>{cls.code}</Text>
                  </View>
                  {cls.selected && (
                    <View style={styles.checkmark}><Ionicons name="checkmark" size={12} color={Colors.white} /></View>
                  )}
                </View>
                <Text style={[styles.className, cls.selected && styles.classNameSelected]}>{cls.name}</Text>
                <Text style={styles.classStudentCount}>{cls.students} Học sinh</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="settings-outline" size={18} color="#1E293B" />
            <Text style={styles.sectionTitle}>Cài đặt đề thi</Text>
          </View>

          {/* Duration */}
          <View style={styles.settingCard}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: '#FFF7ED' }]}>
                <Ionicons name="time-outline" size={20} color="#B45309" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Thời gian làm bài</Text>
                <Text style={styles.settingSub}>Giới hạn thời gian nộp</Text>
              </View>
            </View>
            <View style={styles.durationPicker}>
              <Text style={styles.durationValue}>45</Text>
              <Text style={styles.durationUnit}>phút</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
            </View>
          </View>

          {/* Password */}
          <View style={styles.settingCard}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: Colors.primaryBg }]}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingTitle}>Mật khẩu đề thi</Text>
                <Text style={styles.settingSub}>Bảo mật truy cập</Text>
                {passwordEnabled && (
                  <View style={styles.passwordInput}>
                    <Ionicons name="key-outline" size={16} color={Colors.textSecondary} />
                    <Text style={styles.passwordText}>{password}</Text>
                  </View>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.switchWrap}
              onPress={() => setPasswordEnabled(!passwordEnabled)}
              activeOpacity={0.8}
            >
              <View style={[styles.switchTrack, passwordEnabled && styles.switchTrackOn]}>
                <View style={[styles.switchThumb, passwordEnabled && styles.switchThumbOn]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.publishBtn}
          onPress={() => {
            Alert.alert('Thành công', 'Đề thi đã được phát hành!');
            navigation.goBack();
          }}
        >
          <Ionicons name="paper-plane-outline" size={16} color={Colors.white} />
          <Text style={styles.publishBtnText}>Phát đề ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  saveDraft: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  wizardWrap: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  wizardLeft: { alignItems: 'center' },
  wizardCenter: { alignItems: 'center' },
  stepCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  stepDone: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  stepCircleActive: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(33,196,93,0.15)' },
  stepNum: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  stepLabel: { fontSize: 10, fontWeight: '500', color: Colors.primary, marginTop: 4 },
  stepLabelActive: { fontSize: 10, fontWeight: '700', color: Colors.primary, marginTop: 4 },
  wizardLineFilled: { width: 60, height: 2, backgroundColor: Colors.primary, marginHorizontal: 6, opacity: 0.8 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  qrCard: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 24, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.gray20, marginBottom: 24,
  },
  qrTitle: { fontSize: 20, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  qrExamName: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  qrBox: { width: 192, height: 192, backgroundColor: Colors.gray10, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: Colors.gray20, overflow: 'hidden' },
  qrBg: { width: '100%', height: '100%' },
  linkRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.gray10, paddingHorizontal: 17, paddingVertical: 5, borderRadius: 16,
    borderWidth: 1, borderColor: Colors.gray20, gap: 8, width: '100%',
  },
  linkText: { flex: 1, fontSize: 14, fontWeight: '500', color: '#334155' },
  copyBtn: { backgroundColor: Colors.white, paddingHorizontal: 17, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: Colors.gray20 },
  copyBtnText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  selectAll: { fontSize: 12, fontWeight: '600', color: Colors.primary },
  classGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  classCard: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, minWidth: '47%', borderWidth: 2, borderColor: Colors.gray20 },
  classCardSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryBg },
  classHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  classBadge: { backgroundColor: Colors.white, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, borderWidth: 1, borderColor: Colors.gray20 },
  classBadgeSelected: { borderColor: Colors.primary },
  classBadgeText: { fontSize: 14, fontWeight: '700', color: '#64748B' },
  classBadgeTextSelected: { color: Colors.primary },
  checkmark: { width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  className: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 2 },
  classNameSelected: { color: Colors.primary },
  classStudentCount: { fontSize: 12, fontWeight: '500', color: 'rgba(21,128,61,0.8)' },
  settingCard: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 17,
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    borderWidth: 1, borderColor: Colors.gray20, marginBottom: 12,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, flex: 1 },
  settingIconBg: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  settingTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginBottom: 2 },
  settingSub: { fontSize: 12, color: '#64748B', marginBottom: 8 },
  passwordInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray10, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: Colors.gray20, gap: 6, marginTop: 4 },
  passwordText: { fontSize: 14, color: '#1E293B', letterSpacing: 1.4, fontFamily: 'monospace' },
  durationPicker: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray10, paddingHorizontal: 13, paddingVertical: 9, borderRadius: 12, borderWidth: 1, borderColor: Colors.gray20, gap: 4 },
  durationValue: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  durationUnit: { fontSize: 12, fontWeight: '500', color: '#64748B' },
  switchWrap: { justifyContent: 'center' },
  switchTrack: { width: 44, height: 24, borderRadius: 12, backgroundColor: Colors.gray20, padding: 2, justifyContent: 'center' },
  switchTrackOn: { backgroundColor: Colors.primary },
  switchThumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.white },
  switchThumbOn: { alignSelf: 'flex-end' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray20 },
  publishBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.primary, paddingVertical: 14, borderRadius: 16, shadowColor: 'rgba(34,197,94,0.3)', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 1, shadowRadius: 15, elevation: 4 },
  publishBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },
});