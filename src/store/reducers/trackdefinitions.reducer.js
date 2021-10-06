import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

import { Collections } from '../../database';

const initialState = {
  list: [],
};

export const Actions = {
  fetch: createAsyncThunk('track.definition/fetch', async () => {
    const data = await Collections.TrackDefinition.fetch();
    return data.toJSON();
  }),
};

const Reducer = createReducer(initialState, builder => {
  builder.addCase(Actions.fetch.fulfilled, (state, action) => {
    state.list = action.payload;
  });
});

export default Reducer;
