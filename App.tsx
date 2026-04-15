import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation';
import { MockSessionProvider } from './src/context/MockSessionContext';
import { PaperTheme } from './src/theme';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <MockSessionProvider>
          <PaperProvider theme={PaperTheme}>
            <StatusBar style="dark" />
            <RootNavigator />
          </PaperProvider>
        </MockSessionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
