import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

// Simulated progress stages
const STAGES = [
  { progress: 20,  chip: 'Đang phân tích cấu trúc bài giảng của bạn' },
  { progress: 40,  chip: 'Đang tạo câu hỏi từ nội dung...' },
  { progress: 60,  chip: 'Đang kiểm tra đáp án và độ khó...' },
  { progress: 80,  chip: 'Đang hoàn thiện bộ câu hỏi...' },
  { progress: 100, chip: 'Hoàn tất! Đang chuyển kết quả...' },
];

const TIP_CARD = {
  label: 'Lời khuyên thông minh',
  text: 'Mẹo: Bạn có thể yêu cầu AI tạo giải thích chi tiết cho từng câu hỏi để hiểu sâu hơn về kiến thức thay vì chỉ nhận đáp án.',
};

export const AILoadingScreen: React.FC<Props> = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(STAGES[0]);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const barAnim = useRef(new Animated.Value(0)).current;

  // Pulsing animation for the AI icon
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  // Progress animation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current > 100) {
        clearInterval(interval);
        return;
      }
      setProgress(current);

      // Find current stage
      const s = [...STAGES].reverse().find((st) => current >= st.progress) || STAGES[0];
      setStage(s);

      // Animate bar
      Animated.timing(barAnim, {
        toValue: current,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleCancel = () => {
    navigation.goBack();
  };

  const progressWidth = barAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <SafeAreaView style={styles.statusBarArea} edges={['top']}>
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>12:34</Text>
          <View style={styles.statusIcons}>
            <View style={styles.wifiIcon} />
            <View style={styles.signalIcon} />
            <View style={styles.batteryIcon} />
          </View>
        </View>
      </SafeAreaView>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Editorial Intelligence</Text>
        <View style={styles.profileBtn}>
          <Ionicons name="menu-outline" size={22} color="#047857" />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* AI Avatar Hub */}
        <View style={styles.aiHubContainer}>
          {/* Glow blob */}
          <View style={styles.glowBlob} />
          {/* Avatar */}
          <Animated.View
            style={[styles.aiAvatar, { transform: [{ scale: pulseAnim }] }]}
          >
            <View style={styles.aiAvatarInner}>
              <Ionicons name="bulb" size={40} color={Colors.primary} />
              {/* Pulse dots */}
              <View style={styles.pulseDots}>
                <View style={styles.pulseDot} />
                <View style={styles.pulseDot} />
                <View style={styles.pulseDot} />
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.progressHeading}>AI đang biên soạn câu hỏi cho bạn...</Text>
          <Text style={styles.progressPercent}>{progress}% hoàn tất</Text>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
        </View>

        {/* Meta Insight Chip */}
        <View style={styles.chip}>
          <View style={styles.chipDot} />
          <Text style={styles.chipText}>{stage.chip}</Text>
        </View>

        {/* Tip Card */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Ionicons name="bulb-outline" size={22} color={Colors.primary} />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipLabel}>{TIP_CARD.label}</Text>
            <Text style={styles.tipText}>{TIP_CARD.text}</Text>
          </View>
        </View>
      </View>

      {/* Cancel Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelBtnText}>Hủy quá trình</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width: SCREEN_W } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FCEF',
  },
  statusBarArea: {
    backgroundColor: '#F3FCEF',
  },
  statusBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
  },
  statusTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  wifiIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#000',
    borderRadius: 4,
  },
  signalIcon: {
    width: 12,
    height: 16,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  batteryIcon: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#F3FCEF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#047857',
    letterSpacing: -0.4,
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  aiHubContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  glowBlob: {
    position: 'absolute',
    top: -32,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(33,196,93,0.1)',
  },
  aiAvatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(22,29,22,0.06)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 8,
  },
  aiAvatarInner: {
    alignItems: 'center',
  },
  pulseDots: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primaryDark,
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#161D16',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3D4A3D',
    marginBottom: 12,
    letterSpacing: 0.35,
  },
  progressBar: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E2EBDE',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(188,203,185,0.1)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EDF6EA',
    borderRadius: 999,
    paddingHorizontal: 17,
    paddingVertical: 9,
    marginBottom: 24,
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3D4A3D',
  },
  tipCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(188,203,185,0.15)',
    shadowColor: 'rgba(22,29,22,0.06)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 4,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#AFEFB4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  tipContent: {
    flex: 1,
  },
  tipLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#3D4A3D',
    lineHeight: 24,
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#AFEFB4',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#346E40',
  },
});
