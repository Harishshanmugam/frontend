// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.126.19:5000/analyze', { text });
      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing text:', error);
      alert('Error analyzing text. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Social Media Sentiment Analyzer for Small Businesses
      </h1>
      
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your Instagram post/comment here..."
          className="w-full p-3 border rounded-lg h-32"
        />
      </div>

      <button
        onClick={analyzeSentiment}
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Analysis Results</h2>
            <p><strong>Sentiment:</strong> <span className="capitalize">{result.sentiment}</span></p>
            <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">AI Business Recommendations</h3>
            <div className="whitespace-pre-wrap">{result.genai_suggestions}</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Model Consensus</h3>
            <ul>
              {Object.entries(result.model_breakdown).map(([model, sentiment]) => (
                <li key={model} className="capitalize">
                  {model}: {sentiment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;