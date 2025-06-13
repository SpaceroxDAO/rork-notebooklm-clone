import { Source } from '@/types/notebook';

interface AiResponse {
  completion: string;
}

export async function generateResponse(
  prompt: string,
  sources: Source[]
): Promise<{ text: string; citations: { id: string; sourceId: string; text: string }[] }> {
  try {
    // Prepare sources content for context
    const sourcesContext = sources
      .map((source) => `Source ${source.id}: ${source.title}\n${source.content || source.url || ''}`)
      .join('\n\n');

    // Prepare the messages for the AI
    const messages = [
      {
        role: 'system',
        content: `You are an AI assistant that helps users understand their documents and sources. 
        When answering, cite specific sources using [1], [2], etc. format. 
        Here are the sources:\n\n${sourcesContext}`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    // Make the API request
    const response = await fetch('https://toolkit.rork.com/text/llm/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data: AiResponse = await response.json();
    
    // Extract citations from the response
    const citationRegex = /\[(\d+)\]/g;
    const text = data.completion;
    const citations: { id: string; sourceId: string; text: string }[] = [];
    
    let match;
    while ((match = citationRegex.exec(text)) !== null) {
      const citationNumber = parseInt(match[1], 10);
      if (citationNumber > 0 && citationNumber <= sources.length) {
        const sourceId = sources[citationNumber - 1].id;
        citations.push({
          id: `citation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          sourceId,
          text: match[0],
        });
      }
    }

    return { text, citations };
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}