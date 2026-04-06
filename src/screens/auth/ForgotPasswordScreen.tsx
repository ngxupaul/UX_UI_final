import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
}

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email của bạn');
      return;
    }
    Alert.alert(
      'Đã gửi liên kết đặt lại mật khẩu',
      `Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email ${email}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.overlayTop} />
        <View style={styles.overlayBottom} />

        <View style={styles.body}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="key-outline" size={40} color={Colors.primary} />
            </View>
          </View>
          <Text style={styles.title}>Khôi phục mật khẩu</Text>
          <Text style={styles.subtitle}>
            Nhập email của bạn và chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
          </Text>
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={20} color={Colors.gray50} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
              <Text style={styles.sendBtnText}>Gửi liên kết đặt lại</Text>
              <Ionicons name="arrow-forward" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { flex: 1, paddingHorizontal: 24, position: 'relative' },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.gray10,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
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
  body: { flex: 1, paddingTop: 32, alignItems: 'center' },
  iconContainer: { marginBottom: 24 },
  iconCircle: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  title: {
    fontSize: 24, fontWeight: '700', color: Colors.textPrimary,
    textAlign: 'center', marginBottom: 12,
  },
  subtitle: {
    fontSize: 15, color: Colors.textSecondary,
    textAlign: 'center', lineHeight: 24, marginBottom: 32,
    paddingHorizontal: 8,
  },
  form: { width: '100%' },
  label: {
    fontSize: 12, fontWeight: '600', color: Colors.textPrimary,
    letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4,
  },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: Colors.gray20,
    borderRadius: 16, paddingHorizontal: 16, height: 56,
    marginBottom: 20,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: Colors.textPrimary },
  sendBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.primary, height: 52, borderRadius: 24,
    shadowColor: 'rgba(33,196,93,0.3)', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1, shadowRadius: 15, elevation: 4,
  },
  sendBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },
});