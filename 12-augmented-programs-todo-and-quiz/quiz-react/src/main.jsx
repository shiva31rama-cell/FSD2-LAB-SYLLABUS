import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const questions = [
  { q: 'Which hook stores state?', options: ['useState', 'useRoute', 'useHTML'], answer: 'useState' },
  { q: 'Which method is used to find MongoDB documents?', options: ['find()', 'show()', 'open()'], answer: 'find()' },
  { q: 'Express is mainly used for?', options: ['Server-side web apps', 'Image editing', 'Operating systems'], answer: 'Server-side web apps' }
];

function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function answer(choice) {
    if (choice === questions[index].answer) setScore(score + 1);
    if (index === questions.length - 1) setFinished(true); else setIndex(index + 1);
  }

  return <main style={{fontFamily:'Arial',maxWidth:700,margin:'50px auto',padding:24,border:'1px solid #aaa'}}>
    <h1>FSD2 React Quiz</h1>
    {finished ? <h2>Final Score: {score} / {questions.length}</h2> : <>
      <p>Question {index + 1} of {questions.length}</p>
      <h2>{questions[index].q}</h2>
      {questions[index].options.map(option => <button key={option} onClick={() => answer(option)} style={{display:'block',margin:'10px 0',padding:10}}>{option}</button>)}
    </>}
  </main>;
}
createRoot(document.getElementById('root')).render(<App />);
