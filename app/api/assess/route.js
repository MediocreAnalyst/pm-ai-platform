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
      max_tokens: 1200,
      messages: [{
        role: 'user',
        content: `You are a project management expert. Analyze this project description and provide recommendations in EXACTLY this format:

## Recommended PM Approach
[Your recommendation with rationale]

## Key Templates Needed
- Template 1: Description
- Template 2: Description
[etc.]

## Critical Success Factors
- Factor 1
- Factor 2
[etc.]

## Potential Risks
- Risk 1
- Risk 2
[etc.]

## Rough Estimates
- Estimated Timeline: [range with caveats]
- Estimated Budget Range: [range or complexity indicator]
- Team Size: [recommended size]
- Complexity Level: [Low/Medium/High with brief explanation]

## Quick Implementation Tip
[Actionable first step]

IMPORTANT: For estimates, provide ranges and emphasize these are rough approximations that may vary significantly. Keep your entire response concise (under 500 words).

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