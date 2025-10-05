import SlideViewer from './SlideViewer';
import Link from 'next/link';

export default function RecommendationDisplay({ recommendation, projectDescription }) {
  return (
    <div className="space-y-6">
      <SlideViewer 
        recommendation={recommendation} 
        projectDescription={projectDescription}
      />
      
      {/* Action buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Link href="/templates" className="flex-1">
          <button className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition">
            📄 Generate Templates
          </button>
        </Link>
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition"
        >
          🖨️ Print
        </button>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(recommendation);
            alert('Copied to clipboard!');
          }}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition"
        >
          📋 Copy
        </button>
      </div>

      {/* Upgrade CTA */}
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Want to export and customize this assessment?</h3>
        <p className="text-gray-600 mb-4">
          Upgrade to export to Google Slides, PowerPoint, and unlock unlimited assessments.
        </p>
        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition">
          Upgrade to Pro →
        </button>
      </div>
    </div>
  );
}