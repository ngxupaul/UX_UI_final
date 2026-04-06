import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../theme';

interface TabItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  route: string;
}

const TABS: TabItem[] = [
  { name: 'Trang chủ', icon: 'home-outline', activeIcon: 'home', route: 'DashboardTab' },
  { name: 'Kho đề', icon: 'library-outline', activeIcon: 'library', route: 'KhoDeTab' },
  { name: 'Lớp học', icon: 'people-outline', activeIcon: 'people', route: 'LopHocTab' },
  { name: 'Cài đặt', icon: 'settings-outline', activeIcon: 'settings', route: 'CaiDatTab' },
];

interface Props {
  activeTab?: string;
}

export const BottomNavBar: React.FC<Props> = ({ activeTab }) => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const currentRoute = route.name;

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = currentRoute === tab.route || activeTab === tab.route;
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.route)}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={isActive ? Colors.primary : Colors.gray50}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray20,
    paddingBottom: 16,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
