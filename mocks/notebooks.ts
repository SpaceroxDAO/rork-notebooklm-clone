import { Notebook } from '@/types/notebook';

export const mockNotebooks: Notebook[] = [
  {
    id: '1',
    title: 'Machine Learning Research',
    emoji: '🤖',
    sources: [
      {
        id: 's1',
        type: 'pdf',
        title: 'Introduction to Neural Networks',
        url: 'https://example.com/neural-networks.pdf',
        dateAdded: '2025-06-10T14:30:00Z'
      },
      {
        id: 's2',
        type: 'website',
        title: 'TensorFlow Documentation',
        url: 'https://www.tensorflow.org/guide',
        dateAdded: '2025-06-11T09:15:00Z'
      },
      {
        id: 's3',
        type: 'youtube',
        title: 'Deep Learning Explained',
        url: 'https://youtube.com/watch?v=abc123',
        dateAdded: '2025-06-12T16:45:00Z'
      }
    ],
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'What are the key differences between supervised and unsupervised learning?',
        timestamp: '2025-06-13T10:20:00Z'
      },
      {
        id: 'm2',
        role: 'assistant',
        content: 'Supervised learning uses labeled data where the model learns to predict outputs based on inputs. Examples include classification and regression. Unsupervised learning works with unlabeled data to find patterns or structure. Examples include clustering and dimensionality reduction. [1]',
        timestamp: '2025-06-13T10:20:30Z',
        citations: [
          {
            id: 'c1',
            sourceId: 's1',
            text: '[1]'
          }
        ]
      }
    ],
    lastUpdated: '2025-06-13T10:20:30Z',
    createdAt: '2025-06-10T14:00:00Z'
  },
  {
    id: '2',
    title: 'Climate Change Studies',
    emoji: '🌍',
    sources: [
      {
        id: 's4',
        type: 'pdf',
        title: 'IPCC Climate Report 2024',
        url: 'https://example.com/ipcc-report.pdf',
        dateAdded: '2025-06-05T11:30:00Z'
      },
      {
        id: 's5',
        type: 'website',
        title: 'NASA Climate Data',
        url: 'https://climate.nasa.gov',
        dateAdded: '2025-06-06T13:45:00Z'
      }
    ],
    messages: [
      {
        id: 'm3',
        role: 'user',
        content: 'What are the projected sea level rises by 2050?',
        timestamp: '2025-06-07T09:10:00Z'
      },
      {
        id: 'm4',
        role: 'assistant',
        content: 'According to the IPCC report, global mean sea level is projected to rise by 0.24-0.32 meters by 2050 relative to 1995-2014 levels. This projection is consistent across different emission scenarios due to the locked-in effects of past emissions. [1]',
        timestamp: '2025-06-07T09:10:30Z',
        citations: [
          {
            id: 'c2',
            sourceId: 's4',
            text: '[1]'
          }
        ]
      }
    ],
    lastUpdated: '2025-06-07T09:10:30Z',
    createdAt: '2025-06-05T11:00:00Z'
  },
  {
    id: '3',
    title: 'Ancient Rome History',
    emoji: '🏛️',
    sources: [
      {
        id: 's6',
        type: 'pdf',
        title: 'The Rise and Fall of the Roman Empire',
        url: 'https://example.com/roman-empire.pdf',
        dateAdded: '2025-06-01T15:20:00Z'
      },
      {
        id: 's7',
        type: 'youtube',
        title: 'Roman Engineering Marvels',
        url: 'https://youtube.com/watch?v=def456',
        dateAdded: '2025-06-02T10:30:00Z'
      },
      {
        id: 's8',
        type: 'text',
        title: 'Notes on Roman Political Structure',
        content: 'The Roman Republic was governed by a complex system including the Senate, various assemblies, and elected magistrates including consuls, praetors, and tribunes.',
        dateAdded: '2025-06-03T14:15:00Z'
      }
    ],
    messages: [
      {
        id: 'm5',
        role: 'user',
        content: 'What led to the fall of the Western Roman Empire?',
        timestamp: '2025-06-04T16:40:00Z'
      },
      {
        id: 'm6',
        role: 'assistant',
        content: 'The fall of the Western Roman Empire in 476 CE resulted from multiple factors including: economic troubles, overreliance on slave labor, military overspending, government corruption, foreign invasions by Germanic tribes, and the rise of the Eastern Empire. Internal political instability and the overextension of military resources were particularly significant. [1]',
        timestamp: '2025-06-04T16:40:30Z',
        citations: [
          {
            id: 'c3',
            sourceId: 's6',
            text: '[1]'
          }
        ]
      }
    ],
    lastUpdated: '2025-06-04T16:40:30Z',
    createdAt: '2025-06-01T15:00:00Z'
  },
  {
    id: '4',
    title: 'Personal Finance',
    emoji: '💰',
    sources: [
      {
        id: 's9',
        type: 'pdf',
        title: 'Investment Strategies for Beginners',
        url: 'https://example.com/investment-guide.pdf',
        dateAdded: '2025-05-25T09:30:00Z'
      },
      {
        id: 's10',
        type: 'website',
        title: 'Retirement Planning Calculator',
        url: 'https://finance-tools.com/retirement',
        dateAdded: '2025-05-26T11:45:00Z'
      }
    ],
    messages: [
      {
        id: 'm7',
        role: 'user',
        content: 'What percentage of income should I save for retirement?',
        timestamp: '2025-05-27T14:20:00Z'
      },
      {
        id: 'm8',
        role: 'assistant',
        content: 'Financial experts typically recommend saving 15-20% of your gross income for retirement. However, this can vary based on your age, current savings, and retirement goals. If you start saving later in life, you may need to save a higher percentage. The most important factor is to start early to benefit from compound interest. [1]',
        timestamp: '2025-05-27T14:20:30Z',
        citations: [
          {
            id: 'c4',
            sourceId: 's9',
            text: '[1]'
          }
        ]
      }
    ],
    lastUpdated: '2025-05-27T14:20:30Z',
    createdAt: '2025-05-25T09:00:00Z'
  },
  {
    id: '5',
    title: 'Web Development',
    emoji: '💻',
    sources: [
      {
        id: 's11',
        type: 'website',
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        dateAdded: '2025-05-20T10:15:00Z'
      },
      {
        id: 's12',
        type: 'youtube',
        title: 'React Performance Optimization',
        url: 'https://youtube.com/watch?v=ghi789',
        dateAdded: '2025-05-21T13:30:00Z'
      },
      {
        id: 's13',
        type: 'pdf',
        title: 'Web Accessibility Guidelines',
        url: 'https://example.com/web-a11y.pdf',
        dateAdded: '2025-05-22T09:45:00Z'
      }
    ],
    messages: [
      {
        id: 'm9',
        role: 'user',
        content: 'What are the best practices for React component optimization?',
        timestamp: '2025-05-23T11:30:00Z'
      },
      {
        id: 'm10',
        role: 'assistant',
        content: 'For React component optimization: 1) Use React.memo for functional components to prevent unnecessary re-renders, 2) Implement useCallback for function references, 3) Use useMemo for expensive calculations, 4) Virtualize long lists with react-window or react-virtualized, 5) Implement code splitting with React.lazy and Suspense, and 6) Use the React DevTools Profiler to identify performance bottlenecks. [2]',
        timestamp: '2025-05-23T11:30:30Z',
        citations: [
          {
            id: 'c5',
            sourceId: 's12',
            text: '[2]'
          }
        ]
      }
    ],
    lastUpdated: '2025-05-23T11:30:30Z',
    createdAt: '2025-05-20T10:00:00Z'
  }
];