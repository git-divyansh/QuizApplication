import QuizCreation from "../../components/QuizCreation";
import ViewQuizes from "../../components/ViewQuizes";
import Home from "../home";

const Functional = ({activeFunction , setActiveFunction }: { activeFunction: string, setActiveFunction : any }) => {
    const chooseComponent = () => {    
        switch (activeFunction) {
            case "1":
                return <QuizCreation setActiveFunction = {setActiveFunction} />;
            case "3" :
                return <ViewQuizes />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="bg-neutral-800 h-full">
            {chooseComponent()}
        </div>
    );
};

export default Functional;
