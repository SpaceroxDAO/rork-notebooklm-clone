import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useNotebookStore } from '@/store/notebookStore';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function Index() {
  const router = useRouter();
  const colors = useThemeColors();
  const { notebooks } = useNotebookStore();
  
  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = false; // In a real app, check AsyncStorage
    const isLoggedIn = false; // In a real app, check authentication state
    
    // Navigate based on user state
    setTimeout(() => {
      if (!isLoggedIn) {
        router.replace('/login');
      } else if (!hasSeenOnboarding) {
        router.replace('/onboarding');
      } else if (notebooks.length > 0) {
        router.replace('/chat'); // Changed from /home to /chat
      } else {
        router.replace('/onboarding');
      }
    }, 2000);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
    },
    logo: {
      fontSize: 64,
      marginBottom: 16,
    },
    appName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>📓</Text>
        <Text style={styles.appName}>NotebookLM</Text>
      </View>
    </View>
  );
}