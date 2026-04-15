import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar } from "../../components";
import { useMockSession } from "../../context/MockSessionContext";
import {
  getResultsForStudent,
  getStudentExams,
} from "../../mocks/appData";
import { Colors } from "../../theme";
import type { DashboardStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const TEACHER_STATS = [
  {
    label: "Tổng đề thi",
    value: "24",
    icon: "document-text-outline" as const,
  },
  {
    label: "Đang mở",
    value: "06",
    icon: "timer-outline" as const,
  },
  {
    label: "Lượt làm bài",
    value: "160",
    icon: "create-outline" as const,
  },
];

const TEACHER_ACTIVITIES = [
  {
    id: "activity-1",
    accent: "#FFF7ED",
    iconColor: "#F97316",
    icon: "receipt-outline" as const,
    titleBold: "Nguyễn Văn A",
    titleRest: 'vừa nộp bài "Kiểm tra 15 phút"',
    time: "2 phút trước",
  },
  {
    id: "activity-2",
    accent: "#EFF6FF",
    iconColor: "#3B82F6",
    icon: "sparkles-outline" as const,
    titleBold: "Đề thi Toán Chương 1",
    titleRest: "đã được tạo thành công",
    time: "15 phút trước",
  },
  {
    id: "activity-3",
    accent: "#F0FDF4",
    iconColor: "#16A34A",
    icon: "people-outline" as const,
    titleBold: "3 học sinh mới",
    titleRest: "đã tham gia lớp 12A1",
    time: "15 phút trước",
  },
];

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser } = useMockSession();
  const isStudent = currentUser.role === "student";

  const studentExams = getStudentExams(currentUser.id);
  const studentResults = getResultsForStudent(currentUser.id);
  const studentAverage = studentResults.length
    ? (
        studentResults.reduce((sum, item) => sum + item.score, 0) /
        studentResults.length
      ).toFixed(1)
    : "0.0";
  const upcomingStudentExam = studentExams[0];
  const latestResult = studentResults[0];

  if (isStudent) {
    const studentStats = [
      {
        label: "Bài thi được giao",
        value: String(studentExams.length),
        icon: "reader-outline" as const,
        color: Colors.primary,
      },
      {
        label: "Đã hoàn thành",
        value: String(studentResults.length),
        icon: "checkmark-circle-outline" as const,
        color: Colors.success,
      },
      {
        label: "Điểm trung bình",
        value: studentAverage,
        icon: "bar-chart-outline" as const,
        color: Colors.info,
      },
    ];

    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.studentHeader}>
            <View style={styles.studentHeaderLeft}>
              <Avatar name={currentUser.name} size={48} />
              <View>
                <Text style={styles.studentGreeting}>Xin chào,</Text>
                <Text style={styles.studentName}>{currentUser.name}</Text>
                <Text style={styles.studentRole}>{currentUser.title}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.iconButton} activeOpacity={0.85}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={Colors.textPrimary}
              />
            </TouchableOpacity>
          </View>

          <LinearGradient
            colors={["#21C45D", "#16A34A"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            style={styles.studentHero}
          >
            <View style={styles.studentHeroText}>
              <Text style={styles.studentHeroTitle}>Sẵn sàng cho bài thi hôm nay</Text>
              <Text style={styles.studentHeroSubtitle}>
                Theo dõi bài thi được giao và xem kết quả mới nhất của bạn.
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HocSinhLamBai", {
                    examId: upcomingStudentExam?.id ?? "exam-1",
                  })
                }
                style={styles.studentHeroButton}
              >
                <Ionicons name="play-outline" size={18} color={Colors.white} />
                <Text style={styles.studentHeroButtonText}>Vào bài thi</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={styles.studentStatsRow}>
            {studentStats.map((item) => (
              <View key={item.label} style={styles.studentStatCard}>
                <View
                  style={[
                    styles.studentStatIconWrap,
                    { backgroundColor: `${item.color}20` },
                  ]}
                >
                  <Ionicons name={item.icon} size={18} color={item.color} />
                </View>
                <Text style={styles.studentStatValue}>{item.value}</Text>
                <Text style={styles.studentStatLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.studentSectionCard}>
            <View style={styles.teacherSectionHeader}>
              <Text style={styles.teacherSectionTitle}>Bài thi và kết quả</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("KetQuaBaiThi", {
                    examId: latestResult?.examId ?? "exam-1",
                  })
                }
              >
                <Text style={styles.teacherSectionLink}>Xem kết quả</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("HocSinhLamBai", {
                  examId: upcomingStudentExam?.id ?? "exam-1",
                })
              }
              style={styles.studentActionCard}
            >
              <Text style={styles.studentActionTitle}>
                {upcomingStudentExam?.title ?? "Bài thi Vật lý dao động"}
              </Text>
              <Text style={styles.studentActionSubtitle}>
                {upcomingStudentExam?.subject ?? "Vật lý 12"} •{" "}
                {upcomingStudentExam?.duration ?? 15} phút
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("KetQuaBaiThi", {
                  examId: latestResult?.examId ?? "exam-1",
                })
              }
              style={styles.studentActionCard}
            >
              <Text style={styles.studentActionTitle}>
                Kết quả gần nhất: {latestResult?.score ?? 8}/{latestResult?.total ?? 10}
              </Text>
              <Text style={styles.studentActionSubtitle}>
                {latestResult?.correct ?? 4} câu đúng • {latestResult?.wrong ?? 1} câu sai
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.teacherScroll}
        contentContainerStyle={styles.teacherContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.teacherHeader}>
          <View style={styles.teacherProfileRow}>
            <View style={styles.teacherAvatarWrap}>
              <Avatar name={currentUser.name} size={48} />
              <View style={styles.onlineDot} />
            </View>
            <View>
              <Text style={styles.teacherGreeting}>Xin chào,</Text>
              <Text style={styles.teacherName}>{currentUser.name}</Text>
            </View>
          </View>

          <View style={styles.teacherHeaderActions}>
            <TouchableOpacity
              style={[styles.iconButton, styles.plusButton]}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("AIGenerator")}
            >
              <Ionicons name="add" size={24} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.85}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={Colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>

        <LinearGradient
          colors={["#21C45D", "#16A34A"]}
          start={{ x: 0, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          style={styles.teacherHeroCard}
        >
          <View style={styles.teacherHeroCopy}>
            <Text style={styles.teacherHeroTitle}>Tạo đề thi mới</Text>
            <Text style={styles.teacherHeroSubtitle}>
              Sử dụng AI để tạo đề thi trong 30s
            </Text>
            <TouchableOpacity
              style={styles.teacherHeroButton}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("AIGenerator")}
            >
              <Ionicons name="sparkles-outline" size={18} color={Colors.white} />
              <Text style={styles.teacherHeroButtonText}>Bắt đầu ngay</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroIconWrap}>
            <Ionicons name="bulb-outline" size={66} color={Colors.white} />
          </View>
        </LinearGradient>

        <View style={styles.teacherStatsRow}>
          {TEACHER_STATS.map((item) => (
            <View key={item.label} style={styles.teacherStatCard}>
              <View style={styles.teacherStatIconCircle}>
                <Ionicons name={item.icon} size={22} color={Colors.primary} />
              </View>
              <Text style={styles.teacherStatValue}>{item.value}</Text>
              <Text style={styles.teacherStatLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.performanceCard}>
          <View style={styles.teacherSectionHeader}>
            <Text style={styles.teacherSectionTitle}>Hiệu suất lớp học</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ThongKe")}>
              <Text style={styles.teacherSectionLink}>Chi tiết</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.performanceContent}>
            <View style={styles.progressRingWrap}>
              <View style={styles.progressRingBase} />
              <View style={styles.progressRingArc} />
              <View style={styles.progressInner}>
                <Text style={styles.progressValue}>80%</Text>
                <Text style={styles.progressLabel}>PASS RATE</Text>
              </View>
            </View>

            <View style={styles.performanceLegend}>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
                <Text style={styles.legendLabel}>Đạt (Pass)</Text>
                <Text style={styles.legendValue}>128</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#ECECEC" }]} />
                <Text style={styles.legendLabel}>Chưa đạt</Text>
                <Text style={styles.legendValue}>32</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.recentSection}>
          <View style={styles.teacherSectionHeader}>
            <Text style={styles.recentSectionTitle}>Hoạt động gần đây</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ThongKe")}>
              <Text style={styles.teacherSectionLink}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          {TEACHER_ACTIVITIES.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={[styles.activityIconWrap, { backgroundColor: activity.accent }]}>
                <Ionicons name={activity.icon} size={22} color={activity.iconColor} />
              </View>
              <View style={styles.activityTextWrap}>
                <Text style={styles.activityTitle} numberOfLines={2}>
                  <Text style={styles.activityTitleBold}>{activity.titleBold} </Text>
                  <Text>{activity.titleRest}</Text>
                </Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  bottomSpacer: {
    height: 120,
  },

  studentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  studentHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  studentGreeting: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  studentName: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  studentRole: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  studentHero: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 18,
    padding: 20,
  },
  studentHeroText: {
    gap: 8,
  },
  studentHeroTitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "800",
    color: Colors.white,
    letterSpacing: -0.6,
  },
  studentHeroSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: "rgba(255,255,255,0.86)",
  },
  studentHeroButton: {
    marginTop: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  studentHeroButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.white,
  },
  studentStatsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  studentStatCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  studentStatIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  studentStatValue: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  studentStatLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: "center",
  },
  studentSectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    gap: 12,
  },
  studentActionCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: 14,
  },
  studentActionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  studentActionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 6,
  },

  teacherScroll: {
    flex: 1,
  },
  teacherContent: {
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom: 28,
  },
  teacherHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  teacherProfileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  teacherAvatarWrap: {
    position: "relative",
  },
  onlineDot: {
    position: "absolute",
    right: 1,
    bottom: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22C55E",
    borderWidth: 2,
    borderColor: Colors.white,
  },
  teacherGreeting: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#64748B",
  },
  teacherName: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    color: "#000000",
    marginTop: 1,
  },
  teacherHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  plusButton: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  teacherHeroCard: {
    minHeight: 144,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  teacherHeroCopy: {
    flex: 1,
    paddingRight: 12,
  },
  teacherHeroTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: Colors.white,
  },
  teacherHeroSubtitle: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "#F0FDF4",
  },
  teacherHeroButton: {
    marginTop: 20,
    alignSelf: "flex-start",
    minHeight: 41,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  teacherHeroButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.white,
  },
  heroIconWrap: {
    width: 78,
    alignItems: "center",
    justifyContent: "center",
  },
  teacherStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  teacherStatCard: {
    width: "30.5%",
    minHeight: 130,
    backgroundColor: Colors.white,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  teacherStatIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  teacherStatValue: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: "#000000",
  },
  teacherStatLabel: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    color: "#64748B",
    textAlign: "center",
  },
  performanceCard: {
    marginTop: 22,
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  teacherSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teacherSectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: "#000000",
  },
  teacherSectionLink: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    color: Colors.primary,
  },
  performanceContent: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  progressRingWrap: {
    width: 132,
    height: 132,
    alignItems: "center",
    justifyContent: "center",
  },
  progressRingBase: {
    position: "absolute",
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 14,
    borderColor: "#E5E7EB",
  },
  progressRingArc: {
    position: "absolute",
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 14,
    borderTopColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderBottomColor: Colors.primary,
    borderRightColor: "transparent",
    transform: [{ rotate: "38deg" }],
  },
  progressInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  progressValue: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: "#111111",
  },
  progressLabel: {
    marginTop: 2,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "400",
    color: "#64748B",
    letterSpacing: 0.3,
  },
  performanceLegend: {
    flex: 1,
    paddingLeft: 18,
    gap: 16,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  legendLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "#475569",
  },
  legendValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#475569",
  },
  recentSection: {
    marginTop: 18,
  },
  recentSectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: "#111111",
  },
  activityCard: {
    marginTop: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  activityIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  activityTextWrap: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "400",
    color: "#0F172A",
  },
  activityTitleBold: {
    fontWeight: "600",
    color: "#0F172A",
  },
  activityTime: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
    color: "#94A3B8",
  },
});
