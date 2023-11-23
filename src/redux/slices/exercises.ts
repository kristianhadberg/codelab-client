import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { IExerciseState } from '../../@types/exercise';

const initialState: IExerciseState = {
    isLoading: false,
    error: null,
    exercises: [],
    exercise: null,
}

const exercisesSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
      // START LOADING
      startLoading(state) {
        state.isLoading = true;
        state.error = null;
      },
      // GET Exercises
      getExercisesSuccess(state, action) {
        state.isLoading = false;
        state.exercises = action.payload;
      },
      // GET Exercise
      getExerciseSuccess(state, action) {
        state.isLoading = false;
        state.exercise = action.payload;
      }
    },
  });

export function getExercisesByTopicId(topicId: string) {
    return async (dispatch: Dispatch) => {
      dispatch(exercisesSlice.actions.startLoading());
      try {
        const response = await fetch(`http://localhost:5214/api/exercises/topic/${topicId}`).then(response => response.json());
        dispatch(exercisesSlice.actions.getExercisesSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  }

export function getExerciseByid(exerciseId: string) {
    return async (dispatch: Dispatch) => {
      dispatch(exercisesSlice.actions.startLoading());
      try {
        const response = await fetch(`http://localhost:5214/api/exercises/${exerciseId}`).then(response => response.json());
        dispatch(exercisesSlice.actions.getExerciseSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  }


export default exercisesSlice.reducer;