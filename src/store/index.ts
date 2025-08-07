import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobsReducer from './slices/jobsSlice';
import coursesReducer from './slices/coursesSlice';
import userReducer from './slices/userSlice';
import careerPathsReducer from './slices/careerPathsSlice';
import mentorsReducer from './slices/mentorsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    courses: coursesReducer,
    user: userReducer,
    careerPaths: careerPathsReducer,
    mentors: mentorsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;