import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Globe, Youtube, FileText } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Source } from '@/types/notebook';

interface SourceItemProps {
  source: Source;
  onPress?: () => void;
  selected?: boolean;
}

export default function SourceItem({ source, onPress, selected = false }: SourceItemProps) {
  const colors = useThemeColors();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
      backgroundColor: colors.card,
      marginBottom: 8,
    },
    selected: {
      backgroundColor: `${colors.primary}20`,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    pressed: {
      opacity: 0.8,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: colors.text,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkmark: {
      width: 12,
      height: 6,
      borderLeftWidth: 2,
      borderBottomWidth: 2,
      borderColor: colors.text,
      transform: [{ rotate: '-45deg' }],
      marginTop: -2,
    },
  });

  const getIcon = () => {
    switch (source.type) {
      case 'pdf':
        return <FileText size={20} color="#EA4335" />;
      case 'website':
        return <Globe size={20} color="#4285F4" />;
      case 'youtube':
        return <Youtube size={20} color="#FF0000" />;
      case 'text':
        return <FileText size={20} color="#34A853" />;
      default:
        return <FileText size={20} color="#4285F4" />;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {source.title}
        </Text>
      </View>
      <View style={styles.checkbox}>
        {selected && (
          <View style={styles.checkmark} />
        )}
      </View>
    </Pressable>
  );
}