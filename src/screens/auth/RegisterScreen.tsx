import React, { useState } from "react";
import {
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

type Role = "teacher" | "student";

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Register">;
  onAuthSuccess?: () => void;
}

export const RegisterScreen: React.FC<Props> = ({
  navigation,
  onAuthSuccess,
}) => {
  const [role, setRole] = useState<Role>("teacher");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      return;
    }

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

          <View style={styles.header}>
            <Text style={styles.title}>Đăng ký tài khoản</Text>
            <Text style={styles.subtitle}>
              Chào mừng bạn! Vui lòng điền thông tin bên dưới để bắt đầu hành
              trình học tập.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Bạn là ai?</Text>
            <View style={styles.roleRow}>
              <TouchableOpacity
                onPress={() => setRole("teacher")}
                style={[
                  styles.roleCard,
                  role === "teacher" && styles.roleCardActive,
                ]}
              >
                <View
                  style={[
                    styles.roleIconWrap,
                    role === "teacher" && styles.roleIconWrapActive,
                  ]}
                >
                  <Ionicons
                    color={role === "teacher" ? "#22C55E" : "#64748B"}
                    name="school-outline"
                    size={24}
                  />
                </View>
                <Text
                  style={[
                    styles.roleText,
                    role === "teacher" && styles.roleTextActive,
                  ]}
                >
                  Giáo viên
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRole("student")}
                style={[
                  styles.roleCard,
                  role === "student" && styles.roleCardActive,
                ]}
              >
                <View
                  style={[
                    styles.roleIconWrap,
                    role === "student" && styles.roleIconWrapActive,
                  ]}
                >
                  <Ionicons
                    color={role === "student" ? "#22C55E" : "#64748B"}
                    name="calendar-clear-outline"
                    size={24}
                  />
                </View>
                <Text
                  style={[
                    styles.roleText,
                    role === "student" && styles.roleTextActive,
                  ]}
                >
                  Học sinh
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Họ và tên</Text>
              <View style={styles.inputWrap}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#94A3B8"
                  style={styles.inputIcon}
                />
                <TextInput
                  autoCapitalize="words"
                  onChangeText={setFullName}
                  placeholder="Nhập họ tên của bạn"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                  value={fullName}
                />
              </View>
            </View>

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
                  placeholder="name@example.com"
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
              <Text style={styles.passwordHint}>
                Mật khẩu phải có ít nhất 8 ký tự.
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Xác nhận mật khẩu</Text>
              <View style={styles.inputWrap}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#94A3B8"
                  style={styles.inputIcon}
                />
                <TextInput
                  onChangeText={setConfirm}
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirm}
                  style={styles.input}
                  value={confirm}
                />
                <TouchableOpacity
                  hitSlop={8}
                  onPress={() => setShowConfirm((value) => !value)}
                  style={styles.eyeBtn}
                >
                  <Ionicons
                    name={showConfirm ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
              <Text style={styles.registerBtnText}>Đăng ký</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>HOẶC ĐĂNG KÝ VỚI</Text>
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

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.loginLink}>Đăng nhập ngay</Text>
              </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 10,
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
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 10,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 28,
    color: Colors.textSecondary,
    maxWidth: 360,
  },
  section: {
    marginBottom: 22,
  },
  sectionLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  roleRow: {
    flexDirection: "row",
    gap: 18,
  },
  roleCard: {
    flex: 1,
    height: 108,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#EFF3F8",
    alignItems: "center",
    justifyContent: "center",
  },
  roleCardActive: {
    backgroundColor: "#E7F7EC",
    borderColor: "#22C55E",
    borderWidth: 2,
  },
  roleIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  roleIconWrapActive: {
    backgroundColor: Colors.white,
  },
  roleText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    color: "#334155",
  },
  roleTextActive: {
    color: "#22C55E",
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
  },
  inputWrap: {
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCE6F2",
    backgroundColor: "#FCFDFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
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
  passwordHint: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  registerBtn: {
    height: 54,
    borderRadius: 27,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(34,197,94,0.30)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 5,
    marginTop: 16,
    marginBottom: 32,
  },
  registerBtnText: {
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
    gap: 18,
    marginBottom: 26,
  },
  socialBtn: {
    flex: 1,
    height: 54,
    borderRadius: 27,
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
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 6,
  },
  loginText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: 14,
    lineHeight: 20,
    color: "#22C55E",
    fontWeight: "700",
  },
});
