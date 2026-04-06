import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Button, Card } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const SHARE_METHODS = [
  { icon: 'link-outline' as const, label: 'Chia sẻ liên kết', desc: 'Gửi đường dẫn đề thi qua tin nhắn, email' },
  { icon: 'qr-code-outline' as const, label: 'Mã QR', desc: 'Học sinh quét mã QR để làm bài' },
  { icon: 'people-outline' as const, label: 'Gửi đến lớp', desc: 'Chọn lớp học để phát đề cho học sinh' },
  { icon: 'clipboard-outline' as const, label: 'Mã đề thi', desc: 'Tạo mã để học sinh nhập khi làm bài' },
];

export const PhatDeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Phát đề & Chia sẻ</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Exam info */}
        <Card style={styles.examCard}>
          <Text style={styles.examTitle}>Toán học - HKI</Text>
          <Text style={styles.examMeta}>Toán · Lớp 10 · 20 câu · 60 phút</Text>
        </Card>

        {/* Methods */}
        <Text style={styles.sectionTitle}>Chọn phương thức phát đề</Text>
        {SHARE_METHODS.map((method, i) => (
          <TouchableOpacity key={i} style={styles.methodCard}>
            <View style={styles.methodIcon}>
              <Ionicons name={method.icon} size={24} color={Colors.primary} />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodLabel}>{method.label}</Text>
              <Text style={styles.methodDesc}>{method.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray30} />
          </TouchableOpacity>
        ))}

        {/* Settings */}
        <Text style={styles.sectionTitle}>Cài đặt</Text>
        <Card style={styles.settingsCard}>
          {[
            { label: 'Cho phép làm lại', value: false },
            { label: 'Hiển thị đáp án sau khi nộp', value: true },
            { label: 'Thông báo khi nộp bài', value: true },
            { label: 'Giới hạn thời gian', value: true },
          ].map((setting, i) => (
            <View key={i} style={[styles.settingRow, i > 0 ? styles.settingBorder : undefined]}>
              <Text style={styles.settingLabel}>{setting.label}</Text>
              <View style={setting.value ? styles.toggleOn : styles.toggleOff}>
                <View style={setting.value ? styles.toggleThumbOn : styles.toggleThumbOff} />
              </View>
            </View>
          ))}
        </Card>

        <View style={styles.ctaSection}>
          <Button title="Phát đề ngay" onPress={() => {}} fullWidth />
          <Button
            title="Lưu bản nháp"
            onPress={() => navigation.goBack()}
            variant="outline"
            fullWidth
            style={{ marginTop: 12 }}
          />
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
  title: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  examCard: { margin: 20, marginBottom: 8 },
  examTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  examMeta: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, paddingHorizontal: 20, marginTop: 20, marginBottom: 12 },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray20,
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodInfo: { flex: 1 },
  methodLabel: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  methodDesc: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  settingsCard: { marginHorizontal: 20 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  settingBorder: { borderTopWidth: 1, borderTopColor: Colors.gray20 },
  settingLabel: { fontSize: 15, color: Colors.textPrimary },
  toggleOff: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.gray30,
    padding: 2,
    justifyContent: 'center',
  },
  toggleOn: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumbOff: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.white },
  toggleThumbOn: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.white, alignSelf: 'flex-end', marginRight: 2 },
  ctaSection: { padding: 20, marginTop: 16 },
});
