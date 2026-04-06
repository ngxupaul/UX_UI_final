import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, ActivityIndicator, Platform, TextInput, KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../types';

// Dummy credentials — no backend needed
const DUMMY_USERS = [
  { email: 'admin@flazers.vn', password: 'admin123', name: 'Nguyễn Văn Admin', role: 'admin' },
  { email: 'giaovien@flazers.vn', password: 'teacher123', name: 'Trần Thị Giáo Viên', role: 'teacher' },
];

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
  onAuthSuccess?: () => void;
}

export const LoginScreen: React.FC<Props> = ({ navigation, onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = DUMMY_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      setLoading(false);
      Alert.alert(
        'Đăng nhập thất bại',
        'Email hoặc mật khẩu không đúng.\n\nDemo:\n• admin@flazers.vn / admin123\n• giaovien@flazers.vn / teacher123'
      );
      return;
    }

    setLoading(false);
    onAuthSuccess?.();
  };

  const fillDemo = (type: 'admin' | 'teacher') => {
    const user = DUMMY_USERS.find((u) => u.role === type);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Decorative overlays */}
          <View style={styles.overlayTop} />
          <View style={styles.overlayBottom} />

          {/* Logo + Title */}
          <View style={styles.logoSection}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>F</Text>
            </View>
            <Text style={styles.welcomeTitle}>Chào mừng trở lại!</Text>
            <Text style={styles.welcomeSub}>
              Tiếp tục hành trình học tập của bạn ngày hôm nay.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="mail-outline" size={20} color={Colors.gray50} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="ten@vidu.com"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Mật khẩu</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.gray50} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, styles.inputNoRight]}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={Colors.gray50}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* Login button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <>
                  <Text style={styles.loginBtnText}>Đăng nhập</Text>
                  <Ionicons name="arrow-forward" size={18} color={Colors.white} />
                </>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Hoặc đăng nhập với</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <View style={styles.googleIcon}>
                  <Text style={styles.googleG}>G</Text>
                </View>
                <Text style={styles.socialBtnText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                <Text style={styles.socialBtnText}>Facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Register link */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>Chưa có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>

            {/* Demo credentials */}
            <View style={styles.demoSection}>
              <Text style={styles.demoTitle}>Tài khoản Demo</Text>
              <View style={styles.demoRow}>
                <TouchableOpacity
                  style={styles.demoBtn}
                  onPress={() => fillDemo('admin')}
                >
                  <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
                  <Text style={styles.demoBtnText}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.demoBtn}
                  onPress={() => fillDemo('teacher')}
                >
                  <Ionicons name="school" size={16} color={Colors.info} />
                  <Text style={styles.demoBtnText}>Giáo viên</Text>
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
  container: { flex: 1, backgroundColor: Colors.white },
  scroll: { flexGrow: 1, paddingHorizontal: 16 },
  overlayTop: {
    position: 'absolute',
    top: -120,
    left: -100,
    width: 215,
    height: 280,
    backgroundColor: 'rgba(240,253,244,0.5)',
    borderRadius: 150,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    right: -60,
    width: 172,
    height: 280,
    backgroundColor: 'rgba(220,252,231,0.5)',
    borderRadius: 100,
  },
  logoSection: { alignItems: 'center', marginTop: 20, paddingHorizontal: 16 },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: { fontSize: 36, fontWeight: '800', color: Colors.primary },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  welcomeSub: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: { marginTop: 32, paddingBottom: 24 },
  fieldGroup: { marginBottom: 16 },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors.gray20,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  inputNoRight: { paddingRight: 0 },
  eyeBtn: { padding: 8 },
  forgotBtn: { alignItems: 'flex-end', marginBottom: 20 },
  forgotText: { fontSize: 14, color: Colors.primary, fontWeight: '500' },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 24,
    marginBottom: 24,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.gray20 },
  dividerText: {
    fontSize: 12,
    color: Colors.textMuted,
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  socialRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray20,
    height: 54,
    borderRadius: 24,
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleG: { fontSize: 14, fontWeight: '700', color: '#4285F4' },
  socialBtnText: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  registerText: { fontSize: 14, color: Colors.textSecondary },
  registerLink: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
  demoSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray20,
    paddingTop: 20,
    alignItems: 'center',
  },
  demoTitle: { fontSize: 12, color: Colors.textMuted, marginBottom: 12, fontWeight: '500' },
  demoRow: { flexDirection: 'row', gap: 12 },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.gray10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray20,
  },
  demoBtnText: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
});
