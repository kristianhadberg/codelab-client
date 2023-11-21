import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ISubmission, ISubmissionState } from '../../@types/submission';
import { Newspaper } from '@mui/icons-material';

const initialState: ISubmissionState = {
    isLoading: false,
    error: null,
    submissions: [],
}

const submissionsSlice = createSlice({
    name: 'submission',
    initialState,
    reducers: {
      // START LOADING
      startLoading(state) {
        state.isLoading = true;
        state.error = null;
      },
      // GET Submissions
      getSubmissionsSuccess(state, action) {
        state.isLoading = false;
        state.submissions = action.payload;
      },
      // POST submission
      postSubmissionsSuccess(state, action) {
        const newSubmission = action.payload;
        state.isLoading = false;
        state.submissions = [newSubmission, ...state.submissions]
      }
    },
  });

export function getSubmissions() {
    return async (dispatch: Dispatch) => {
      dispatch(submissionsSlice.actions.startLoading());
      try {
        const response = await fetch(`http://localhost:5214/api/submissions`).then(response => response.json());
        dispatch(submissionsSlice.actions.getSubmissionsSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  }

export function createSubmission(submission: ISubmission) {
    const obj = {
        submittedCode: submission.submittedCode,
        exerciseId: submission.exerciseId,
    }

    return async (dispatch: Dispatch) => {
        dispatch(submissionsSlice.actions.startLoading());
        try {
          const response = await fetch(`http://localhost:5214/api/submissions`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        }).then(response => response.json());
          dispatch(submissionsSlice.actions.postSubmissionsSuccess(response));
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      };
}

export default submissionsSlice.reducer;