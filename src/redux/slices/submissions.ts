import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ISubmission, ISubmissionState } from '../../@types/submission';
import { error } from 'console';

const initialState: ISubmissionState = {
    isLoading: false,
    isSubmitting: false,
    passed: null,
    error: null,
    submissions: [],
    testCases: [],
}

const submissionsSlice = createSlice({
    name: 'submission',
    initialState,
    reducers: {
      // START LOADING
      startLoading(state) {
        state.isLoading = true;
        state.passed = null;
        state.error = null;
      },
      startSubmitting(state) {
        state.isSubmitting = true;
        state.passed = null;
        state.testCases = [];
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
        state.passed = true;
        state.isSubmitting = false;
        state.submissions = [newSubmission, ...state.submissions]
      },
      postSubmissionFailed(state, action,) {
        state.isSubmitting = false;
        state.passed = false;
        state.testCases = action.payload;
      },
      clearPassedState(state) {
        state.passed = null;
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
        dispatch(submissionsSlice.actions.startSubmitting());
        try {
            const response = await fetch(`http://localhost:5214/api/submissions`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            if (!response.ok) {
                // Check for non-2xx status codes
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            if (responseData.status.description === "Accepted") {
              dispatch(submissionsSlice.actions.postSubmissionsSuccess(responseData.stdout));
            } else {
              dispatch(submissionsSlice.actions.postSubmissionFailed(responseData.stdout));
            }
            return true;
        } catch (error) {
            console.log(error)
            dispatch(submissionsSlice.actions.postSubmissionFailed([]));
            return false;
        }
    };
}

export function clearPassedState() {
    return async (dispatch: Dispatch) => {
        dispatch(submissionsSlice.actions.clearPassedState());
    }
}

export default submissionsSlice.reducer;