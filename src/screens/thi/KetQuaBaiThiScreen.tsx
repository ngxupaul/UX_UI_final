import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMockSession } from "../../context/MockSessionContext";
import { getResultForStudentExam } from "../../mocks/appData";
import { Colors } from "../../theme";
import type { DashboardStackParamList } from "../../types";

type Props = NativeStackScreenProps<DashboardStackParamList, "KetQuaBaiThi">;

const BOTTOM_TABS = [
  { id: "home", label: "Trang chủ", icon: "home-outline" as const },
  { id: "exam", label: "Bài thi", icon: "document-text-outline" as const, active: true },
  { id: "notice", label: "Thông báo", icon: "notifications-outline" as const },
  { id: "profile", label: "Cá nhân", icon: "person-outline" as const },
];

export const KetQuaBaiThiScreen: React.FC<Props> = ({ navigation, route }) => {
  const { currentUser } = useMockSession();
  const result =
    getResultForStudentExam(currentUser.id, route.params.examId) ??
    getResultForStudentExam(currentUser.id, "exam-1");
  const score = result?.score ?? 8;
  const total = result?.total ?? 10;
  const stats = [
    {
      id: "correct",
      value: result?.correct ?? 4,
      label: "Đúng",
      tint: "#EEFDF5",
      valueColor: "#16A34A",
      labelColor: "rgba(22,163,74,0.7)",
      icon: "checkmark-circle-outline" as const,
    },
    {
      id: "wrong",
      value: result?.wrong ?? 1,
      label: "Sai",
      tint: "#FFF5F5",
      valueColor: "#BE123C",
      labelColor: "rgba(225,29,72,0.7)",
      icon: "close-circle-outline" as const,
    },
    {
      id: "skipped",
      value: result?.skipped ?? 0,
      label: "Bỏ qua",
      tint: "#F8FAFC",
      valueColor: "#334155",
      labelColor: "rgba(100,116,139,0.7)",
      icon: "help-circle-outline" as const,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerIconBtn}
          >
            <Ionicons name="arrow-back" size={22} color="#334155" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Kết quả bài thi</Text>

          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="share-social-outline" size={20} color="#334155" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scoreSection}>
          <View style={styles.scoreGlow} />

          <View style={styles.scoreRing}>
            <Text style={styles.scoreValue}>{score}</Text>
            <Text style={styles.scoreTotal}>/{total}</Text>
          </View>

          <Text style={styles.resultTitle}>Tuyệt vời!</Text>
          <Text style={styles.resultSubtitle}>
            Bạn đã nắm vững kiến thức cơ bản. Hãy tiếp tục phát huy nhé!
          </Text>
        </View>

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View
              key={stat.id}
              style={[styles.statCard, { backgroundColor: stat.tint }]}
            >
              <View style={styles.statIconWrap}>
                <Ionicons name={stat.icon} size={18} color={stat.valueColor} />
              </View>
              <Text style={[styles.statValue, { color: stat.valueColor }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: stat.labelColor }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.detailHeader}>
          <Text style={styles.detailTitle}>Chi tiết điểm số</Text>
          <TouchableOpacity>
            <Text style={styles.detailLink}>Xem biểu đồ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.reviewBtn}>
            <Ionicons name="eye-outline" size={20} color={Colors.white} />
            <Text style={styles.reviewBtnText}>Xem lại bài làm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.popToTop()}
            style={styles.homeBtn}
          >
            <Text style={styles.homeBtnText}>Về trang chủ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {BOTTOM_TABS.map((tab) => (
          <TouchableOpacity key={tab.id} style={styles.bottomNavItem}>
            <Ionicons
              name={tab.icon}
              size={20}
              color={tab.active ? "#22C55E" : "#94A3B8"}
            />
            <Text
              style={[
                styles.bottomNavLabel,
                tab.active && styles.bottomNavLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeArea: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: -0.45,
  },
  scroll: {
    paddingBottom: 24,
  },
  scoreSection: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 24,
  },
  scoreGlow: {
    position: "absolute",
    top: 32,
    width: 208,
    height: 208,
    borderRadius: 104,
    backgroundColor: "rgba(74,222,128,0.10)",
    shadowColor: "rgba(74,222,128,0.18)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 32,
  },
  scoreRing: {
    width: 208,
    height: 208,
    borderRadius: 104,
    borderWidth: 12,
    borderColor: "#4ADE80",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 24,
  },
  scoreValue: {
    fontSize: 60,
    lineHeight: 60,
    fontWeight: "800",
    color: "#22C55E",
    letterSpacing: -3,
  },
  scoreTotal: {
    marginTop: 18,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "500",
    color: "#94A3B8",
  },
  resultTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  resultSubtitle: {
    maxWidth: 240,
    fontSize: 14,
    lineHeight: 23,
    color: "#64748B",
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minHeight: 130,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 17,
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  detailHeader: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#1E293B",
  },
  detailLink: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#22C55E",
  },
  actions: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 12,
  },
  reviewBtn: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#22C55E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "rgba(34,197,94,0.40)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  reviewBtnText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.white,
  },
  homeBtn: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  homeBtnText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#334155",
  },
  bottomNav: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    backgroundColor: Colors.white,
    paddingTop: 9,
    paddingBottom: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  bottomNavItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  bottomNavLabel: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "500",
    color: "#94A3B8",
  },
  bottomNavLabelActive: {
    color: "#22C55E",
  },
});
