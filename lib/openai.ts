import OpenAI from 'openai';
import type { SymptomLog, SymptomPattern } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function analyzeSymptomPatterns(logs: SymptomLog[]): Promise<SymptomPattern[]> {
  try {
    const prompt = `
    Analyze the following symptom logs and identify patterns:
    
    ${logs.map(log => `
    Date: ${log.timestamp}
    Symptoms: ${log.symptoms.join(', ')}
    Triggers: ${log.triggers.join(', ')}
    Severity: ${log.severity}/10
    Notes: ${log.notes || 'None'}
    `).join('\n')}
    
    Please identify:
    1. Common symptom patterns
    2. Potential triggers
    3. Suggested actions for management
    4. Confidence level in the analysis
    
    Return as JSON array of patterns.
    `;

    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a health data analyst. Provide insights based on symptom patterns. Always include confidence levels and suggest consulting healthcare providers for medical decisions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from AI');

    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing symptom patterns:', error);
    return [];
  }
}

export async function generateHealthTrendSummary(
  title: string,
  content: string,
  userConditions: string[]
): Promise<string> {
  try {
    const prompt = `
    Summarize this health research/news for someone with ${userConditions.join(', ')}:
    
    Title: ${title}
    Content: ${content}
    
    Provide a concise, actionable summary focusing on:
    1. Key findings relevant to their conditions
    2. Practical implications
    3. Any recommended actions
    4. Confidence level of the research
    
    Keep it under 200 words and accessible to non-medical professionals.
    `;

    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a health information specialist. Summarize complex medical information in accessible language while maintaining accuracy.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.4,
    });

    return response.choices[0]?.message?.content || 'Unable to generate summary';
  } catch (error) {
    console.error('Error generating health trend summary:', error);
    return 'Unable to generate summary at this time.';
  }
}

export async function generatePersonalizedRecommendations(
  logs: SymptomLog[],
  conditions: string[]
): Promise<string[]> {
  try {
    const prompt = `
    Based on these symptom logs and health conditions (${conditions.join(', ')}), 
    provide 3-5 personalized health management recommendations:
    
    Recent logs:
    ${logs.slice(0, 10).map(log => `
    Symptoms: ${log.symptoms.join(', ')}
    Triggers: ${log.triggers.join(', ')}
    Severity: ${log.severity}/10
    `).join('\n')}
    
    Focus on:
    1. Lifestyle modifications
    2. Trigger avoidance
    3. Symptom management strategies
    4. When to seek medical attention
    
    Return as JSON array of recommendation strings.
    `;

    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a health coach providing evidence-based lifestyle recommendations. Always emphasize consulting healthcare providers for medical decisions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.4,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from AI');

    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [
      'Track your symptoms consistently to identify patterns',
      'Maintain a regular sleep schedule',
      'Stay hydrated throughout the day',
      'Consider stress management techniques',
      'Consult your healthcare provider for personalized advice'
    ];
  }
}
