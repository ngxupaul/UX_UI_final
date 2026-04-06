import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Avatar } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

// Avatar photo URL from Figma
const AVATAR_IMG = 'https://www.figma.com/api/mcp/asset/b3edf00f-1baf-4532-86b9-e684b7b3d0f6';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

export const CaiDatScreen: React.FC<Props> = ({ navigation }) => {
  const [lightMode, setLightMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cài đặt</Text>
        <TouchableOpacity style={styles.bellBtn}>
          <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileSection}>
          {/* Avatar with edit badge */}
          <View style={styles.avatarWrap}>
            <Image source={{ uri: AVATAR_IMG }} style={styles.avatarImg} />
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="pencil" size={10} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Nguyễn Thị Mai</Text>
          <Text style={styles.profileSchool}>THPT Chuyên Lê Hồng Phong</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>Giáo viên</Text>
          </View>
        </View>

        {/* Tài khoản & Chung */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tài khoản & Chung</Text>
          <View style={styles.card}>
            {/* Thông tin cá nhân */}
            <TouchableOpacity style={styles.menuRow}>
              <View style={styles.menuIconWrap}>
                <Ionicons name="person-outline" size={20} color="#334155" />
              </View>
              <Text style={styles.menuLabel}>Thông tin cá nhân</Text>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Ngôn ngữ */}
            <TouchableOpacity style={styles.menuRow}>
              <View style={styles.menuIconWrap}>
                <Ionicons name="language-outline" size={20} color="#334155" />
              </View>
              <Text style={styles.menuLabel}>Ngôn ngữ</Text>
              <View style={styles.menuRight}>
                <Text style={styles.menuValue}>Tiếng Việt</Text>
                <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ứng dụng */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Ứng dụng</Text>
          <View style={styles.card}>
            {/* Giao diện sáng */}
            <View style={styles.menuRow}>
              <View style={styles.menuIconWrap}>
                <Ionicons name="sunny-outline" size={20} color="#334155" />
              </View>
              <Text style={styles.menuLabel}>Giao diện sáng</Text>
              <Switch
                value={lightMode}
                onValueChange={setLightMode}
                trackColor={{ false: '#E2E8F0', true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            {/* Thông báo */}
            <View style={styles.menuRow}>
              <View style={styles.menuIconWrap}>
                <Ionicons name="notifications-outline" size={20} color="#334155" />
              </View>
              <Text style={styles.menuLabel}>Thông báo</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E2E8F0', true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Phiên bản 2.4.0 (Build 20240515)</Text>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  bellBtn: { padding: 4 },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    marginBottom: 24,
  },
  avatarWrap: {
    width: 112,
    height: 112,
    borderRadius: 56,
    marginBottom: 16,
    borderWidth: 6,
    borderColor: Colors.white,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 8,
    position: 'relative',
  },
  avatarImg: { width: '100%', height: '100%', borderRadius: 50 },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  profileSchool: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 17,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.gray10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: '#F8FAFC',
    marginLeft: 68,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 17,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textMuted,
    marginBottom: 24,
  },
});