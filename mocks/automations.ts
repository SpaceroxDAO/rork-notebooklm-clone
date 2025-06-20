import { Notebook } from '@/types/notebook';
import { BookOpen, FileText, MessageSquare, Headphones, Zap, Clock, Repeat, PenTool, Sparkles, BarChart, Map, Code, Database, LineChart, Layers, GitBranch, Cpu, Briefcase, DollarSign, PieChart, TrendingUp, Landmark, Scroll, Sword, Shield, Users } from 'lucide-react-native';

export interface Automation {
  id: string;
  notebookId: string;
  title: string;
  description: string;
  icon: JSX.Element;
  category: 'summary' | 'analysis' | 'visualization' | 'organization' | 'reminder';
}

export const getAutomationsForNotebook = (notebook: Notebook): Automation[] => {
  // Find pre-defined automations for this notebook
  const notebookAutomations = mockAutomations.filter(
    automation => automation.notebookId === notebook.id
  );
  
  // If none found, generate generic ones based on notebook content
  if (notebookAutomations.length === 0) {
    return generateGenericAutomations(notebook);
  }
  
  return notebookAutomations;
};

const generateGenericAutomations = (notebook: Notebook): Automation[] => {
  const automations: Automation[] = [];
  
  // Basic automations that work for any notebook
  automations.push({
    id: `gen-${notebook.id}-1`,
    notebookId: notebook.id,
    title: "Generate Summary",
    description: `Create a concise summary of all your sources in "${notebook.title}".`,
    icon: <BookOpen size={20} color="#4285F4" />,
    category: 'summary'
  });
  
  if (notebook.messages.length > 0) {
    automations.push({
      id: `gen-${notebook.id}-2`,
      notebookId: notebook.id,
      title: "Extract Key Insights",
      description: "Identify and extract the most important insights from your conversations.",
      icon: <Sparkles size={20} color="#34A853" />,
      category: 'analysis'
    });
  }
  
  automations.push({
    id: `gen-${notebook.id}-3`,
    notebookId: notebook.id,
    title: "Schedule Weekly Review",
    description: `Set up a weekly reminder to review and update "${notebook.title}".`,
    icon: <Clock size={20} color="#FBBC05" />,
    category: 'reminder'
  });
  
  return automations;
};

export const mockAutomations: Automation[] = [
  // Machine Learning Research automations
  {
    id: 'a1',
    notebookId: '1',
    title: "Compare ML Models",
    description: "Generate a comparison table of different machine learning models discussed in your sources.",
    icon: <BarChart size={20} color="#4285F4" />,
    category: 'analysis'
  },
  {
    id: 'a2',
    notebookId: '1',
    title: "Create ML Glossary",
    description: "Extract and define key machine learning terms from your sources.",
    icon: <BookOpen size={20} color="#34A853" />,
    category: 'organization'
  },
  {
    id: 'a3',
    notebookId: '1',
    title: "Generate Code Snippets",
    description: "Create TensorFlow/PyTorch code examples based on the neural network concepts in your sources.",
    icon: <Code size={20} color="#FBBC05" />,
    category: 'analysis'
  },
  {
    id: 'a4',
    notebookId: '1',
    title: "Track Research Progress",
    description: "Create a timeline of your machine learning research and identify knowledge gaps.",
    icon: <LineChart size={20} color="#EA4335" />,
    category: 'organization'
  },
  {
    id: 'a5',
    notebookId: '1',
    title: "ML Paper Summarizer",
    description: "Automatically generate summaries of new machine learning papers you add.",
    icon: <FileText size={20} color="#4285F4" />,
    category: 'summary'
  }
];