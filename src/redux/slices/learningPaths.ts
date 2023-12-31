import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ILearningPathState } from '../../@types/learningPath';

const apiUrl = process.env.REACT_APP_API_URL;

const initialState: ILearningPathState = {
    isLoading: false,
    error: null,
    learningPaths: [],
    learningPath: null,
    learningPathProgress: null
}

const learningPathSlice = createSlice({
    name: 'learningPath',
    initialState,
    reducers: {
      // START LOADING
      startLoading(state) {
        state.isLoading = true;
        state.error = null;
      },
      // GET Learning Paths
      getLearningPathsSuccess(state, action) {
        state.isLoading = false;
        state.learningPaths = action.payload;
      },
      // GET Learning path
      getLearningPathSuccess(state, action) {
        state.isLoading = false;
        state.learningPath = action.payload;
      },
      getLearningPathProgressSuccess(state, action) {
        state.isLoading = false;
        state.learningPathProgress = action.payload;
      }
    },
  });

export function getLearningPaths() {
    return async (dispatch: Dispatch) => {
      dispatch(learningPathSlice.actions.startLoading());
      try {
        const response = await fetch(`${apiUrl}/api/learning-paths`).then(response => response.json());
        dispatch(learningPathSlice.actions.getLearningPathsSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  }

  export function getLearningPath(id: string) {
    return async (dispatch: Dispatch) => {
      dispatch(learningPathSlice.actions.startLoading());
      try {
        const response = await fetch(`${apiUrl}/api/learning-paths/${id}`).then(response => response.json());
        dispatch(learningPathSlice.actions.getLearningPathSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  }

  export function getLearningPathByIdAndUserId(id: string, userId: number) {
    return async (dispatch: Dispatch) => {
      dispatch(learningPathSlice.actions.startLoading());
      try {
        const response = await fetch(`${apiUrl}/api/learning-paths/${id}/${userId}`).then(response => response.json());
        dispatch(learningPathSlice.actions.getLearningPathSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  }

  export function getLearningPathProgressByIdAndUserId(id: string, userId: number) {
    return async (dispatch: Dispatch) => {
      dispatch(learningPathSlice.actions.startLoading());
      try {
        const response = await fetch(`${apiUrl}/api/learning-paths/progress/${id}/${userId}`).then(response => response.json());
        dispatch(learningPathSlice.actions.getLearningPathProgressSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  }

export default learningPathSlice.reducer;