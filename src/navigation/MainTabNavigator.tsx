import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { KhoDeScreen } from '../screens/khoDe/KhoDeScreen';
import { LopHocScreen } from '../screens/lopHoc/LopHocScreen';
import { CaiDatScreen } from '../screens/caiDat/CaiDatScreen';
import { Colors } from '../theme';
import type { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray50,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.gray20,
          height: 80,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'DashboardTab': icon = focused ? 'home' : 'home-outline'; break;
            case 'KhoDeTab': icon = focused ? 'library' : 'library-outline'; break;
            case 'LopHocTab': icon = focused ? 'people' : 'people-outline'; break;
            case 'CaiDatTab': icon = focused ? 'settings' : 'settings-outline'; break;
            default: icon = 'ellipse';
          }
          return <Ionicons name={icon} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="DashboardTab" component={DashboardScreen} options={{ tabBarLabel: 'Trang chủ' }} />
      <Tab.Screen name="KhoDeTab" component={KhoDeScreen} options={{ tabBarLabel: 'Kho đề' }} />
      <Tab.Screen name="LopHocTab" component={LopHocScreen} options={{ tabBarLabel: 'Lớp học' }} />
      <Tab.Screen name="CaiDatTab" component={CaiDatScreen} options={{ tabBarLabel: 'Cài đặt' }} />
    </Tab.Navigator>
  );
};
