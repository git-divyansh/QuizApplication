import React, { useState } from 'react';

import { QuizSettingsProps } from '../utils';

const QuizSettingsForm = ({ onSubmit } : {
    onSubmit : (data : QuizSettingsProps) => void
}) => {

    // ----------------------- USE STATES FOR BAISC QUIZ SETTINGS (DURATION, MARKS PER QUES)------------------
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [marksPerQuestion, setMarksPerQuestion] = useState<number>(0);


//   -------------------------- SAVING SETTINGS ---------------------------------
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if((!hours && !minutes && !seconds)){
        alert("Select proper time");
        return;
    }
    if(!marksPerQuestion){
        alert("Select marks per question");
        return;
    }
    const obj : QuizSettingsProps = { hours, minutes, seconds, marksPerQuestion };
    onSubmit(obj);

    // RESETTING

    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMarksPerQuestion(0);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-neutral-900 rounded-lg shadow-md text-white font-Inter">
      <h2 className="text-xl font-bold mb-4">Quiz Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="hours" className="block ">Hours</label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded text-black"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="minutes" className="block ">Minutes</label>
          <input
            type="number"
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded text-black"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="seconds" className="block">Seconds</label>
          <input
            type="number"
            id="seconds"
            value={seconds} 
            onChange={(e) => setSeconds(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded text-black"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="marksPerQuestion" className="block ">Marks per Question</label>
          <input
            type="number"
            id="marksPerQuestion"
            value={marksPerQuestion}
            onChange={(e) => setMarksPerQuestion(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded text-black"
            min="0"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-600 text-white p-3 rounded-lg w-full active:scale-95"
        >
          Submit
        </button>

        <p className="text-center md:text-xl">Submit the quiz sitting form before proceeding !!</p>
      </form>
    </div>
  );
};

export default QuizSettingsForm;
