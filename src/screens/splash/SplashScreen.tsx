import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../../theme";
import type { RootStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Splash">;
}

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const riseAnim = useRef(new Animated.Value(18)).current;
  const dotAnim = useRef(new Animated.Value(0.75)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),
      Animated.spring(riseAnim, {
        toValue: 0,
        speed: 14,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim, {
          toValue: 0.75,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }).start(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Onboarding" }],
          })
        );
      });
    }, 2600);

    return () => {
      clearTimeout(timer);
      pulse.stop();
    };
  }, [dotAnim, fadeAnim, navigation, riseAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.mainGroup,
          {
            opacity: fadeAnim,
            transform: [{ translateY: riseAnim }],
          },
        ]}
      >
        <View style={styles.logoGroup}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoEmoji}>🐱</Text>
          </View>
          <Text style={styles.logoWordmark}>Quizken</Text>
        </View>

        <Text style={styles.title}>
          Tạo bài kiểm tra với <Text style={styles.titleAccent}>AI</Text>
        </Text>

        <Text style={styles.subtitle}>
          Giải phóng tư duy khỏi những thao tác thủ công, hãy để AI gánh vác
          quy trình soạn đề, giúp bạn dành trọn tâm huyết cho việc truyền cảm
          hứng
        </Text>

        <Animated.View
          style={[
            styles.loadingDot,
            {
              opacity: dotAnim,
              transform: [{ scale: dotAnim }],
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  mainGroup: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 36,
  },
  logoGroup: {
    alignItems: "center",
    marginBottom: 112,
  },
  logoBadge: {
    width: 136,
    height: 136,
    borderRadius: 68,
    backgroundColor: "#F7FAF7",
    borderWidth: 1,
    borderColor: "#E8F5EA",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(15,23,42,0.08)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 4,
    marginBottom: 8,
  },
  logoEmoji: {
    fontSize: 76,
    lineHeight: 86,
  },
  logoWordmark: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: -0.7,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.textPrimary,
    letterSpacing: -0.7,
    marginBottom: 28,
  },
  titleAccent: {
    color: Colors.primary,
  },
  subtitle: {
    maxWidth: 384,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "500",
    textAlign: "center",
    color: "#7B7B7B",
    marginBottom: 106,
  },
  loadingDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
  },
});
