import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
  onAuthSuccess?: () => void;
}

type RoleType = 'teacher' | 'student';

export const RegisterScreen: React.FC<Props> = ({ navigation, onAuthSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>('teacher');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleRegister = () => {
    const newErrors: typeof errors = {};
    if (!fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    if (!email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!validateEmail(email)) newErrors.email = 'Email không hợp lệ';
    if (!password) newErrors.password = 'Vui lòng nhập mật khẩu';
    else if (password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    onAuthSuccess?.();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Blurred overlay blobs */}
          <View style={styles.overlayTop} />
          <View style={styles.overlayBottom} />

          {/* ── Header ── */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
            </TouchableOpacity>

            <View style={styles.headerDividerWrap}>
              <View style={styles.headerDivider} />
            </View>

            <TouchableOpacity style={styles.helpBtn}>
              <Text style={styles.helpBtnText}>Trợ giúp</Text>
            </TouchableOpacity>
          </View>

          {/* ── Heading ── */}
          <View style={styles.headingWrap}>
            <Text style={styles.headingTitle}>Đăng ký tài khoản</Text>
            <Text style={styles.headingSubtitle}>
              Chào mừng bạn! Vui lòng điền thông tin bên dưới để bắt đầu hành trình học tập.
            </Text>
          </View>

          {/* ── Role Selector ── */}
          <View style={styles.roleSection}>
            <Text style={styles.roleLabel}>Bạn là ai?</Text>
            <View style={styles.roleCards}>
              <TouchableOpacity
                style={[
                  styles.roleCard,
                  selectedRole === 'teacher' && styles.roleCardActive,
                ]}
                onPress={() => setSelectedRole('teacher')}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.roleIconWrap,
                    selectedRole === 'teacher' && styles.roleIconWrapActive,
                  ]}
                >
                  <Ionicons
                    name="school-outline"
                    size={24}
                    color={selectedRole === 'teacher' ? Colors.primary : '#64748B'}
                  />
                </View>
                <Text
                  style={[
                    styles.roleCardText,
                    selectedRole === 'teacher' && styles.roleCardTextActive,
                  ]}
                >
                  Giáo viên
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleCard,
                  selectedRole === 'student' && styles.roleCardActive,
                ]}
                onPress={() => setSelectedRole('student')}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.roleIconWrap,
                    selectedRole === 'student' && styles.roleIconWrapActive,
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color={selectedRole === 'student' ? Colors.primary : '#64748B'}
                  />
                </View>
                <Text
                  style={[
                    styles.roleCardText,
                    selectedRole === 'student' && styles.roleCardTextActive,
                  ]}
                >
                  Học sinh
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Form ── */}
          <View style={styles.form}>
            {/* Họ và tên */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Họ và tên *</Text>
              <View
                style={[
                  styles.inputWrap,
                  errors.fullName && styles.inputWrapError,
                ]}
              >
                <View style={styles.inputIconWrap}>
                  <Ionicons name="person-outline" size={16} color="#94A3B8" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập họ tên của bạn"
                  placeholderTextColor="#94A3B8"
                  value={fullName}
                  onChangeText={(t) => { setFullName(t); setErrors((e) => ({ ...e, fullName: undefined })); }}
                  autoCapitalize="words"
                />
              </View>
              {errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email *</Text>
              <View
                style={[
                  styles.inputWrap,
                  errors.email && styles.inputWrapError,
                ]}
              >
                <View style={styles.inputIconWrap}>
                  <Ionicons name="mail-outline" size={16} color="#94A3B8" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={(t) => { setEmail(t); setErrors((e) => ({ ...e, email: undefined })); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Mật khẩu */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Mật khẩu *</Text>
              <View
                style={[
                  styles.inputWrap,
                  errors.password && styles.inputWrapError,
                ]}
              >
                <View style={styles.inputIconWrap}>
                  <Ionicons name="lock-closed-outline" size={16} color="#94A3B8" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: undefined })); }}
                  secureTextEntry={!showPw}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPw(!showPw)}
                >
                  <Ionicons
                    name={showPw ? 'eye-off-outline' : 'eye-outline'}
                    size={16}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
          </View>

          {/* ── Register Button ── */}
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.registerBtnText}>Đăng ký</Text>
          </TouchableOpacity>

          {/* ── Divider ── */}
          <View style={styles.dividerWrap}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerBadge}>
              <Text style={styles.dividerText}>HOẶC ĐĂNG KÝ VỚI</Text>
            </View>
          </View>

          {/* ── Social Buttons ── */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
              <Ionicons name="logo-google" size={20} color="#4285F4" />
              <Text style={styles.socialBtnText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              <Text style={styles.socialBtnText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* ── Login Link ── */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}>Đăng nhập ngay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  /* ── Overlays ── */
  overlayTop: {
    position: 'absolute',
    top: -93,
    left: -43,
    width: 215,
    height: 280,
    backgroundColor: 'rgba(240,253,244,0.5)',
    borderRadius: 150,
    zIndex: 0,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    right: -60,
    width: 172,
    height: 280,
    backgroundColor: 'rgba(220,252,231,0.5)',
    borderRadius: 100,
    zIndex: 0,
  },

  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 24,
    zIndex: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDividerWrap: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerDivider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E2E8F0',
  },
  helpBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  helpBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },

  /* ── Heading ── */
  headingWrap: {
    marginBottom: 20,
    zIndex: 1,
  },
  headingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  headingSubtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
  },

  /* ── Role Selector ── */
  roleSection: {
    marginBottom: 20,
    zIndex: 1,
  },
  roleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 10,
  },
  roleCards: {
    flexDirection: 'row',
    gap: 12,
  },
  roleCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  roleCardActive: {
    borderColor: Colors.primary,
    backgroundColor: '#F0FDF4',
  },
  roleIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleIconWrapActive: {
    backgroundColor: '#DCFCE7',
  },
  roleCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  roleCardTextActive: {
    color: Colors.primary,
  },

  /* ── Form ── */
  form: {
    marginBottom: 16,
    zIndex: 1,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 47,
    paddingRight: 12,
    overflow: 'hidden',
  },
  inputWrapError: {
    borderColor: Colors.error,
  },
  inputIconWrap: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 0,
  },
  eyeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
    marginLeft: 4,
  },

  /* ── Register Button ── */
  registerBtn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(34,197,94,0.35)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 20,
    zIndex: 1,
  },
  registerBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },

  /* ── Divider ── */
  dividerWrap: {
    position: 'relative',
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  dividerLine: {
    position: 'absolute',
    top: 7.5,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerBadge: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },

  /* ── Social Buttons ── */
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    zIndex: 1,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },

  /* ── Login Link ── */
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
  loginText: {
    fontSize: 14,
    color: '#64748B',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
});
