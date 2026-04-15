import React from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "../../components";
import { useMockSession } from "../../context/MockSessionContext";
import { Colors } from "../../theme";

const SETTINGS_GROUPS = [
  {
    title: "Tài khoản & Chung",
    items: [
      {
        icon: "person-outline",
        label: "Thông tin cá nhân",
      },
      {
        icon: "language-outline",
        label: "Ngôn ngữ",
        value: "Tiếng Việt",
      },
    ],
  },
] as const;

export const CaiDatScreen: React.FC = () => {
  const navigation = useNavigation();
  const { currentUser, signOut } = useMockSession();
  const [lightMode, setLightMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  const handleSignOut = () => {
    signOut();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Auth" as never }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cài đặt tài khoản</Text>
        <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.8}>
          <Ionicons
            name="notifications-outline"
            size={20}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileBlock}>
          <Avatar name={currentUser.name} size={92} />
          <Text style={styles.profileName}>{currentUser.name}</Text>
          <Text style={styles.profileSchool}>{currentUser.school}</Text>
          <View style={styles.roleChip}>
            <Text style={styles.roleChipText}>{currentUser.title}</Text>
          </View>
        </View>

        {SETTINGS_GROUPS.map((group) => (
          <View key={group.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            <View style={styles.card}>
              {group.items.map((item, index) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity style={styles.row} activeOpacity={0.8}>
                    <View style={styles.rowLeft}>
                      <View style={styles.iconWrap}>
                        <Ionicons
                          name={item.icon as keyof typeof Ionicons.glyphMap}
                          size={18}
                          color={Colors.textPrimary}
                        />
                      </View>
                      <Text style={styles.rowLabel}>{item.label}</Text>
                    </View>
                    <View style={styles.rowRight}>
                      {"value" in item && item.value ? (
                        <Text style={styles.rowValue}>{item.value}</Text>
                      ) : null}
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={Colors.textMuted}
                      />
                    </View>
                  </TouchableOpacity>
                  {index < group.items.length - 1 ? (
                    <View style={styles.divider} />
                  ) : null}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ứng dụng</Text>
          <View style={styles.card}>
            <View style={styles.switchRow}>
              <View style={styles.rowLeft}>
                <View style={styles.iconWrap}>
                  <Ionicons
                    name="sunny-outline"
                    size={18}
                    color={Colors.textPrimary}
                  />
                </View>
                <Text style={styles.rowLabel}>Giao diện sáng</Text>
              </View>
              <Switch
                value={lightMode}
                onValueChange={setLightMode}
                trackColor={{ false: "#D9DEE7", true: "#A7E7BF" }}
                thumbColor={Colors.white}
                ios_backgroundColor="#D9DEE7"
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.switchRow}>
              <View style={styles.rowLeft}>
                <View style={styles.iconWrap}>
                  <Ionicons
                    name="notifications-outline"
                    size={18}
                    color={Colors.textPrimary}
                  />
                </View>
                <Text style={styles.rowLabel}>Thông báo</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#D9DEE7", true: "#A7E7BF" }}
                thumbColor={Colors.white}
                ios_backgroundColor="#D9DEE7"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.85}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={18} color="#DC2626" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Phiên bản 2.4.0 (Build 20240515)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  header: {
    height: 56,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  headerIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },
  profileBlock: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 8,
  },
  profileName: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
  },
  profileSchool: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  roleChip: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#EAFBF0",
    borderWidth: 1,
    borderColor: "#C7F1D6",
  },
  roleChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16A34A",
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EDF1F5",
    overflow: "hidden",
  },
  row: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textSecondary,
  },
  switchRow: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginHorizontal: 16,
  },
  logoutButton: {
    marginTop: 28,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
    backgroundColor: "#FEF2F2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
  },
  versionText: {
    marginTop: 16,
    fontSize: 12,
    fontWeight: "500",
    color: Colors.textMuted,
    textAlign: "center",
  },
});
