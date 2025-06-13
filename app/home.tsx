import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput, Image, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Plus, Settings, BookOpen, Users, FileText, Download } from 'lucide-react-native';
import { useNotebookStore } from '@/store/notebookStore';
import NotebookCard from '@/components/NotebookCard';
import EmptyState from '@/components/EmptyState';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function Home() {
  const router = useRouter();
  const colors = useThemeColors();
  const { notebooks, createNotebook } = useNotebookStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recent');
  const [showSettings, setShowSettings] = useState(false);
  
  const filteredNotebooks = notebooks.filter((notebook) => 
    notebook.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedNotebooks = [...filteredNotebooks].sort((a, b) => {
    if (activeTab === 'recent') {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    } else if (activeTab === 'title') {
      return a.title.localeCompare(b.title);
    } else if (activeTab === 'shared') {
      // In a real app, this would filter shared notebooks
      return 0;
    } else if (activeTab === 'downloaded') {
      // In a real app, this would filter downloaded notebooks
      return 0;
    }
    return 0;
  });
  
  const handleCreateNotebook = () => {
    const newNotebook = createNotebook('New Notebook');
    router.push(`/notebook/${newNotebook.id}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab.toLowerCase());
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 16,
      paddingTop: 8,
    },
    logoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    logo: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    profileButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      overflow: 'hidden',
    },
    profileImage: {
      width: '100%',
      height: '100%',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 8,
      paddingHorizontal: 12,
    },
    searchInput: {
      flex: 1,
      height: 44,
      color: colors.text,
      marginLeft: 8,
      fontSize: 16,
    },
    tabsContainer: {
      marginBottom: 8,
    },
    listContent: {
      padding: 16,
      paddingBottom: 80,
    },
    createButton: {
      position: 'absolute',
      bottom: 24,
      left: '50%',
      transform: [{ translateX: -70 }],
      backgroundColor: colors.primary,
      borderRadius: 24,
      paddingVertical: 10,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 140,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    createButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginLeft: 8,
    },
    folderIcon: {
      width: 80,
      height: 60,
      position: 'relative',
    },
    folderBack: {
      position: 'absolute',
      width: 70,
      height: 50,
      backgroundColor: colors.text,
      borderRadius: 4,
      top: 10,
      left: 5,
    },
    folderFront: {
      position: 'absolute',
      width: 80,
      height: 40,
      backgroundColor: colors.text,
      borderRadius: 4,
      top: 20,
      left: 0,
    },
    settingsDropdown: {
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
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
    },
    settingsText: {
      color: colors.text,
      marginLeft: 8,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>NotebookLM</Text>
          <Pressable 
            style={styles.profileButton}
            onPress={() => setShowSettings(!showSettings)}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' }} 
              style={styles.profileImage} 
            />
          </Pressable>
        </View>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search notebooks"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <View style={styles.tabsContainer}>
        <ScrollTabs 
          tabs={['Recent', 'Shared', 'Title', 'Downloaded']} 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          colors={colors}
        />
      </View>
      
      {notebooks.length === 0 ? (
        <EmptyState
          title="No notebooks yet"
          description="Create your first notebook to get started"
          icon={<BookOpen size={64} color={colors.textSecondary} />}
        />
      ) : (
        <FlatList
          data={sortedNotebooks}
          renderItem={({ item }) => <NotebookCard notebook={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      
      <Pressable style={styles.createButton} onPress={handleCreateNotebook}>
        <Plus size={20} color="#FFFFFF" />
        <Text style={styles.createButtonText}>Create new</Text>
      </Pressable>

      {/* Settings Modal */}
      {showSettings && (
        <View style={styles.settingsDropdown}>
          <Pressable 
            style={styles.settingsItem}
            onPress={() => {
              setShowSettings(false);
              router.push('/settings');
            }}
          >
            <Settings size={18} color={colors.text} />
            <Text style={styles.settingsText}>Settings</Text>
          </Pressable>
          <Pressable 
            style={styles.settingsItem}
            onPress={() => {
              setShowSettings(false);
              router.push('/login');
            }}
          >
            <Text style={styles.settingsText}>Sign out</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

interface ScrollTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  colors: any;
}

const ScrollTabs = ({ tabs, activeTab, onTabChange, colors }: ScrollTabsProps) => {
  const tabStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 16,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 8,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    tabText: {
      color: colors.textSecondary,
      fontWeight: '500',
    },
    activeTabText: {
      color: colors.text,
      fontWeight: '600',
    },
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tabStyles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab}
          style={[
            tabStyles.tab,
            activeTab === tab.toLowerCase() && tabStyles.activeTab,
          ]}
          onPress={() => onTabChange(tab)}
        >
          <Text
            style={[
              tabStyles.tabText,
              activeTab === tab.toLowerCase() && tabStyles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};