import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer, CommonActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { SplashScreen } from '../screens/splash/SplashScreen';
import { AuthNavigator } from './AuthNavigator';
import { DashboardStackNavigator } from './DashboardStackNavigator';
import { Colors } from '../theme';
import type { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigatorWithSuccess: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleAuthSuccess = () => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
    );
  };

  return <AuthNavigator onAuthSuccess={handleAuthSuccess} />;
};

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.white },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Auth" component={AuthNavigatorWithSuccess} />
        <Stack.Screen name="MainTabs" component={DashboardStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
