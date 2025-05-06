import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBlogPost(topic: string, tone: string = 'professional') {
  const prompt = `Write a blog post about ${topic}. Use a ${tone} tone.`;
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a professional blog writer.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 1500,
  });

  return completion.choices[0].message.content;
}