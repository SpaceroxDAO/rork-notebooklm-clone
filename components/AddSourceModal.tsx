import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Modal, ScrollView } from 'react-native';
import { X, FileText, Globe, Youtube, ClipboardCopy } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

interface AddSourceModalProps {
  visible: boolean;
  onClose: () => void;
  onAddSource: (source: { type: 'pdf' | 'website' | 'youtube' | 'text'; title: string; content?: string; url?: string }) => void;
}

export default function AddSourceModal({ visible, onClose, onAddSource }: AddSourceModalProps) {
  const colors = useThemeColors();
  const [sourceType, setSourceType] = useState<'pdf' | 'website' | 'youtube' | 'text'>('website');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!title) return;
    
    const source = {
      type: sourceType,
      title,
      ...(sourceType === 'text' ? { content } : { url }),
    };
    
    onAddSource(source);
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setSourceType('website');
    setTitle('');
    setUrl('');
    setContent('');
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
    },
    modalContainer: {
      backgroundColor: colors.background,
      borderRadius: 20,
      height: '80%',
      marginHorizontal: 20,
      overflow: 'hidden',
    },
    header: {
      padding: 16,
      alignItems: 'flex-end',
    },
    closeButton: {
      padding: 4,
    },
    content: {
      padding: 16,
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    iconCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#E8EAED',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 24,
    },
    sourceTypes: {
      gap: 12,
    },
    sourceTypeButton: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 16,
      alignItems: 'center',
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selectedType: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    sourceTypeText: {
      color: colors.text,
      fontWeight: '500',
      fontSize: 16,
      marginLeft: 8,
    },
    urlInputContainer: {
      marginTop: 16,
      marginBottom: 24,
    },
    urlInput: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      color: colors.text,
      fontSize: 16,
      marginBottom: 16,
    },
    addButton: {
      backgroundColor: colors.primary,
      borderRadius: 24,
      padding: 12,
      alignItems: 'center',
    },
    addButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    sourceLimit: {
      marginTop: 16,
    },
    sourceProgressBar: {
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      marginBottom: 8,
    },
    sourceProgress: {
      width: '0%',
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
    sourceLimitText: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: 'right',
    },
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </Pressable>
          </View>
          
          <ScrollView style={styles.content}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <FileText size={32} color="#4285F4" />
              </View>
            </View>
            
            <Text style={styles.title}>Add a Source</Text>
            <Text style={styles.subtitle}>
              Sources let NotebookLM base its responses on the information that matters most to you.
            </Text>
            
            <View style={styles.sourceTypes}>
              <Pressable
                style={[styles.sourceTypeButton, sourceType === 'pdf' && styles.selectedType]}
                onPress={() => setSourceType('pdf')}
              >
                <FileText size={20} color="#EA4335" />
                <Text style={styles.sourceTypeText}>PDF</Text>
              </Pressable>
              
              <Pressable
                style={[styles.sourceTypeButton, sourceType === 'website' && styles.selectedType]}
                onPress={() => setSourceType('website')}
              >
                <Globe size={20} color="#4285F4" />
                <Text style={styles.sourceTypeText}>Website</Text>
              </Pressable>
              
              <Pressable
                style={[styles.sourceTypeButton, sourceType === 'youtube' && styles.selectedType]}
                onPress={() => setSourceType('youtube')}
              >
                <Youtube size={20} color="#FF0000" />
                <Text style={styles.sourceTypeText}>YouTube</Text>
              </Pressable>
              
              <Pressable
                style={[styles.sourceTypeButton, sourceType === 'text' && styles.selectedType]}
                onPress={() => setSourceType('text')}
              >
                <ClipboardCopy size={20} color="#34A853" />
                <Text style={styles.sourceTypeText}>Copied text</Text>
              </Pressable>
            </View>
            
            {sourceType === 'website' && (
              <View style={styles.urlInputContainer}>
                <TextInput
                  style={styles.urlInput}
                  value={url}
                  onChangeText={setUrl}
                  placeholder="https://www.example.com"
                  placeholderTextColor={colors.textSecondary}
                  autoCapitalize="none"
                  keyboardType="url"
                />
                <TextInput
                  style={styles.urlInput}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Title (required)"
                  placeholderTextColor={colors.textSecondary}
                />
                <Pressable style={styles.addButton} onPress={handleSubmit}>
                  <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
              </View>
            )}
            
            <View style={styles.sourceLimit}>
              <View style={styles.sourceProgressBar}>
                <View style={styles.sourceProgress} />
              </View>
              <Text style={styles.sourceLimitText}>Source limit 0/50</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}