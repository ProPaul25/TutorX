import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [numQuestions, setNumQuestions] = useState(3); // State for number of questions

  // Handle summarization
  const handleSummarize = async () => {
    const response = await fetch('http://localhost:5000/generate-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setSummary(data.summary);
  };

  // Handle quiz generation
  const handleQuiz = async () => {
    const response = await fetch('http://localhost:5000/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text,
        numQuestions, // Send number of questions to backend
      }),
    });
    const data = await response.json();
    setQuiz(data.questions);
    setSelectedAnswers({});
    setShowResults(false);
  };

  // Handle answer selection
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (!showResults) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionIndex]: optionIndex,
      }));
    }
  };

  // Calculate quiz score
  const calculateScore = () => {
    return quiz.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.answer ? 1 : 0);
    }, 0);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>AI Study Assistant</h1>
        <p>Transform any text into summaries & quizzes</p>
      </header>

      <div className="main-container">
        <div className="input-section">
          <textarea
            placeholder="Paste your study material here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="action-buttons">
            <button className="btn summarize-btn" onClick={handleSummarize}>
              📝 Generate Summary
            </button>
              </div>
              <div className="action-buttons">
            <div className="quiz-controls">
              <div className="num-questions-selector">
                <label>Number of Questions:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={numQuestions}
                  onChange={(e) => 
                    setNumQuestions(Math.max(1, Math.min(10, e.target.valueAsNumber)))
                  }
                />
              </div>
              <button className="btn quiz-btn" onClick={handleQuiz}>
                ❓ Generate Quiz
              </button>
            </div>
          </div>
        </div>

        {summary && (
          <div className="summary-section">
            <h2>Summary</h2>
            <div className="summary-content">{summary}</div>
          </div>
        )}

        {quiz.length > 0 && (
          <div className="quiz-section">
            <h2>Quiz</h2>
            <div className="quiz-questions">
              {quiz.map((q, idx) => (
                <div key={idx} className="question-card">
                  <h3>Question {idx + 1}: {q.question}</h3>
                  <div className="options-grid">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        className={`option-btn 
                          ${selectedAnswers[idx] === optIdx ? 'selected' : ''}
                          ${showResults ? 
                            (optIdx === q.answer ? 'correct' : 'incorrect') : ''}`}
                        onClick={() => handleAnswerSelect(idx, optIdx)}
                        disabled={showResults}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {!showResults && (
              <button 
                className="btn submit-btn"
                onClick={() => setShowResults(true)}
                disabled={Object.keys(selectedAnswers).length !== quiz.length}
              >
                🚀 Submit Answers
              </button>
            )}

            {showResults && (
              <div className="results-section">
                <h3>Your Score: {calculateScore()} / {quiz.length}</h3>
                <button 
                  className="btn retry-btn"
                  onClick={() => setShowResults(false)}
                >
                  🔄 Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;