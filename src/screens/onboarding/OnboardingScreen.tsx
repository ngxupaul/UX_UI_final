import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Button } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

const ONBOARDING_STEPS = [
  {
    id: '1',
    title: 'Chấm điểm tự động',
    subtitle: 'Hệ thống AI thông minh chấm điểm bài thi nhanh chóng và chính xác, tiết kiệm thời gian cho giáo viên.',
    icon: 'scan-circle-outline' as const,
    gradient: ['#DCFCE7', '#FFFFFF'] as const,
    accentColor: Colors.primary,
  },
  {
    id: '2',
    title: 'Quản lý lớp học',
    subtitle: 'Tổ chức lớp học, học sinh và đề thi một cách khoa học. Theo dõi tiến độ học tập dễ dàng.',
    icon: 'people-circle-outline' as const,
    gradient: ['#DBEAFE', '#FFFFFF'] as const,
    accentColor: '#3B82F6',
  },
  {
    id: '3',
    title: 'Tạo đề thi dễ dàng',
    subtitle: 'Sử dụng AI hoặc tạo thủ công với giao diện trực quan. Chia sẻ đề thi qua nhiều kênh.',
    icon: 'document-text-outline' as const,
    gradient: ['#FEF3C7', '#FFFFFF'] as const,
    accentColor: '#F59E0B',
  },
];

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const isLast = step === ONBOARDING_STEPS.length - 1;

  const current = ONBOARDING_STEPS[step];

  const goNext = () => {
    if (isLast) {
      // Navigate to Auth stack — Login is the first screen so it shows automatically
      navigation.replace('Auth');
    } else {
      setStep(step + 1);
    }
  };

  const goToLogin = () => navigation.replace('Auth');

  return (
    <View style={styles.container}>
      {/* Overlay decorations */}
      <View style={[styles.overlayTop, { backgroundColor: current.gradient[0] }]} />
      <View style={[styles.overlayBottom, { backgroundColor: current.gradient[0] }]} />

      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={goToLogin}>
        <Text style={styles.skipText}>Bỏ qua</Text>
      </TouchableOpacity>

      {/* Icon */}
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, { backgroundColor: current.accentColor + '20' }]}>
          <Ionicons name={current.icon} size={64} color={current.accentColor} />
        </View>
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.subtitle}>{current.subtitle}</Text>
      </View>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {ONBOARDING_STEPS.map((_, i) => (
          <View
            key={i}
            style={i === step ? styles.dotActive : styles.dot}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Button
          title={isLast ? 'Bắt đầu ngay' : 'Tiếp theo'}
          onPress={goNext}
          fullWidth
          style={{ marginBottom: 12 }}
        />
        {!isLast && (
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginLink}>Đã có tài khoản? Đăng nhập ngay</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  overlayTop: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 215,
    height: 280,
    borderRadius: 150,
    opacity: 0.5,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 100,
    right: -80,
    width: 172,
    height: 280,
    borderRadius: 100,
    opacity: 0.5,
  },
  skipBtn: {
    position: 'absolute',
    top: 60,
    right: 20,
    padding: 8,
  },
  skipText: { fontSize: 15, color: Colors.textSecondary },
  iconContainer: { alignItems: 'center', marginBottom: 40 },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: { alignItems: 'center', paddingHorizontal: 16 },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray30,
  },
  dotActive: {
    width: 32,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  buttonsContainer: { marginTop: 40, paddingBottom: 40 },
  loginLink: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
});
