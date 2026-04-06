import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
  onAuthSuccess?: () => void;
}

export const RegisterScreen: React.FC<Props> = ({ navigation, onAuthSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = () => {
    if (!fullName || !email || !password || !confirm) return;
    onAuthSuccess?.();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.overlayTop} />
        <View style={styles.overlayBottom} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tạo tài khoản mới</Text>
          <View style={{ width: 32 }} />
        </View>
        <Text style={styles.subtitle}>Đăng ký để bắt đầu sử dụng Flazers</Text>
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="person-outline" size={20} color={Colors.gray50} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Nhập họ và tên của bạn" placeholderTextColor={Colors.textMuted} value={fullName} onChangeText={setFullName} autoCapitalize="words" />
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={20} color={Colors.gray50} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Nhập email của bạn" placeholderTextColor={Colors.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.gray50} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Tạo mật khẩu (ít nhất 8 ký tự)" placeholderTextColor={Colors.textMuted} value={password} onChangeText={setPassword} secureTextEntry={!showPw} />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPw(!showPw)}>
                <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={20} color={Colors.gray50} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Xác nhận mật khẩu</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.gray50} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Nhập lại mật khẩu" placeholderTextColor={Colors.textMuted} value={confirm} onChangeText={setConfirm} secureTextEntry={!showConfirm} />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} color={Colors.gray50} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.terms}>
            Bằng việc đăng ký, bạn đã đồng ý với{' '}
            <Text style={styles.termsLink}>Điều khoản sử dụng</Text> và{' '}
            <Text style={styles.termsLink}>Chính sách bảo mật</Text> của Flazers
          </Text>
          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.registerBtnText}>Tạo tài khoản</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}>Đăng nhập ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scroll: { flexGrow: 1, paddingHorizontal: 16 },
  overlayTop: {
    position: 'absolute',
    top: -120, left: -100,
    width: 215, height: 280,
    backgroundColor: 'rgba(240,253,244,0.5)',
    borderRadius: 150,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0, right: -60,
    width: 172, height: 280,
    backgroundColor: 'rgba(220,252,231,0.5)',
    borderRadius: 100,
  },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 8, marginBottom: 20,
  },
  backBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.gray10,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 28, textAlign: 'center' },
  form: { paddingBottom: 24 },
  fieldGroup: { marginBottom: 16 },
  label: {
    fontSize: 12, fontWeight: '600', color: Colors.textPrimary,
    letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4,
  },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: Colors.gray20,
    borderRadius: 16, paddingHorizontal: 16, height: 56,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: Colors.textPrimary },
  eyeBtn: { padding: 8 },
  terms: {
    fontSize: 12, color: Colors.textSecondary, textAlign: 'center',
    marginBottom: 20, lineHeight: 18, paddingHorizontal: 8,
  },
  termsLink: { color: Colors.primary, fontWeight: '500' },
  registerBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.primary, height: 52, borderRadius: 24, marginBottom: 16,
  },
  registerBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { fontSize: 14, color: Colors.textSecondary },
  loginLink: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
});