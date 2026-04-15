import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../../theme";
import type { RootStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

type Step = {
  id: string;
  title: string;
  subtitle: string;
  renderArtwork: () => React.ReactNode;
};

const StepOneArtwork = () => (
  <View style={styles.heroCardLarge}>
    <View style={styles.heroGlowGreen} />
    <View style={styles.sparkleCircle}>
      <Ionicons name="sparkles" size={54} color="#4ADE80" />
    </View>

    <View style={styles.stepOneCardsRow}>
      <View style={[styles.paperCard, styles.paperCardLeft]}>
        <View style={styles.paperLineWide} />
        <View style={styles.paperLineShort} />
        <View style={[styles.paperLineWide, styles.paperLineBottom]} />
      </View>

      <View style={styles.centerActionTile}>
        <Ionicons name="create-outline" size={22} color={Colors.white} />
      </View>

      <View style={[styles.paperCard, styles.paperCardRight]}>
        <View style={styles.paperLineWide} />
        <View style={styles.paperLineShort} />
        <View style={[styles.paperLineWide, styles.paperLineBottom]} />
      </View>
    </View>
  </View>
);

const StepTwoArtwork = () => (
  <View style={styles.heroCardMedium}>
    <LinearGradient
      colors={["#041A1A", "#0D2728", "#0B1617"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.analyticsPanel}
    >
      <View style={styles.analyticsScreen}>
        <View style={styles.analyticsTopRow}>
          <View style={styles.analyticsPieWrap}>
            <View style={styles.analyticsPieBlue} />
            <View style={styles.analyticsPieOrange} />
          </View>
          <View style={styles.analyticsLineChart}>
            <View style={[styles.analyticsPoint, { left: 0, top: 50 }]} />
            <View style={[styles.analyticsPoint, { left: 26, top: 30 }]} />
            <View style={[styles.analyticsPoint, { left: 58, top: 34 }]} />
            <View style={[styles.analyticsPoint, { left: 92, top: 10 }]} />
            <View style={[styles.analyticsPoint, { left: 126, top: 0 }]} />
            <View style={styles.analyticsLine} />
          </View>
        </View>

        <View style={styles.analyticsBars}>
          {[44, 68, 50, 76, 58, 86, 64].map((height, index) => (
            <View key={`bar-${index}`} style={styles.analyticsBarGroup}>
              <View
                style={[
                  styles.analyticsBar,
                  styles.analyticsBarBlue,
                  { height },
                ]}
              />
              <View
                style={[
                  styles.analyticsBar,
                  styles.analyticsBarOrange,
                  { height: Math.max(24, height - 18) },
                ]}
              />
            </View>
          ))}
        </View>
      </View>
    </LinearGradient>

    <View style={styles.scoreBadge}>
      <View style={styles.scoreBadgeIcon}>
        <Ionicons name="checkmark-done" size={18} color={Colors.primary} />
      </View>
      <View>
        <Text style={styles.scoreBadgeLabel}>Đã chấm xong</Text>
        <Text style={styles.scoreBadgeValue}>100/100</Text>
      </View>
    </View>
  </View>
);

const StepThreeArtwork = () => (
  <LinearGradient
    colors={["#5BC8C2", "#6BBDB5", "#69C3CE"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.heroCardLandscape}
  >
    <View style={styles.connectionLine} />
    {[0.18, 0.32, 0.5, 0.68, 0.82].map((left, index) => (
      <View
        key={`spark-${index}`}
        style={[
          styles.connectionSpark,
          { left: `${left * 100}%`, top: index % 2 === 0 ? "48%" : "43%" },
        ]}
      />
    ))}

    <View style={styles.peopleRow}>
      {[
        { color: "#0F172A", icon: "person" as const },
        { color: "#DC2626", icon: "person" as const },
        { color: "#FFFFFF", icon: "person" as const },
        { color: "#F8FAFC", icon: "person" as const },
        { color: "#1E293B", icon: "person" as const },
      ].map((person, index) => (
        <View key={`person-${index}`} style={styles.personNode}>
          <View style={[styles.personHead, { backgroundColor: person.color }]} />
          <View
            style={[styles.personBody, { backgroundColor: person.color }]}
          />
        </View>
      ))}
    </View>
  </LinearGradient>
);

const STEPS: Step[] = [
  {
    id: "1",
    title: "Tạo đề thi trong chớp mắt",
    subtitle:
      "Sử dụng sức mạnh AI để tạo hàng chục câu hỏi trắc nghiệm chỉ từ một mô tả đơn giản.",
    renderArtwork: () => <StepOneArtwork />,
  },
  {
    id: "2",
    title: "Chấm bài & Phân tích tức thì",
    subtitle:
      "Hệ thống tự động chấm điểm và cung cấp biểu đồ phân tích kết quả chi tiết ngay sau khi học sinh nộp bài.",
    renderArtwork: () => <StepTwoArtwork />,
  },
  {
    id: "3",
    title: "Kết nối lớp học dễ dàng",
    subtitle:
      "Giao bài tập, quản lý danh sách lớp và tương tác với học sinh mọi lúc mọi nơi trên mọi thiết bị.",
    renderArtwork: () => <StepThreeArtwork />,
  },
];

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  const goNext = () => {
    if (isLast) {
      navigation.replace("Auth");
      return;
    }

    setStep((previousStep) => previousStep + 1);
  };

  const goToAuth = () => navigation.replace("Auth");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={goToAuth}>
        <Text style={styles.skipText}>Bỏ qua</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.heroStage}>{current.renderArtwork()}</View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.subtitle}>{current.subtitle}</Text>
        </View>

        <View style={styles.dotsContainer}>
          {STEPS.map((item, index) => (
            <View
              key={item.id}
              style={index === step ? styles.dotActive : styles.dot}
            />
          ))}
        </View>
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
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  skipBtn: {
    position: "absolute",
    top: 56,
    right: 18,
    zIndex: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.textMuted,
  },
  heroStage: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 348,
    marginBottom: 34,
  },
  heroCardLarge: {
    width: 326,
    height: 352,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroGlowGreen: {
    position: "absolute",
    width: 288,
    height: 288,
    borderRadius: 144,
    backgroundColor: "#DCFCE7",
    opacity: 0.45,
  },
  sparkleCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(34,197,94,0.18)",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 6,
  },
  stepOneCardsRow: {
    position: "absolute",
    bottom: 80,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  paperCard: {
    width: 44,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray20,
    paddingTop: 8,
    paddingHorizontal: 7,
    shadowColor: "rgba(15,23,42,0.12)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  paperCardLeft: {
    transform: [{ rotate: "-8deg" }],
  },
  paperCardRight: {
    transform: [{ rotate: "8deg" }],
  },
  paperLineWide: {
    height: 4,
    borderRadius: 999,
    backgroundColor: Colors.gray20,
    marginBottom: 6,
  },
  paperLineShort: {
    width: 22,
    height: 4,
    borderRadius: 999,
    backgroundColor: Colors.gray20,
  },
  paperLineBottom: {
    marginTop: 18,
    marginBottom: 0,
  },
  centerActionTile: {
    width: 44,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    borderWidth: 1,
    borderColor: "#15803D",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(22,163,74,0.28)",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 6,
    transform: [{ translateY: -12 }],
  },
  heroCardMedium: {
    width: 326,
    height: 317,
    alignItems: "center",
    justifyContent: "center",
  },
  analyticsPanel: {
    width: 326,
    height: 317,
    borderRadius: 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  analyticsScreen: {
    width: 238,
    height: 160,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "rgba(12, 23, 24, 0.92)",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  analyticsTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  analyticsPieWrap: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#133437",
    overflow: "hidden",
  },
  analyticsPieBlue: {
    position: "absolute",
    right: 0,
    top: 12,
    width: 34,
    height: 34,
    borderTopLeftRadius: 34,
    borderBottomLeftRadius: 34,
    backgroundColor: "#38BDF8",
  },
  analyticsPieOrange: {
    position: "absolute",
    left: 18,
    bottom: 0,
    width: 24,
    height: 28,
    borderTopLeftRadius: 24,
    backgroundColor: "#FB923C",
  },
  analyticsLineChart: {
    width: 138,
    height: 70,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "rgba(148,163,184,0.18)",
  },
  analyticsLine: {
    position: "absolute",
    left: 8,
    right: 6,
    top: 36,
    height: 2,
    backgroundColor: "#F59E0B",
    transform: [{ rotate: "-16deg" }],
  },
  analyticsPoint: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#F59E0B",
  },
  analyticsBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 58,
  },
  analyticsBarGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
  },
  analyticsBar: {
    width: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  analyticsBarBlue: {
    backgroundColor: "#38BDF8",
  },
  analyticsBarOrange: {
    backgroundColor: "#FB923C",
  },
  scoreBadge: {
    position: "absolute",
    right: 16,
    bottom: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    paddingHorizontal: 13,
    paddingVertical: 12,
    shadowColor: "rgba(0,0,0,0.12)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 6,
  },
  scoreBadgeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  scoreBadgeLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
  },
  scoreBadgeValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  heroCardLandscape: {
    width: 382,
    maxWidth: "100%",
    aspectRatio: 4 / 3,
    alignSelf: "center",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  connectionLine: {
    position: "absolute",
    left: "18%",
    right: "18%",
    top: "50%",
    height: 2,
    backgroundColor: "rgba(255,255,255,0.72)",
  },
  connectionSpark: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FDE68A",
  },
  peopleRow: {
    width: "74%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  personNode: {
    alignItems: "center",
  },
  personHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 2,
  },
  personBody: {
    width: 5,
    height: 14,
    borderRadius: 3,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 34,
  },
  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    letterSpacing: -0.75,
    textAlign: "center",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  subtitle: {
    maxWidth: 342,
    fontSize: 16,
    lineHeight: 28,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: Colors.gray20,
  },
  dotActive: {
    width: 32,
    height: 8,
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  buttonsContainer: {
    paddingTop: 18,
  },
  nextBtn: {
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "rgba(33,196,93,0.30)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
  },
  loginLinkBtn: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 4,
  },
  loginLinkText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  loginLinkAccent: {
    color: Colors.primary,
    fontWeight: "700",
  },
});
