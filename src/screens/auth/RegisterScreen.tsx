import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme';
import { Button, InputField } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList, RootStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
}

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  // Access the parent (Root) navigator to navigate to MainTabs
  const parentNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }
    setLoading(true);
    // Use parent navigator to reset stack to MainTabs (no back navigation to login/register)
    setTimeout(() => {
      setLoading(false);
      parentNav.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        })
      );
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Decorative overlays */}
        <View style={[styles.overlayTop]} />
        <View style={[styles.overlayBottom]} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Tạo tài khoản mới</Text>
          <Text style={styles.subtitle}>Đăng ký để bắt đầu sử dụng Flazers</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <InputField
            label="Họ và tên"
            placeholder="Nhập họ và tên của bạn"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
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
            placeholder="Tạo mật khẩu (ít nhất 8 ký tự)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <InputField
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Button
            title="Đăng ký"
            onPress={handleRegister}
            fullWidth
            style={{ marginTop: 8 }}
          />

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
  header: { paddingTop: 8, paddingBottom: 24 },
  backBtn: { padding: 4, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 15, color: Colors.textSecondary },
  form: { paddingTop: 8 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  loginText: { fontSize: 14, color: Colors.textSecondary },
  loginLink: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
});
