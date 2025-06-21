import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, Appbar, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { ArrowLeft, Signature as FileSignature, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';

// Hardcoded signature data
const SIGNATURE_DOCUMENTS = [
  {
    id: '1',
    documentName: 'Property Tax Appeal Form - John Smith',
    client: 'John Smith',
    property: '123 Main St, Chicago, IL 60601',
    dateCreated: '2024-01-10',
    status: 'Pending Signature',
    requiresSignature: true,
  },
  {
    id: '2',
    documentName: 'Tax Assessment Agreement - Sarah Johnson',
    client: 'Sarah Johnson',
    property: '456 Oak Ave, Burr Ridge, IL 60527',
    dateCreated: '2024-01-08',
    status: 'Signed',
    requiresSignature: false,
  },
  {
    id: '3',
    documentName: 'Property Valuation Report - Michael Brown',
    client: 'Michael Brown',
    property: '789 Pine Rd, Chicago, IL 60602',
    dateCreated: '2024-01-12',
    status: 'Pending Signature',
    requiresSignature: true,
  },
  {
    id: '4',
    documentName: 'Tax Reduction Contract - Emily Davis',
    client: 'Emily Davis',
    property: '321 Elm St, Burr Ridge, IL 60527',
    dateCreated: '2024-01-14',
    status: 'Signed',
    requiresSignature: false,
  },
  {
    id: '5',
    documentName: 'Annual Tax Review - Robert Wilson',
    client: 'Robert Wilson',
    property: '555 Cedar Lane, Chicago, IL 60603',
    dateCreated: '2024-01-16',
    status: 'Pending Signature',
    requiresSignature: true,
  },
  {
    id: '6',
    documentName: 'Property Assessment Appeal - Jennifer Martinez',
    client: 'Jennifer Martinez',
    property: '777 Maple Drive, Burr Ridge, IL 60527',
    dateCreated: '2024-01-18',
    status: 'Signed',
    requiresSignature: false,
  },
];

export default function SignatureScreen() {
  const [documents, setDocuments] = useState(SIGNATURE_DOCUMENTS);
  const layout = useResponsiveLayout();

  const handleSignDocument = (documentId: string) => {
    Alert.alert(
      'Sign Document',
      'Would you like to proceed with signing this document?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign',
          onPress: () => {
            setDocuments(prev =>
              prev.map(doc =>
                doc.id === documentId
                  ? { ...doc, status: 'Signed', requiresSignature: false }
                  : doc
              )
            );
            Alert.alert('Success', 'Document has been signed successfully!');
          },
        },
      ]
    );
  };

  const handleViewDocument = (documentId: string) => {
    const document = documents.find(doc => doc.id === documentId);
    Alert.alert(
      'Document Details',
      `Document: ${document?.documentName}\nClient: ${document?.client}\nProperty: ${document?.property}\nStatus: ${document?.status}`
    );
  };

  const getStatusIcon = (status: string) => {
    const iconSize = layout.isTablet ? 24 : 20;
    switch (status) {
      case 'Signed':
        return <CheckCircle size={iconSize} color="#10B981" />;
      case 'Pending Signature':
        return <Clock size={iconSize} color="#F59E0B" />;
      default:
        return <FileSignature size={iconSize} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed':
        return '#10B981';
      case 'Pending Signature':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const pendingDocuments = documents.filter(doc => doc.requiresSignature);
  const signedDocuments = documents.filter(doc => !doc.requiresSignature);

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
          title="Meeting Signatures" 
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryCardContent}>
              <Text style={styles.summaryTitle}>Signature Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Pending Signatures:</Text>
                <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>
                  {pendingDocuments.length}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Completed Signatures:</Text>
                <Text style={[styles.summaryValue, { color: '#10B981' }]}>
                  {signedDocuments.length}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {pendingDocuments.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pending Signatures</Text>
              <View style={styles.documentsGrid}>
                {pendingDocuments.map((document) => (
                  <Card key={document.id} style={styles.documentCard}>
                    <Card.Content style={styles.documentCardContent}>
                      <View style={styles.documentHeader}>
                        <View style={styles.documentInfo}>
                          <Text style={styles.documentName}>{document.documentName}</Text>
                          <Text style={styles.clientName}>{document.client}</Text>
                          <Text style={styles.propertyAddress}>{document.property}</Text>
                          <Text style={styles.dateCreated}>Created: {document.dateCreated}</Text>
                        </View>
                        <View style={styles.statusContainer}>
                          {getStatusIcon(document.status)}
                          <Text style={[styles.statusText, { color: getStatusColor(document.status) }]}>
                            {document.status}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.actionButtons}>
                        <Button
                          mode="outlined"
                          onPress={() => handleViewDocument(document.id)}
                          style={styles.viewButton}
                          contentStyle={styles.smallButtonContent}
                          labelStyle={styles.viewButtonLabel}
                          compact
                        >
                          View
                        </Button>
                        <Button
                          mode="contained"
                          onPress={() => handleSignDocument(document.id)}
                          style={styles.signButton}
                          contentStyle={styles.smallButtonContent}
                          labelStyle={styles.smallButtonLabel}
                          compact
                        >
                          Sign Document
                        </Button>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </View>
          )}

          {signedDocuments.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Completed Signatures</Text>
              <View style={styles.documentsGrid}>
                {signedDocuments.map((document) => (
                  <Card key={document.id} style={styles.documentCard}>
                    <Card.Content style={styles.documentCardContent}>
                      <View style={styles.documentHeader}>
                        <View style={styles.documentInfo}>
                          <Text style={styles.documentName}>{document.documentName}</Text>
                          <Text style={styles.clientName}>{document.client}</Text>
                          <Text style={styles.propertyAddress}>{document.property}</Text>
                          <Text style={styles.dateCreated}>Created: {document.dateCreated}</Text>
                        </View>
                        <View style={styles.statusContainer}>
                          {getStatusIcon(document.status)}
                          <Text style={[styles.statusText, { color: getStatusColor(document.status) }]}>
                            {document.status}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.actionButtons}>
                        <Button
                          mode="outlined"
                          onPress={() => handleViewDocument(document.id)}
                          style={styles.viewButton}
                          contentStyle={styles.smallButtonContent}
                          labelStyle={styles.smallButtonLabel}
                          compact
                        >
                          View Document
                        </Button>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (layout: ReturnType<typeof useResponsiveLayout>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#081A51',
    height: layout.isTablet ? 80 : 64,
    borderBottomWidth: 1,
    borderColor: '#D1D5DB',
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
  summaryCard: {
    marginBottom: layout.buttonSpacing * 1.5,
    borderRadius: layout.isTablet ? 16 : 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    elevation: 0,
  },
  summaryCardContent: {
    padding: layout.isTablet ? 32 : 24,
  },
  summaryTitle: {
    fontSize: layout.fontSize.large,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: layout.buttonSpacing,
    textAlign: layout.isTablet ? 'center' : 'left',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: layout.fontSize.medium,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: layout.fontSize.medium,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: layout.buttonSpacing * 1.5,
  },
  sectionTitle: {
    fontSize: layout.fontSize.large,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: layout.buttonSpacing,
    textAlign: layout.isTablet ? 'center' : 'left',
  },
  documentsGrid: {
    flexDirection: layout.isTablet && layout.isLandscape ? 'row' : 'column',
    flexWrap: layout.isTablet && layout.isLandscape ? 'wrap' : 'nowrap',
    gap: layout.buttonSpacing / 2,
  },
  documentCard: {
    marginBottom: layout.buttonSpacing / 2,
    borderRadius: layout.isTablet ? 12 : 8,
    flex: layout.isTablet && layout.isLandscape ? 1 : undefined,
    minWidth: layout.isTablet && layout.isLandscape ? '48%' : undefined,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    elevation: 0,
  },
  documentCardContent: {
    padding: layout.isTablet ? 24 : 16,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: layout.buttonSpacing,
  },
  documentInfo: {
    flex: 1,
    marginRight: layout.buttonSpacing,
  },
  documentName: {
    fontSize: layout.fontSize.medium,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  clientName: {
    fontSize: layout.fontSize.medium,
    color: '#6B7280',
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: layout.fontSize.small,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  dateCreated: {
    fontSize: layout.fontSize.small,
    color: '#9CA3AF',
  },
  statusContainer: {
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: layout.fontSize.small,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    borderColor: '#6B7280',
    borderRadius: layout.isTablet ? 10 : 8,
  },
  signButton: {
    backgroundColor: '#081A51',
    borderRadius: layout.isTablet ? 10 : 8,
  },
  smallButtonContent: {
    paddingVertical: layout.isTablet ? 12 : 8,
    paddingHorizontal: layout.isTablet ? 16 : 12,
  },
  smallButtonLabel: {
    color: '#FFFFFF',
    fontSize: layout.fontSize.small,
    fontWeight: 'bold',
  },
  viewButtonLabel: {
    color: '#081A51',
    fontSize: layout.fontSize.small,
    fontWeight: 'bold',
  },    
});