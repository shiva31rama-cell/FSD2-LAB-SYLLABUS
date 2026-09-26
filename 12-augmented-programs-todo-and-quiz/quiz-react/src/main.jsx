import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// ------------------------------------------------------------
// Quiz questions
// ------------------------------------------------------------

const questions = [
  {
    question: 'Which hook stores state?',
    options: ['useState', 'useRoute', 'useHTML'],
    answer: 'useState',
  },
  {
    question: 'Which method is used to find MongoDB documents?',
    options: ['find()', 'show()', 'open()'],
    answer: 'find()',
  },
  {
    question: 'Express is mainly used for?',
    options: [
      'Server-side web apps',
      'Image editing',
      'Operating systems',
    ],
    answer: 'Server-side web apps',
  },
];

// ------------------------------------------------------------
// Main App component
// ------------------------------------------------------------

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function handleAnswer(choice) {
    const currentQuestion = questions[questionIndex];

    if (choice === currentQuestion.answer) {
      setScore((currentScore) => currentScore + 1);
    }

    const isLastQuestion = questionIndex === questions.length - 1;

    if (isLastQuestion) {
      setFinished(true);
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
  }

  return (
    <main
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '700px',
        margin: '50px auto',
        padding: '24px',
        border: '1px solid #aaa',
      }}
    >
      <h1>FSD2 React Quiz</h1>

      {finished ? (
        <h2>
          Final Score: {score} / {questions.length}
        </h2>
      ) : (
        <>
          <p>
            Question {questionIndex + 1} of {questions.length}
          </p>

          <h2>{questions[questionIndex].question}</h2>

          {questions[questionIndex].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              style={{
                display: 'block',
                margin: '10px 0',
                padding: '10px',
              }}
            >
              {option}
            </button>
          ))}
        </>
      )}
    </main>
  );
}

// ------------------------------------------------------------
// Render React application
// ------------------------------------------------------------

createRoot(document.getElementById('root')).render(<App />);
