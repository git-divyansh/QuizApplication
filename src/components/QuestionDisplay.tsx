import React, { useState, useEffect } from 'react';
import { Question } from '../utils'; // Assuming this contains the Question interface
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { ResultAnalysis } from '../utils';

interface QuizProps {
  questions: Question[];
  hours: number;
  minutes: number;
  seconds: number;
  marksPerQuestion: number;
  details : {
    name : string,
    email : string
  }
}

const QuestionDisplay: React.FC<QuizProps> = ({ questions, hours, minutes, seconds, marksPerQuestion, details }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[][]>(questions.map(() => [])); // Array of arrays for multi-select
  const [timeLeft, setTimeLeft] = useState<number>(hours * 3600 + minutes * 60 + seconds); // Time in seconds
  const [timerExpired, setTimerExpired] = useState<boolean>(false);
  const navigate = useNavigate();

  // Timer countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
        setTimerExpired(true);
        calculateScore(); // Auto-submit when time expires
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time for display
  const formatTime = (time = timeLeft) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle multiple option selection/unselection
  const handleOptionClick = (questionIndex: number, option: string) => {
    const newAnswers = [...selectedAnswers];
    const selected = newAnswers[questionIndex];
    const isSelected = selected.includes(option);
    if (isSelected) {
      newAnswers[questionIndex] = selected.filter(i => i !== option); // Unselect if already selected
    } else {
      newAnswers[questionIndex] = [...selected, option]; // Select multiple options
    }
    setSelectedAnswers(newAnswers);
  };

  // Calculate score and result analysis
  const calculateScore = () => {
    let score = 0;
    let right = 0;
    let wrong = 0;
    let partiallyCorrect = 0;

    questions.forEach((question, index) => {
      const selected = selectedAnswers[index];
      const correctAnswers = question.options.filter(opt => opt.isCorrect).map((item) => item.text);
      const allCorrect = selected.every(opt => correctAnswers.includes(opt)) && correctAnswers.length === selected.length;
      const partiallyCorrectAnswers = selected.filter(opt => correctAnswers.includes(opt)).length;

      if (allCorrect) {
        score += marksPerQuestion;
        right++;
      } else if (partiallyCorrectAnswers > 0) {
        score += marksPerQuestion / 2;
        partiallyCorrect++;
      } else {
        wrong++;
      }
    });
    const timeElapsed = (hours * 3600 + minutes * 60 + seconds) - timeLeft;
    const timeTaken = formatTime(timeElapsed);
    const result: ResultAnalysis = { right, wrong, partiallyCorrect, timeTaken};
    console.log(score);
    console.log(result);
    
    navigate('/results', { state: { result, score, details }, replace: true }); // Redirect to results screen
  };

  useEffect(() => {
    if (timerExpired) {
      calculateScore(); // Auto-submit on timer expiry
    }
  }, [timerExpired]);

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center font-Inter">
      <div className="flex justify-between items-center mb-4 text-white w-full">
        <h2 className="text-xl font-bold">Quiz</h2>
        <p className="text-lg font-bold">Time Left: {formatTime()}</p>
      </div>

      <div className="w-11/12 md:w-1/2 flex flex-col justify-center">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-lg">
            <p className="text-black text-lg font-semibold mb-4">
              {questionIndex + 1}. {question.questionText}
            </p>
            <div className="grid gap-2">
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleOptionClick(questionIndex, option.text)}
                  className={`p-2 rounded border ${
                    selectedAnswers[questionIndex].includes(option.text)
                      ? 'bg-blue-200 text-black border-blue-500'
                      : 'bg-gray-200 text-black border-gray-300'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={calculateScore}
          className="bg-green-400 text-black p-3 rounded-lg"
          disabled={timerExpired}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuestionDisplay;
