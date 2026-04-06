import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { KhoDeDetailScreen } from '../screens/khoDe/KhoDeDetailScreen';
import { TaoDeThiScreen } from '../screens/thi/TaoDeThiScreen';
import { SoanThaoCauHoiScreen } from '../screens/thi/SoanThaoCauHoiScreen';
import { ThemCauHoiScreen } from '../screens/thi/ThemCauHoiScreen';
import { ChinhSuaCauHoiScreen } from '../screens/thi/ChinhSuaCauHoiScreen';
import { PhatDeScreen } from '../screens/thi/PhatDeScreen';
import { ThietLapDeThiScreen } from '../screens/thi/ThietLapDeThiScreen';
import { AIGeneratorScreen } from '../screens/aiGenerator/AIGeneratorScreen';
import { AILoadingScreen } from '../screens/aiGenerator/AILoadingScreen';
import { ThongKeScreen } from '../screens/thongKe/ThongKeScreen';
import { LopHocDetailScreen } from '../screens/lopHoc/LopHocDetailScreen';
import { HocSinhLamBaiScreen } from '../screens/thi/HocSinhLamBaiScreen';
import { KetQuaBaiThiScreen } from '../screens/thi/KetQuaBaiThiScreen';
import type { DashboardStackParamList } from '../types';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export const DashboardStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="KhoDeDetail" component={KhoDeDetailScreen} />
      <Stack.Screen name="TaoDeThi" component={TaoDeThiScreen} />
      <Stack.Screen name="SoanThaoCauHoi" component={SoanThaoCauHoiScreen} />
      <Stack.Screen name="ThemCauHoi" component={ThemCauHoiScreen} />
      <Stack.Screen name="ChinhSuaCauHoi" component={ChinhSuaCauHoiScreen} />
      <Stack.Screen name="PhatDe" component={PhatDeScreen} />
      <Stack.Screen name="ThietLapDeThi" component={ThietLapDeThiScreen} />
      <Stack.Screen name="AIGenerator" component={AIGeneratorScreen} />
      <Stack.Screen name="AILoading" component={AILoadingScreen} />
      <Stack.Screen name="ThongKe" component={ThongKeScreen} />
      <Stack.Screen name="LopHocDetail" component={LopHocDetailScreen} />
      <Stack.Screen name="HocSinhLamBai" component={HocSinhLamBaiScreen} />
      <Stack.Screen name="KetQuaBaiThi" component={KetQuaBaiThiScreen} />
    </Stack.Navigator>
  );
};
