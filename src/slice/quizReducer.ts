import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quiz } from '../utils';


const saveInLocalstorage = (data : Quiz[]) => {
  try {
    localStorage.setItem("quizes", JSON.stringify(data));
    alert("Done!")
  } catch (error) {
    console.log(error);
  }
}

const initialValue = () : Quiz[] => {
  const getQuiz = localStorage.getItem("quizes");
  if(getQuiz){
    const data : Quiz[] = JSON.parse(getQuiz);
    return data;
  }

  return [] as Quiz[];
}

export const quizSlice = createSlice({
    name: 'quiz',
    initialState: initialValue(),
    reducers: {
      addQuiz: (state, action: PayloadAction<Quiz>) => {
        state.push(action.payload);

        // return [...state, todo];
      },
      getQuizById: (state, action) => {
        const requiredQuiz = state.filter((item) => (item.id === action.payload));
        return requiredQuiz;
      },
      saveQuiz: (state, action) => {
        console.log(action.payload);
        saveInLocalstorage(state);
      },
      deleteQuiz: (state, action) => {
        const id = action.payload;
        const newState = state.filter((item) => (item.id!=id));
        state = newState;
        saveInLocalstorage(newState); 
      } 
    },
  }
);

// this is for dispatch
export const { addQuiz, getQuizById, saveQuiz, deleteQuiz } = quizSlice.actions;

// this is for configureStore
export default quizSlice.reducer;