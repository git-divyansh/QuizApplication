import { useSelector } from "react-redux"
import { RootState } from "../store";
import { FaPlay } from "react-icons/fa";

const ViewQuizes = () => {
  const quizState = useSelector((state : RootState) => state);


  const handlePlay = (id : string) => {
    window.open(`/play/${id}`, '_blank');
  }

  return (
    <div className='h-full'>
        <p className="text-center m-5">
            <span className="text-yellow-600 text-4xl">QUIZ</span>    
            <span className="text-white text-2xl">LIST</span>
        </p>     
        <div className=" md:h-1/2 gap-10 self-center flex flex-col justify-center items-center">
                {
                    quizState.quiz.map((item, id) => (
                        <div className="bg-neutral-700 text-white rounded p-5 w-2/3 md:w-1/2 flex justify-between" key={id}>
                            <p className="text-lg md:text-2xl text-ellipsis">Title: {item.quizName}</p>
                            <FaPlay size={30} onClick={()=>handlePlay(item.id)} className="cursor-pointer hover:scale-105"></FaPlay>
                        </div>
                    ))
                }
        </div>   
    </div>
  )
}

export default ViewQuizes
