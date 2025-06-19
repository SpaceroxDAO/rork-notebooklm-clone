import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { FileText, MessageSquare, Wand2, ChevronRight, Zap, Search, Filter } from 'lucide-react-native';
import { useNotebookStore } from '@/store/notebookStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import EmptyState from '@/components/EmptyState';
import { Notebook } from '@/types/notebook';
import { getAutomationsForNotebook, Automation } from '@/mocks/automations';

export default function Studio() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { notebooks } = useNotebookStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const notebook = notebooks.find((n) => n.id === id) || 
                  // Use mock data if not found in store
                  require('@/mocks/notebooks').mockNotebooks.find((n: Notebook) => n.id === id);
  
  if (!notebook) {
    return (
      <EmptyState
        title="Notebook not found"
        description="The notebook you're looking for doesn't exist"
      />
    );
  }

  // Get automations for this notebook
  const automations = getAutomationsForNotebook(notebook);
  
  // Filter automations based on search and category
  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = searchQuery === '' || 
      automation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      automation.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      automation.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { id: 'summary', label: 'Summary' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'visualization', label: 'Visualization' },
    { id: 'organization', label: 'Organization' },
    { id: 'reminder', label: 'Reminder' }
  ];
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 8,
      paddingHorizontal: 12,
      margin: 16,
      marginBottom: 8,
    },
    searchInput: {
      flex: 1,
      height: 44,
      color: colors.text,
      marginLeft: 8,
      fontSize: 16,
    },
    categoriesContainer: {
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    categoriesScroll: {
      flexDirection: 'row',
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
      marginRight: 8,
      backgroundColor: colors.card,
    },
    categoryButtonSelected: {
      backgroundColor: colors.primary,
    },
    categoryText: {
      color: colors.text,
      fontSize: 14,
    },
    categoryTextSelected: {
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
      padding: 16,
      paddingTop: 0,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${colors.primary}20`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
      lineHeight: 20,
    },
    cardButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    cardButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginRight: 8,
    },
    bottomNav: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: colors.border,
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
          title: "Automate",
          headerRight: () => (
            <Pressable onPress={() => console.log("Create custom automation")}>
              <Wand2 size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search automations"
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <Pressable
            style={[styles.categoryButton, selectedCategory === null && styles.categoryButtonSelected]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[styles.categoryText, selectedCategory === null && styles.categoryTextSelected]}>
              All
            </Text>
          </Pressable>
          
          {categories.map(category => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonSelected
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextSelected
                ]}
              >
                {category.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>
          {searchQuery ? 'Search Results' : 'Suggested Automations'}
        </Text>
        
        {filteredAutomations.length > 0 ? (
          filteredAutomations.map((automation, index) => (
            <View key={automation.id || index} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  {automation.icon}
                </View>
                <Text style={styles.cardTitle}>{automation.title}</Text>
                <ChevronRight size={20} color={colors.textSecondary} />
              </View>
              <Text style={styles.cardDescription}>{automation.description}</Text>
              <Pressable 
                style={styles.cardButton} 
                onPress={() => console.log(`Run automation: ${automation.title}`)}
              >
                <Text style={styles.cardButtonText}>Run</Text>
                <Zap size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          ))
        ) : (
          <EmptyState
            title="No automations found"
            description={searchQuery 
              ? "Try a different search term or category" 
              : "Add more content to your notebook to get automation suggestions"}
            icon={<Wand2 size={64} color={colors.textSecondary} />}
          />
        )}
      </ScrollView>
      
      <View style={styles.bottomNav}>
        <Pressable 
          style={styles.navButton}
          onPress={() => router.push(`/notebook/${notebook.id}`)}
        >
          <FileText size={24} color={colors.textSecondary} />
          <Text style={styles.navButtonText}>Sources</Text>
        </Pressable>
        
        <Pressable 
          style={styles.navButton}
          onPress={() => router.push(`/chat/${notebook.id}`)}
        >
          <MessageSquare size={24} color={colors.textSecondary} />
          <Text style={styles.navButtonText}>Chat</Text>
        </Pressable>
        
        <Pressable style={[styles.navButton, styles.activeNavButton]}>
          <Wand2 size={24} color={colors.primary} />
          <Text style={[styles.navButtonText, styles.activeNavButtonText]}>Automate</Text>
        </Pressable>
      </View>
    </View>
  );
}