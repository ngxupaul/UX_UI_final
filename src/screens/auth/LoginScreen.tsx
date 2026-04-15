import React, { useState } from "react";
import {
  ActivityIndicator,
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
import { useMockSession } from "../../context/MockSessionContext";
import { MOCK_USERS } from "../../mocks/appData";
import type { AppRole } from "../../mocks/appData";
import { Colors } from "../../theme";
import type { AuthStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Login">;
  onAuthSuccess?: () => void;
}

const BrandMark = () => (
  <View style={styles.brandWrap}>
    <View style={styles.brandBadge}>
      <Text style={styles.brandEmoji}>🐱</Text>
    </View>
    <Text style={styles.brandText}>Quizken</Text>
  </View>
);

export const LoginScreen: React.FC<Props> = ({ navigation, onAuthSuccess }) => {
  const { setCurrentUserByEmail } = useMockSession();
  const [email, setEmail] = useState("hocsinh@flazers.vn");
  const [password, setPassword] = useState("student123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const fillDemo = (role: AppRole) => {
    const user = MOCK_USERS.find((item) => item.role === role);
    if (!user) return;
    setEmail(user.email);
    setPassword(user.password);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = MOCK_USERS.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setLoading(false);
      Alert.alert(
        "Đăng nhập thất bại",
        "Email hoặc mật khẩu không đúng.\n\nDemo:\n• hocsinh@flazers.vn / student123\n• giaovien@flazers.vn / teacher123\n• admin@flazers.vn / admin123"
      );
      return;
    }

    setLoading(false);
    setCurrentUserByEmail(user.email);
    onAuthSuccess?.();
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

          <View style={styles.loginContent}>
            <BrandMark />

            <View style={styles.heroTextWrap}>
              <Text style={styles.welcomeTitle}>Chào mừng trở lại!</Text>
              <Text style={styles.welcomeSub}>
                Tiếp tục hành trình học tập của bạn ngày hôm nay.
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrap}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#94A3B8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    placeholder="ten@vidu.com"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    value={email}
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Mật khẩu</Text>
                <View style={styles.inputWrap}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#94A3B8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    value={password}
                  />
                  <TouchableOpacity
                    hitSlop={8}
                    onPress={() => setShowPassword((value) => !value)}
                    style={styles.eyeBtn}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#94A3B8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
                style={styles.forgotBtn}
              >
                <Text style={styles.forgotText}>Quên mật khẩu?</Text>
              </TouchableOpacity>

              <View style={styles.demoWrap}>
                <Text style={styles.demoLabel}>Đăng nhập nhanh</Text>
                <View style={styles.demoRow}>
                  <TouchableOpacity
                    onPress={() => fillDemo("student")}
                    style={[styles.demoChip, styles.demoChipActive]}
                  >
                    <Ionicons name="school-outline" size={16} color="#22C55E" />
                    <Text style={[styles.demoChipText, styles.demoChipTextActive]}>
                      Học sinh
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => fillDemo("teacher")}
                    style={styles.demoChip}
                  >
                    <Ionicons name="reader-outline" size={16} color="#64748B" />
                    <Text style={styles.demoChipText}>Giáo viên</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => fillDemo("admin")}
                    style={styles.demoChip}
                  >
                    <Ionicons name="shield-checkmark-outline" size={16} color="#64748B" />
                    <Text style={styles.demoChipText}>Admin</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                disabled={loading}
                onPress={handleLogin}
                style={styles.loginBtn}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <>
                    <Text style={styles.loginBtnText}>Đăng nhập</Text>
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={22}
                      color={Colors.white}
                    />
                  </>
                )}
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>HOẶC ĐĂNG NHẬP VỚI</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialBtn}>
                  <Text style={styles.googleMark}>G</Text>
                  <Text style={styles.socialBtnText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialBtn}>
                  <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                  <Text style={styles.socialBtnText}>Facebook</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.registerRow}>
                <Text style={styles.registerText}>Chưa có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                  <Text style={styles.registerLink}>Đăng ký ngay</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  overlayTop: {
    position: "absolute",
    top: -39,
    left: -41,
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
  loginContent: {
    width: "100%",
    paddingTop: 22,
    paddingBottom: 18,
  },
  brandWrap: {
    alignItems: "center",
    marginBottom: 24,
  },
  brandBadge: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  brandEmoji: {
    fontSize: 76,
    lineHeight: 86,
  },
  brandText: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  heroTextWrap: {
    alignItems: "center",
    marginBottom: 34,
    paddingHorizontal: 18,
  },
  welcomeTitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  welcomeSub: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.textSecondary,
    textAlign: "center",
    maxWidth: 286,
  },
  form: {
    width: "100%",
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 10,
    paddingLeft: 4,
  },
  inputWrap: {
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#DBE4F0",
    backgroundColor: "#FCFDFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "rgba(15,23,42,0.04)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  eyeBtn: {
    paddingLeft: 8,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginTop: -2,
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#22C55E",
    fontWeight: "600",
  },
  demoWrap: {
    marginBottom: 20,
  },
  demoLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 10,
  },
  demoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  demoChip: {
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  demoChipActive: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
  demoChipText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "#64748B",
  },
  demoChipTextActive: {
    color: "#22C55E",
  },
  loginBtn: {
    height: 54,
    borderRadius: 27,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: "rgba(34,197,94,0.30)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 5,
    marginBottom: 34,
  },
  loginBtnText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: Colors.white,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontSize: 12,
    lineHeight: 16,
    color: "#94A3B8",
    marginHorizontal: 12,
    letterSpacing: 0.35,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 44,
  },
  socialBtn: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#DCE4EE",
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "rgba(15,23,42,0.06)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  socialBtnText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    color: "#334155",
  },
  googleMark: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "700",
    color: "#EA4335",
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  registerLink: {
    fontSize: 14,
    lineHeight: 20,
    color: "#22C55E",
    fontWeight: "700",
  },
});
