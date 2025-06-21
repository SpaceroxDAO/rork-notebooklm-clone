import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { FileText, MessageSquare, Wand2, Plus, MoreVertical } from 'lucide-react-native';
import { useNotebookStore } from '@/store/notebookStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import EmptyState from '@/components/EmptyState';
import AddSourceModal from '@/components/AddSourceModal';

export default function Sources() {
  const { id, sourceId } = useLocalSearchParams<{ id: string; sourceId?: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { notebooks, removeSource, addSource } = useNotebookStore();
  const [isAddSourceModalVisible, setIsAddSourceModalVisible] = useState(false);
  
  const notebook = notebooks.find((n) => n.id === id);
  
  if (!notebook) {
    return (
      <EmptyState
        title="Notebook not found"
        description="The notebook you're looking for doesn't exist"
      />
    );
  }
  
  const handleOpenChat = () => {
    router.push(`/chat/${notebook.id}`);
  };
  
  const handleOpenStudio = () => {
    router.push(`/studio/${notebook.id}`);
  };

  const handleAddSource = (source: { type: 'pdf' | 'website' | 'youtube' | 'text'; title: string; content?: string; url?: string }) => {
    addSource(notebook.id, source);
  };

  const renderSourceItem = ({ item }: { item: any }) => (
    <Pressable style={styles.sourceItem}>
      <FileText size={20} color="#4285F4" style={styles.sourceIcon} />
      <Text style={[styles.sourceTitle, { color: colors.text }]} numberOfLines={2}>
        {item.title}
      </Text>
    </Pressable>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerButton: {
      paddingHorizontal: 4,
      paddingVertical: 4,
    },
    sourcesHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      paddingBottom: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    sourcesList: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 120,
    },
    sourceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
    },
    sourceIcon: {
      marginRight: 16,
    },
    sourceTitle: {
      fontSize: 16,
      flex: 1,
      lineHeight: 22,
    },
    addSourceContainer: {
      position: 'absolute',
      bottom: 80,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingVertical: 16,
    },
    addSourceButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    addSourceText: {
      color: '#000000',
      fontWeight: '500',
      fontSize: 16,
      marginLeft: 8,
    },
    bottomNav: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
      paddingVertical: 8,
    },
    navButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    },
    activeNavButton: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    navButtonText: {
      color: colors.textSecondary,
      fontSize: 12,
      marginTop: 4,
    },
    activeNavButtonText: {
      color: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: notebook.title,
          headerRight: () => (
            <Pressable style={styles.headerButton}>
              <MoreVertical size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      
      <View style={styles.sourcesHeader}>
        <Text style={styles.sectionTitle}>Sources</Text>
        <Pressable style={styles.headerButton}>
          <MoreVertical size={24} color={colors.text} />
        </Pressable>
      </View>
      
      {notebook.sources.length === 0 ? (
        <EmptyState
          title="No sources yet"
          description="Add sources to your notebook to get started"
          icon={<FileText size={64} color={colors.textSecondary} />}
        />
      ) : (
        <FlatList
          data={notebook.sources}
          renderItem={renderSourceItem}
          keyExtractor={(item) => item.id}
          style={styles.sourcesList}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      <View style={styles.addSourceContainer}>
        <Pressable 
          style={styles.addSourceButton}
          onPress={() => setIsAddSourceModalVisible(true)}
        >
          <Plus size={20} color="#000000" />
          <Text style={styles.addSourceText}>Add a source</Text>
        </Pressable>
      </View>
      
      <View style={styles.bottomNav}>
        <Pressable style={[styles.navButton, styles.activeNavButton]}>
          <FileText size={24} color={colors.primary} />
          <Text style={[styles.navButtonText, styles.activeNavButtonText]}>Sources</Text>
        </Pressable>
        
        <Pressable 
          style={styles.navButton}
          onPress={handleOpenChat}
        >
          <MessageSquare size={24} color={colors.textSecondary} />
          <Text style={styles.navButtonText}>Chat</Text>
        </Pressable>
        
        <Pressable 
          style={styles.navButton}
          onPress={handleOpenStudio}
        >
          <Wand2 size={24} color={colors.textSecondary} />
          <Text style={styles.navButtonText}>Studio</Text>
        </Pressable>
      </View>

      <AddSourceModal
        visible={isAddSourceModalVisible}
        onClose={() => setIsAddSourceModalVisible(false)}
        onAddSource={handleAddSource}
      />
    </View>
  );
}