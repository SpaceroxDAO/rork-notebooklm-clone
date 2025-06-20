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
  }
];