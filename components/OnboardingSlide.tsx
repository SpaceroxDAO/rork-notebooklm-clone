import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

interface OnboardingSlideProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  titleColor?: string;
}

const { width } = Dimensions.get('window');

export default function OnboardingSlide({ title, subtitle, icon, titleColor }: OnboardingSlideProps) {
  return (
    <View style={styles.slide}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <LinearGradient
        colors={['transparent', Colors.background]}
        style={styles.gradient}
      >
        <Text style={[styles.title, titleColor ? { color: titleColor } : null]}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});