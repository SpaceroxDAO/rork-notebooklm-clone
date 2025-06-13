import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import { LogIn } from 'lucide-react-native';

export default function Login() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const colors = useThemeColors();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGoogleLogin = () => {
    // Simulate loading
    setIsLoading(true);
    
    // In a real app, this would authenticate with Google
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/onboarding');
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    logo: {
      fontSize: 64,
      marginBottom: 16,
    },
    appName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 40,
      lineHeight: 24,
    },
    loginOptions: {
      width: '100%',
      marginBottom: 40,
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme === 'light' ? '#FFFFFF' : '#FFFFFF',
      borderRadius: 24,
      padding: 16,
      marginBottom: 16,
      borderWidth: theme === 'light' ? 0 : 1,
      borderColor: theme === 'light' ? 'transparent' : colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    googleIcon: {
      width: 24,
      height: 24,
      marginRight: 12,
      color: '#4285F4',
    },
    googleButtonText: {
      color: '#000000',
      fontSize: 16,
      fontWeight: '500',
    },
    termsText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      maxWidth: '80%',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>📓</Text>
        <Text style={styles.appName}>NotebookLM</Text>
      </View>
      
      <Text style={styles.welcomeText}>
        Welcome to NotebookLM
      </Text>
      
      <Text style={styles.description}>
        We're excited to help you learn through AI-powered personal data
      </Text>
      
      <View style={styles.loginOptions}>
        <Pressable 
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#4285F4" size="small" />
          ) : (
            <>
              <LogIn style={styles.googleIcon} size={20} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </Pressable>
      </View>
      
      <Text style={styles.termsText}>
        By continuing, you confirm you are 18+ & agree to NotebookLM's Terms & Privacy
      </Text>
    </View>
  );
}