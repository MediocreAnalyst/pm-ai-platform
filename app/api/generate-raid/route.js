import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const { projectDescription } = await request.json();

    if (!projectDescription || projectDescription.length < 20) {
      return Response.json(
        { error: 'Please provide a project description' },
        { status: 400 }
      );
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `You are a project management expert. Analyze this project and generate a RAID log (Risks, Assumptions, Issues, Dependencies).

For each item, provide EXACTLY this format:

TYPE: Risk
DESCRIPTION: [clear description of the risk]
SEVERITY: [High/Medium/Low]
PROBABILITY: [High/Medium/Low]
MITIGATION: [specific mitigation strategy]
STATUS: Open

TYPE: Assumption
DESCRIPTION: [clear description of the assumption]
SEVERITY: [High/Medium/Low - impact if wrong]
PROBABILITY: [High/Medium/Low - likelihood it's wrong]
MITIGATION: [how to validate or what to do if wrong]
STATUS: Open

TYPE: Dependency
DESCRIPTION: [clear description of the dependency]
SEVERITY: [High/Medium/Low - impact if blocked]
PROBABILITY: [High/Medium/Low - likelihood of delay]
MITIGATION: [backup plan or mitigation]
STATUS: In Progress

Generate 4-6 Risks, 3-4 Assumptions, and 2-3 Dependencies. No Issues yet (project hasn't started).

Keep descriptions concise (under 100 characters). Be specific to THIS project, not generic PM advice.

Project Description:
${projectDescription}`
      }]
    });

    const response = message.content[0].text;
    
    // Parse the AI response into structured items
    const items = parseRAIDResponse(response);

    return Response.json({ items });

  } catch (error) {
    console.error('RAID API Error:', error);
    return Response.json(
      { error: 'Failed to generate RAID log. Please try again.' },
      { status: 500 }
    );
  }
}

function parseRAIDResponse(text) {
  const items = [];
  const blocks = text.split(/TYPE:\s*/i).filter(b => b.trim());
  
  let id = 1;
  blocks.forEach(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 4) return;
    
    const item = { id: id++ };
    
    lines.forEach(line => {
      if (line.match(/^(Risk|Assumption|Issue|Dependency)/i)) {
        item.type = line.match(/^(Risk|Assumption|Issue|Dependency)/i)[1];
      } else if (line.match(/^DESCRIPTION:/i)) {
        item.description = line.replace(/^DESCRIPTION:\s*/i, '').trim();
      } else if (line.match(/^SEVERITY:/i)) {
        item.severity = line.replace(/^SEVERITY:\s*/i, '').trim();
      } else if (line.match(/^PROBABILITY:/i)) {
        item.probability = line.replace(/^PROBABILITY:\s*/i, '').trim();
      } else if (line.match(/^MITIGATION:/i)) {
        item.mitigation = line.replace(/^MITIGATION:\s*/i, '').trim();
      } else if (line.match(/^STATUS:/i)) {
        item.status = line.replace(/^STATUS:\s*/i, '').trim();
      }
    });
    
    // Only add if we have the required fields
    if (item.type && item.description) {
      // Set defaults for missing fields
      item.severity = item.severity || 'Medium';
      item.probability = item.probability || 'Medium';
      item.mitigation = item.mitigation || '';
      item.owner = '';
      item.status = item.status || 'Open';
      items.push(item);
    }
  });
  
  return items;
}