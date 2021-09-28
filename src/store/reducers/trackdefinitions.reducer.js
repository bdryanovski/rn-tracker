import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { Collections } from '../../database';

const initialState = {
  list: [],
};

const fetchTrackDefinitions = createAsyncThunk(
  'fetchTrackDefinitions',
  async () => {
    const data = await Collections.TrackDefinition.fetch();
    return data.toJSON();
  },
);

export const actions = {
  fetchTrackDefinitions: fetchTrackDefinitions,
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(fetchTrackDefinitions.fulfilled, (state, action) => {
    state.list = action.payload;
  });
});

export default reducer;
