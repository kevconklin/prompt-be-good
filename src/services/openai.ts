import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../config/env';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made from a backend
});

export async function generatePrompt(initialPrompt: string, userRequirements: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: initialPrompt
        },
        {
          role: "user",
          content: userRequirements
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return completion.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('Error generating prompt:', error);
    throw new Error('Failed to generate prompt. Please check your API key and try again.');
  }
}