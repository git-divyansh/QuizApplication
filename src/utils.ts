export interface Option {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    questionText: string;
    options: Option[];
}

export interface Quiz {
    id : string;
    quizName : string;
    questions : Question[],
    settings : QuizSettingsProps
}

export interface ResultAnalysis {
    right: number;
    wrong: number;
    partiallyCorrect: number;
    timeTaken : string
}

export interface results {
    result : ResultAnalysis,
    score : number
}

export interface Records {
    quizid : string,
    name : string,
    email : string,
    result : results
}

export interface QuizSettingsProps {
    hours: number, 
    minutes: number, 
    seconds: number,
    marksPerQuestion: number 
}