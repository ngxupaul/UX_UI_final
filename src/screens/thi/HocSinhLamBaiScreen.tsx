import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useMockSession } from "../../context/MockSessionContext";
import { getExamById, getQuestionsForExam } from "../../mocks/appData";
import { Colors } from "../../theme";
import type { DashboardStackParamList } from "../../types";

type Props = NativeStackScreenProps<DashboardStackParamList, "HocSinhLamBai">;

export const HocSinhLamBaiScreen: React.FC<Props> = ({ navigation, route }) => {
  const { currentUser } = useMockSession();
  const exam = getExamById(route.params.examId) ?? getExamById("exam-1");
  const questions = getQuestionsForExam(exam?.id ?? "exam-1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const question = questions[currentIndex];
  const selectedIndex = answers[question.id];

  const progress = useMemo(
    () => (currentIndex + 1) / questions.length,
    [currentIndex, questions.length]
  );

  const selectAnswer = (index: number) => {
    setAnswers((previous) => ({ ...previous, [question.id]: index }));
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      navigation.navigate("KetQuaBaiThi", { examId: exam?.id ?? "exam-1" });
      return;
    }

    setCurrentIndex((previous) => previous + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      navigation.goBack();
      return;
    }

    setCurrentIndex((previous) => previous - 1);
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
            <Ionicons name="close" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Bài thi</Text>
            <Text style={styles.headerSubtitle}>
              {currentUser.name} • Câu {currentIndex + 1}/{questions.length}
            </Text>
          </View>

          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainCard}>
          <View style={styles.subjectPill}>
            <Text style={styles.subjectPillText}>{question.subject}</Text>
          </View>

          <Text style={styles.questionText}>{question.content}</Text>

          {question.hasArtwork && (
            <View style={styles.artworkCard}>
              <View style={styles.artworkWave} />
              <View style={styles.artworkWaveCenter}>
                <Ionicons name="pulse-outline" size={34} color="#A8BDD8" />
              </View>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.optionsWrap}>
            {question.options.map((option, index) => {
              const isSelected = selectedIndex === index;

              return (
                <TouchableOpacity
                  activeOpacity={0.85}
                  key={`${question.id}-${index}`}
                  onPress={() => selectAnswer(index)}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                >
                  <View
                    style={[
                      styles.optionLetter,
                      isSelected && styles.optionLetterSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionLetterText,
                        isSelected && styles.optionLetterTextSelected,
                      ]}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>

                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={22}
                      color="#22C55E"
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Object.keys(answers).length}/{questions.length}
          </Text>
        </View>

        <View style={styles.footerActions}>
          <TouchableOpacity
            onPress={handlePrev}
            style={[styles.footerBtn, styles.footerBtnSecondary]}
          >
            <Text style={styles.footerBtnSecondaryText}>Quay lại</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={styles.footerBtnPrimary}>
            <Text style={styles.footerBtnPrimaryText}>
              {currentIndex === questions.length - 1 ? "Nộp bài" : "Tiếp theo"}
            </Text>
            {currentIndex !== questions.length - 1 && (
              <Ionicons name="chevron-forward" size={18} color={Colors.white} />
            )}
          </TouchableOpacity>
        </View>
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
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  header: {
    height: 64,
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
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    letterSpacing: -0.45,
  },
  headerSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  mainCard: {
    minHeight: 620,
  },
  subjectPill: {
    alignSelf: "flex-start",
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#DCFCE7",
    borderRadius: 6,
    paddingHorizontal: 13,
    paddingVertical: 5,
    marginBottom: 16,
  },
  subjectPillText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    textTransform: "uppercase",
    color: "#22C55E",
    letterSpacing: 0.3,
  },
  questionText: {
    fontSize: 20,
    lineHeight: 33,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 24,
  },
  artworkCard: {
    height: 192,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    backgroundColor: "#F8FAFC",
    marginBottom: 22,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  artworkWave: {
    position: "absolute",
    left: -10,
    right: -10,
    top: 84,
    height: 70,
    borderRadius: 35,
    borderWidth: 6,
    borderColor: "rgba(226,232,240,0.35)",
    transform: [{ scaleX: 1.4 }],
  },
  artworkWaveCenter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.72)",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 24,
  },
  optionsWrap: {
    gap: 12,
    paddingBottom: 96,
  },
  optionCard: {
    minHeight: 62,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#F1F5F9",
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  optionCardSelected: {
    borderColor: "#22C55E",
    backgroundColor: "rgba(240,253,244,0.5)",
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  optionLetterSelected: {
    borderColor: "#22C55E",
    backgroundColor: "#22C55E",
  },
  optionLetterText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#64748B",
  },
  optionLetterTextSelected: {
    color: Colors.white,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: "#1E293B",
  },
  optionTextSelected: {
    color: "#0F172A",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
    shadowColor: "rgba(0,0,0,0.03)",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 6,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#22C55E",
  },
  progressText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  footerActions: {
    flexDirection: "row",
    gap: 12,
  },
  footerBtn: {
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  footerBtnSecondary: {
    flex: 0.9,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: Colors.white,
  },
  footerBtnSecondaryText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    color: "#334155",
  },
  footerBtnPrimary: {
    flex: 1.1,
    backgroundColor: "#22C55E",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  footerBtnPrimaryText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: Colors.white,
  },
});
