import { createSlice, Dispatch } from '@reduxjs/toolkit';


import { ILearningPathState } from '../../@types/learningPath';

const initialState: ILearningPathState = {
    isLoading: false,
    error: null,
    learningPaths: [],
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
      // GET Learning Path
      getLearningPathsSuccess(state, action) {
        state.isLoading = false;
        state.learningPaths = action.payload;
      },
    },
  });

export function getLearningPaths() {
    return async (dispatch: Dispatch) => {
      dispatch(learningPathSlice.actions.startLoading());
      try {
        const response = await fetch('http://localhost:5214/api/learning-paths').then(response => response.json());
        dispatch(learningPathSlice.actions.getLearningPathsSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        // let errorMessage = '';
        // if (error?.errors?.json._schema) {
        //   errorMessage = error?.errors?.json._schema[0];
        // } else if (error?.errors?.json) {
        //   errorMessage = error?.errors.json[Object.keys(error?.errors.json)[0]];
        // } else {
        //   errorMessage = error?.message;
        // }
        // dispatch(slice.actions.hasError(errorMessage));
        return false;
      }
    };
  }

//   export function getTopic(id: string) {
//     return async (dispatch: Dispatch) => {
//       dispatch(topicsSlice.actions.startLoading());
//       try {
//         const response = await fetch(`http://localhost:5214/api/topics/${id}`).then(response => response.json());
//         dispatch(topicsSlice.actions.getTopicSuccess(response));
//         return true;
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     };
//   }

export default learningPathSlice.reducer;