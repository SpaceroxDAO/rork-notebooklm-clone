import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { FileText, MessageSquare, Wand2, ChevronRight, Zap, Clock, Repeat, BookOpen, PenTool, Sparkles } from 'lucide-react-native';
import { useNotebookStore } from '@/store/notebookStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import EmptyState from '@/components/EmptyState';
import { Notebook } from '@/types/notebook';

export default function Studio() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { notebooks } = useNotebookStore();
  
  const notebook = notebooks.find((n) => n.id === id);
  
  if (!notebook) {
    return (
      <EmptyState
        title="Notebook not found"
        description="The notebook you're looking for doesn't exist"
      />
    );
  }

  // Generate suggested automations based on notebook content
  const suggestedAutomations = generateSuggestedAutomations(notebook);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: 16,
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
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 16,
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
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Suggested Automations</Text>
        
        {suggestedAutomations.length > 0 ? (
          suggestedAutomations.map((automation, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  {automation.icon}
                </View>
                <Text style={styles.cardTitle}>{automation.title}</Text>
                <ChevronRight size={20} color={colors.textSecondary} />
              </View>
              <Text style={styles.cardDescription}>{automation.description}</Text>
              <Pressable style={styles.cardButton} onPress={() => console.log(`Run automation: ${automation.title}`)}>
                <Text style={styles.cardButtonText}>Run</Text>
                <Zap size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          ))
        ) : (
          <EmptyState
            title="No automations yet"
            description="Add more content to your notebook to get automation suggestions"
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

// Helper function to generate suggested automations based on notebook content
function generateSuggestedAutomations(notebook: Notebook) {
  const automations = [];
  
  // Check if notebook has sources
  if (notebook.sources.length > 0) {
    automations.push({
      title: "Generate Summary",
      description: "Create a concise summary of all your sources in this notebook.",
      icon: <BookOpen size={20} color="#4285F4" />,
    });
  }
  
  // Check if notebook has messages
  if (notebook.messages.length > 0) {
    automations.push({
      title: "Extract Key Insights",
      description: "Identify and extract the most important insights from your conversations.",
      icon: <Sparkles size={20} color="#34A853" />,
    });
  }
  
  // Add some generic automations
  automations.push({
    title: "Schedule Weekly Review",
    description: "Set up a weekly reminder to review and update this notebook.",
    icon: <Clock size={20} color="#FBBC05" />,
  });
  
  automations.push({
    title: "Create Study Guide",
    description: "Transform your notebook into a structured study guide with practice questions.",
    icon: <PenTool size={20} color="#EA4335" />,
  });
  
  automations.push({
    title: "Set Up Regular Updates",
    description: "Automatically check for updates to your sources and notify you of changes.",
    icon: <Repeat size={20} color="#4285F4" />,
  });
  
  return automations;
}