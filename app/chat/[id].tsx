import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, ActivityIndicator, Keyboard, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Send, FileText, MessageSquare, Wand2, MoreVertical, Copy, ThumbsUp, ThumbsDown, Volume2 } from 'lucide-react-native';
import { useNotebookStore } from '@/store/notebookStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import MessageBubble from '@/components/MessageBubble';
import EmptyState from '@/components/EmptyState';
import { generateResponse } from '@/services/aiService';

export default function Chat() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { notebooks, addMessage } = useNotebookStore();
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const flatListRef = useRef<FlatList>(null);
  
  const notebook = notebooks.find((n) => n.id === id);
  
  useEffect(() => {
    if (flatListRef.current && notebook?.messages.length) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [notebook?.messages.length]);
  
  if (!notebook) {
    return (
      <EmptyState
        title="Notebook not found"
        description="The notebook you're looking for doesn't exist"
      />
    );
  }
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = message.trim();
    setMessage('');
    
    // Add user message
    addMessage(notebook.id, {
      role: 'user',
      content: userMessage,
    });
    
    // Generate AI response
    setIsLoading(true);
    try {
      const { text, citations } = await generateResponse(userMessage, notebook.sources);
      
      // Add AI response
      addMessage(notebook.id, {
        role: 'assistant',
        content: text,
        citations,
      });
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      addMessage(notebook.id, {
        role: 'assistant',
        content: "I'm sorry, I couldn't generate a response. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCitationPress = (sourceId: string) => {
    // Navigate to source detail or highlight source
    router.push(`/sources/${notebook.id}?sourceId=${sourceId}`);
  };

  const generateSummary = () => {
    if (notebook.sources.length === 0) {
      return "No sources have been added to this notebook yet. Add sources to get started with AI-powered insights.";
    }

    // Generate a summary based on the sources
    const sourceTypes = notebook.sources.map(s => s.type);
    const hasMultipleTypes = new Set(sourceTypes).size > 1;
    
    let summary = `The provided sources outline comprehensive information for ${notebook.title}`;
    
    if (hasMultipleTypes) {
      summary += `, including content from ${sourceTypes.includes('pdf') ? 'PDFs' : ''}${sourceTypes.includes('website') ? ', websites' : ''}${sourceTypes.includes('youtube') ? ', videos' : ''}${sourceTypes.includes('text') ? ', and text documents' : ''}`;
    }
    
    summary += `. They detail key concepts, methodologies, and insights relevant to the topic. The sources provide a foundation for understanding the subject matter and can be used to generate detailed responses to your questions.`;
    
    return summary;
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
    summaryContainer: {
      padding: 16,
      paddingBottom: 120,
    },
    notebookHeader: {
      alignItems: 'center',
      marginBottom: 24,
    },
    emoji: {
      fontSize: 48,
      marginBottom: 12,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    sourceCount: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    summaryText: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      marginBottom: 24,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 24,
      paddingHorizontal: 40,
    },
    actionButton: {
      padding: 12,
      borderRadius: 8,
    },
    audioOverviewButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderRadius: 24,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    audioOverviewText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 8,
    },
    messagesList: {
      padding: 16,
      paddingBottom: 120,
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: colors.card,
      borderRadius: 16,
      margin: 16,
      marginTop: 0,
    },
    loadingText: {
      color: colors.text,
      marginLeft: 8,
    },
    inputContainer: {
      position: 'absolute',
      bottom: 60,
      left: 0,
      right: 0,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      padding: 16,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 12,
      color: colors.text,
      fontSize: 16,
      maxHeight: 100,
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
    },
    sendButtonDisabled: {
      opacity: 0.5,
    },
    disclaimer: {
      textAlign: 'center',
      color: colors.textSecondary,
      fontSize: 12,
      marginTop: 8,
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

  const renderSummaryView = () => (
    <ScrollView style={styles.summaryContainer}>
      <View style={styles.notebookHeader}>
        <Text style={styles.emoji}>{notebook.emoji}</Text>
        <Text style={styles.title}>{notebook.title}</Text>
        <Text style={styles.sourceCount}>
          {notebook.sources.length} {notebook.sources.length === 1 ? 'source' : 'sources'}
        </Text>
      </View>
      
      <Text style={styles.summaryText}>
        {generateSummary()}
      </Text>
      
      <View style={styles.actionButtons}>
        <Pressable style={styles.actionButton}>
          <Copy size={24} color={colors.textSecondary} />
        </Pressable>
        <Pressable style={styles.actionButton}>
          <ThumbsUp size={24} color={colors.textSecondary} />
        </Pressable>
        <Pressable style={styles.actionButton}>
          <ThumbsDown size={24} color={colors.textSecondary} />
        </Pressable>
      </View>
      
      <Pressable style={styles.audioOverviewButton}>
        <Volume2 size={20} color={colors.text} />
        <Text style={styles.audioOverviewText}>Audio Overview</Text>
      </Pressable>
    </ScrollView>
  );

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
      
      {notebook.messages.length === 0 ? (
        renderSummaryView()
      ) : (
        <FlatList
          ref={flatListRef}
          data={notebook.messages}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              onCitationPress={handleCitationPress}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />
      )}
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size="small" />
          <Text style={styles.loadingText}>Generating response...</Text>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={`Ask ${notebook.sources.length} ${notebook.sources.length === 1 ? 'source' : 'sources'}...`}
            placeholderTextColor={colors.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <Pressable 
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!message.trim() || isLoading}
          >
            <Send size={20} color={message.trim() ? colors.primary : colors.textSecondary} />
          </Pressable>
        </View>
        
        <Text style={styles.disclaimer}>
          NotebookLM can be inaccurate, so double-check.
        </Text>
      </View>
      
      <View style={styles.bottomNav}>
        <Pressable 
          style={styles.navButton}
          onPress={() => router.push(`/notebook/${notebook.id}`)}
        >
          <FileText size={24} color={colors.textSecondary} />
          <Text style={styles.navButtonText}>Sources</Text>
        </Pressable>
        
        <Pressable style={[styles.navButton, styles.activeNavButton]}>
          <MessageSquare size={24} color={colors.primary} />
          <Text style={[styles.navButtonText, styles.activeNavButtonText]}>Chat</Text>
        </Pressable>
        
        <Pressable 
          style={styles.navButton}
          onPress={() => router.push(`/studio/${notebook.id}`)}
        >
          <Wand2 size={24} color={colors.textSecondary} />
          <Text style={styles.navButtonText}>Studio</Text>
        </Pressable>
      </View>
    </View>
  );
}