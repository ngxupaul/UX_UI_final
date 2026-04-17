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
import { Colors } from "../../theme";
import type { DashboardStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const TODAY_NOTIFICATIONS = [
  {
    id: "today-exam",
    title: "Môn Toán: Bài kiểm tra Giữa kỳ 2",
    body:
      "Bài kiểm tra sẽ bắt đầu sau 30 phút nữa. Hãy kiểm tra lại kết nối mạng và dụng cụ học tập.",
    time: "1 giờ trước",
    unread: true,
    icon: "time-outline" as const,
    iconColor: "#006E2F",
    iconBackground: "rgba(33,196,93,0.12)",
    actionLabel: "Vào phòng",
    actionType: "button" as const,
  },
  {
    id: "today-ai",
    title: "AI khuyên dùng",
    body:
      "Bạn có một số lỗ hổng ở chương Hình học, hãy tự luyện tập ngay để cải thiện điểm số.",
    time: "2 giờ trước",
    unread: true,
    icon: "sparkles" as const,
    iconColor: "#FFFFFF",
    iconBackground: "gradient",
    actionLabel: "GỢI Ý THÔNG MINH",
    actionType: "caption" as const,
  },
] as const;

const YESTERDAY_NOTIFICATIONS = [
  {
    id: "yesterday-result",
    title: "Môn Tiếng Anh: Kết quả Reading",
    body: "Bạn đã có kết quả bài kiểm tra Reading. Xem điểm ngay!",
    time: "1 ngày trước",
    icon: "trophy-outline" as const,
    iconColor: "#2E7D57",
    iconBackground: "rgba(175,239,180,0.3)",
    actionLabel: "Xem chi tiết",
  },
] as const;

const OLDER_NOTIFICATIONS = [
  {
    id: "older-update",
    title: "Cập nhật ứng dụng",
    body:
      "Phiên bản 2.0 đã sẵn sàng với giao diện mượt mà hơn và tính năng AI hỗ trợ giải bài tập mới.",
    time: "3 ngày trước",
    icon: "phone-portrait-outline" as const,
  },
  {
    id: "older-complete",
    title: "Hoàn thành: Kiểm tra Lý 15'",
    body:
      "Bạn đã hoàn thành bài kiểm tra trực tuyến. Kết quả sẽ được gửi sau 24h.",
    time: "5 ngày trước",
    icon: "document-text-outline" as const,
  },
] as const;

export const ThongBaoScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hôm nay</Text>
            <Text style={styles.sectionMeta}>2 MỚI</Text>
          </View>

          {TODAY_NOTIFICATIONS.map((item) => (
            <View key={item.id} style={styles.card}>
              <View
                style={[
                  styles.iconBubble,
                  item.iconBackground === "gradient"
                    ? styles.iconBubbleGradient
                    : { backgroundColor: item.iconBackground },
                ]}
              >
                <Ionicons name={item.icon} size={20} color={item.iconColor} />
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={styles.timeRow}>
                    <Text style={styles.cardTime}>{item.time}</Text>
                    {item.unread ? <View style={styles.unreadDot} /> : null}
                  </View>
                </View>

                <Text style={styles.cardDescription}>{item.body}</Text>

                {item.actionType === "button" ? (
                  <TouchableOpacity
                    style={styles.primaryAction}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate("HocSinhLamBai", { examId: "exam-1" })}
                  >
                    <Text style={styles.primaryActionText}>{item.actionLabel}</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.smartHintRow}>
                    <View style={styles.smartHintDot} />
                    <Text style={styles.smartHintText}>{item.actionLabel}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hôm qua</Text>

          {YESTERDAY_NOTIFICATIONS.map((item) => (
            <View key={item.id} style={styles.mutedCard}>
              <View style={styles.mutedIconBubble}>
                <Ionicons name={item.icon} size={18} color={item.iconColor} />
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardTime}>{item.time}</Text>
                </View>

                <Text style={styles.cardDescription}>{item.body}</Text>

                <TouchableOpacity
                  style={styles.linkRow}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("KetQuaBaiThi", { examId: "exam-1" })}
                >
                  <Text style={styles.linkText}>{item.actionLabel}</Text>
                  <Ionicons name="chevron-forward" size={12} color="#006E2F" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cũ hơn</Text>

          {OLDER_NOTIFICATIONS.map((item) => (
            <View key={item.id} style={styles.olderCard}>
              <View style={styles.olderIconBubble}>
                <Ionicons name={item.icon} size={18} color="#556355" />
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardTime}>{item.time}</Text>
                </View>

                <Text style={styles.cardDescription}>{item.body}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 64,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: -0.6,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
    gap: 32,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "800",
    color: "#161D16",
    letterSpacing: -0.5,
  },
  sectionMeta: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "600",
    color: "#006E2F",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    gap: 16,
    shadowColor: "#161D16",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  mutedCard: {
    backgroundColor: "rgba(237,246,234,0.5)",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    gap: 16,
  },
  olderCard: {
    backgroundColor: "rgba(237,246,234,0.5)",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    gap: 16,
    opacity: 0.8,
  },
  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBubbleGradient: {
    backgroundColor: "#16A34A",
  },
  mutedIconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(175,239,180,0.3)",
  },
  olderIconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCE5D9",
  },
  cardBody: {
    flex: 1,
    gap: 8,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#161D16",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 4,
  },
  cardTime: {
    fontSize: 10,
    lineHeight: 15,
    color: "#6D7B6C",
    fontWeight: "400",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#006E2F",
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 22.75,
    color: "#3D4A3D",
  },
  primaryAction: {
    marginTop: 4,
    alignSelf: "flex-start",
    backgroundColor: "#21C45D",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  primaryActionText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  smartHintRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  smartHintDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#006E2F",
  },
  smartHintText: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "600",
    color: "#006E2F",
    letterSpacing: 1,
  },
  linkRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  linkText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#006E2F",
  },
});
