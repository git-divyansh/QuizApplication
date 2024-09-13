import { combineReducers, configureStore } from '@reduxjs/toolkit';
import quizReducer from './slice/quizReducer';

// Combine reducers if needed
const rootReducer = combineReducers({
  quiz: quizReducer,
});

// Configure the store
const store = configureStore({
  reducer: rootReducer,
});

// RootState type for useSelector
export type RootState = ReturnType<typeof rootReducer>;

// Export the store as default
export default store;