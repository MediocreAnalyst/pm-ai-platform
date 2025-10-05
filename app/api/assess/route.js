import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const { description } = await request.json();

    if (!description || description.length < 20) {
      return Response.json(
        { error: 'Please provide a project description (at least 20 characters)' },
        { status: 400 }
      );
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are a project management expert. Analyze this project description and provide:

1. Recommended PM approach (Waterfall, Agile, Hybrid)
2. Key templates needed (Project Plan, Kanban, RAID Log, etc.)
3. Critical success factors
4. Potential risks to watch for

Keep your response concise and actionable (under 400 words).

Project Description:
${description}`
      }]
    });

    const recommendation = message.content[0].text;

    return Response.json({ recommendation });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Failed to generate recommendations. Please try again.' },
      { status: 500 }
    );
  }
}