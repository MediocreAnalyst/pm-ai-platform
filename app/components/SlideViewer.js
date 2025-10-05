'use client';

import { useState } from 'react';

export default function SlideViewer({ recommendation, projectDescription }) {
  const [isPresentMode, setIsPresentMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sections = parseRecommendation(recommendation);

  const slides = [
    // Slide 1: Cover
    {
      type: 'cover',
      title: 'Project Assessment Results',
      subtitle: 'AI-Powered Project Management Recommendations',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
    // Slide 2: Overview
    {
      type: 'content',
      icon: '📋',
      title: 'Project Overview',
      summary: 'Project context and initial assessment',
      content: projectDescription || 'No project description provided'
    },
    // Slide 3: Approach
    {
      type: 'bullets',
      icon: '📋',
      title: 'Recommended Approach',
      summary: 'Suggested project management methodology and rationale',
      bullets: extractBullets(sections.approach),
      text: sections.approach
    },
    // Slide 4: Templates
    {
      type: 'bullets',
      icon: '📄',
      title: 'Key Templates Needed',
      summary: 'Essential documentation and frameworks for project success',
      bullets: extractBullets(sections.templates)
    },
    // Slide 5: Success Factors
    {
      type: 'bullets',
      icon: '✅',
      title: 'Critical Success Factors',
      summary: 'Key elements required for project success',
      bullets: extractBullets(sections.successFactors),
      color: 'green'
    },
    // Slide 6: Risks
    {
      type: 'bullets',
      icon: '⚠️',
      title: 'Potential Risks to Monitor',
      summary: 'Challenges and obstacles to anticipate and mitigate',
      bullets: extractBullets(sections.risks),
      color: 'amber'
    },
    // Slide 7: Estimates
    {
      type: 'bullets',
      icon: '📊',
      title: 'Rough Estimates',
      summary: 'Based on available information - does not represent the full range of possible actual costs',
      bullets: extractBullets(sections.estimates),
      disclaimer: 'Actual costs and timelines may vary significantly based on your specific context, team capabilities, organizational constraints, and unforeseen challenges. These estimates are provided for initial planning purposes only.',
      color: 'blue'
    },
    // Slide 8: Next Steps
    {
      type: 'mixed',
      icon: '💡',
      title: 'Next Steps',
      summary: 'Recommended immediate actions to begin implementation',
      tip: sections.tip,
      bullets: [
        'Review these recommendations with your team',
        'Adapt to your specific organizational context',
        'Begin with a focused pilot phase',
        'Monitor progress and adjust as needed'
      ]
    }
  ].filter(slide => {
    // Filter out slides with no content
    if (slide.type === 'bullets' && (!slide.bullets || slide.bullets.length === 0)) return false;
    return true;
  });

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const Slide = ({ slide, index }) => {
    const colorClasses = {
      green: 'border-green-500 bg-green-50',
      amber: 'border-amber-500 bg-amber-50',
      blue: 'border-blue-500 bg-blue-50'
    };

    const baseClass = slide.color ? colorClasses[slide.color] : 'border-gray-200 bg-white';

    if (slide.type === 'cover') {
      return (
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex flex-col items-center justify-center h-full p-12">
          <h1 className="text-5xl font-bold mb-4 text-center">{slide.title}</h1>
          <p className="text-xl text-indigo-100 mb-8">{slide.subtitle}</p>
          <p className="text-indigo-200">{slide.date}</p>
        </div>
      );
    }

    if (slide.type === 'content') {
      return (
        <div className="p-12 h-full flex flex-col">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-indigo-600 mb-2 flex items-center gap-3">
              <span className="text-5xl">{slide.icon}</span>
              {slide.title}
            </h2>
            <p className="text-gray-500 italic text-sm">{slide.summary}</p>
          </div>
          <div className="flex-1">
            <p className="text-lg text-gray-700 leading-relaxed">{slide.content}</p>
          </div>
          <p className="text-xs text-gray-400 italic text-center mt-8">
            AI-Generated Assessment • Review and Validate
          </p>
        </div>
      );
    }

    if (slide.type === 'bullets') {
      const titleColor = slide.color === 'green' ? 'text-green-700' : 
                        slide.color === 'amber' ? 'text-amber-700' : 
                        'text-indigo-600';

      return (
        <div className="p-12 h-full flex flex-col">
          <div className="mb-6">
            <h2 className={`text-4xl font-bold ${titleColor} mb-2 flex items-center gap-3`}>
              <span className="text-5xl">{slide.icon}</span>
              {slide.title}
            </h2>
            <p className="text-gray-500 italic text-sm">{slide.summary}</p>
          </div>
          <div className="flex-1">
            {slide.bullets && slide.bullets.length > 0 ? (
              <ul className="space-y-3">
                {slide.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span className="text-gray-700 leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : slide.text ? (
              <p className="text-gray-700 leading-relaxed">{slide.text}</p>
            ) : null}
          </div>
          {slide.disclaimer && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800 italic">{slide.disclaimer}</p>
            </div>
          )}
          <p className="text-xs text-gray-400 italic text-center mt-8">
            AI-Generated Assessment • Review and Validate
          </p>
        </div>
      );
    }

    if (slide.type === 'mixed') {
      return (
        <div className="p-12 h-full flex flex-col">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-indigo-600 mb-2 flex items-center gap-3">
              <span className="text-5xl">{slide.icon}</span>
              {slide.title}
            </h2>
            <p className="text-gray-500 italic text-sm">{slide.summary}</p>
          </div>
          <div className="flex-1 space-y-6">
            {slide.tip && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Quick Implementation Tip:</h3>
                <p className="text-gray-700 leading-relaxed">{slide.tip}</p>
              </div>
            )}
            {slide.bullets && (
              <ul className="space-y-3">
                {slide.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span className="text-gray-700 leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="text-xs text-gray-400 italic text-center mt-8">
            AI-Generated Assessment • Review and Validate
          </p>
        </div>
      );
    }
  };

  if (isPresentMode) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Top bar */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <div className="text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </div>
          <button
            onClick={() => setIsPresentMode(false)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
          >
            Close
          </button>
        </div>

        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-6xl aspect-[16/9] bg-white shadow-2xl rounded-lg overflow-hidden">
            <Slide slide={slides[currentSlide]} index={currentSlide} />
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-900 p-4 flex justify-center gap-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded transition"
          >
            ← Previous
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded transition"
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  // Preview card
  return (
    <div className="space-y-4">
      {/* Preview with button */}
      <div className="relative">
        <div className="w-full aspect-[16/9] bg-white shadow-lg rounded-lg overflow-hidden border-2 border-gray-200">
          <Slide slide={slides[0]} index={0} />
        </div>

        {/* Button in top right corner */}
        <button
          onClick={() => setIsPresentMode(true)}
          className="absolute top-4 right-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-lg transition z-10"
        >
          Slideshow Presentation
        </button>
      </div>

      <p className="text-sm text-gray-600 text-center">
        {slides.length} slides • Click to view your complete project assessment
      </p>
    </div>
  );
}

function extractBullets(text) {
  if (!text) return [];
  return text.split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.replace(/^-\s*/, '').replace(/\*\*/g, '').trim());
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