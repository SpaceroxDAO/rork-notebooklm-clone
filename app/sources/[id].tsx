import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { FileText, MessageSquare, Wand2, Plus, MoreVertical, ArrowLeft } from 'lucide-react-native';
import { useNotebookStore } from '@/store/notebookStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import SourceItem from '@/components/SourceItem';
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

  const handleBackToHome = () => {
    router.push('/home');
  };

  const handleOpenChat = () => {
    router.push(`/chat/${notebook.id}`);
  };
  
  const handleOpenStudio = () => {
    router.push(`/studio/${notebook.id}`);
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerButton: {
      paddingHorizontal: 4,
      paddingVertical: 4,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    selectAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    selectAllText: {
      color: colors.text,
      fontSize: 16,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: colors.text,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkmark: {
      width: 12,
      height: 6,
      borderLeftWidth: 2,
      borderBottomWidth: 2,
      borderColor: colors.text,
      transform: [{ rotate: '-45deg' }],
      marginTop: -2,
    },
    sourcesList: {
      padding: 16,
      paddingBottom: 120,
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
      paddingVertical: 10,
      paddingHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    addSourceIconContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#E8F0FE',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    addSourceText: {
      color: '#000000',
      fontWeight: 'bold',
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
          headerLeft: () => (
            <Pressable style={styles.headerButton} onPress={handleBackToHome}>
              <ArrowLeft size={24} color={colors.text} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable style={styles.headerButton}>
              <MoreVertical size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      
      <View style={styles.header}>
        <Pressable
          style={styles.selectAllButton}
          onPress={() => {
            if (selectedSources.length === notebook.sources.length) {
              setSelectedSources([]);
            } else {
              setSelectedSources(notebook.sources.map((source) => source.id));
            }
          }}
        >
          <Text style={styles.selectAllText}>
            Select all
          </Text>
          <View style={styles.checkbox}>
            {selectedSources.length === notebook.sources.length && (
              <View style={styles.checkmark} />
            )}
          </View>
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
          renderItem={({ item }) => (
            <SourceItem
              source={item}
              selected={selectedSources.includes(item.id)}
              onPress={() => handleSourcePress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.sourcesList}
        />
      )}
      
      <View style={styles.addSourceContainer}>
        <Pressable 
          style={styles.addSourceButton}
          onPress={() => Alert.alert("Add Source", "Add a new source to this notebook")}
        >
          <View style={styles.addSourceIconContainer}>
            <Plus size={16} color="#4285F4" />
          </View>
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
          <Text style={styles.navButtonText}>Automate</Text>
        </Pressable>
      </View>
    </View>
  );
}