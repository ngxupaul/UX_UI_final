import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMockSession } from "../../context/MockSessionContext";
import {
  getResultForStudentExam,
  getStudentExams,
  getTeacherExams,
} from "../../mocks/appData";
import { Colors } from "../../theme";
import type { DashboardStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

export const KhoDeScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser } = useMockSession();
  const isStudent = currentUser.role === "student";
  const teacherOwnerId = currentUser.role === "admin" ? "teacher-1" : currentUser.id;
  const [search, setSearch] = useState("");

  const exams = isStudent
    ? getStudentExams(currentUser.id)
    : getTeacherExams(teacherOwnerId);

  const filtered = useMemo(
    () =>
      exams.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.subject.toLowerCase().includes(search.toLowerCase())
      ),
    [exams, search]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isStudent ? "Bài thi của tôi" : "Kho đề thi"}
          </Text>
          {!isStudent && (
            <TouchableOpacity
              onPress={() => navigation.navigate("TaoDeThi")}
              style={styles.addBtn}
            >
              <Ionicons name="add" size={20} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color="#6C757D" />
          <TextInput
            style={styles.searchInput}
            placeholder={
              isStudent ? "Tìm bài thi theo tên môn học" : "Tìm kiếm đề thi"
            }
            placeholderTextColor="#6C757D"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.listWrap}>
          {filtered.map((exam) => {
            const result = getResultForStudentExam(currentUser.id, exam.id);
            const statusLabel = isStudent
              ? result
                ? "Đã nộp"
                : "Sẵn sàng"
              : exam.status === "open"
                ? "Đang mở"
                : exam.status === "draft"
                  ? "Bản nháp"
                  : "Đã đóng";

            return (
              <TouchableOpacity
                key={exam.id}
                onPress={() =>
                  isStudent
                    ? navigation.navigate(
                        result ? "KetQuaBaiThi" : "HocSinhLamBai",
                        { examId: exam.id }
                      )
                    : navigation.navigate("KhoDeExamDetail", { examId: exam.id })
                }
                style={styles.examCard}
              >
                <View style={styles.examTop}>
                  <View style={styles.subjectBadge}>
                    <Text style={styles.subjectBadgeText}>{exam.subject}</Text>
                  </View>
                  <View style={styles.statusChip}>
                    <Text style={styles.statusChipText}>{statusLabel}</Text>
                  </View>
                </View>
                <Text style={styles.examTitle}>{exam.title}</Text>
                <Text style={styles.examMeta}>
                  Lớp {exam.grade} • {exam.duration} phút • {exam.questionCount} câu
                </Text>
                <Text style={styles.examMeta}>
                  {isStudent
                    ? result
                      ? `Điểm gần nhất: ${result.score}/${result.total}`
                      : `Được giao ngày ${exam.updatedAt}`
                    : `Cập nhật ${exam.updatedAt}`}
                </Text>
              </TouchableOpacity>
            );
          })}
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
    paddingHorizontal: 17,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    letterSpacing: -0.6,
  },
  addBtn: {
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryLight,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 17,
    marginTop: 12,
    paddingHorizontal: 14,
    height: 50,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  listWrap: { paddingHorizontal: 17, marginTop: 16, gap: 12 },
  examCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    gap: 8,
  },
  examTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subjectBadge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  subjectBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.primary,
  },
  statusChip: {
    backgroundColor: "#F8FAFC",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusChipText: { fontSize: 12, fontWeight: "600", color: "#64748B" },
  examTitle: { fontSize: 16, fontWeight: "700", color: Colors.textPrimary },
  examMeta: { fontSize: 13, color: Colors.textSecondary },
});
