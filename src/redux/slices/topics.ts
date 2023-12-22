import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ITopicState } from '../../@types/topic';

const apiUrl = process.env.REACT_APP_API_URL;

const initialState: ITopicState = {
    isLoading: false,
    error: null,
    topics: [],
    topic: null
}

const topicsSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
      // START LOADING
      startLoading(state) {
        state.isLoading = true;
        state.error = null;
      },
      // GET Topics
      getTopicsSuccess(state, action) {
        state.isLoading = false;
        state.topics = action.payload;
      },
      // GET Topic
      getTopicSuccess(state, action){
        state.isLoading = false;
        state.topic = action.payload;
      }
    },
  });

export function getTopics() {
    return async (dispatch: Dispatch) => {
      dispatch(topicsSlice.actions.startLoading());
      try {
        const response = await fetch(`${apiUrl}/api/topics`).then(response => response.json());
        dispatch(topicsSlice.actions.getTopicsSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  }

  export function getTopicsByLearningPathId(learningPathId: string) {
    return async (dispatch: Dispatch) => {
      dispatch(topicsSlice.actions.startLoading());
      try {
        const response = await fetch(`${apiUrl}/api/topics/learning-path/${learningPathId}`).then(response => response.json());
        dispatch(topicsSlice.actions.getTopicsSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  }

  export function getTopic(id: string) {
    return async (dispatch: Dispatch) => {
      dispatch(topicsSlice.actions.startLoading());
      try {
        const response = await fetch(`${apiUrl}/api/topics/${id}`).then(response => response.json());
        dispatch(topicsSlice.actions.getTopicSuccess(response));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  }

export default topicsSlice.reducer;