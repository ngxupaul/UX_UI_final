import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const STEPS = [
  {
    id: "1",
    title: "Chấm điểm tự động",
    subtitle:
      "Hệ thống AI thông minh chấm điểm bài thi nhanh chóng và chính xác, tiết kiệm thời gian cho giáo viên.",
    icon: "scan-circle-outline" as any,
    bgColor: "#DCFCE7",
    iconColor: Colors.primary,
  },
  {
    id: "2",
    title: "Quản lý lớp học",
    subtitle:
      "Tổ chức lớp học, học sinh và đề thi một cách khoa học. Theo dõi tiến độ học tập dễ dàng.",
    icon: "people-circle-outline" as any,
    bgColor: "#DBEAFE",
    iconColor: "#3B82F6",
  },
  {
    id: "3",
    title: "Tạo đề thi dễ dàng",
    subtitle:
      "Sử dụng AI hoặc tạo thủ công với giao diện trực quan. Chia sẻ đề thi qua nhiều kênh.",
    icon: "document-text-outline" as any,
    bgColor: "#FEF3C7",
    iconColor: "#F59E0B",
  },
];

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  const goNext = () => {
    if (isLast) {
      navigation.replace("Auth");
    } else {
      setStep(step + 1);
    }
  };

  const goToAuth = () => navigation.replace("Auth");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={goToAuth}>
        <Text style={styles.skipText}>Bỏ qua</Text>
      </TouchableOpacity>

      <View style={[styles.iconCircle, { backgroundColor: current.bgColor }]}>
        <Ionicons name={current.icon} size={80} color={current.iconColor} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.subtitle}>{current.subtitle}</Text>
      </View>

      <View style={styles.dotsContainer}>
        {STEPS.map((_, i) => (
          <View key={i} style={i === step ? styles.dotActive : styles.dot} />
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
          <Text style={styles.nextBtnText}>
            {isLast ? "Bắt đầu ngay" : "Tiếp theo"}
          </Text>
          {!isLast && (
            <Ionicons name="arrow-forward" size={18} color={Colors.white} />
          )}
        </TouchableOpacity>
        {!isLast && (
          <TouchableOpacity style={styles.loginLinkBtn} onPress={goToAuth}>
            <Text style={styles.loginLinkText}>
              Đã có tài khoản?{" "}
              <Text style={styles.loginLinkAccent}>Đăng nhập ngay</Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  skipBtn: { position: "absolute", top: 60, right: 20, padding: 8 },
  skipText: { fontSize: 15, color: Colors.textSecondary },
  iconCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 4,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 48,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.gray30 },
  dotActive: {
    width: 32,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  buttonsContainer: { width: "100%", paddingBottom: 40 },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: "rgba(33,196,93,0.3)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  nextBtnText: { fontSize: 16, fontWeight: "700", color: Colors.white },
  loginLinkBtn: { alignItems: "center", paddingVertical: 8 },
  loginLinkText: { fontSize: 14, color: Colors.textSecondary },
  loginLinkAccent: { color: Colors.primary, fontWeight: "600" },
});
