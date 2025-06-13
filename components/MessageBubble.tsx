import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Message } from '@/types/notebook';

interface MessageBubbleProps {
  message: Message;
  onCitationPress?: (citationId: string) => void;
}

export default function MessageBubble({ message, onCitationPress }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const colors = useThemeColors();
  
  const styles = StyleSheet.create({
    container: {
      maxWidth: '85%',
      borderRadius: 16,
      padding: 12,
      marginBottom: 8,
    },
    userContainer: {
      alignSelf: 'flex-end',
      backgroundColor: '#E8F0FE',
    },
    assistantContainer: {
      alignSelf: 'flex-start',
      backgroundColor: colors.card,
    },
    messageText: {
      fontSize: 16,
      lineHeight: 22,
      color: isUser ? '#000000' : colors.text,
    },
    citationButton: {
      backgroundColor: '#D2E3FC',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    citation: {
      color: '#1A73E8',
      fontWeight: 'bold',
    },
  });
  
  // Replace citation markers with touchable elements
  const renderContent = () => {
    if (!message.citations || message.citations.length === 0) {
      return <Text style={styles.messageText}>
        {message.content}
      </Text>;
    }
    
    let lastIndex = 0;
    const parts: React.ReactNode[] = [];
    
    // Sort citations by their position in the text
    const sortedCitations = [...message.citations].sort((a, b) => {
      const indexA = message.content.indexOf(a.text);
      const indexB = message.content.indexOf(b.text);
      return indexA - indexB;
    });
    
    sortedCitations.forEach((citation, index) => {
      const citationIndex = message.content.indexOf(citation.text, lastIndex);
      
      if (citationIndex > lastIndex) {
        // Add text before citation
        parts.push(
          <Text key={`text-${index}`} style={styles.messageText}>
            {message.content.substring(lastIndex, citationIndex)}
          </Text>
        );
      }
      
      // Add citation
      parts.push(
        <Pressable
          key={`citation-${citation.id}`}
          onPress={() => onCitationPress && onCitationPress(citation.sourceId)}
          style={styles.citationButton}
        >
          <Text style={styles.citation}>{citation.text}</Text>
        </Pressable>
      );
      
      lastIndex = citationIndex + citation.text.length;
    });
    
    // Add remaining text
    if (lastIndex < message.content.length) {
      parts.push(
        <Text key="text-end" style={styles.messageText}>
          {message.content.substring(lastIndex)}
        </Text>
      );
    }
    
    return <Text>{parts}</Text>;
  };

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.assistantContainer]}>
      {renderContent()}
    </View>
  );
}