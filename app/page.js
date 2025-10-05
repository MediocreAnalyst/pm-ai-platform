export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Handles the Paperwork.<br />You Handle the Decisions.
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Stop drowning in status updates and documentation. 
            Let AI handle PM busywork while you focus on what actually matters.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Eliminate Busywork</h3>
            <p className="text-gray-600">
              AI generates status updates, documentation, and reports automatically.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Focus on Strategy</h3>
            <p className="text-gray-600">
              Only see decisions that matter. Everything else is handled.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Transparent AI</h3>
            <p className="text-gray-600">
              Reliability scoring and source attribution for every recommendation.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">
            Get AI-Powered Project Recommendations
          </h2>
          <p className="text-gray-600 mb-6">
            Describe your project and get instant recommendations on process, 
            templates, and documentation needs.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Try Free Assessment →
          </button>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • See results in seconds
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600">
          <p className="text-sm">
            Built for PMs who are tired of documentation theater.
          </p>
        </div>

      </div>
    </div>
  );
}