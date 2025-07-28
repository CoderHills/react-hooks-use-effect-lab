import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Stop timer if timeRemaining has reached 0
    if (timeRemaining === 0) {
      setTimeRemaining(10);  // Reset timer
      onAnswered(false);     // Notify parent that time ran out
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup to avoid multiple timers running
    return () => clearTimeout(timeoutId);
  }, [timeRemaining, onAnswered]);  // Dependencies array

  return (
    <div>
      <h2>{question.prompt}</h2>
      <ul>
        {question.answers.map((answer) => (
          <li key={answer}>
            <button onClick={() => onAnswered(answer === question.correctAnswer)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
      <p>{timeRemaining} seconds remaining</p>
    </div>
  );
}

export default Question;
