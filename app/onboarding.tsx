import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors } from '@/hooks/useThemeColors';
import { BookOpen, FileText, MessageSquare, Headphones } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: '100%',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 16,
  },
  button: {
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipButton: {
    alignItems: 'center',
    padding: 16,
  },
  skipButtonText: {
    fontSize: 16,
  },
});

const slides = [
  {
    id: '1',
    title: "Let's get started",
    subtitle: "Create your first notebook below.",
    icon: <BookOpen size={64} color="#4285F4" />,
  },
  {
    id: '2',
    title: "Add sources from anywhere",
    subtitle: "Look for NotebookLM in your share sheet to quickly add PDFs, websites, videos, & more",
    icon: <FileText size={64} color="#34A853" />,
    titleColor: '#34A853',
  },
  {
    id: '3',
    title: "Instant insights you can trust",
    subtitle: "Get answers to your questions, with inline citations to your sources",
    icon: <MessageSquare size={64} color="#4285F4" />,
    titleColor: '#4285F4',
  },
  {
    id: '4',
    title: "Listen & learn on the go",
    subtitle: "Turn your sources into engaging audio discussions with one click",
    icon: <Headphones size={64} color="#34A853" />,
    titleColor: '#34A853',
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const colors = useThemeColors();
  
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };
  
  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace('/home');
    }
  };
  
  const goToHome = () => {
    router.replace('/home');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.iconContainer}>
              {item.icon}
            </View>
            <LinearGradient
              colors={['transparent', colors.background]}
              style={styles.gradient}
            >
              <Text style={[styles.title, { color: item.titleColor || colors.text }]}>{item.title}</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
            </LinearGradient>
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
      />
      
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: index === currentIndex ? colors.primary : colors.border },
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
        
        <Pressable 
          style={[styles.button, { backgroundColor: colors.primary }]} 
          onPress={goToNextSlide}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get started' : 'Get started'}
          </Text>
        </Pressable>
        
        {currentIndex < slides.length - 1 && (
          <Pressable style={styles.skipButton} onPress={goToHome}>
            <Text style={[styles.skipButtonText, { color: colors.textSecondary }]}>Skip</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}