import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Appbar,
  Chip,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';

const MEETING_SUBJECTS = [
  {
    id: '1',
    subject: 'Property Tax Assessment Review',
    client: 'John Smith',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'Scheduled',
  },
  {
    id: '2',
    subject: 'Tax Appeal Consultation',
    client: 'Sarah Johnson',
    date: '2024-01-18',
    time: '2:30 PM',
    status: 'Completed',
  },
  {
    id: '3',
    subject: 'Property Valuation Discussion',
    client: 'Michael Brown',
    date: '2024-01-22',
    time: '11:15 AM',
    status: 'Scheduled',
  },
  {
    id: '4',
    subject: 'Tax Reduction Strategy Meeting',
    client: 'Emily Davis',
    date: '2024-01-25',
    time: '3:00 PM',
    status: 'Pending',
  },
  {
    id: '5',
    subject: 'Annual Tax Planning Session',
    client: 'Robert Wilson',
    date: '2024-01-28',
    time: '9:00 AM',
    status: 'Scheduled',
  },
  {
    id: '6',
    subject: 'Property Assessment Appeal',
    client: 'Jennifer Martinez',
    date: '2024-01-30',
    time: '1:45 PM',
    status: 'Pending',
  },
];

export default function MeetingsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMeetings, setFilteredMeetings] = useState(MEETING_SUBJECTS);
  const layout = useResponsiveLayout();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredMeetings(MEETING_SUBJECTS);
      return;
    }

    const filtered = MEETING_SUBJECTS.filter(
      (meeting) =>
        meeting.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.client.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredMeetings(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return '#10B981';
      case 'Pending':
        return '#F59E0B';
      case 'Completed':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const styles = createStyles(layout);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
          onPress={() => router.back()}
          color="#FFFFFF"
          size={layout.isTablet ? 28 : 24}
        />
        <Appbar.Content
          title="Meeting Subjects"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <Card style={styles.searchCard}>
            <Card.Content style={styles.searchCardContent}>
              <TextInput
                label="Search meeting subjects or clients"
                value={searchQuery}
                onChangeText={setSearchQuery}
                mode="outlined"
                style={styles.searchInput}
                contentStyle={styles.inputContent}
                onSubmitEditing={handleSearch}
              />
              <Button
                mode="contained"
                onPress={handleSearch}
                style={styles.searchButton}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
              >
                SEARCH MEETINGS
              </Button>
            </Card.Content>
          </Card>

          <View style={styles.meetingsContainer}>
            <Text style={styles.meetingsTitle}>
              Meeting Subjects ({filteredMeetings.length})
            </Text>

            <View style={styles.meetingsGrid}>
              {filteredMeetings.map((meeting) => (
                <Card key={meeting.id} style={styles.meetingCard}>
                  <Card.Content style={styles.meetingCardContent}>
                    <View style={styles.meetingHeader}>
                      <Text style={styles.meetingSubject}>
                        {meeting.subject}
                      </Text>
                      <Chip
                        mode="flat"
                        style={[
                          styles.statusChip,
                          { backgroundColor: getStatusColor(meeting.status) },
                        ]}
                        textStyle={styles.statusChipText}
                      >
                        {meeting.status}
                      </Chip>
                    </View>

                    <Text style={styles.clientName}>
                      Client: {meeting.client}
                    </Text>

                    <View style={styles.dateTimeContainer}>
                      <View style={styles.dateTimeItem}>
                        <Calendar
                          size={layout.isTablet ? 20 : 16}
                          color="#6B7280"
                        />
                        <Text style={styles.dateTimeText}>{meeting.date}</Text>
                      </View>
                      <View style={styles.dateTimeItem}>
                        <Clock
                          size={layout.isTablet ? 20 : 16}
                          color="#6B7280"
                        />
                        <Text style={styles.dateTimeText}>{meeting.time}</Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </View>

            {filteredMeetings.length === 0 && searchQuery.trim() && (
              <Card style={styles.noResultsCard}>
                <Card.Content style={styles.noResultsCardContent}>
                  <Text style={styles.noResultsText}>
                    No meetings found matching "{searchQuery}"
                  </Text>
                </Card.Content>
              </Card>
            )}
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
      backgroundColor: '#EF4444',
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
      maxWidth: layout.isTablet ? 1200 : undefined,
    },
    searchCard: {
      marginBottom: layout.buttonSpacing * 1.5,
      elevation: 2,
      borderRadius: layout.isTablet ? 16 : 12,
    },
    searchCardContent: {
      padding: layout.isTablet ? 32 : 24,
    },
    searchInput: {
      marginBottom: layout.buttonSpacing,
    },
    inputContent: {
      fontSize: layout.fontSize.medium,
    },
    searchButton: {
      backgroundColor: '#EF4444',
      borderRadius: layout.isTablet ? 12 : 8,
    },
    buttonContent: {
      paddingVertical: layout.isTablet ? 16 : 8,
    },
    buttonLabel: {
      fontSize: layout.fontSize.medium,
      fontWeight: 'bold',
    },
    meetingsContainer: {
      flex: 1,
    },
    meetingsTitle: {
      fontSize: layout.fontSize.large,
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: layout.buttonSpacing,
      textAlign: layout.isTablet ? 'center' : 'left',
    },
    meetingsGrid: {
      flexDirection: layout.isTablet && layout.isLandscape ? 'row' : 'column',
      flexWrap: layout.isTablet && layout.isLandscape ? 'wrap' : 'nowrap',
      gap: layout.buttonSpacing / 2,
    },
    meetingCard: {
      marginBottom: layout.buttonSpacing / 2,
      elevation: 1,
      borderRadius: layout.isTablet ? 12 : 8,
      flex: layout.isTablet && layout.isLandscape ? 1 : undefined,
      minWidth: layout.isTablet && layout.isLandscape ? '48%' : undefined,
    },
    meetingCardContent: {
      padding: layout.isTablet ? 24 : 16,
    },
    meetingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    meetingSubject: {
      fontSize: layout.fontSize.medium,
      fontWeight: 'bold',
      color: '#1F2937',
      flex: 1,
      marginRight: 12,
    },
    statusChip: {
      height: layout.isTablet ? 32 : 28,
    },
    statusChipText: {
      color: '#FFFFFF',
      fontSize: layout.fontSize.small,
      fontWeight: 'bold',
    },
    clientName: {
      fontSize: layout.fontSize.medium,
      color: '#6B7280',
      marginBottom: 12,
    },
    dateTimeContainer: {
      flexDirection: 'row',
      gap: layout.buttonSpacing,
    },
    dateTimeItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    dateTimeText: {
      fontSize: layout.fontSize.small,
      color: '#9CA3AF',
    },
    noResultsCard: {
      elevation: 1,
      borderRadius: layout.isTablet ? 12 : 8,
    },
    noResultsCardContent: {
      padding: layout.isTablet ? 32 : 24,
    },
    noResultsText: {
      textAlign: 'center',
      color: '#6B7280',
      fontSize: layout.fontSize.medium,
    },
  });

