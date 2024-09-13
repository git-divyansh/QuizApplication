import React from 'react';
import { useLocation } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { ResultAnalysis } from '../../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const Results: React.FC = () => {
  const location = useLocation();
  const { result, score, details } = location.state as { result: ResultAnalysis, score: number, details : {name : string, email : string} };

//   ----------------------- DATA FOR PIE CHART ----------------------------------
  const data = {
    labels: ['Correct', 'Wrong', 'Partially Correct'],
    datasets: [
      {
        data: [result.right, (score == 0 ? 10 : result.wrong), result.partiallyCorrect],
        backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
        borderWidth: 2,
      },  
    ],
  };

  return (
    <div className="w-full flex justify-center items-center font-Inter text-white gap-5">
      <div className="w-full md:w-1/2 ">
        <h2 className="text-xl font-bold p-5 mb-4 text-center">Quiz Results</h2>
        <div className='flex justify-between'>
          <p>Name : {details.name}</p>
          <p>Email : {details.email}</p>
        </div>
        {/* ------------- PIE CHART --------------------------- */}
        <div style={{height : '400px'}} className='mt-4'>
          <Pie data={data} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      {/* ---------------------- SHORT RESULT ANALYSIS */}
      <div className="mt-4 flex flex-col justify-center items-center">
        <p className="text-lg">Your Total Score: {score}</p>
        <p className="text-lg">Correct Answers: {result.right}</p>
        <p className="text-lg">Wrong Answers: {result.wrong}</p>
        <p className="text-lg">Partially Correct Answers: {result.partiallyCorrect}</p>
        <p className="text-lg">Time taken: {result.timeTaken}</p>
      </div>
    </div>
  );
};

export default Results;
