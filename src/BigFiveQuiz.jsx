import React, { useState } from "react";

export default function BigFiveQuiz() {
  const [answers, setAnswers] = useState(Array(10).fill(3));
  const [showResults, setShowResults] = useState(false);
  const traits = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];
  
  const questions = [
    "I enjoy trying new activities and exploring different ideas.",
    "I prefer routine and familiar experiences over novelty.",
    "I am highly organized and always follow through on my plans.",
    "I tend to be spontaneous and act without much planning.",
    "I feel energized by social interactions and enjoy being around people.",
    "I prefer spending time alone rather than in large groups.",
    "I am compassionate and try to get along well with others.",
    "I can be critical and prefer to speak my mind, even if it upsets people.",
    "I often feel anxious, stressed, or moody.",
    "I remain calm and composed even in difficult situations."
  ];
  
  const reverseIndices = [1, 3, 5, 7, 9];
  
  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateResults = () => {
    const scores = Array(5).fill(0);
    for (let i = 0; i < 5; i++) {
      const posIndex = i * 2;
      const revIndex = i * 2 + 1;
      const reverseScore = reverseIndices.includes(revIndex) ? 6 - answers[revIndex] : answers[revIndex];
      scores[i] = (answers[posIndex] + reverseScore) / 2;
    }
    return scores;
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Big Five Personality Quiz</h2>
      {!showResults ? (
        <>
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="mb-2 text-gray-700">{question}</p>
              <select
                value={answers[index]}
                onChange={(e) => handleChange(index, parseInt(e.target.value))}
                className="border p-2 rounded w-full bg-gray-50"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          ))}
          <button
            onClick={() => setShowResults(true)}
            className="bg-blue-500 text-white p-2 rounded w-full mt-4 hover:bg-blue-600 transition"
          >
            Get Results
          </button>
        </>
      ) : (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-medium mb-3 text-center">Your Personality Scores</h3>
          {calculateResults().map((score, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium">{traits[i]}</p>
              <div className="w-full bg-gray-300 h-4 rounded overflow-hidden">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(score / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">Score: {score.toFixed(2)}/5</p>
            </div>
          ))}
          <button
            onClick={() => setShowResults(false)}
            className="bg-gray-500 text-white p-2 rounded w-full mt-4 hover:bg-gray-600 transition"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}
