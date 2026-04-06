import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme';
import { Button, InputField } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList, RootStackParamList } from '../../types';

// Dummy credentials — no backend needed
const DUMMY_USERS = [
  { email: 'admin@flazers.vn', password: 'admin123', name: 'Nguyễn Văn Admin', role: 'admin' },
  { email: 'giaovien@flazers.vn', password: 'teacher123', name: 'Trần Thị Giáo Viên', role: 'teacher' },
];

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const parentNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Find matching dummy user
    const user = DUMMY_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      setLoading(false);
      Alert.alert(
        'Đăng nhập thất bại',
        'Email hoặc mật khẩu không đúng.\n\nDemo credentials:\n• admin@flazers.vn / admin123\n• giaovien@flazers.vn / teacher123'
      );
      return;
    }

    setLoading(false);
    // Navigate to main app — user info stored in sessionStorage equivalent
    parentNav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      })
    );
  };

  const fillDemo = (userEmail: string) => {
    const user = DUMMY_USERS[0];
    if (userEmail === 'admin') {
      setEmail(DUMMY_USERS[0].email);
      setPassword(DUMMY_USERS[0].password);
    } else {
      setEmail(DUMMY_USERS[1].email);
      setPassword(DUMMY_USERS[1].password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Decorative overlays */}
        <View style={styles.overlayTop} />
        <View style={styles.overlayBottom} />

        {/* Logo / Title */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="school" size={40} color={Colors.white} />
          </View>
          <Text style={styles.appName}>Flazers</Text>
          <Text style={styles.welcomeBack}>Chào mừng bạn quay trở lại!</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <InputField
            label="Email"
            placeholder="Nhập email của bạn"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          {/* Show/hide password */}
          <TouchableOpacity
            style={styles.showPassword}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.gray50}
            />
            <Text style={styles.showPasswordText}>
              {showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            </Text>
          </TouchableOpacity>

          {/* Forgot password */}
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <Button
            title={loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            onPress={handleLogin}
            fullWidth
            disabled={loading}
            style={{ marginTop: 8 }}
          />

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scroll: { flexGrow: 1, paddingHorizontal: 24 },
  overlayTop: {
    position: 'absolute',
    top: -120,
    left: -100,
    width: 215,
    height: 280,
    backgroundColor: Colors.overlayGreen,
    borderRadius: 150,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    right: -60,
    width: 172,
    height: 280,
    backgroundColor: Colors.overlayGreen,
    borderRadius: 100,
  },
  header: { alignItems: 'center', marginTop: 60, marginBottom: 40 },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  welcomeBack: { fontSize: 15, color: Colors.textSecondary },
  form: { paddingTop: 16 },
  showPassword: { flexDirection: 'row', alignItems: 'center', marginTop: -8, marginBottom: 8 },
  showPasswordText: { marginLeft: 6, fontSize: 13, color: Colors.gray50 },
  forgotPassword: { alignItems: 'flex-end', marginBottom: 24 },
  forgotPasswordText: { fontSize: 14, color: Colors.primary, fontWeight: '500' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  registerText: { fontSize: 14, color: Colors.textSecondary },
  registerLink: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
  demoSection: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.gray20,
    alignItems: 'center',
  },
  demoTitle: { fontSize: 13, color: Colors.textSecondary, marginBottom: 12, fontWeight: '600' },
  demoRow: { flexDirection: 'row', gap: 12 },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.gray30,
  },
  demoBtnText: { fontSize: 13, color: Colors.textPrimary, fontWeight: '600' },
});
