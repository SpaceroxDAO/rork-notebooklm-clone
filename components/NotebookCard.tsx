import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Play } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Notebook } from '@/types/notebook';

interface NotebookCardProps {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  const router = useRouter();
  const colors = useThemeColors();
  
  const handlePress = () => {
    router.push(`/chat/${notebook.id}`);
  };
  
  // Format date to relative time (e.g., "2 hours ago")
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  };

  // Get background color based on notebook id
  const getBackgroundColor = () => {
    const colors = ['#F2F7F2', '#F7F2F2', '#F2F2F7', '#F7F7F2', '#F2F7F7'];
    const index = parseInt(notebook.id, 10) % colors.length;
    return colors[index];
  };

  const styles = StyleSheet.create({
    container: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: getBackgroundColor(),
    },
    pressed: {
      opacity: 0.8,
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    emoji: {
      fontSize: 18,
      marginRight: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
    },
    meta: {
      fontSize: 14,
      color: '#666666',
    },
    playButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
  });

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={handlePress}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{notebook.emoji}</Text>
          <Text style={styles.title} numberOfLines={1}>{notebook.title}</Text>
        </View>
        <Text style={styles.meta}>
          {notebook.sources.length} {notebook.sources.length === 1 ? 'source' : 'sources'} • {getRelativeTime(notebook.lastUpdated)}
        </Text>
      </View>
      <View style={styles.playButton}>
        <Play size={16} color="#000000" />
      </View>
    </Pressable>
  );
}