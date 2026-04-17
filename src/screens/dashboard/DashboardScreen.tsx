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
        label: "Bài thi",
        value: "12",
        icon: "checkmark-circle-outline" as const,
      },
      {
        label: "Trung bình",
        value: "8.5",
        icon: "star" as const,
        highlighted: true,
      },
      {
        label: "Thứ hạng",
        value: "#04",
        icon: "trophy-outline" as const,
      },
    ];

    const studentExamCards = [
      {
        id: "student-exam-1",
        subject: "Địa lý",
        subjectBg: "rgba(0,110,47,0.1)",
        subjectColor: "#006E2F",
        title: "Kiểm tra 15 phút - Chương 1",
        duration: "15 ph",
        crowd: "+14",
        action: () =>
          navigation.navigate("HocSinhLamBai", {
            examId: upcomingStudentExam?.id ?? "exam-1",
          }),
      },
      {
        id: "student-exam-2",
        subject: "Vật lý",
        subjectBg: "rgba(159,63,55,0.1)",
        subjectColor: "#9F3F37",
        title: "Đề luyện tập Chương 3: Quang học",
        duration: "60 ph",
        crowd: "+5",
        action: () =>
          navigation.navigate("HocSinhLamBai", {
            examId: studentExams[1]?.id ?? upcomingStudentExam?.id ?? "exam-1",
          }),
      },
    ];

    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView
          style={styles.teacherScroll}
          contentContainerStyle={styles.studentContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.studentHeader}>
            <View style={styles.studentHeaderLeft}>
              <View style={styles.studentAvatarWrap}>
                <Avatar name={currentUser.name} size={40} />
              </View>
              <View>
                <Text style={styles.studentGreeting}>XIN CHÀO,</Text>
                <Text style={styles.studentName}>{currentUser.name}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.studentBellButton} activeOpacity={0.85}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#006E2F"
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
              <Text style={styles.studentHeroTitle}>Tự luyện tập với Ai</Text>
              <Text style={styles.studentHeroSubtitle}>
                Cải thiện kiến thức với lộ trình cá nhân hóa
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HocSinhLamBai", {
                    examId: upcomingStudentExam?.id ?? "exam-1",
                  })
                }
                style={styles.studentHeroButton}
              >
                <Ionicons name="sparkles-outline" size={18} color={Colors.white} />
                <Text style={styles.studentHeroButtonText}>Bắt đầu ngay</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.studentHeroIconWrap}>
              <View style={styles.studentHeroIconHalo} />
              <Ionicons name="sparkles" size={54} color={Colors.white} />
            </View>
          </LinearGradient>

          <View style={styles.studentStatsRow}>
            {studentStats.map((item) => (
              <View
                key={item.label}
                style={[
                  styles.studentStatCard,
                  item.highlighted && styles.studentStatCardActive,
                ]}
              >
                <View style={styles.studentStatIconWrap}>
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={item.highlighted ? "#006E2F" : "#161D16"}
                  />
                </View>
                <Text style={styles.studentStatValue}>{item.value}</Text>
                <Text style={styles.studentStatLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.studentResultSection}>
            <Text style={styles.studentSectionTitle}>Kết quả gần đây</Text>
            <TouchableOpacity
              style={styles.studentResultCard}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("KetQuaBaiThi", {
                  examId: latestResult?.examId ?? "exam-1",
                })
              }
            >
              <View style={styles.studentMiniRing}>
                <View style={styles.studentMiniRingBase} />
                <View style={styles.studentMiniRingArc} />
                <View style={styles.studentMiniRingInner}>
                  <Text style={styles.studentMiniRingValue}>
                    {latestResult ? latestResult.score.toFixed(1) : "9.0"}
                  </Text>
                </View>
              </View>

              <View style={styles.studentResultContent}>
                <Text style={styles.studentResultTitle}>
                  Kiểm tra Toán học kì I
                </Text>
                <Text style={styles.studentResultSubtitle}>
                  Hoàn thành: 2 giờ trước
                </Text>
                <View style={styles.studentProgressTrack}>
                  <View style={styles.studentProgressFill} />
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#3D4A3D"
                style={styles.studentResultChevron}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.studentExamSection}>
            <View style={styles.teacherSectionHeader}>
              <Text style={styles.studentSectionTitle}>Bài thi cần làm</Text>
              <TouchableOpacity>
                <Text style={styles.studentSectionLink}>XEM TẤT CẢ</Text>
              </TouchableOpacity>
            </View>

            {studentExamCards.map((exam) => (
              <View key={exam.id} style={styles.studentExamCard}>
                <View style={styles.studentExamTop}>
                  <View
                    style={[
                      styles.studentSubjectPill,
                      { backgroundColor: exam.subjectBg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.studentSubjectText,
                        { color: exam.subjectColor },
                      ]}
                    >
                      {exam.subject}
                    </Text>
                  </View>
                  <View style={styles.studentDurationWrap}>
                    <Ionicons name="time-outline" size={14} color="#3D4A3D" />
                    <Text style={styles.studentDurationText}>{exam.duration}</Text>
                  </View>
                </View>

                <Text style={styles.studentExamTitle}>{exam.title}</Text>

                <View style={styles.studentExamFooter}>
                  <View style={styles.studentAvatarStack}>
                    <View style={[styles.studentExamAvatar, { left: 0 }]}>
                      <Text style={styles.studentExamAvatarText}>L</Text>
                    </View>
                    <View style={[styles.studentExamAvatar, { left: 14 }]}>
                      <Text style={styles.studentExamAvatarText}>B</Text>
                    </View>
                    <View style={[styles.studentExamAvatarCount, { left: 28 }]}>
                      <Text style={styles.studentExamAvatarCountText}>{exam.crowd}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.studentExamButton}
                    activeOpacity={0.85}
                    onPress={exam.action}
                  >
                    <Text style={styles.studentExamButtonText}>Làm bài</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
              onPress={() => navigation.navigate("TaoDeThi")}
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
    marginBottom: 18,
    paddingHorizontal: 6,
  },
  studentHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  studentContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 28,
    gap: 22,
  },
  studentAvatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAF8",
    shadowColor: "#006E2F",
    shadowOpacity: 0.1,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 1,
    overflow: "hidden",
  },
  studentBellButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(220,229,217,0.5)",
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  studentGreeting: {
    fontSize: 11,
    lineHeight: 14,
    color: "#3D4A3D",
    fontWeight: "600",
    letterSpacing: 0.9,
  },
  studentName: {
    marginTop: 2,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    color: "#006E2F",
    letterSpacing: -0.3,
  },
  studentHero: {
    minHeight: 174,
    borderRadius: 22,
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: Colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  studentHeroText: {
    flex: 1,
    paddingRight: 8,
  },
  studentHeroTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: Colors.white,
    letterSpacing: -0.7,
  },
  studentHeroSubtitle: {
    marginTop: 8,
    maxWidth: 188,
    fontSize: 13,
    lineHeight: 18,
    color: "rgba(255,255,255,0.85)",
  },
  studentHeroButton: {
    marginTop: 18,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  studentHeroButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.white,
  },
  studentHeroIconWrap: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  studentHeroIconHalo: {
    position: "absolute",
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  studentStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  studentStatCard: {
    width: "31.5%",
    backgroundColor: Colors.white,
    borderRadius: 18,
    minHeight: 86,
    borderWidth: 1,
    borderColor: "rgba(220,229,217,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  studentStatCardActive: {
    borderBottomWidth: 5,
    borderBottomColor: "#21C45D",
  },
  studentStatIconWrap: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  studentStatValue: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "800",
    color: "#161D16",
  },
  studentStatLabel: {
    marginTop: 4,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: "600",
    color: "#3D4A3D",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  studentResultSection: {
    gap: 12,
  },
  studentSectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    color: "#161D16",
  },
  studentResultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(220,229,217,0.5)",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  studentMiniRing: {
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  studentMiniRingBase: {
    position: "absolute",
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 7,
    borderColor: "#DFF3E4",
  },
  studentMiniRingArc: {
    position: "absolute",
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 7,
    borderTopColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderBottomColor: Colors.primary,
    borderRightColor: "transparent",
    transform: [{ rotate: "28deg" }],
  },
  studentMiniRingInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  studentMiniRingValue: {
    fontSize: 19,
    lineHeight: 22,
    fontWeight: "800",
    color: "#006E2F",
  },
  studentResultContent: {
    flex: 1,
  },
  studentResultTitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: "#161D16",
  },
  studentResultSubtitle: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "500",
    color: "#3D4A3D",
  },
  studentProgressTrack: {
    marginTop: 10,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#EEF3EE",
    overflow: "hidden",
  },
  studentProgressFill: {
    width: "90%",
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#21C45D",
  },
  studentResultChevron: {
    marginLeft: 12,
  },
  studentExamSection: {
    gap: 12,
  },
  studentSectionLink: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "700",
    color: "#006E2F",
    letterSpacing: 0.8,
  },
  studentExamCard: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(220,229,217,0.5)",
    padding: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  studentExamTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  studentSubjectPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  studentSubjectText: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  studentDurationWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  studentDurationText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: "#3D4A3D",
  },
  studentExamTitle: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: "#161D16",
  },
  studentExamFooter: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  studentAvatarStack: {
    width: 58,
    height: 24,
    position: "relative",
  },
  studentExamAvatar: {
    position: "absolute",
    top: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E8F7EC",
    borderWidth: 2,
    borderColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  studentExamAvatarText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#006E2F",
  },
  studentExamAvatarCount: {
    position: "absolute",
    top: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#DDF5E5",
    borderWidth: 2,
    borderColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  studentExamAvatarCountText: {
    fontSize: 8,
    fontWeight: "700",
    color: "#006E2F",
  },
  studentExamButton: {
    backgroundColor: "#F4FBF6",
    borderWidth: 1,
    borderColor: "#E6F3E9",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  studentExamButtonText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    color: "#006E2F",
    textAlign: "center",
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
