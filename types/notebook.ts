export interface Source {
  id: string;
  type: 'pdf' | 'website' | 'youtube' | 'text';
  title: string;
  content?: string;
  url?: string;
  dateAdded: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: {
    id: string;
    sourceId: string;
    text: string;
  }[];
}

export interface Notebook {
  id: string;
  title: string;
  emoji?: string;
  sources: Source[];
  messages: Message[];
  lastUpdated: string;
  createdAt: string;
}