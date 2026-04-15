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
import { getClassesForUser, getTeacherExams } from "../../mocks/appData";
import { Colors } from "../../theme";
import type { DashboardStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

export const LopHocScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser } = useMockSession();
  const isStudent = currentUser.role === "student";
  const teacherOwnerId = currentUser.role === "admin" ? "teacher-1" : currentUser.id;
  const [search, setSearch] = useState("");

  const classes = isStudent ? getClassesForUser(currentUser.id) : getClassesForUser(teacherOwnerId);
  const teacherExams = getTeacherExams("teacher-1");
  const filtered = useMemo(
    () =>
      classes.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    [classes, search]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isStudent ? "Lớp của tôi" : "Quản lý lớp học"}
          </Text>
        </View>

        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color="#6C757D" />
          <TextInput
            style={styles.searchInput}
            placeholder={isStudent ? "Tìm lớp học" : "Tìm lớp phụ trách"}
            placeholderTextColor="#6C757D"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.listWrap}>
          {filtered.map((cls) => (
            <TouchableOpacity
              key={cls.id}
              style={styles.classCard}
              onPress={() => navigation.navigate("LopHocDetail", { classId: cls.id })}
            >
              <View style={styles.avatarWrap}>
                <Ionicons name="school" size={22} color={Colors.white} />
              </View>
              <Text style={styles.className}>{cls.name}</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="people-outline" size={14} color="#3D4A3D" />
                  <Text style={styles.statText}>{cls.studentIds.length} học sinh</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons
                    name={isStudent ? "person-outline" : "document-text-outline"}
                    size={14}
                    color="#3D4A3D"
                  />
                  <Text style={styles.statText}>
                    {isStudent
                      ? "Giáo viên Trần Thị Giáo Viên"
                      : `${teacherExams.filter((exam) => exam.classIds.includes(cls.id)).length} bài thi`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBg },
  header: {
    paddingHorizontal: 17,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    letterSpacing: -0.6,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 17,
    marginTop: 4,
    paddingHorizontal: 14,
    height: 50,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  listWrap: { paddingHorizontal: 17, marginTop: 16, gap: 12 },
  classCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    gap: 10,
  },
  avatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  className: { fontSize: 16, fontWeight: "700", color: Colors.textPrimary },
  statsRow: { gap: 8 },
  statItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  statText: { fontSize: 13, color: "#3D4A3D" },
});
