'use client';

import { useState, useEffect } from 'react';
import RAIDLog from '../components/RAIDLog';

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    // Load assessment from localStorage
    const saved = localStorage.getItem('current-assessment');
    if (saved) {
      setAssessment(JSON.parse(saved));
    }
  }, []);
  
  const projectContext = {
    description: assessment?.projectDescription || '',
    recommendations: assessment?.recommendation || {}
  };

  const templates = [
    {
      id: 'raid-log',
      title: 'RAID Log',
      description: 'Track Risks, Assumptions, Issues, and Dependencies',
      icon: '⚠️',
      color: 'from-red-500 to-orange-500',
      available: true,
      component: RAIDLog
    },
    {
      id: 'status-report',
      title: 'Status Report',
      description: 'Weekly project status update template',
      icon: '📊',
      color: 'from-blue-500 to-indigo-500',
      available: false
    },
    {
      id: 'project-plan',
      title: 'Project Plan',
      description: 'Comprehensive project planning document',
      icon: '📋',
      color: 'from-green-500 to-teal-500',
      available: false
    },
    {
      id: 'sprint-planning',
      title: 'Sprint Planning',
      description: 'Agile sprint planning and tracking',
      icon: '🏃',
      color: 'from-purple-500 to-pink-500',
      available: false
    }
  ];

  if (selectedTemplate) {
    const template = templates.find(t => t.id === selectedTemplate);
    const TemplateComponent = template.component;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setSelectedTemplate(null)}
            className="mb-6 px-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg font-semibold transition"
          >
            ← Back to Templates
          </button>
          
          <TemplateComponent 
            projectDescription={projectContext.description}
            aiRecommendations={projectContext.recommendations}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Project Templates
          </h1>
          <p className="text-xl text-gray-700">
            Select a template to generate based on your project assessment
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {templates.map(template => (
            <div
              key={template.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 ${
                template.available ? 'border-gray-200' : 'border-gray-300 opacity-60'
              }`}
            >
              <div className={`h-3 bg-gradient-to-r ${template.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{template.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {template.title}
                    </h3>
                    <p className="text-gray-600">
                      {template.description}
                    </p>
                  </div>
                </div>

                {template.available ? (
                  <button
                    onClick={() => setSelectedTemplate(template.id)}
                    className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
                  >
                    Generate {template.title}
                  </button>
                ) : (
                  <div className="w-full px-6 py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold text-center">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg border-2 border-indigo-200">
          <h3 className="font-semibold text-lg mb-2">How It Works</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">1.</span>
              <span>Select a template from the options above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">2.</span>
              <span>AI pre-populates it with content based on your project assessment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">3.</span>
              <span>Edit, customize, and use the template for your project</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">4.</span>
              <span>Upgrade to Pro to export and share templates</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}