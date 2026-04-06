import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Button, InputField } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
}

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email của bạn');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Thành công', 'Đã gửi liên kết đặt lại mật khẩu đến email của bạn.');
      navigation.goBack();
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        {/* Decorative overlays */}
        <View style={[styles.overlayTop]} />
        <View style={[styles.overlayBottom]} />

        <View style={styles.body}>
          {/* Icon */}
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
            <InputField
              label="Email"
              placeholder="Nhập email của bạn"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Button title="Gửi liên kết" onPress={handleSend} fullWidth />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { flex: 1, paddingHorizontal: 24 },
  backBtn: { paddingVertical: 12, paddingRight: 8 },
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
  body: { flex: 1, paddingTop: 32 },
  iconContainer: { alignItems: 'center', marginBottom: 24 },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  form: {},
});
