import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions } from 'react-native';
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

    // Simulate a brief loading delay
    setTimeout(() => {
      const success = login(username, password);

      if (success) {
        router.replace('/tabs');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 500);
  };

  const styles = createStyles(layout);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Title style={styles.title}>TAXTRACK LOGIN</Title>

            <TextInput
              label="Username *"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              contentStyle={styles.inputContent}
            />

            <TextInput
              label="Password *"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              contentStyle={styles.inputContent}
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
  StyleSheet.create({
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
      elevation: 4,
      borderRadius: layout.isTablet ? 16 : 12,
      width: layout.cardWidth,
      maxWidth: layout.isTablet ? 500 : undefined,
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
    inputContent: {
      fontSize: layout.fontSize.medium,
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
      borderRadius: layout.isTablet ? 12 : 8,
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
