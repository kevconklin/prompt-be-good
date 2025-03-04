import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { initialPrompt } from './constants';
import { generatePrompt } from './services/openai';

function App() {
  const [formData, setFormData] = useState({
    mainPurpose: '',
    expectedOutputs: '',
    specialRequirements: '',
    specificFeatures: '',
    qualityStandards: '',
    formatRequirements: '',
    performanceExpectations: ''
  });
  
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userRequirements = `
      - Main purpose/goal: ${formData.mainPurpose}
      - Expected outputs/results: ${formData.expectedOutputs}
      - Special requirements (technical, format, safety, etc.): ${formData.specialRequirements}
      - Any specific features needed: ${formData.specificFeatures}
      - Quality standards expected: ${formData.qualityStandards}
      - Format requirements: ${formData.formatRequirements}
      - Performance expectations: ${formData.performanceExpectations}
      `;
      
      const response = await generatePrompt(initialPrompt, userRequirements);
      setGeneratedPrompt(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate prompt. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-indigo-400 mr-2" />
            <h1 className="text-3xl font-bold text-white">Prompt Be Good</h1>
          </div>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            Enhance your AI prompts by providing detailed requirements. Our tool will generate an optimized prompt tailored to your needs.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">Prompt Requirements</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="mainPurpose" className="block text-sm font-medium text-gray-300 mb-1">
                  Main purpose/goal
                </label>
                <textarea
                  id="mainPurpose"
                  name="mainPurpose"
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                  value={formData.mainPurpose}
                  onChange={handleChange}
                  placeholder="What is the main goal of your prompt?"
                  required
                />
              </div>

              <div>
                <label htmlFor="expectedOutputs" className="block text-sm font-medium text-gray-300 mb-1">
                  Expected outputs/results
                </label>
                <textarea
                  id="expectedOutputs"
                  name="expectedOutputs"
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                  value={formData.expectedOutputs}
                  onChange={handleChange}
                  placeholder="What results do you expect from this prompt?"
                  required
                />
              </div>

              <div>
                <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-300 mb-1">
                  Special requirements
                </label>
                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  placeholder="Any technical, format, or safety requirements?"
                  required
                />
              </div>

              <div>
                <label htmlFor="specificFeatures" className="block text-sm font-medium text-gray-300 mb-1">
                  Specific features needed
                </label>
                <textarea
                  id="specificFeatures"
                  name="specificFeatures"
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                  value={formData.specificFeatures}
                  onChange={handleChange}
                  placeholder="What specific features should the prompt include?"
                  required
                />
              </div>

              <div>
                <label htmlFor="qualityStandards" className="block text-sm font-medium text-gray-300 mb-1">
                  Quality standards expected
                </label>
                <textarea
                  id="qualityStandards"
                  name="qualityStandards"
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                  value={formData.qualityStandards}
                  onChange={handleChange}
                  placeholder="What quality level do you expect?"
                  required
                />
              </div>

              <div>
                <label htmlFor="formatRequirements" className="block text-sm font-medium text-gray-300 mb-1">
                  Format requirements
                </label>
                <textarea
                  id="formatRequirements"
                  name="formatRequirements"
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                  value={formData.formatRequirements}
                  onChange={handleChange}
                  placeholder="What format should the output follow?"
                  required
                />
              </div>

              <div>
                <label htmlFor="performanceExpectations" className="block text-sm font-medium text-gray-300 mb-1">
                  Performance expectations
                </label>
                <textarea
                  id="performanceExpectations"
                  name="performanceExpectations"
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                  value={formData.performanceExpectations}
                  onChange={handleChange}
                  placeholder="What performance level do you expect?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-3 px-4 flex items-center justify-center rounded-md text-white font-medium ${
                  isFormValid && !loading ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-800 cursor-not-allowed'
                } transition-colors duration-200`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Get Prompt
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">Generated Prompt</h2>
            {error && (
              <div className="bg-red-900/50 text-red-300 p-4 rounded-md mb-4 border border-red-700">
                {error}
              </div>
            )}
            {generatedPrompt ? (
              <div className="prose max-w-none">
                <pre className="bg-gray-900/50 p-4 rounded-md overflow-auto text-sm whitespace-pre-wrap text-gray-300 border border-gray-700">
                  {generatedPrompt}
                </pre>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedPrompt);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-indigo-500 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Copy to Clipboard
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900/50 p-6 rounded-md text-gray-400 text-center h-full flex flex-col items-center justify-center border border-gray-700">
                <Sparkles className="h-12 w-12 text-indigo-400 mb-4" />
                <p>Fill out the form and click "Get Prompt" to generate an optimized prompt.</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>Prompt Be Good © 2025 | Enhance your AI interactions</p>
        </footer>
      </div>
    </div>
  );
}

export default App;