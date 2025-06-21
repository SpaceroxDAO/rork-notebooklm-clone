import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { FileText, MessageSquare, Wand2, Plus, MoreVertical } from 'lucide-react-native';
import { useNotebookStore } from '@/store/notebookStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import EmptyState from '@/components/EmptyState';

export default function Sources() {
  const { id, sourceId } = useLocalSearchParams<{ id: string; sourceId?: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { notebooks, removeSource } = useNotebookStore();
  
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  
  const notebook = notebooks.find((n) => n.id === id);
  
  useEffect(() => {
    if (sourceId) {
      setSelectedSources([sourceId]);
    }
  }, [sourceId]);
  
  if (!notebook) {
    return (
      <EmptyState
        title="Notebook not found"
        description="The notebook you're looking for doesn't exist"
      />
    );
  }
  
  const handleSourcePress = (sourceId: string) => {
    setSelectedSources((prev) => {
      if (prev.includes(sourceId)) {
        return prev.filter((id) => id !== sourceId);
      } else {
        return [...prev, sourceId];
      }
    });
  };
  
  const handleDeleteSelected = () => {
    if (selectedSources.length === 0) return;
    
    Alert.alert(
      "Delete Sources",
      `Are you sure you want to delete ${selectedSources.length} source${selectedSources.length > 1 ? 's' : ''}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            selectedSources.forEach((sourceId) => {
              removeSource(notebook.id, sourceId);
            });
            setSelectedSources([]);
            if (notebook.sources.length === selectedSources.length) {
              router.back();
            }
          }
        }
      ]
    );
  };

  const handleOpenChat = () => {
    router.push(`/chat/${notebook.id}`);
  };
  
  const handleOpenStudio = () => {
    router.push(`/studio/${notebook.id}`);
  };

  const renderSourceItem = ({ item }: { item: any }) => (
    <Pressable
      style={styles.sourceItem}
      onPress={() => handleSourcePress(item.id)}
    >
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
    sourcesList: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 120,
    },
    sourceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
          title: "Sources",
          headerRight: () => (
            <Pressable style={styles.headerButton}>
              <MoreVertical size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      
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
          onPress={() => Alert.alert("Add Source", "Add a new source to this notebook")}
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
    </View>
  );
}