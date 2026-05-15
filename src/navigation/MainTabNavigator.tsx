import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { KhoDeScreen } from '../screens/khoDe/KhoDeScreen';
import { LopHocScreen } from '../screens/lopHoc/LopHocScreen';
import { CaiDatScreen } from '../screens/caiDat/CaiDatScreen';
import { ThongKeScreen } from '../screens/thongKe/ThongKeScreen';
import { ThongBaoScreen } from '../screens/thongBao/ThongBaoScreen';
import { useMockSession } from '../context/MockSessionContext';
import { Colors } from '../theme';
import type { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const getTabLabel = (routeName: keyof MainTabParamList, isStudent: boolean) => {
  switch (routeName) {
    case 'DashboardTab': return 'Dashboard';
    case 'KhoDeTab': return isStudent ? 'Ôn tập' : 'Kho đề';
    case 'ThongBaoTab': return 'Thông báo';
    case 'LopHocTab': return 'Lớp học';
    case 'ThongKeTab': return 'Báo cáo';
    case 'CaiDatTab': return 'Hồ sơ';
    default: return routeName;
  }
};

export const MainTabNavigator: React.FC = () => {
  const { currentUser } = useMockSession();
  const isStudent = currentUser.role === 'student';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 0,
          height: 92,
          paddingBottom: 22,
          paddingTop: 12,
          shadowColor: '#000000',
          shadowOpacity: 0.15,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: -2 },
          elevation: 8,
        },
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={[
              styles.tabBarLabel,
              focused && styles.tabBarLabelActive,
              { color },
            ]}
          >
            {getTabLabel(route.name, isStudent)}
          </Text>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'DashboardTab': icon = focused ? 'home' : 'home-outline'; break;
            case 'KhoDeTab': icon = focused ? 'folder-open' : 'folder-open-outline'; break;
            case 'ThongBaoTab': icon = focused ? 'notifications' : 'notifications-outline'; break;
            case 'LopHocTab': icon = focused ? 'people' : 'people-outline'; break;
            case 'ThongKeTab': icon = focused ? 'bar-chart' : 'bar-chart-outline'; break;
            case 'CaiDatTab': icon = focused ? 'person' : 'person-outline'; break;
            default: icon = 'ellipse';
          }
          return <Ionicons name={icon} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardScreen}
      />
      <Tab.Screen
        name="KhoDeTab"
        component={KhoDeScreen}
      />
      {isStudent ? (
        <Tab.Screen
          name="ThongBaoTab"
          component={ThongBaoScreen}
        />
      ) : (
        <>
          <Tab.Screen
            name="LopHocTab"
            component={LopHocScreen}
          />
          <Tab.Screen
            name="ThongKeTab"
            component={ThongKeScreen}
          />
        </>
      )}
      <Tab.Screen
        name="CaiDatTab"
        component={CaiDatScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarItem: {
    gap: 4,
  },
  tabBarLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  tabBarLabelActive: {
    fontWeight: '700',
  },
});
