import React from "react";
import { Tabs } from "expo-router";
import { FileText, MessageSquare, Settings } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
        },
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Notebooks",
          tabBarIcon: ({ color }) => <FileText size={24} color={color} />,
          href: null, // Hide this tab
        }}
        redirect
      />
    </Tabs>
  );
}