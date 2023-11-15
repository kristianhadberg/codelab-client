import { createSlice, Dispatch } from '@reduxjs/toolkit';


import { ITopicState } from '../../@types/topic';

const initialState: ITopicState = {
    isLoading: false,
    error: null,
    topics: []
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
    },
  });

export function getTopics() {
    return async (dispatch: Dispatch) => {
      dispatch(topicsSlice.actions.startLoading());
      try {
        // const response = await axios.get(`/api/get_badges/${id}`);
        const response = await fetch('http://localhost:5214/api/topics').then(response => response.json());
        console.log(response)
        dispatch(topicsSlice.actions.getTopicsSuccess(response));
        return true;
        // console.log(response.data);
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

export default topicsSlice.reducer;