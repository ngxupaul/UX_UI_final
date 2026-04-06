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

const MENU_ITEMS = [
  { label: 'Chỉnh sửa thông tin cá nhân', icon: 'person-outline' as const, color: Colors.info },
  { label: 'Đổi mật khẩu', icon: 'lock-closed-outline' as const, color: Colors.warning },
  { label: 'Thông báo', icon: 'notifications-outline' as const, color: Colors.primary },
  { label: 'Ngôn ngữ', icon: 'language-outline' as const, color: Colors.info },
  { label: 'Giao diện', icon: 'color-palette-outline' as const, color: Colors.warning },
  { label: 'Hỗ trợ & Phản hồi', icon: 'help-circle-outline' as const, color: Colors.primary },
  { label: 'Về Flazers', icon: 'information-circle-outline' as const, color: Colors.gray70 },
];

export const CaiDatScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Cài đặt</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Avatar name="Nguyễn Văn A" size={64} />
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={styles.profileName}>Nguyễn Văn A</Text>
            <Text style={styles.profileEmail}>nguyenvana@school.edu.vn</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>Giáo viên</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray50} />
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem}>
              <View style={[styles.menuIconWrap, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.gray30} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBg },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.gray20,
    marginBottom: 24,
  },
  profileName: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  profileEmail: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  roleBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  roleText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  menuSection: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gray20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray20,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: { flex: 1, fontSize: 15, color: Colors.textPrimary },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.gray20,
    gap: 8,
  },
  logoutText: { fontSize: 15, color: Colors.error, fontWeight: '600' },
});
