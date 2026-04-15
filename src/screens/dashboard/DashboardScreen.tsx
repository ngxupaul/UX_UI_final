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
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar } from "../../components";
import { useMockSession } from "../../context/MockSessionContext";
import {
  MOCK_CLASSES,
  getResultsForStudent,
  getResultsForTeacher,
  getStudentExams,
  getTeacherExams,
} from "../../mocks/appData";
import { Colors } from "../../theme";
import type { DashboardStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser } = useMockSession();
  const isStudent = currentUser.role === "student";
  const teacherOwnerId = currentUser.role === "admin" ? "teacher-1" : currentUser.id;

  const teacherExams = getTeacherExams(teacherOwnerId);
  const teacherExamsForClasses = isStudent ? getTeacherExams("teacher-1") : teacherExams;
  const teacherResults = getResultsForTeacher(teacherOwnerId);
  const studentExams = getStudentExams(currentUser.id);
  const studentResults = getResultsForStudent(currentUser.id);
  const classes = MOCK_CLASSES.filter(
    (item) =>
      item.teacherId === teacherOwnerId || item.studentIds.includes(currentUser.id)
  );

  const studentAverage = studentResults.length
    ? (
        studentResults.reduce((sum, item) => sum + item.score, 0) /
        studentResults.length
      ).toFixed(1)
    : "0.0";

  const teacherStats = [
    {
      label: "Tổng đề thi",
      value: String(teacherExams.length),
      icon: "document-text-outline" as const,
      color: Colors.primary,
    },
    {
      label: "Đang mở",
      value: String(teacherExams.filter((item) => item.status === "open").length),
      icon: "flash-outline" as const,
      color: Colors.info,
    },
    {
      label: "Lượt nộp bài",
      value: String(teacherResults.length),
      icon: "checkmark-done-outline" as const,
      color: Colors.warning,
    },
  ];

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

  const upcomingStudentExam = studentExams[0];
  const latestResult = studentResults[0];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar name={currentUser.name} size={48} />
            <View>
              <Text style={styles.greeting}>Xin chào,</Text>
              <Text style={styles.userName}>{currentUser.name}</Text>
              <Text style={styles.userRole}>{currentUser.title}</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={Colors.textPrimary}
              />
            </TouchableOpacity>
            {!isStudent && (
              <TouchableOpacity
                onPress={() => navigation.navigate("AIGenerator")}
                style={styles.iconBtn}
              >
                <Ionicons name="add-circle-outline" size={22} color={Colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroEyebrow}>
              {isStudent ? "Không gian học tập" : "Bảng điều khiển giáo viên"}
            </Text>
            <Text style={styles.heroTitle}>
              {isStudent ? "Sẵn sàng cho bài thi hôm nay" : "Tạo đề và quản lý lớp học"}
            </Text>
            <Text style={styles.heroText}>
              {isStudent
                ? "Theo dõi bài thi được giao, tiến độ làm bài và kết quả mới nhất của bạn."
                : "Mọi lớp học, đề thi và kết quả nộp bài đều đang dùng chung bộ dữ liệu mẫu để dễ kiểm tra luồng."}
            </Text>

            <TouchableOpacity
              onPress={() =>
                isStudent
                  ? navigation.navigate("HocSinhLamBai", {
                      examId: upcomingStudentExam?.id ?? "exam-1",
                    })
                  : navigation.navigate("AIGenerator")
              }
              style={styles.heroBtn}
            >
              <Ionicons
                name={isStudent ? "play-outline" : "sparkles-outline"}
                size={18}
                color={Colors.white}
              />
              <Text style={styles.heroBtnText}>
                {isStudent ? "Vào bài thi" : "Tạo đề bằng AI"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsRow}>
          {(isStudent ? studentStats : teacherStats).map((item) => (
            <View key={item.label} style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: `${item.color}20` }]}>
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {isStudent ? "Lớp học của bạn" : "Lớp học phụ trách"}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LopHocDetail", {
                  classId: classes[0]?.id ?? "class-10a1",
                })
              }
            >
              <Text style={styles.sectionLink}>Mở chi tiết</Text>
            </TouchableOpacity>
          </View>

          {classes.map((item) => (
            <View key={item.id} style={styles.listRow}>
              <View style={styles.listIcon}>
                <Ionicons name="school-outline" size={18} color={Colors.primary} />
              </View>
              <View style={styles.listText}>
                <Text style={styles.listTitle}>{item.name}</Text>
                <Text style={styles.listSubtitle}>
                  {item.studentIds.length} học sinh •{" "}
                  {teacherExamsForClasses.filter((exam) =>
                    exam.classIds.includes(item.id)
                  ).length} bài thi
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {isStudent ? "Bài thi và kết quả" : "Hoạt động gần đây"}
            </Text>
            <TouchableOpacity
              onPress={() =>
                isStudent
                  ? navigation.navigate("KetQuaBaiThi", { examId: "exam-1" })
                  : navigation.navigate("ThongKe")
              }
            >
              <Text style={styles.sectionLink}>
                {isStudent ? "Xem kết quả" : "Xem báo cáo"}
              </Text>
            </TouchableOpacity>
          </View>

          {isStudent ? (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HocSinhLamBai", {
                    examId: upcomingStudentExam?.id ?? "exam-1",
                  })
                }
                style={styles.actionCard}
              >
                <Text style={styles.actionTitle}>
                  {upcomingStudentExam?.title ?? "Bài thi Vật lý dao động"}
                </Text>
                <Text style={styles.actionSubtitle}>
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
                style={styles.actionCard}
              >
                <Text style={styles.actionTitle}>
                  Kết quả gần nhất: {latestResult?.score ?? 8}/{latestResult?.total ?? 10}
                </Text>
                <Text style={styles.actionSubtitle}>
                  {latestResult?.correct ?? 4} câu đúng •{" "}
                  {latestResult?.wrong ?? 1} câu sai
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            teacherResults.slice(0, 3).map((result) => (
              <View key={result.id} style={styles.listRow}>
                <View style={styles.listIcon}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color={Colors.success}
                  />
                </View>
                <View style={styles.listText}>
                  <Text style={styles.listTitle}>Nộp bài thành công</Text>
                  <Text style={styles.listSubtitle}>
                    {result.submittedAt} • Điểm {result.score}/{result.total}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  greeting: { fontSize: 13, color: Colors.textSecondary, fontWeight: "500" },
  userName: { fontSize: 17, fontWeight: "700", color: Colors.textPrimary },
  userRole: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  iconBtn: { padding: 8 },
  heroCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 18,
    padding: 20,
    backgroundColor: "#1F8F4D",
  },
  heroContent: { gap: 8 },
  heroEyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.75)",
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "800",
    color: Colors.white,
    letterSpacing: -0.6,
  },
  heroText: {
    fontSize: 14,
    lineHeight: 22,
    color: "rgba(255,255,255,0.86)",
  },
  heroBtn: {
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
  heroBtnText: { fontSize: 14, fontWeight: "700", color: Colors.white },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: { fontSize: 22, fontWeight: "700", color: Colors.textPrimary },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: "center",
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: Colors.textPrimary },
  sectionLink: { fontSize: 13, fontWeight: "600", color: Colors.primary },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
  },
  listText: { flex: 1 },
  listTitle: { fontSize: 14, fontWeight: "700", color: Colors.textPrimary },
  listSubtitle: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  actionCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: 14,
  },
  actionTitle: { fontSize: 15, fontWeight: "700", color: Colors.textPrimary },
  actionSubtitle: { fontSize: 13, color: Colors.textSecondary, marginTop: 6 },
});
