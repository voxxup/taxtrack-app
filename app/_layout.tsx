import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';

const theme = {
  colors: {
    primary: '#1E3A8A',
    secondary: '#10B981',
    tertiary: '#EF4444',
    surface: '#FFFFFF',
    background: '#F8FAFC',
    onSurface: '#1F2937',
    onBackground: '#374151',
  },
};

export default function RootLayout() {
  useFrameworkReady();

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="tabs" />
          <Stack.Screen name="not-found" />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </PaperProvider>
  );
}

