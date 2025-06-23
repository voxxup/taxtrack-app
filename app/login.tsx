import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { TextInput, Button, Text, Card, Title } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const layout = useResponsiveLayout();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/tabs');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      
      if (success) {
        router.replace('/tabs');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = createStyles(layout);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.title}>TAXTRACK LOGIN</Text>

            <TextInput
              label="Username *"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              label="Password *"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
              contentStyle={styles.loginButtonContent}
              labelStyle={styles.loginButtonLabel}
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (layout: ReturnType<typeof useResponsiveLayout>) =>
  StyleSheet.create<{
    container: ViewStyle;
    content: ViewStyle;
    card: ViewStyle;
    cardContent: ViewStyle;
    title: TextStyle;
    input: ViewStyle;
    errorText: TextStyle;
    loginButton: ViewStyle;
    loginButtonContent: ViewStyle;
    loginButtonLabel: TextStyle;
  }>({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: layout.contentPadding,
    },
    card: {
      borderRadius: layout.isTablet ? 16 : 15,
      width: typeof layout.cardWidth === 'number' ? layout.cardWidth : 400,
      maxWidth: layout.isTablet ? 500 : 400,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#D1D5DB',
      elevation: 0,
      shadowColor: undefined,
      shadowOffset: undefined,
      shadowOpacity: undefined,
      shadowRadius: undefined,
    },
    cardContent: {
      paddingVertical: layout.isTablet ? 48 : 32,
      paddingHorizontal: layout.isTablet ? 40 : 24,
    },
    title: {
      textAlign: 'center',
      marginBottom: layout.isTablet ? 48 : 32,
      fontSize: layout.fontSize.xlarge,
      fontWeight: 'bold',
      color: '#1F2937',
    },
    input: {
      marginBottom: layout.buttonSpacing,
    },
    errorText: {
      color: '#EF4444',
      textAlign: 'center',
      marginBottom: layout.buttonSpacing,
      fontSize: layout.fontSize.medium,
    },
    loginButton: {
      marginTop: layout.buttonSpacing,
      backgroundColor: '#081A51',
      borderRadius: layout.isTablet ? 12 : 12,
      borderWidth: 1,
      borderColor: '#D1D5DB',
    },
    loginButtonContent: {
      paddingVertical: layout.isTablet ? 16 : 8,
    },
    loginButtonLabel: {
      color: '#FFFFFF',
      fontSize: layout.fontSize.medium,
      fontWeight: 'bold',
    },
  });
