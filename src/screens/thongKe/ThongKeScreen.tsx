import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar } from "../../components";
import { useMockSession } from "../../context/MockSessionContext";
import {
  MOCK_USERS,
  getResultForStudentExam,
  getResultsForStudent,
  getResultsForTeacher,
} from "../../mocks/appData";
import { Colors } from "../../theme";
import type { DashboardStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

export const ThongKeScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser } = useMockSession();
  const isStudent = currentUser.role === "student";
  const teacherOwnerId = currentUser.role === "admin" ? "teacher-1" : currentUser.id;
  const teacherResults = getResultsForTeacher(teacherOwnerId);
  const studentResults = getResultsForStudent(currentUser.id);
  const latestResult = studentResults[0] ?? getResultForStudentExam(currentUser.id, "exam-1");

  const teacherAverage = teacherResults.length
    ? (
        teacherResults.reduce((sum, item) => sum + item.score, 0) /
        teacherResults.length
      ).toFixed(1)
    : "0.0";

  const topStudents = teacherResults
    .map((result) => ({
      result,
      student: MOCK_USERS.find((user) => user.id === result.studentId),
    }))
    .filter((item) => item.student)
    .sort((a, b) => b.result.score - a.result.score);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isStudent ? "Kết quả học tập" : "Thống kê lớp học"}
        </Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="bar-chart-outline" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isStudent ? (
          <>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Điểm gần nhất</Text>
                <Text style={styles.statValue}>
                  {latestResult?.score ?? 8}/{latestResult?.total ?? 10}
                </Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Số bài đã nộp</Text>
                <Text style={styles.statValue}>{studentResults.length}</Text>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Hiệu suất cá nhân</Text>
              <View style={styles.resultRow}>
                {[
                  { label: "Đúng", value: latestResult?.correct ?? 4, color: Colors.success },
                  { label: "Sai", value: latestResult?.wrong ?? 1, color: Colors.error },
                  { label: "Bỏ qua", value: latestResult?.skipped ?? 0, color: Colors.gray50 },
                ].map((item) => (
                  <View key={item.label} style={styles.resultCard}>
                    <Text style={[styles.resultValue, { color: item.color }]}>
                      {item.value}
                    </Text>
                    <Text style={styles.resultLabel}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Điểm trung bình</Text>
                <Text style={styles.statValue}>{teacherAverage}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Bài đã nộp</Text>
                <Text style={styles.statValue}>{teacherResults.length}</Text>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Top học sinh</Text>
              {topStudents.map(({ result, student }) => (
                <View key={result.id} style={styles.studentRow}>
                  <Avatar name={student?.name} size={44} />
                  <View style={styles.studentText}>
                    <Text style={styles.studentName}>{student?.name}</Text>
                    <Text style={styles.studentMeta}>{result.submittedAt}</Text>
                  </View>
                  <Text style={styles.studentScore}>{result.score}/{result.total}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("KetQuaBaiThi", { examId: "exam-1" })}
          style={styles.ctaBtn}
        >
          <Text style={styles.ctaText}>
            {isStudent ? "Mở kết quả chi tiết" : "Mở màn hình kết quả học sinh"}
          </Text>
        </TouchableOpacity>

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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: Colors.textPrimary },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray10,
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: { flexDirection: "row", gap: 16, padding: 16 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
  },
  statLabel: { fontSize: 14, color: Colors.textSecondary, marginBottom: 10 },
  statValue: { fontSize: 30, fontWeight: "700", color: Colors.textPrimary },
  sectionCard: {
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: Colors.textPrimary },
  resultRow: { flexDirection: "row", gap: 12 },
  resultCard: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  resultValue: { fontSize: 24, fontWeight: "700" },
  resultLabel: { fontSize: 12, fontWeight: "600", color: Colors.textSecondary, marginTop: 6 },
  studentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  studentText: { flex: 1 },
  studentName: { fontSize: 14, fontWeight: "700", color: Colors.textPrimary },
  studentMeta: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  studentScore: { fontSize: 14, fontWeight: "700", color: Colors.primary },
  ctaBtn: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    height: 52,
  },
  ctaText: { fontSize: 15, fontWeight: "700", color: Colors.white },
});
