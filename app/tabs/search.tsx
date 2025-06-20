import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { ArrowLeft, Search } from 'lucide-react-native';

// Hardcoded client/property data
const CLIENT_DATA = [
  {
    id: '1',
    clientName: 'John Smith',
    propertyAddress: '123 Main St, Chicago, IL 60601',
    taxYear: '2024',
    status: 'Active',
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    propertyAddress: '456 Oak Ave, Burr Ridge, IL 60527',
    taxYear: '2024',
    status: 'Pending',
  },
  {
    id: '3',
    clientName: 'Michael Brown',
    propertyAddress: '789 Pine Rd, Chicago, IL 60602',
    taxYear: '2023',
    status: 'Completed',
  },
  {
    id: '4',
    clientName: 'Emily Davis',
    propertyAddress: '321 Elm St, Burr Ridge, IL 60527',
    taxYear: '2024',
    status: 'Active',
  },
  {
    id: '5',
    clientName: 'Robert Wilson',
    propertyAddress: '555 Cedar Lane, Chicago, IL 60603',
    taxYear: '2024',
    status: 'Pending',
  },
  {
    id: '6',
    clientName: 'Jennifer Martinez',
    propertyAddress: '777 Maple Drive, Burr Ridge, IL 60527',
    taxYear: '2023',
    status: 'Completed',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(CLIENT_DATA);
  const layout = useResponsiveLayout();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredData(CLIENT_DATA);
      return;
    }

    const filtered = CLIENT_DATA.filter(
      (item) =>
        item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
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
          title="Search Client / Property"
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
                label="Search by client name or property address"
                value={searchQuery}
                onChangeText={setSearchQuery}
                mode="outlined"
                style={styles.searchInput}
                contentStyle={styles.inputContent}
                right={
                  <TextInput.Icon
                    icon={() => (
                      <Search size={layout.isTablet ? 28 : 24} color="#fff" />
                    )}
                    onPress={handleSearch}
                  />
                }
                onSubmitEditing={handleSearch}
              />
              <Button
                mode="contained"
                onPress={handleSearch}
                style={styles.searchButton}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
              >
                SEARCH
              </Button>
            </Card.Content>
          </Card>

          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>
              Search Results ({filteredData.length})
            </Text>

            <View style={styles.resultsGrid}>
              {filteredData.map((item) => (
                <Card key={item.id} style={styles.resultCard}>
                  <Card.Content style={styles.resultCardContent}>
                    <View style={styles.resultHeader}>
                      <Text style={styles.clientName}>{item.clientName}</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: getStatusColor(item.status) },
                        ]}
                      >
                        <Text style={styles.statusText}>{item.status}</Text>
                      </View>
                    </View>
                    <Text style={styles.propertyAddress}>
                      {item.propertyAddress}
                    </Text>
                    <Text style={styles.taxYear}>Tax Year: {item.taxYear}</Text>
                  </Card.Content>
                </Card>
              ))}
            </View>

            {filteredData.length === 0 && searchQuery.trim() && (
              <Card style={styles.noResultsCard}>
                <Card.Content style={styles.noResultsCardContent}>
                  <Text style={styles.noResultsText}>
                    No clients or properties found matching "{searchQuery}"
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
      backgroundColor: '#081A51',
      borderRadius: layout.isTablet ? 12 : 8,
    },
    buttonContent: {
      paddingVertical: layout.isTablet ? 16 : 8,
    },
    buttonLabel: {
      color: '#ffff',
      fontSize: layout.fontSize.medium,
      fontWeight: 'bold',
    },
    resultsContainer: {
      flex: 1,
    },
    resultsTitle: {
      fontSize: layout.fontSize.large,
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: layout.buttonSpacing,
      textAlign: layout.isTablet ? 'center' : 'left',
    },
    resultsGrid: {
      flexDirection: layout.isTablet && layout.isLandscape ? 'row' : 'column',
      flexWrap: layout.isTablet && layout.isLandscape ? 'wrap' : 'nowrap',
      gap: layout.buttonSpacing / 2,
    },
    resultCard: {
      marginBottom: layout.buttonSpacing / 2,
      elevation: 1,
      borderRadius: layout.isTablet ? 12 : 8,
      flex: layout.isTablet && layout.isLandscape ? 1 : undefined,
      minWidth: layout.isTablet && layout.isLandscape ? '48%' : undefined,
    },
    resultCardContent: {
      padding: layout.isTablet ? 24 : 16,
    },
    resultHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    clientName: {
      fontSize: layout.fontSize.medium,
      fontWeight: 'bold',
      color: '#1F2937',
      flex: 1,
    },
    statusBadge: {
      paddingHorizontal: layout.isTablet ? 12 : 8,
      paddingVertical: layout.isTablet ? 6 : 4,
      borderRadius: layout.isTablet ? 16 : 12,
    },
    statusText: {
      color: '#FFFFFF',
      fontSize: layout.fontSize.small,
      fontWeight: 'bold',
    },
    propertyAddress: {
      fontSize: layout.fontSize.medium,
      color: '#6B7280',
      marginBottom: 8,
    },
    taxYear: {
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

