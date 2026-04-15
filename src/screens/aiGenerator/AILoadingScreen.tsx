import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const STAGES = [
  { progress: 20, chip: 'Đang phân tích cấu trúc bài giảng của bạn' },
  { progress: 40, chip: 'Đang tạo câu hỏi từ nội dung của bạn' },
  { progress: 60, chip: 'Đang kiểm tra đáp án và độ khó' },
  { progress: 80, chip: 'Đang hoàn thiện bộ câu hỏi' },
  { progress: 100, chip: 'Hoàn tất! Đang chuyển kết quả' },
];

const TIP_CARD = {
  label: 'Lời khuyên thông minh',
  text: 'Mẹo: Bạn có thể yêu cầu AI tạo giải thích chi tiết cho từng câu hỏi để hiểu sâu hơn về kiến thức thay vì chỉ nhận đáp án.',
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const AILoadingScreen: React.FC<Props> = ({ navigation }) => {
  const [progress, setProgress] = useState(20);
  const [stage, setStage] = useState(STAGES[0]);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.85)).current;
  const progressAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.04,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.88,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulse.start();
    return () => pulse.stop();
  }, [fadeAnim, scaleAnim]);

  useEffect(() => {
    let current = 20;
    const interval = setInterval(() => {
      current += 1;
      if (current > 100) {
        clearInterval(interval);
        return;
      }

      setProgress(current);
      const nextStage =
        [...STAGES].reverse().find((item) => current >= item.progress) ?? STAGES[0];
      setStage(nextStage);

      Animated.timing(progressAnim, {
        toValue: current,
        duration: 260,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }, 110);

    return () => clearInterval(interval);
  }, [progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Editorial Intelligence</Text>
          <View style={styles.headerIcon}>
            <Ionicons name="sparkles" size={20} color="#10B981" />
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <View style={styles.heroBlock}>
          <View style={styles.glow} />
          <Animated.View
            style={[
              styles.aiOrb,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Ionicons name="sparkles" size={52} color={Colors.primary} />
            <View style={styles.dotRow}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </Animated.View>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>
            AI đang biên soạn câu hỏi cho{'\n'}bạn...
          </Text>
          <Text style={styles.progressText}>{progress}% hoàn tất</Text>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
            <View style={styles.progressGloss} />
          </View>
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipBadge}>
            <Ionicons name="bulb-outline" size={22} color={Colors.primary} />
          </View>
          <View style={styles.tipTextWrap}>
            <Text style={styles.tipLabel}>{TIP_CARD.label}</Text>
            <Text style={styles.tipText}>{TIP_CARD.text}</Text>
          </View>
          <Ionicons
            name="bulb-outline"
            size={84}
            color="rgba(15,23,42,0.06)"
            style={styles.tipWatermark}
          />
        </View>

        <View style={styles.statusChip}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{stage.chip}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Hủy quá trình</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FCEF',
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
  safeArea: {
    backgroundColor: '#F3FCEF',
  },
  header: {
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
    color: '#047857',
    letterSpacing: -0.4,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  heroBlock: {
    width: '100%',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT < 760 ? 0 : 4,
  },
  glow: {
    position: 'absolute',
    top: 20,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(33,196,93,0.05)',
    shadowColor: 'rgba(33,196,93,0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
  },
  aiOrb: {
    marginTop: 30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(22,29,22,0.06)',
    shadowOpacity: 1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#006E2F',
  },
  progressSection: {
    width: '100%',
    marginTop: SCREEN_HEIGHT < 760 ? 34 : 40,
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: '700',
    color: '#161D16',
    textAlign: 'center',
    letterSpacing: -0.6,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#3D4A3D',
    letterSpacing: 0.35,
  },
  progressTrack: {
    width: '100%',
    height: 12,
    borderRadius: 999,
    backgroundColor: '#E2EBDE',
    borderWidth: 1,
    borderColor: 'rgba(188,203,185,0.1)',
    overflow: 'hidden',
    marginTop: 22,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#21C45D',
  },
  progressGloss: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(243,252,239,0.18)',
  },
  tipCard: {
    width: '100%',
    marginTop: SCREEN_HEIGHT < 760 ? 32 : 40,
    backgroundColor: Colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(188,203,185,0.15)',
    paddingHorizontal: 24,
    paddingVertical: 26,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: 'rgba(22,29,22,0.06)',
    shadowOpacity: 1,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  tipBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#AFEFB4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    zIndex: 1,
  },
  tipTextWrap: {
    flex: 1,
    paddingRight: 22,
    zIndex: 1,
  },
  tipLabel: {
    fontSize: 11,
    lineHeight: 16.5,
    fontWeight: '600',
    color: '#21C45D',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    color: '#3D4A3D',
  },
  tipWatermark: {
    position: 'absolute',
    top: 14,
    right: -6,
    opacity: 0.8,
  },
  statusChip: {
    marginTop: SCREEN_HEIGHT < 760 ? 26 : 34,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF6EA',
    borderWidth: 1,
    borderColor: 'rgba(188,203,185,0.05)',
    borderRadius: 999,
    paddingHorizontal: 17,
    paddingVertical: 9,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#21C45D',
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#3D4A3D',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 16,
  },
  cancelButton: {
    backgroundColor: '#AFEFB4',
    borderRadius: 999,
    paddingHorizontal: 32,
    paddingVertical: 12,
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  cancelText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#346E40',
  },
});
