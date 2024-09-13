import { useNavigate, useParams } from "react-router-dom";
import StartQuizDetails from "../../components/StartQuizDetails";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import QuestionDisplay from "../../components/QuestionDisplay";
import { Quiz } from "../../utils";

const Play = () => {
    const navigate = useNavigate();
    const { quizid } = useParams();
    const [quizStarted, setQuizStarted] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const quizstate = useSelector((state : RootState) => state.quiz);

    const currentQuiz : Quiz = quizstate.filter((item) => item.id === quizid)[0];

    // ---------------- To check wether it is a valid endpoint ---------------------
    useLayoutEffect(() => {
      if(!quizid){
        navigate('/play');
        alert("No id found, Some error occured");
      }

      // validate

      return () => {}
    }, [])

    const setNameEmail = (name : string, email : string) => {
      setName(name);
      setEmail(email);
    }

    return (
      <div>
        {
          !quizStarted ?
          <StartQuizDetails 
            quizid = {quizid}
            setQuizStarted = {setQuizStarted}
            setNameEmail={setNameEmail}
           />
          :
          <QuestionDisplay 
            questions={currentQuiz.questions}
            marksPerQuestion={currentQuiz.settings.marksPerQuestion}
            hours={currentQuiz.settings.hours}
            minutes={currentQuiz.settings.minutes}
            seconds={currentQuiz.settings.seconds}
            details={{name, email}}
          />
        }
      </div>
    )
}

export default Play
