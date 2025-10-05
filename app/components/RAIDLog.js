'use client';

import { useState, useEffect } from 'react';

export default function RAIDLog({ projectDescription, aiRecommendations }) {
  const [isPresentMode, setIsPresentMode] = useState(false);
  const [items, setItems] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('raid-log-items');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('raid-log-items', JSON.stringify(items));
    }
  }, [items]);

  const generateRAIDLog = async () => {
    if (!projectDescription) {
      alert('No project description available. Please complete an assessment first.');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-raid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectDescription }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate RAID log');
      }

      setItems(data.items);
    } catch (error) {
      alert('Error generating RAID log: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const addItem = (type) => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    const newItem = { 
      id: newId, 
      type,
      description: '',
      severity: 'Medium',
      probability: 'Medium',
      mitigation: '',
      owner: '',
      status: 'Open'
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all items? This will start fresh for a new assessment.')) {
      localStorage.removeItem('raid-log-items');
      localStorage.removeItem('current-assessment');
      setItems([]);
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Risk': return 'bg-red-100 text-red-800';
      case 'Assumption': return 'bg-blue-100 text-blue-800';
      case 'Issue': return 'bg-orange-100 text-orange-800';
      case 'Dependency': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Presentation Mode
  if (isPresentMode) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="max-w-[1600px] mx-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">RAID Log - Presentation View</h2>
            <button
              onClick={() => setIsPresentMode(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
            >
              Close
            </button>
          </div>
          
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left w-24">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-3 py-2 text-left w-32">Severity</th>
                <th className="border border-gray-300 px-3 py-2 text-left w-32">Probability</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Mitigation</th>
                <th className="border border-gray-300 px-3 py-2 text-left w-32">Owner</th>
                <th className="border border-gray-300 px-3 py-2 text-left w-48">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">{item.description}</td>
                  <td className="border border-gray-300 px-3 py-2">{item.severity || 'Medium'}</td>
                  <td className="border border-gray-300 px-3 py-2">{item.probability || 'Medium'}</td>
                  <td className="border border-gray-300 px-3 py-2">{item.mitigation || '-'}</td>
                  <td className="border border-gray-300 px-3 py-2">{item.owner || '-'}</td>
                  <td className="border border-gray-300 px-3 py-2">{item.status || 'Open'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Main Edit View
  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">RAID Log</h2>
            <p className="text-gray-600">Track Risks, Assumptions, Issues, and Dependencies</p>
            {projectDescription && (
              <p className="text-sm text-gray-500 mt-2 italic">Project: {projectDescription.slice(0, 100)}...</p>
            )}
          </div>
          <div className="flex gap-2">
            {items.length === 0 && (
              <button
                onClick={generateRAIDLog}
                disabled={isGenerating}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition"
              >
                {isGenerating ? '🔄 Generating...' : '✨ Generate with AI'}
              </button>
            )}
            <button
              onClick={() => setIsPresentMode(true)}
              disabled={items.length === 0}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition"
            >
              📊 Presentation View
            </button>
            <button
              onClick={clearAll}
              disabled={items.length === 0}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 disabled:bg-gray-200 text-red-700 rounded-lg font-semibold transition"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => addItem('Risk')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition text-sm"
          >
            + Risk
          </button>
          <button
            onClick={() => addItem('Assumption')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition text-sm"
          >
            + Assumption
          </button>
          <button
            onClick={() => addItem('Issue')}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded font-semibold transition text-sm"
          >
            + Issue
          </button>
          <button
            onClick={() => addItem('Dependency')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold transition text-sm"
          >
            + Dependency
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left w-24">Type</th>
              <th className="border border-gray-300 px-3 py-2 text-left min-w-[300px]">Description</th>
              <th className="border border-gray-300 px-3 py-2 text-left w-32">Severity</th>
              <th className="border border-gray-300 px-3 py-2 text-left w-32">Probability</th>
              <th className="border border-gray-300 px-3 py-2 text-left min-w-[250px]">Mitigation</th>
              <th className="border border-gray-300 px-3 py-2 text-left w-32">Owner</th>
              <th className="border border-gray-300 px-3 py-2 text-left w-48">Status</th>
              <th className="border border-gray-300 px-3 py-2 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="8" className="border border-gray-300 px-4 py-12 text-center text-gray-500">
                  <p className="text-lg mb-4">No RAID log items yet</p>
                  {projectDescription ? (
                    <button
                      onClick={generateRAIDLog}
                      disabled={isGenerating}
                      className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition text-lg"
                    >
                      {isGenerating ? '🔄 Generating with AI...' : '✨ Generate RAID Log with AI'}
                    </button>
                  ) : (
                    <p className="text-sm">Complete an assessment first to generate AI-powered RAID items</p>
                  )}
                  <p className="text-sm mt-4">Or click the buttons above to manually add items</p>
                </td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <textarea
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Enter description..."
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[60px]"
                      rows="2"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <select
                      value={item.severity || 'Medium'}
                      onChange={(e) => updateItem(item.id, 'severity', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <select
                      value={item.probability || 'Medium'}
                      onChange={(e) => updateItem(item.id, 'probability', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <textarea
                      value={item.mitigation || ''}
                      onChange={(e) => updateItem(item.id, 'mitigation', e.target.value)}
                      placeholder="Mitigation strategy..."
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[60px]"
                      rows="2"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      value={item.owner || ''}
                      onChange={(e) => updateItem(item.id, 'owner', e.target.value)}
                      placeholder="Owner..."
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <select
                      value={item.status || 'Open'}
                      onChange={(e) => updateItem(item.id, 'status', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Mitigated</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-bold text-xl"
                      title="Delete item"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Export CTA */}
      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Want to export this RAID log?</h3>
        <p className="text-gray-600 mb-4">
          Upgrade to Pro to download as CSV, Excel, or PDF and sync with your PM tools.
        </p>
        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition">
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}