import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { FileText, Play, Pause, SkipBack, SkipForward, Share2, Download, MessageSquare, Wand2 } from 'lucide-react-native';
import { useNotebookStore } from '@/store/notebookStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import EmptyState from '@/components/EmptyState';

export default function Studio() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { notebooks } = useNotebookStore();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const notebook = notebooks.find((n) => n.id === id);
  
  if (!notebook) {
    return (
      <EmptyState
        title="Notebook not found"
        description="The notebook you're looking for doesn't exist"
      />
    );
  }
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    // Simulate progress
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    }
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerButtons: {
      flexDirection: 'row',
    },
    headerButton: {
      padding: 8,
      marginLeft: 8,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    waveformContainer: {
      height: 200,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 24,
      position: 'relative',
    },
    waveform: {
      width: '100%',
      height: '100%',
    },
    waveformOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    waveformProgress: {
      height: '100%',
      backgroundColor: 'rgba(66, 133, 244, 0.3)',
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    timeText: {
      color: colors.text,
      fontSize: 14,
      width: 40,
    },
    progressBar: {
      flex: 1,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      marginHorizontal: 8,
    },
    progress: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    controlButton: {
      padding: 16,
    },
    playPauseButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 24,
    },
    joinContainer: {
      alignItems: 'center',
    },
    joinButton: {
      backgroundColor: colors.primary,
      borderRadius: 24,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    joinButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
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
          title: notebook.title,
          headerRight: () => (
            <View style={styles.headerButtons}>
              <Pressable style={styles.headerButton}>
                <Share2 size={20} color={colors.text} />
              </Pressable>
              <Pressable style={styles.headerButton}>
                <Download size={20} color={colors.text} />
              </Pressable>
            </View>
          ),
        }}
      />
      
      <View style={styles.content}>
        <View style={styles.waveformContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }}
            style={styles.waveform}
            resizeMode="cover"
          />
          <View style={styles.waveformOverlay}>
            <View style={[styles.waveformProgress, { width: `${progress}%` }]} />
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>0:00</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.timeText}>27:15</Text>
        </View>
        
        <View style={styles.controls}>
          <Pressable style={styles.controlButton}>
            <SkipBack size={24} color={colors.text} />
          </Pressable>
          
          <Pressable style={styles.playPauseButton} onPress={togglePlayPause}>
            {isPlaying ? (
              <Pause size={32} color="#FFFFFF" />
            ) : (
              <Play size={32} color="#FFFFFF" />
            )}
          </Pressable>
          
          <Pressable style={styles.controlButton}>
            <SkipForward size={24} color={colors.text} />
          </Pressable>
        </View>
        
        <View style={styles.joinContainer}>
          <Pressable style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join</Text>
          </Pressable>
        </View>
      </View>
      
      <View style={styles.bottomNav}>
        <Pressable 
          style={styles.navButton}
          onPress={() => router.push(`/sources/${notebook.id}`)}
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