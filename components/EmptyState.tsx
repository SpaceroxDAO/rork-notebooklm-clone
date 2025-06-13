import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { File } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageUrl?: string;
}

export default function EmptyState({ title, description, icon, imageUrl }: EmptyStateProps) {
  const colors = useThemeColors();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    image: {
      width: 120,
      height: 120,
      marginBottom: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      maxWidth: '80%',
    },
  });

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : icon ? (
        icon
      ) : (
        <File size={64} color={colors.textSecondary} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}