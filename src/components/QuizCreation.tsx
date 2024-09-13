import { useEffect, useState } from "react"
import { Question, Quiz } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { addQuiz, saveQuiz } from "../slice/quizReducer";
import { RootState } from "../store";
import { FaTrashAlt } from "react-icons/fa";
import QuizSettingsForm from "./QuizSettingForm";
import { QuizSettingsProps } from '../utils';


const QuizCreation = ({setActiveFunction} : {setActiveFunction : any}) => {
  
  const quizState = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();

  // ------------------- Current component states -----------------------
  const [quizName, setQuizName] = useState("");
  
  const [quiz, setQuiz] = useState<Quiz>({
    id : uuidv4(),
    quizName : "",
    questions : [],
    settings : {
      hours : 0,
      minutes : 0,
      marksPerQuestion : 0,
      seconds : 0
    }
  });

  const [questions, setQuestions] = useState<Question[]>([
      {
          questionText: "",
          options: [
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
              { text: "", isCorrect: false }
          ]
      }
  ]);

  //--------------------To update the quizState every time quiz changes---------------
  useEffect(() => {
    console.log(quizState);
  }, [quizState])

  // ---------------------- Handle Play QUiz ---------------------------

  const handlePLayQuiz = () => {
  // Redirect to viewQuizes
    setActiveFunction('3');
  }


  // ---------------Handle Quizname change---------------
  const handleQuizNameChange = (e:any) => {
    setQuizName(e.target.value);
  }

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].options[optionIndex].text = value;
      setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (questionIndex: number, optionIndex: number) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].options[optionIndex].isCorrect = !newQuestions[questionIndex].options[optionIndex].isCorrect;
      setQuestions(newQuestions);
  };

  //------------------------- Function to add a new question -------------------
  const addNewQuestion = () => {
      let arrUnfilled = "";
      questions.forEach((item, id) => {
        let count = 0;
        item.options.forEach(opt =>{
          if(opt.isCorrect)
            count++;
        })
        if(!item.questionText || count === 0)
          arrUnfilled += id.toString() + ',';
      })

      if(arrUnfilled){
        alert(`${arrUnfilled} not properly filled`);
        return;
      }
      setQuestions([
          ...questions,
          {
              questionText: "",
              options: [
                  { text: "", isCorrect: false },
                  { text: "", isCorrect: false },
                  { text: "", isCorrect: false },
                  { text: "", isCorrect: false }
              ]
          }
      ]);
  };

  // --------------- Handle form submission (e.g., send data to API or log it)------------------
  const handleSubmit = (e: any) => {
    if(!quizName){
      alert("provide name for the quiz");
      return;
    }
    e.preventDefault();
    const quizCurrent = {...quiz, 
      quizName : quizName,
      questions: questions,
    }
    setQuiz(quizCurrent);
    dispatch(addQuiz(quizCurrent));
    dispatch(saveQuiz("1"));
  };

  const handleQuizSettingForm = (data : QuizSettingsProps) => {
    setQuiz(prev => (
      {
        ...prev,
        settings : data
      }
    ))
  }

  // ---------------------- Handle delete questions --------------------
  const handleDeleteQuestion = (id : number) => {
    setQuestions(questions.filter((_, idx) => idx !== id));
  }

  return (
    <div className="p-5 bg-neutral-800 font-Inter w-full">
      {/*-------------------- Play button ------------------*/}
      <div className="bg-neutral-900 pt-10 rounded-lg flex flex-col justify-center items-center box-border p-5">
        <div className="w-full gap-2 p-5">
          <p className="text-white text-xs text-center">Enter some questions and ready to play!</p>
        </div>
        <button className="text-white p-5 bg-yellow-600 rounded-lg" onClick={handlePLayQuiz}>Play</button>
      </div>  

      {/* --------------------- Heading Start----------------------*/}
      <div className="">
        <p className="text-center py-10 uppercase text-xl md:text-4xl">
          <span className="text-white">Quiz questions </span>
          <span className="text-yellow-600">Form</span>
        </p>
      </div>

      {/* -------------------------- Quiz naming section--------------------- */}
      <div className="flex flex-col justify-center items-center gap-2 my-4">
        <label className="text-white">Provide quiz name : </label>
        <input type="text" value={quizName} 
          placeholder="Enter quiz name" 
          className="border py-1 px-5 rounded w-1/3 mb-2"
          onChange={handleQuizNameChange}
          />
      </div>

      {/* --------------------- Quiz setting form ------------------------- */}
      <div className="my-5">
        <QuizSettingsForm 
          onSubmit={handleQuizSettingForm}
        />
      </div>

      <div className="md:flex gap-2 h-fit box-border">
        <div className="bg-neutral-900 md:w-1/3 rounded-lg box-border">
          <p className="text-xl p-2 text-white text-center">Questions</p>
          <div className="flex flex-col gap-2">
                {
                questions[0].questionText ?
                questions.map((ques, idx) => 
                    (    
                      <div className="mx-3 bg-white rounded py-1 px-4 flex justify-between items-center" key={idx}>
                        <p className="flex justify-start items-center">
                          <span>Q{idx+1}.</span> 
                          <span className="text-ellipsis">{ques.questionText}</span>
                        </p>
                        <FaTrashAlt size={18} className="cursor-pointer active:scale-95"
                        onClick={() => handleDeleteQuestion(idx)}></FaTrashAlt>
                      </div>
                    )
                  )
                  :
                  null
                }
          </div>
        </div>
        {/*-------------------- Questions start ----------------------*/}
        <div className="flex flex-col md:w-2/3 bg-neutral-900 rounded-lg w-fit box-border p-5">
        <p className="text-white text-center p-4 text-3xl">{quizName}</p>
        <form onSubmit={handleSubmit}>
            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mb-6">
                    <label>
                        <span className="text-white">Question {questionIndex + 1}:</span>
                        <input
                            type="text"
                            value={question.questionText}
                            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                            placeholder={`Enter question ${questionIndex + 1}`}
                            required
                        />
                    </label>

                    <div>
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) =>
                                        handleOptionChange(questionIndex, optionIndex, e.target.value)
                                    }
                                    className="border p-2 rounded w-3/4"
                                    placeholder={`Option ${optionIndex + 1}`}
                                    required
                                />
                                <label className="ml-2">
                                    <input
                                        type="checkbox"
                                        checked={option.isCorrect}
                                        onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
                                    />
                                    <span className="text-white px-2">Correct</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/*--------------------------- Button to add new questions----------------------- */}
            <button
                type="button"
                onClick={addNewQuestion}
                className="flex items-center bg-yellow-600 text-white p-2 rounded active:scale-95"
            >
                <FaPlus className="mr-2" />
                Add Question
            </button>
        </form>
        </div>

      </div>
      <div className="flex justify-center">   
          <button type="submit" className="mt-4 bg-yellow-600 text-white p-2 rounded
            active:scale-95"
            onClick={(e)=>handleSubmit(e)}
          >
              Submit Quiz
          </button>
      </div>
    </div>

  )
}

export default QuizCreation
