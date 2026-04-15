import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../../theme";
import type { AuthStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, "ForgotPassword">;
}

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    if (!email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email của bạn");
      return;
    }

    Alert.alert(
      "Đã gửi liên kết đặt lại mật khẩu",
      `Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email ${email}`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.overlayTop} />
          <View style={styles.overlayBottom} />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.main}>
            <View style={styles.badge}>
              <Ionicons name="refresh-circle-outline" size={28} color="#22C55E" />
            </View>

            <Text style={styles.title}>Khôi phục mật khẩu</Text>
            <Text style={styles.subtitle}>
              Đừng lo lắng! Nhập email liên kết với tài khoản của bạn để nhận
              liên kết đặt lại mật khẩu.
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Email đăng ký</Text>

              <View style={styles.inputWrap}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#22C55E"
                  style={styles.inputIcon}
                />
                <TextInput
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="name@example.com"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                  value={email}
                />
              </View>

              <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
                <Text style={styles.sendBtnText}>Gửi yêu cầu</Text>
                <Ionicons
                  name="paper-plane-outline"
                  size={18}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Bạn nhớ mật khẩu rồi? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.footerLink}>Đăng nhập ngay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboard: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 1,
    paddingBottom: 24,
  },
  overlayTop: {
    position: "absolute",
    top: -93,
    left: -43,
    width: 215,
    height: 280,
    borderRadius: 150,
    backgroundColor: "rgba(240,253,244,0.55)",
  },
  overlayBottom: {
    position: "absolute",
    right: -43,
    bottom: 20,
    width: 172,
    height: 280,
    borderRadius: 120,
    backgroundColor: "rgba(220,252,231,0.55)",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  main: {
    paddingTop: 28,
    minHeight: 623,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DCFCE7",
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: -0.75,
    marginBottom: 14,
  },
  subtitle: {
    maxWidth: 342,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 36,
  },
  form: {
    width: "100%",
    maxWidth: 382,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputWrap: {
    height: 55,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 24,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  sendBtn: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#22C55E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "rgba(34,197,94,0.30)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  sendBtnText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: Colors.white,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 12,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#22C55E",
  },
});
