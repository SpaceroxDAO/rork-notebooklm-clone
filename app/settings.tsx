import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ChevronRight, LogOut, Moon, Sun, User, CreditCard, BrainCircuit, Mail, Calendar, Lock, Bell, HelpCircle, Info, MessageSquare } from 'lucide-react-native';
import { useThemeStore } from '@/store/themeStore';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function Settings() {
  const router = useRouter();
  const { theme, toggleTheme } = useThemeStore();
  const colors = useThemeColors();
  
  const handleLogout = () => {
    router.replace('/login');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItemIcon: {
      marginRight: 12,
    },
    menuItemText: {
      fontSize: 16,
      color: colors.text,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      marginTop: 24,
      marginBottom: 40,
    },
    logoutText: {
      fontSize: 16,
      color: colors.error,
      marginLeft: 8,
    },
    themeRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    themeIcon: {
      marginRight: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Settings",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              {theme === 'dark' ? (
                <Moon size={20} color={colors.text} style={styles.menuItemIcon} />
              ) : (
                <Sun size={20} color={colors.text} style={styles.menuItemIcon} />
              )}
              <Text style={styles.menuItemText}>Dark Mode</Text>
            </View>
            <Switch 
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <User size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Profile</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <CreditCard size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Subscription</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NotebookLM Intelligence</Text>
          <Pressable 
            style={styles.menuItem}
            onPress={() => router.push('/chat')}
          >
            <View style={styles.menuItemLeft}>
              <MessageSquare size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Global Chat</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <BrainCircuit size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Memory Graph</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <BrainCircuit size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Proactive Insights</Text>
            </View>
            <Switch 
              value={true}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <BrainCircuit size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Goal Tracking</Text>
            </View>
            <Switch 
              value={true}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <BrainCircuit size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Pattern Discovery</Text>
            </View>
            <Switch 
              value={true}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Integrations</Text>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Mail size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Gmail</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Calendar size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Calendar</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuItemText}>More coming soon...</Text>
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Lock size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Privacy & Data</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Bell size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <HelpCircle size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Help & Feedback</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Info size={20} color={colors.text} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>About</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
        </View>
        
        <Pressable 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}