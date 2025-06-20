import { Notebook } from '@/types/notebook';
import { BookOpen, FileText, MessageSquare, Headphones, Zap, Clock, Repeat, PenTool, Sparkles, BarChart, Map, Code, Database, LineChart, Layers, GitBranch, Cpu, Briefcase, DollarSign, PieChart, TrendingUp, Landmark, Scroll, Sword, Shield, Users } from 'lucide-react-native';
import React from 'react';

export interface Automation {
  id: string;
  notebookId: string;
  title: string;
  description: string;
  icon: React.ReactNode;
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
    icon: React.createElement(BookOpen, { size: 20, color: "#4285F4" }),
    category: 'summary'
  });
  
  if (notebook.messages.length > 0) {
    automations.push({
      id: `gen-${notebook.id}-2`,
      notebookId: notebook.id,
      title: "Extract Key Insights",
      description: "Identify and extract the most important insights from your conversations.",
      icon: React.createElement(Sparkles, { size: 20, color: "#34A853" }),
      category: 'analysis'
    });
  }
  
  automations.push({
    id: `gen-${notebook.id}-3`,
    notebookId: notebook.id,
    title: "Schedule Weekly Review",
    description: `Set up a weekly reminder to review and update "${notebook.title}".`,
    icon: React.createElement(Clock, { size: 20, color: "#FBBC05" }),
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
    icon: React.createElement(BarChart, { size: 20, color: "#4285F4" }),
    category: 'analysis'
  },
  {
    id: 'a2',
    notebookId: '1',
    title: "Create ML Glossary",
    description: "Extract and define key machine learning terms from your sources.",
    icon: React.createElement(BookOpen, { size: 20, color: "#34A853" }),
    category: 'organization'
  },
  {
    id: 'a3',
    notebookId: '1',
    title: "Generate Code Snippets",
    description: "Create TensorFlow/PyTorch code examples based on the neural network concepts in your sources.",
    icon: React.createElement(Code, { size: 20, color: "#FBBC05" }),
    category: 'analysis'
  },
  {
    id: 'a4',
    notebookId: '1',
    title: "Track Research Progress",
    description: "Create a timeline of your machine learning research and identify knowledge gaps.",
    icon: React.createElement(LineChart, { size: 20, color: "#EA4335" }),
    category: 'organization'
  },
  {
    id: 'a5',
    notebookId: '1',
    title: "ML Paper Summarizer",
    description: "Automatically generate summaries of new machine learning papers you add.",
    icon: React.createElement(FileText, { size: 20, color: "#4285F4" }),
    category: 'summary'
  },
  
  // Climate Change Studies automations
  {
    id: 'a6',
    notebookId: '2',
    title: "Climate Timeline",
    description: "Create a timeline of key climate events and predictions from your sources.",
    icon: React.createElement(Clock, { size: 20, color: "#34A853" }),
    category: 'visualization'
  },
  {
    id: 'a7',
    notebookId: '2',
    title: "Regional Impact Analysis",
    description: "Compare climate change impacts across different geographical regions.",
    icon: React.createElement(Map, { size: 20, color: "#4285F4" }),
    category: 'analysis'
  },
  {
    id: 'a8',
    notebookId: '2',
    title: "Policy Recommendation",
    description: "Generate climate policy recommendations based on the scientific data in your sources.",
    icon: React.createElement(FileText, { size: 20, color: "#FBBC05" }),
    category: 'analysis'
  },
  {
    id: 'a9',
    notebookId: '2',
    title: "Data Visualization",
    description: "Create charts and graphs from the climate data in your sources.",
    icon: React.createElement(BarChart, { size: 20, color: "#EA4335" }),
    category: 'visualization'
  },
  
  // Ancient Rome History automations
  {
    id: 'a10',
    notebookId: '3',
    title: "Roman Timeline",
    description: "Create a chronological timeline of major events in Roman history.",
    icon: React.createElement(Clock, { size: 20, color: "#4285F4" }),
    category: 'organization'
  },
  {
    id: 'a11',
    notebookId: '3',
    title: "Emperor Profiles",
    description: "Generate detailed profiles of Roman emperors mentioned in your sources.",
    icon: React.createElement(Users, { size: 20, color: "#34A853" }),
    category: 'organization'
  },
  {
    id: 'a12',
    notebookId: '3',
    title: "Battle Analysis",
    description: "Create strategic analyses of major Roman military campaigns.",
    icon: React.createElement(Sword, { size: 20, color: "#FBBC05" }),
    category: 'analysis'
  },
  {
    id: 'a13',
    notebookId: '3',
    title: "Political Structure Map",
    description: "Visualize the political structure and governance of Ancient Rome.",
    icon: React.createElement(Landmark, { size: 20, color: "#EA4335" }),
    category: 'visualization'
  },
  {
    id: 'a14',
    notebookId: '3',
    title: "Roman Law Digest",
    description: "Summarize key aspects of Roman law from your sources.",
    icon: React.createElement(Scroll, { size: 20, color: "#4285F4" }),
    category: 'summary'
  },
  
  // Personal Finance automations
  {
    id: 'a15',
    notebookId: '4',
    title: "Budget Generator",
    description: "Create a personalized monthly budget based on financial principles in your sources.",
    icon: React.createElement(DollarSign, { size: 20, color: "#34A853" }),
    category: 'organization'
  },
  {
    id: 'a16',
    notebookId: '4',
    title: "Investment Analysis",
    description: "Analyze different investment strategies mentioned in your sources.",
    icon: React.createElement(TrendingUp, { size: 20, color: "#4285F4" }),
    category: 'analysis'
  },
  {
    id: 'a17',
    notebookId: '4',
    title: "Retirement Calculator",
    description: "Calculate retirement savings projections based on different scenarios.",
    icon: React.createElement(PieChart, { size: 20, color: "#FBBC05" }),
    category: 'analysis'
  },
  {
    id: 'a18',
    notebookId: '4',
    title: "Financial Term Glossary",
    description: "Create a glossary of financial terms from your sources.",
    icon: React.createElement(BookOpen, { size: 20, color: "#EA4335" }),
    category: 'organization'
  },
  
  // Web Development automations
  {
    id: 'a19',
    notebookId: '5',
    title: "Code Snippet Library",
    description: "Extract and organize useful code snippets from your web development sources.",
    icon: React.createElement(Code, { size: 20, color: "#4285F4" }),
    category: 'organization'
  },
  {
    id: 'a20',
    notebookId: '5',
    title: "API Documentation",
    description: "Generate structured API documentation from your web development notes.",
    icon: React.createElement(Database, { size: 20, color: "#34A853" }),
    category: 'organization'
  },
  {
    id: 'a21',
    notebookId: '5',
    title: "Performance Checklist",
    description: "Create a web performance optimization checklist based on your sources.",
    icon: React.createElement(Zap, { size: 20, color: "#FBBC05" }),
    category: 'analysis'
  },
  {
    id: 'a22',
    notebookId: '5',
    title: "Architecture Diagram",
    description: "Generate a visual representation of web application architecture.",
    icon: React.createElement(Layers, { size: 20, color: "#EA4335" }),
    category: 'visualization'
  },
  {
    id: 'a23',
    notebookId: '5',
    title: "Git Workflow",
    description: "Create a recommended Git workflow based on best practices in your sources.",
    icon: React.createElement(GitBranch, { size: 20, color: "#4285F4" }),
    category: 'organization'
  }
];