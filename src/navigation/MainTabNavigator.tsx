import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { KhoDeScreen } from '../screens/khoDe/KhoDeScreen';
import { LopHocScreen } from '../screens/lopHoc/LopHocScreen';
import { CaiDatScreen } from '../screens/caiDat/CaiDatScreen';
import { ThongKeScreen } from '../screens/thongKe/ThongKeScreen';
import { Colors } from '../theme';
import type { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.borderLight,
          height: 80,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'DashboardTab': icon = focused ? 'home' : 'home-outline'; break;
            case 'KhoDeTab': icon = focused ? 'folder-open' : 'folder-open-outline'; break;
            case 'LopHocTab': icon = focused ? 'people' : 'people-outline'; break;
            case 'ThongKeTab': icon = focused ? 'bar-chart' : 'bar-chart-outline'; break;
            case 'CaiDatTab': icon = focused ? 'person' : 'person-outline'; break;
            default: icon = 'ellipse';
          }
          return <Ionicons name={icon} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen
        name="KhoDeTab"
        component={KhoDeScreen}
        options={{ tabBarLabel: 'Kho đề' }}
      />
      <Tab.Screen
        name="LopHocTab"
        component={LopHocScreen}
        options={{ tabBarLabel: 'Lớp học' }}
      />
      <Tab.Screen
        name="ThongKeTab"
        component={ThongKeScreen}
        options={{ tabBarLabel: 'Báo cáo' }}
      />
      <Tab.Screen
        name="CaiDatTab"
        component={CaiDatScreen}
        options={{ tabBarLabel: 'Hồ sơ' }}
      />
    </Tab.Navigator>
  );
};
