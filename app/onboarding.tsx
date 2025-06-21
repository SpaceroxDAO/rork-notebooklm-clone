import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Wifi } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: "Add sources",
    subtitle: "from anywhere",
    description: "Look for NotebookLM in your share sheet to quickly add PDFs, websites, videos, & more",
  },
  {
    id: '2',
    title: "Instant insights",
    subtitle: "you can trust",
    description: "Get answers to your questions, with inline citations to your sources",
  },
  {
    id: '3',
    title: "Listen & learn",
    subtitle: "on the go",
    description: "Turn your sources into engaging audio discussions with one click",
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  
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
      router.replace('/chat');
    }
  };
  
  const goToHome = () => {
    router.replace('/chat');
  };

  const renderSlide = ({ item }: { item: typeof slides[0] }) => (
    <View style={styles.slide}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Wifi size={16} color="#FFFFFF" />
        <Text style={styles.headerTitle}>NotebookLM</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
        style={styles.slideContainer}
      />
      
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex ? styles.paginationDotActive : styles.paginationDotInactive,
              ]}
            />
          ))}
        </View>
        
        <Pressable onPress={goToNextSlide}>
          <Text style={styles.continueButton}>Continue</Text>
        </Pressable>
        
        <Text style={styles.googleText}>Google</Text>
        
        <Pressable style={styles.signInButton} onPress={goToHome}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </Pressable>
        
        <View style={styles.bottomLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  slideContainer: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#34D399',
    marginBottom: 8,
    lineHeight: 56,
  },
  subtitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 32,
    lineHeight: 56,
  },
  description: {
    fontSize: 18,
    color: '#9CA3AF',
    lineHeight: 26,
    maxWidth: '90%',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
  },
  paginationDotInactive: {
    backgroundColor: '#374151',
  },
  continueButton: {
    color: '#3B82F6',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 40,
  },
  googleText: {
    color: '#9CA3AF',
    fontSize: 16,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomLine: {
    width: 134,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2.5,
  },
});