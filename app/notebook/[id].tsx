import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { FileText, MoreVertical, MessageSquare, Wand2, Trash2, Edit } from 'lucide-react-native';
import { useNotebookStore } from '@/store/notebookStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import SourceItem from '@/components/SourceItem';
import AddSourceModal from '@/components/AddSourceModal';
import EmptyState from '@/components/EmptyState';

export default function NotebookDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { notebooks, updateNotebook, deleteNotebook, addSource } = useNotebookStore();
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState('');
  const [isAddSourceModalVisible, setIsAddSourceModalVisible] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  
  const notebook = notebooks.find((n) => n.id === id);
  
  useEffect(() => {
    if (notebook) {
      setTitle(notebook.title);
    }
  }, [notebook]);
  
  if (!notebook) {
    return (
      <EmptyState
        title="Notebook not found"
        description="The notebook you're looking for doesn't exist"
      />
    );
  }
  
  const handleUpdateTitle = () => {
    if (title.trim() && notebook) {
      updateNotebook(notebook.id, { title: title.trim() });
      setIsEditingTitle(false);
    }
  };
  
  const handleDeleteNotebook = () => {
    Alert.alert(
      "Delete Notebook",
      "Are you sure you want to delete this notebook? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            deleteNotebook(notebook.id);
            router.replace('/home');
          }
        }
      ]
    );
  };
  
  const handleAddSource = (source: { type: 'pdf' | 'website' | 'youtube' | 'text'; title: string; content?: string; url?: string }) => {
    addSource(notebook.id, source);
  };
  
  const handleOpenChat = () => {
    router.push(`/chat/${notebook.id}`);
  };
  
  const handleOpenStudio = () => {
    router.push(`/studio/${notebook.id}`);
  };
  
  const handleOpenSources = () => {
    router.push(`/sources/${notebook.id}`);
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerButtonText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
      paddingHorizontal: 8,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    emoji: {
      fontSize: 40,
      marginBottom: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    titleInput: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
      padding: 0,
    },
    meta: {
      fontSize: 14,
      color: colors.textSecondary,
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
    selectAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectAllText: {
      color: colors.text,
      marginRight: 8,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: colors.text,
      borderRadius: 2,
    },
    sourcesList: {
      flex: 1,
      padding: 16,
      paddingTop: 0,
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
    optionsMenu: {
      position: 'absolute',
      top: 50,
      right: 16,
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 1000,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 4,
    },
    optionText: {
      color: colors.text,
      fontSize: 16,
      marginLeft: 8,
    },
    deleteOption: {
      color: colors.error,
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: notebook.title,
          headerRight: () => (
            <Pressable onPress={() => setShowOptionsMenu(!showOptionsMenu)}>
              <MoreVertical size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      
      {showOptionsMenu && (
        <View style={styles.optionsMenu}>
          <Pressable 
            style={styles.optionItem}
            onPress={() => {
              setShowOptionsMenu(false);
              setIsEditingTitle(true);
            }}
          >
            <Edit size={20} color={colors.text} />
            <Text style={styles.optionText}>Rename</Text>
          </Pressable>
          <Pressable 
            style={styles.optionItem}
            onPress={() => {
              setShowOptionsMenu(false);
              handleDeleteNotebook();
            }}
          >
            <Trash2 size={20} color={colors.error} />
            <Text style={[styles.optionText, styles.deleteOption]}>Delete</Text>
          </Pressable>
        </View>
      )}
      
      <View style={styles.header}>
        <Text style={styles.emoji}>{notebook.emoji}</Text>
        
        {isEditingTitle ? (
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            onBlur={handleUpdateTitle}
            onSubmitEditing={handleUpdateTitle}
            autoFocus
          />
        ) : (
          <Pressable onPress={() => setIsEditingTitle(true)}>
            <Text style={styles.title}>{notebook.title}</Text>
          </Pressable>
        )}
        
        <Text style={styles.meta}>
          {notebook.sources.length} {notebook.sources.length === 1 ? 'source' : 'sources'} • Created {new Date(notebook.createdAt).toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.sourcesHeader}>
        <Text style={styles.sectionTitle}>Sources</Text>
        <Pressable 
          style={styles.selectAllButton}
          onPress={() => router.push(`/sources/${notebook.id}`)}
        >
          <Text style={styles.selectAllText}>Select all</Text>
          <View style={styles.checkbox} />
        </Pressable>
      </View>
      
      <ScrollView style={styles.sourcesList}>
        {notebook.sources.length === 0 ? (
          <EmptyState
            title="No sources yet"
            description="Add sources to get started with your notebook"
            icon={React.createElement(FileText, { size: 64, color: colors.textSecondary })}
          />
        ) : (
          notebook.sources.map((source) => (
            <SourceItem
              key={source.id}
              source={source}
              onPress={handleOpenSources}
            />
          ))
        )}
      </ScrollView>
      
      <View style={styles.addSourceContainer}>
        <Pressable 
          style={styles.addSourceButton}
          onPress={() => setIsAddSourceModalVisible(true)}
        >
          <View style={styles.addSourceIconContainer}>
            <FileText size={16} color="#4285F4" />
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
      
      <AddSourceModal
        visible={isAddSourceModalVisible}
        onClose={() => setIsAddSourceModalVisible(false)}
        onAddSource={handleAddSource}
      />
    </View>
  );
}