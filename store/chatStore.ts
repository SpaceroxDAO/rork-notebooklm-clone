import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '@/types/notebook';

interface ChatState {
  messages: Message[];
  
  // Actions
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      
      addMessage: (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      },
      
      clearMessages: () => {
        set({ messages: [] });
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);