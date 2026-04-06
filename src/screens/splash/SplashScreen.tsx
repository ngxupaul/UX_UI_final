import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
}

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const spin = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Onboarding' }],
          })
        );
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
      spin.stop();
    };
  }, []);

  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.heroContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
      >
        <View style={styles.heroBlob} />
        <View style={styles.logoMark}>
          <Text style={styles.logoText}>F</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.titleContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>
          Tạo bài kiểm tra với{' '}
          <Text style={styles.titleAI}>AI</Text>
        </Text>
      </Animated.View>

      <Animated.View style={[styles.subtitleContainer, { opacity: fadeAnim }]}>
        <Text style={styles.subtitle}>
          Giải phóng tư duy khỏi những thao tác thủ công, hãy để AI gánh
          vác quy trình soạn đề, giúp bạn dành trọn tâm huyết cho việc truyền
          cảm hứng
        </Text>
      </Animated.View>

      <Animated.View
        style={[styles.spinnerContainer, { opacity: fadeAnim, transform: [{ rotate: spinInterpolate }] }]}
      >
        <View style={styles.spinner} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  heroBlob: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(33, 196, 93, 0.15)',
    position: 'absolute',
  },
  heroContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoMark: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(33,196,93,0.3)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 4,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.primary,
  },
  titleContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  titleAI: {
    color: Colors.primary,
  },
  subtitleContainer: {
    paddingHorizontal: 8,
    marginBottom: 48,
  },
  subtitle: {
    fontSize: 15,
    color: '#7b7b7b',
    textAlign: 'center',
    lineHeight: 25,
    fontWeight: '500',
  },
  spinnerContainer: {
    position: 'absolute',
    bottom: 80,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.gray30,
    borderTopColor: Colors.primary,
  },
});
