import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notebook, Source, Message } from '@/types/notebook';

interface NotebookState {
  notebooks: Notebook[];
  currentNotebookId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createNotebook: (title: string, emoji?: string) => Notebook;
  deleteNotebook: (id: string) => void;
  updateNotebook: (id: string, data: Partial<Notebook>) => void;
  setCurrentNotebook: (id: string | null) => void;
  
  // Source actions
  addSource: (notebookId: string, source: Omit<Source, 'id' | 'dateAdded'>) => void;
  removeSource: (notebookId: string, sourceId: string) => void;
  
  // Message actions
  addMessage: (notebookId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: (notebookId: string) => void;
}

export const useNotebookStore = create<NotebookState>()(
  persist(
    (set, get) => ({
      notebooks: [],
      currentNotebookId: null,
      isLoading: false,
      error: null,
      
      createNotebook: (title, emoji) => {
        const newNotebook: Notebook = {
          id: Date.now().toString(),
          title,
          emoji: emoji || '📓',
          sources: [],
          messages: [],
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          notebooks: [...state.notebooks, newNotebook],
          currentNotebookId: newNotebook.id,
        }));
        
        return newNotebook;
      },
      
      deleteNotebook: (id) => {
        set((state) => ({
          notebooks: state.notebooks.filter((notebook) => notebook.id !== id),
          currentNotebookId: state.currentNotebookId === id ? null : state.currentNotebookId,
        }));
      },
      
      updateNotebook: (id, data) => {
        set((state) => ({
          notebooks: state.notebooks.map((notebook) => 
            notebook.id === id 
              ? { 
                  ...notebook, 
                  ...data, 
                  lastUpdated: new Date().toISOString() 
                } 
              : notebook
          ),
        }));
      },
      
      setCurrentNotebook: (id) => {
        set({ currentNotebookId: id });
      },
      
      addSource: (notebookId, source) => {
        const newSource: Source = {
          id: Date.now().toString(),
          dateAdded: new Date().toISOString(),
          ...source,
        };
        
        set((state) => ({
          notebooks: state.notebooks.map((notebook) => 
            notebook.id === notebookId 
              ? { 
                  ...notebook, 
                  sources: [...notebook.sources, newSource],
                  lastUpdated: new Date().toISOString() 
                } 
              : notebook
          ),
        }));
      },
      
      removeSource: (notebookId, sourceId) => {
        set((state) => ({
          notebooks: state.notebooks.map((notebook) => 
            notebook.id === notebookId 
              ? { 
                  ...notebook, 
                  sources: notebook.sources.filter((source) => source.id !== sourceId),
                  lastUpdated: new Date().toISOString() 
                } 
              : notebook
          ),
        }));
      },
      
      addMessage: (notebookId, message) => {
        const newMessage: Message = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          ...message,
        };
        
        set((state) => ({
          notebooks: state.notebooks.map((notebook) => 
            notebook.id === notebookId 
              ? { 
                  ...notebook, 
                  messages: [...notebook.messages, newMessage],
                  lastUpdated: new Date().toISOString() 
                } 
              : notebook
          ),
        }));
      },
      
      clearMessages: (notebookId) => {
        set((state) => ({
          notebooks: state.notebooks.map((notebook) => 
            notebook.id === notebookId 
              ? { 
                  ...notebook, 
                  messages: [],
                  lastUpdated: new Date().toISOString() 
                } 
              : notebook
          ),
        }));
      },
    }),
    {
      name: 'notebook-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);