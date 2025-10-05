'use client';

import { useState } from 'react';

export default function AssessmentForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectDescription, setProjectDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: projectDescription }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data.recommendation);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Try Free Assessment →
      </button>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your project (500 characters max)
          </label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value.slice(0, 500))}
            placeholder="Example: Building a mobile app for a food delivery service. Team of 5 developers, 3-month timeline, need to integrate with existing restaurant POS systems..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows="6"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {projectDescription.length}/500 characters
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || projectDescription.length < 20}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Get Recommendations'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setProjectDescription('');
              setResult(null);
              setError(null);
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Error: {error}</p>
        </div>
      )}

      {result && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-green-900">
            AI Recommendations:
          </h3>
          <div className="text-gray-800 whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}