import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { LogOut } from 'lucide-react-native';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const layout = useResponsiveLayout();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleSearchClient = () => {
    router.push('/tabs/search');
  };

  const handleMeetingSubject = () => {
    router.push('/tabs/meetings');
  };

  const handleMeetingSignature = () => {
    router.push('/tabs/signature');
  };

  const styles = createStyles(layout);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content
          title="Tax Track System"
          titleStyle={styles.headerTitle}
        />
        <Appbar.Action
          icon={() => (
            <LogOut size={layout.isTablet ? 28 : 24} color="#FFFFFF" />
          )}
          onPress={handleLogout}
        />
      </Appbar.Header>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <Card style={styles.welcomeCard}>
            <Card.Content style={styles.welcomeCardContent}>
              <Text style={styles.welcomeText}>Welcome, {user?.first_name} {user?.last_name}!</Text>
              <Text style={styles.subtitleText}>
                by: Fitzgerald Law Group, P.C. Chicago / Burr Ridge
              </Text>
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSearchClient}
              style={[styles.actionButton, styles.searchButton]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              SEARCH BY CLIENT / PROPERTY
            </Button>

            <Button
              mode="contained"
              onPress={handleMeetingSubject}
              style={[styles.actionButton, styles.meetingButton]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              MEETING SUBJECT
            </Button>

            <Button
              mode="contained"
              onPress={handleMeetingSignature}
              style={[styles.actionButton, styles.signatureButton]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              MEETING SIGNATURE
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (layout: ReturnType<typeof useResponsiveLayout>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },
    header: {
      backgroundColor: '#081A51',
      elevation: 4,
      height: layout.isTablet ? 80 : 64,
    },
    headerTitle: {
      color: '#FFFFFF',
      fontSize: layout.fontSize.large,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      padding: layout.contentPadding,
      alignItems: 'center',
    },
    mainContent: {
      width: '100%',
      maxWidth: layout.isTablet ? 800 : undefined,
    },
    welcomeCard: {
      marginBottom: layout.buttonSpacing * 1.5,
      elevation: 0,
      borderRadius: layout.isTablet ? 16 : 12,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#D1D5DB',
    },
    welcomeCardContent: {
      padding: layout.isTablet ? 32 : 24,
    },
    welcomeText: {
      fontSize: layout.fontSize.large,
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: 12,
      textAlign: layout.isTablet ? 'center' : 'left',
    },
    subtitleText: {
      fontSize: layout.fontSize.medium,
      color: '#6B7280',
      fontStyle: 'italic',
      textAlign: layout.isTablet ? 'center' : 'left',
    },
    buttonContainer: {
      gap: layout.buttonSpacing,
      width: '100%',
    },
    actionButton: {
      borderRadius: layout.isTablet ? 16 : 12,
      elevation: 0,
      shadowColor: undefined,
      shadowOffset: undefined,
      shadowOpacity: undefined,
      shadowRadius: undefined,
    },
    buttonContent: {
      paddingVertical: layout.isTablet ? 24 : 16,
    },
    buttonLabel: {
      fontSize: layout.fontSize.medium,
      fontWeight: 'bold',
      color: '#000',
    },
    searchButton: {
      backgroundColor: '#6ADA28',
    },
    meetingButton: {
      backgroundColor: '#FD6F8E',
    },
    signatureButton: {
      backgroundColor: '#BDB4FE',
    },
  });

