import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, Appbar, SegmentedButtons, Menu, TouchableRipple, Checkbox, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { ArrowLeft, Search, ChevronDown, Plus } from 'lucide-react-native';

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

const CLIENT_OPTIONS = [
  { label: 'Last name', value: 'last_name' },
  { label: 'Company name', value: 'company_name' },
];

const PROPERTY_OPTIONS = [
  { label: 'Address', value: 'property_address' },
  { label: 'PIN Number', value: 'property_name' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(CLIENT_DATA);
  const [searchMode, setSearchMode] = useState('client');
  const [searchFilter, setSearchFilter] = useState('last_name')
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const layout = useResponsiveLayout();

  useEffect(() => {
    if (searchMode === 'client') {
      setSearchFilter('last_name');
    } else {
      setSearchFilter('property_address');
    }
  }, [searchMode]);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const getCurrentFilterLabel = () => {
    if (searchMode === 'client') {
      return CLIENT_OPTIONS.find(option => option.value === searchFilter)?.label || 'Last name';
    } else {
      return PROPERTY_OPTIONS.find(option => option.value === searchFilter)?.label || 'Address';
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredData(CLIENT_DATA);
      return;
    }

    const filtered = CLIENT_DATA.filter((item) => {
      const query = searchQuery.toLowerCase();
      if (searchMode === 'client') {
        return item.clientName.toLowerCase().includes(query);
      } else {
        return item.propertyAddress.toLowerCase().includes(query);
      }
    });
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

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleAddMeeting = () => {
    // Navigate to meetings screen with selected items
    console.log('Adding meeting for selected items:', selectedItems);
    // You can implement navigation to meetings screen here
    // router.push('/tabs/meetings');
  };

  const clearSelection = () => {
    setSelectedItems([]);
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
        {selectedItems.length > 0 && (
          <Appbar.Action
            icon="close"
            color="#FFFFFF"
            size={layout.isTablet ? 28 : 24}
            onPress={clearSelection}
          />
        )}
      </Appbar.Header>

      <View style={styles.content}>
        <View style={styles.mainContent}>
          <Card style={styles.searchCard}>
            <Card.Content style={styles.searchCardContent}>

              <SegmentedButtons
                value={searchMode}
                onValueChange={(value) => {
                  setSearchMode(value);
                }}
                buttons={[
                  {
                    value: 'client',
                    label: 'Client',
                    style: searchMode === 'client' ? styles.selectedSegmentedButton : styles.segmentedButton,
                    labelStyle: searchMode === 'client' ? styles.selectedSegmentedButtonLabel : styles.segmentedButtonLabel,
                  },
                  {
                    value: 'property',
                    label: 'Property',
                    style: searchMode === 'property' ? styles.selectedSegmentedButton : styles.segmentedButton,
                    labelStyle: searchMode === 'property' ? styles.selectedSegmentedButtonLabel : styles.segmentedButtonLabel,
                  },
                ]}
                style={styles.segmentedButtonsContainer}
              />
              
              <View style={styles.searchRow}>
                <Menu
                  visible={menuVisible}
                  onDismiss={closeMenu}
                  anchor={
                    <TouchableRipple onPress={openMenu} style={styles.dropdownButton}>
                      <View style={styles.dropdownButtonContent}>
                        <Text style={styles.dropdownButtonLabel}>{getCurrentFilterLabel()}</Text>
                        <ChevronDown size={layout.isTablet ? 24 : 20} color="#081A51" />
                      </View>
                    </TouchableRipple>
                  }
                  anchorPosition="bottom"
                  contentStyle={styles.menuContent}
                >
                  {(searchMode === 'client' ? CLIENT_OPTIONS : PROPERTY_OPTIONS).map((option) => (
                    <Menu.Item 
                      key={option.value}
                      onPress={() => {
                        console.log('Menu item pressed:', option.value);
                        setSearchFilter(option.value);
                        closeMenu();
                      }} 
                      title={option.label}
                      titleStyle={searchFilter === option.value ? styles.selectedMenuItemText : {}}
                      style={searchFilter === option.value ? styles.selectedMenuItem : {}}
                    />
                  ))}
                </Menu>
                <TextInput
                  placeholder={`Search by ${searchMode === 'client' ? 'client name' : 'property address'}`}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  mode="outlined"
                  style={styles.searchInput}
                  contentStyle={styles.inputContent}
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <Search size={layout.isTablet ? 22 : 18} color="#94A3B8" />
                      )}
                    />
                  }
                  onSubmitEditing={handleSearch}
                  outlineStyle={styles.inputOutline}
                />
                <Button
                  mode="contained"
                  onPress={handleSearch}
                  style={styles.searchButton}
                  labelStyle={styles.searchButtonLabel}
                >
                  SEARCH
                </Button>
              </View>
            </Card.Content>
          </Card>

          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>
                Search Results ({filteredData.length})
              </Text>
              {selectedItems.length > 0 && (
                <Text style={styles.selectedCount}>
                  {selectedItems.length} selected
                </Text>
              )}
            </View>

            <ScrollView
              style={styles.resultsScrollView}
              contentContainerStyle={styles.resultsScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.resultsGrid}>
                {filteredData.map((item) => (
                  <Card 
                    key={item.id} 
                    style={[
                      styles.resultCard,
                      selectedItems.includes(item.id) && styles.selectedResultCard
                    ]}
                  >
                    <TouchableRipple onPress={() => handleItemSelect(item.id)}>
                      <Card.Content style={styles.resultCardContent}>
                        <View style={styles.resultHeader}>
                          <Text style={styles.clientName}>{item.clientName}</Text>
                          <View style={styles.rightSection}>
                            <View
                              style={[
                                styles.statusBadge,
                                { backgroundColor: getStatusColor(item.status) },
                              ]}
                            >
                              <Text style={styles.statusText}>{item.status}</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                              <Checkbox
                                status={selectedItems.includes(item.id) ? 'checked' : 'unchecked'}
                                onPress={() => handleItemSelect(item.id)}
                                color="#081A51"
                              />
                            </View>
                          </View>
                        </View>
                        <Text style={styles.propertyAddress}>
                          {item.propertyAddress}
                        </Text>
                        <Text style={styles.taxYear}>Tax Year: {item.taxYear}</Text>
                      </Card.Content>
                    </TouchableRipple>
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
            </ScrollView>
          </View>
        </View>
      </View>

      {selectedItems.length > 0 && (
        <View style={styles.fabContainer}>
          <Button
            mode="contained"
            icon={() => <Plus size={24} color="#FFFFFF" />}
            onPress={handleAddMeeting}
            style={styles.fab}
            labelStyle={styles.fabLabel}
            contentStyle={styles.fabContent}
          >
            Add Meeting
          </Button>
        </View>
      )}
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
      padding: layout.contentPadding,
      alignItems: 'center',
    },
    mainContent: {
      width: '100%',
      maxWidth: layout.isTablet ? 1200 : undefined,
      flex: 1,
    },
    searchCard: {
      marginBottom: layout.buttonSpacing * 1.5,
      borderRadius: layout.isTablet ? 16 : 12,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#D1D5DB',
      elevation: 0,
      shadowColor: undefined,
      shadowOffset: undefined,
      shadowOpacity: undefined,
      shadowRadius: undefined,
    },
    searchCardContent: {
      padding: layout.isTablet ? 32 : 24,
    },
    searchInput: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      height: layout.isTablet ? 58 : 48,
      minHeight: layout.isTablet ? 58 : 48,
    },
    inputContent: {
      fontSize: layout.fontSize.medium,
    },
    inputOutline: {
      borderRadius: layout.isTablet ? 12 : 8,
      borderWidth: 1,
      borderColor: '#CBD5E1',
    },
    searchButton: {
      backgroundColor: '#081A51',
      borderRadius: layout.isTablet ? 12 : 8,
      elevation: 0,
      height: layout.isTablet ? 58 : 48,
      minHeight: layout.isTablet ? 58 : 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchButtonLabel: {
      fontWeight: 'bold',
      fontSize: layout.fontSize.medium,
      color: '#FFFFFF',
    },
    resultsContainer: {
      flex: 1,
      marginTop: layout.buttonSpacing * 1.5,
    },
    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: layout.buttonSpacing,
      width: '100%',
    },
    resultsTitle: {
      fontSize: layout.fontSize.large,
      fontWeight: 'bold',
      color: '#1F2937',
      textAlign: layout.isTablet ? 'center' : 'left',
    },
    selectedCount: {
      fontSize: layout.fontSize.medium,
      color: '#6B7280',
      fontWeight: '500',
    },
    resultsScrollView: {
      flex: 1,
    },
    resultsScrollContent: {
      paddingBottom: layout.contentPadding,
    },
    resultsGrid: {
      flexDirection: layout.isTablet && layout.isLandscape ? 'row' : 'column',
      flexWrap: layout.isTablet && layout.isLandscape ? 'wrap' : 'nowrap',
      gap: layout.buttonSpacing / 2,
    },
    resultCard: {
      marginBottom: layout.buttonSpacing / 2,
      borderRadius: layout.isTablet ? 12 : 8,
      flex: layout.isTablet && layout.isLandscape ? 1 : undefined,
      minWidth: layout.isTablet && layout.isLandscape ? '48%' : undefined,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#D1D5DB',
      elevation: 0,
      shadowColor: undefined,
      shadowOffset: undefined,
      shadowOpacity: undefined,
      shadowRadius: undefined,
    },
    selectedResultCard: {
      borderWidth: 2,
      borderColor: '#081A51',
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
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: layout.isTablet ? 16 : 8,
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
      borderRadius: layout.isTablet ? 12 : 8,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#D1D5DB',
      elevation: 0,
      shadowColor: undefined,
      shadowOffset: undefined,
      shadowOpacity: undefined,
      shadowRadius: undefined,
    },
    noResultsCardContent: {
      padding: layout.isTablet ? 32 : 24,
    },
    noResultsText: {
      textAlign: 'center',
      color: '#6B7280',
      fontSize: layout.fontSize.medium,
    },
    segmentedButtonsContainer: {
      borderRadius: layout.isTablet ? 12 : 8,
      marginBottom: layout.contentPadding,
      borderWidth: 1,
      borderColor: '#081A51',
      overflow: 'hidden',
    },
    segmentedButton: {
      backgroundColor: '#FFFFFF',
      borderRadius: 0,
      borderWidth: 0,
    },
    selectedSegmentedButton: {
      backgroundColor: '#081A51',
      borderRadius: 0,
      borderWidth: 0,
    },
    segmentedButtonLabel: {
      color: '#081A51',
      fontSize: layout.fontSize.medium,
      fontWeight: 'bold',
    },
    selectedSegmentedButtonLabel: {
      color: '#FFFFFF',
      fontSize: layout.fontSize.medium,
      fontWeight: 'bold',
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: layout.isTablet ? 16 : 8,
    },
    dropdownButton: {
      borderWidth: 1,
      borderColor: '#CBD5E1',
      borderRadius: layout.isTablet ? 12 : 8,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      paddingHorizontal: 12,
      height: layout.isTablet ? 58 : 48,
      minHeight: layout.isTablet ? 58 : 48,
    },
    dropdownButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    dropdownButtonLabel: {
      color: '#081A51',
      fontSize: layout.fontSize.medium,
      fontWeight: '500',
    },
    menuContent: {
      borderRadius: layout.isTablet ? 12 : 8,
    },
    selectedMenuItem: {
      backgroundColor: '#E2E8F0',
    },
    selectedMenuItemText: {
      color: '#081A51',
      fontWeight: 'bold',
    },
    fabContainer: {
      position: 'absolute',
      right: layout.contentPadding,
      bottom: layout.contentPadding,
      left: layout.contentPadding,
      transform: [{ translateX: 0 }, { translateY: 0 }],
    },
    fab: {
      backgroundColor: '#081A51',
      color: '#FFFFFF',
    },
    fabLabel: {
      fontWeight: 'bold',
      fontSize: layout.fontSize.medium,
    },
    fabContent: {
      padding: layout.isTablet ? 10 : 5,
      transform: [{ translateX: 0 }, { translateY: 0 }],
    },
    checkboxContainer: {
      marginRight: layout.isTablet ? 10 : 5,
    },
  });

