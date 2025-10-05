import pptxgen from 'pptxgenjs';

export function generatePresentationDeck(recommendation, projectDescription) {
  const pptx = new pptxgen();

  // Theme colors
  const colors = {
    primary: '4F46E5',
    secondary: '6B7280',
    accent: '10B981',
    warning: 'F59E0B',
    background: 'F9FAFB',
    text: '1F2937'
  };

  // Parse recommendation into sections
  const sections = parseRecommendation(recommendation);

  // Slide 1: Cover
  const slide1 = pptx.addSlide();
  slide1.background = { color: colors.primary };
  
  slide1.addText('Project Assessment Results', {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 1.5,
    fontSize: 44,
    bold: true,
    color: 'FFFFFF',
    align: 'center'
  });

  slide1.addText('AI-Powered Project Management Recommendations', {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 0.5,
    fontSize: 20,
    color: 'E0E7FF',
    align: 'center'
  });

  slide1.addText(new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }), {
    x: 0.5,
    y: 5.0,
    w: 9,
    h: 0.3,
    fontSize: 14,
    color: 'C7D2FE',
    align: 'center'
  });

  // Slide 2: Project Overview
  const slide2 = pptx.addSlide();
  slide2.addText('Project Overview', {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.6,
    fontSize: 32,
    bold: true,
    color: colors.primary
  });

  slide2.addText('Project Context', {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: colors.text
  });

  slide2.addText(projectDescription || 'No project description provided', {
    x: 0.5,
    y: 1.6,
    w: 9,
    h: 3.4,
    fontSize: 14,
    color: colors.secondary,
    valign: 'top'
  });

  slide2.addText('AI-Generated Assessment • Review and Validate', {
    x: 0.5,
    y: 5.3,
    w: 9,
    h: 0.3,
    fontSize: 10,
    color: colors.secondary,
    align: 'center',
    italic: true
  });

  // Slide 3: Recommended Approach
  if (sections.approach) {
    const slide3 = pptx.addSlide();
    slide3.addText('📋 Recommended Approach', {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: colors.primary
    });

    slide3.addText('Suggested project management methodology and rationale', {
      x: 0.5,
      y: 1.1,
      w: 9,
      h: 0.3,
      fontSize: 12,
      color: colors.secondary,
      italic: true
    });

    const approachBullets = extractBullets(sections.approach);
    
    if (approachBullets.length > 0) {
      slide3.addText(approachBullets, {
        x: 0.5,
        y: 1.6,
        w: 9,
        h: 3.5,
        fontSize: 14,
        bullet: { indent: 20 },
        color: colors.text,
        lineSpacing: 20
      });
    } else {
      slide3.addText(sections.approach.replace(/\*\*/g, ''), {
        x: 0.5,
        y: 1.6,
        w: 9,
        h: 3.5,
        fontSize: 14,
        color: colors.text
      });
    }

    slide3.addText('AI-Generated Assessment • Review and Validate', {
      x: 0.5,
      y: 5.3,
      w: 9,
      h: 0.3,
      fontSize: 10,
      color: colors.secondary,
      align: 'center',
      italic: true
    });
  }

  // Slide 4: Key Templates
  if (sections.templates) {
    const slide4 = pptx.addSlide();
    slide4.addText('📄 Key Templates Needed', {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: colors.primary
    });

    slide4.addText('Essential documentation and frameworks for project success', {
      x: 0.5,
      y: 1.1,
      w: 9,
      h: 0.3,
      fontSize: 12,
      color: colors.secondary,
      italic: true
    });

    const templateBullets = extractBullets(sections.templates);

    slide4.addText(templateBullets, {
      x: 0.5,
      y: 1.6,
      w: 9,
      h: 3.5,
      fontSize: 14,
      bullet: { indent: 20 },
      color: colors.text,
      lineSpacing: 20
    });

    slide4.addText('AI-Generated Assessment • Review and Validate', {
      x: 0.5,
      y: 5.3,
      w: 9,
      h: 0.3,
      fontSize: 10,
      color: colors.secondary,
      align: 'center',
      italic: true
    });
  }

  // Slide 5: Success Factors
  if (sections.successFactors) {
    const slide5 = pptx.addSlide();
    slide5.addText('✅ Critical Success Factors', {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: colors.accent
    });

    slide5.addText('Key elements required for project success', {
      x: 0.5,
      y: 1.1,
      w: 9,
      h: 0.3,
      fontSize: 12,
      color: colors.secondary,
      italic: true
    });

    const successBullets = extractBullets(sections.successFactors);

    slide5.addText(successBullets, {
      x: 0.5,
      y: 1.6,
      w: 9,
      h: 3.5,
      fontSize: 14,
      bullet: { indent: 20 },
      color: colors.text,
      lineSpacing: 20
    });

    slide5.addText('AI-Generated Assessment • Review and Validate', {
      x: 0.5,
      y: 5.3,
      w: 9,
      h: 0.3,
      fontSize: 10,
      color: colors.secondary,
      align: 'center',
      italic: true
    });
  }

  // Slide 6: Risks
  if (sections.risks) {
    const slide6 = pptx.addSlide();
    slide6.addText('⚠️ Potential Risks to Monitor', {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: colors.warning
    });

    slide6.addText('Challenges and obstacles to anticipate and mitigate', {
      x: 0.5,
      y: 1.1,
      w: 9,
      h: 0.3,
      fontSize: 12,
      color: colors.secondary,
      italic: true
    });

    const riskBullets = extractBullets(sections.risks);

    slide6.addText(riskBullets, {
      x: 0.5,
      y: 1.6,
      w: 9,
      h: 3.5,
      fontSize: 14,
      bullet: { indent: 20 },
      color: colors.text,
      lineSpacing: 20
    });

    slide6.addText('AI-Generated Assessment • Review and Validate', {
      x: 0.5,
      y: 5.3,
      w: 9,
      h: 0.3,
      fontSize: 10,
      color: colors.secondary,
      align: 'center',
      italic: true
    });
  }

  // Slide 7: Estimates
  if (sections.estimates) {
    const slide7 = pptx.addSlide();
    slide7.addText('📊 Rough Estimates', {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: colors.primary
    });

    slide7.addText('Based on available information - does not represent the full range of possible actual costs', {
      x: 0.5,
      y: 1.1,
      w: 9,
      h: 0.4,
      fontSize: 11,
      color: colors.warning,
      bold: true,
      italic: true
    });

    const estimateBullets = extractBullets(sections.estimates);

    slide7.addText(estimateBullets, {
      x: 0.5,
      y: 1.7,
      w: 9,
      h: 2.5,
      fontSize: 14,
      bullet: { indent: 20 },
      color: colors.text,
      lineSpacing: 20
    });

    slide7.addText('Note: Actual costs and timelines may vary significantly based on your specific context, team capabilities, organizational constraints, and unforeseen challenges. These estimates are provided for initial planning purposes only.', {
      x: 0.5,
      y: 4.3,
      w: 9,
      h: 0.8,
      fontSize: 10,
      color: colors.warning,
      italic: true
    });

    slide7.addText('AI-Generated Assessment • Review and Validate', {
      x: 0.5,
      y: 5.3,
      w: 9,
      h: 0.3,
      fontSize: 10,
      color: colors.secondary,
      align: 'center',
      italic: true
    });
  }

  // Slide 8: Next Steps
  const slide8 = pptx.addSlide();
  slide8.addText('💡 Next Steps', {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.6,
    fontSize: 32,
    bold: true,
    color: colors.primary
  });

  slide8.addText('Recommended immediate actions to begin implementation', {
    x: 0.5,
    y: 1.1,
    w: 9,
    h: 0.3,
    fontSize: 12,
    color: colors.secondary,
    italic: true
  });

  if (sections.tip) {
    slide8.addText('Quick Implementation Tip:', {
      x: 0.5,
      y: 1.6,
      w: 9,
      h: 0.3,
      fontSize: 16,
      bold: true,
      color: colors.text
    });

    slide8.addText(sections.tip.replace(/\*\*/g, ''), {
      x: 0.5,
      y: 2.0,
      w: 9,
      h: 1.2,
      fontSize: 13,
      color: colors.secondary
    });
  }

  slide8.addText([
    { text: 'Review these recommendations with your team' },
    { text: 'Adapt to your specific organizational context' },
    { text: 'Begin with a focused pilot phase' },
    { text: 'Monitor progress and adjust as needed' }
  ], {
    x: 0.5,
    y: 3.4,
    w: 9,
    h: 1.6,
    fontSize: 14,
    bullet: { indent: 20 },
    color: colors.text,
    lineSpacing: 20
  });

  slide8.addText('AI-Generated Assessment • Review and Validate', {
    x: 0.5,
    y: 5.3,
    w: 9,
    h: 0.3,
    fontSize: 10,
    color: colors.secondary,
    align: 'center',
    italic: true
  });

  return pptx;
}

function extractBullets(text) {
  return text.split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => ({
      text: line.replace(/^-\s*/, '').replace(/\*\*/g, '').trim()
    }));
}

function parseRecommendation(text) {
  const sections = {
    approach: '',
    templates: '',
    successFactors: '',
    risks: '',
    estimates: '',
    tip: ''
  };

  const approachMatch = text.match(/##\s*Recommended PM Approach\s*([\s\S]*?)(?=##|$)/i);
  const templatesMatch = text.match(/##\s*Key Templates Needed\s*([\s\S]*?)(?=##|$)/i);
  const successMatch = text.match(/##\s*Critical Success Factors\s*([\s\S]*?)(?=##|$)/i);
  const risksMatch = text.match(/##\s*Potential Risks\s*([\s\S]*?)(?=##|$)/i);
  const estimatesMatch = text.match(/##\s*(?:Rough Estimates|Project Estimates)\s*([\s\S]*?)(?=##|$)/i);
  const tipMatch = text.match(/##\s*Quick Implementation Tip\s*([\s\S]*?)$/i);

  if (approachMatch) sections.approach = approachMatch[1].trim();
  if (templatesMatch) sections.templates = templatesMatch[1].trim();
  if (successMatch) sections.successFactors = successMatch[1].trim();
  if (risksMatch) sections.risks = risksMatch[1].trim();
  if (estimatesMatch) sections.estimates = estimatesMatch[1].trim();
  if (tipMatch) sections.tip = tipMatch[1].trim();

  return sections;
}