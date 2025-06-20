import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  FlatList, 
  ActivityIndicator, 
  Keyboard,
  Dimensions,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Send, Plus, ChevronDown, BookOpen, X, List } from 'lucide-react-native';
import { useNotebookStore } from '@/store/notebookStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import MessageBubble from '@/components/MessageBubble';
import { generateResponse } from '@/services/aiService';
import { useChatStore } from '@/store/chatStore';
import { Notebook } from '@/types/notebook';

const { height } = Dimensions.get('window');

export default function GlobalChat() {
  const router = useRouter();
  const colors = useThemeColors();
  const { notebooks } = useNotebookStore();
  const { messages, addMessage, clearMessages } = useChatStore();
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotebookSelector, setShowNotebookSelector] = useState(false);
  const [selectedNotebooks, setSelectedNotebooks] = useState<string[]>([]);
  
  const flatListRef = useRef<FlatList>(null);
  
  useEffect(() => {
    if (flatListRef.current && messages.length) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages.length]);
  
  // Generate a truly unique ID
  const generateUniqueId = (prefix: string) => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${Math.random().toString(36).substring(2, 9)}`;
  };
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = message.trim();
    setMessage('');
    
    // Add user message with a unique ID
    const userMessageId = generateUniqueId('user');
    
    addMessage({
      id: userMessageId,
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    });
    
    // Generate AI response
    setIsLoading(true);
    try {
      // Get all sources from selected notebooks, or all notebooks if none selected
      const relevantNotebooks = selectedNotebooks.length > 0 
        ? notebooks.filter(n => selectedNotebooks.includes(n.id))
        : notebooks;
      
      const allSources = relevantNotebooks.flatMap(notebook => notebook.sources);
      
      const { text, citations } = await generateResponse(userMessage, allSources);
      
      // Add AI response with a unique ID
      const assistantMessageId = generateUniqueId('assistant');
      
      addMessage({
        id: assistantMessageId,
        role: 'assistant',
        content: text,
        timestamp: new Date().toISOString(),
        citations,
      });
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message with a unique ID
      const errorMessageId = generateUniqueId('error');
      
      addMessage({
        id: errorMessageId,
        role: 'assistant',
        content: "I'm sorry, I couldn't generate a response. Please try again later.",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNotebookSelect = (notebookId: string) => {
    setSelectedNotebooks(prev => {
      if (prev.includes(notebookId)) {
        return prev.filter(id => id !== notebookId);
      } else {
        return [...prev, notebookId];
      }
    });
  };
  
  const handleClearChat = () => {
    clearMessages();
  };
  
  const handleNotebookClick = (notebookId: string) => {
    router.push(`/notebook/${notebookId}`);
  };
  
  const renderNotebookSelector = () => {
    return (
      <View style={styles.notebookSelectorContainer}>
        <View style={styles.notebookSelectorHeader}>
          <Text style={[styles.notebookSelectorTitle, { color: colors.text }]}>Select Notebooks</Text>
          <Pressable onPress={() => setShowNotebookSelector(false)}>
            <X size={24} color={colors.text} />
          </Pressable>
        </View>
        
        <FlatList
          data={notebooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable 
              style={[
                styles.notebookItem,
                selectedNotebooks.includes(item.id) && { backgroundColor: `${colors.primary}20` }
              ]}
              onPress={() => handleNotebookSelect(item.id)}
            >
              <View style={styles.notebookItemContent}>
                <Text style={styles.notebookEmoji}>{item.emoji}</Text>
                <Text style={[styles.notebookTitle, { color: colors.text }]}>{item.title}</Text>
              </View>
              <View style={[
                styles.checkbox,
                selectedNotebooks.includes(item.id) && { 
                  backgroundColor: colors.primary,
                  borderColor: colors.primary
                }
              ]}>
                {selectedNotebooks.includes(item.id) && (
                  <View style={styles.checkmark} />
                )}
              </View>
            </Pressable>
          )}
        />
        
        <View style={styles.notebookSelectorFooter}>
          <Pressable 
            style={[styles.applyButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowNotebookSelector(false)}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButton: {
      padding: 8,
      marginLeft: 8,
    },
    selectedNotebooks: {
      flexDirection: 'row',
      padding: 16,
      paddingTop: 8,
      paddingBottom: 8,
    },
    notebookChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginRight: 8,
    },
    notebookChipText: {
      color: colors.text,
      marginLeft: 4,
    },
    messagesList: {
      padding: 16,
      paddingBottom: 120,
    },
    welcomeContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    welcomeTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    welcomeDescription: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 22,
    },
    notebooksRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 24,
    },
    notebookButton: {
      alignItems: 'center',
      margin: 8,
      width: 80,
    },
    notebookIcon: {
      width: 60,
      height: 60,
      borderRadius: 12,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    notebookName: {
      fontSize: 12,
      color: colors.text,
      textAlign: 'center',
    },
    seeAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderRadius: 24,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginTop: 16,
    },
    seeAllButtonText: {
      color: colors.text,
      fontWeight: '500',
      marginLeft: 8,
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
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      padding: 16,
      paddingBottom: 24,
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
      marginBottom: 8,
    },
    notebookSelectorButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    notebookSelectorText: {
      color: colors.text,
      marginRight: 4,
    },
    notebookSelectorContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: height * 0.7,
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
    },
    notebookSelectorHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    notebookSelectorTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    notebookItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
    },
    notebookItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    notebookEmoji: {
      fontSize: 24,
      marginRight: 12,
    },
    notebookTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: colors.textSecondary,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkmark: {
      width: 10,
      height: 5,
      borderLeftWidth: 2,
      borderBottomWidth: 2,
      borderColor: '#FFFFFF',
      transform: [{ rotate: '-45deg' }],
      marginTop: -2,
    },
    notebookSelectorFooter: {
      marginTop: 16,
    },
    applyButton: {
      borderRadius: 24,
      padding: 12,
      alignItems: 'center',
    },
    applyButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NotebookLM</Text>
        <View style={styles.headerActions}>
          <Pressable 
            style={styles.headerButton}
            onPress={() => router.push('/home')}
          >
            <List size={24} color={colors.text} />
          </Pressable>
          <Pressable 
            style={styles.headerButton}
            onPress={handleClearChat}
          >
            <Text style={{ color: colors.textSecondary }}>Clear</Text>
          </Pressable>
        </View>
      </View>
      
      <View style={styles.selectedNotebooks}>
        <Pressable 
          style={styles.notebookSelectorButton}
          onPress={() => setShowNotebookSelector(true)}
        >
          <Text style={styles.notebookSelectorText}>
            {selectedNotebooks.length === 0 
              ? "All Notebooks" 
              : `${selectedNotebooks.length} Selected`}
          </Text>
          <ChevronDown size={16} color={colors.text} />
        </Pressable>
      </View>
      
      {messages.length === 0 ? (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>
            Chat with all your notebooks
          </Text>
          <Text style={styles.welcomeDescription}>
            Ask questions across all your notebooks or select specific ones to focus your search.
          </Text>
          
          <View style={styles.notebooksRow}>
            {notebooks.slice(0, 4).map((notebook) => (
              <Pressable 
                key={notebook.id}
                style={styles.notebookButton}
                onPress={() => handleNotebookClick(notebook.id)}
              >
                <View style={styles.notebookIcon}>
                  <Text style={{ fontSize: 24 }}>{notebook.emoji}</Text>
                </View>
                <Text style={styles.notebookName} numberOfLines={1}>
                  {notebook.title}
                </Text>
              </Pressable>
            ))}
            {notebooks.length > 0 && (
              <Pressable 
                key="new-notebook"
                style={styles.notebookButton}
                onPress={() => router.push('/home')}
              >
                <View style={styles.notebookIcon}>
                  <Plus size={24} color={colors.text} />
                </View>
                <Text style={styles.notebookName}>
                  New
                </Text>
              </Pressable>
            )}
          </View>
          
          <Pressable 
            style={styles.seeAllButton}
            onPress={() => router.push('/home')}
          >
            <List size={20} color={colors.text} />
            <Text style={styles.seeAllButtonText}>See All Notebooks</Text>
          </Pressable>
          
          <Text style={[styles.welcomeDescription, { marginTop: 24 }]}>
            Try asking:
          </Text>
          <Text style={[styles.welcomeDescription, { fontStyle: 'italic' }]}>
            "Summarize the key points from all my notebooks"
          </Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              onCitationPress={(sourceId) => {
                // Find which notebook contains this source
                for (const notebook of notebooks) {
                  const source = notebook.sources.find(s => s.id === sourceId);
                  if (source) {
                    router.push(`/sources/${notebook.id}?sourceId=${sourceId}`);
                    return;
                  }
                }
              }}
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
            placeholder="Ask anything about your notebooks..."
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
      
      {showNotebookSelector && renderNotebookSelector()}
    </View>
  );
}