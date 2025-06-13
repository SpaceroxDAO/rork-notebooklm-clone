import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '@/store/themeStore';
import { useThemeColors } from '@/hooks/useThemeColors';

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { theme } = useThemeStore();
  const colors = useThemeColors();

  return (
    <>
      <StatusBar style={theme === 'dark' ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen 
          name="home" 
          options={{ 
            title: "NotebookLM",
            headerLargeTitle: true,
          }} 
        />
        <Stack.Screen 
          name="notebook/[id]" 
          options={{ 
            title: "",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="chat/[id]" 
          options={{ 
            title: "",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="sources/[id]" 
          options={{ 
            title: "Sources",
            presentation: "modal",
          }} 
        />
        <Stack.Screen 
          name="studio/[id]" 
          options={{ 
            title: "",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: "Settings",
          }} 
        />
      </Stack>
    </>
  );
}