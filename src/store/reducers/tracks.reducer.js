import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { Collections } from '../../database';

const initialState = {
  list: [],
  timeline: [],
};

export const Actions = {
  fetch: createAsyncThunk('tracks/fetch', async () => {
    const data = await Collections.Tracks.fetchTimeline();
    return data.toJSON();
  }),
  increment: createAction(
    'tracks/increment',
    function incrementTrack(trackId, trackDefinitionId, value) {
      return {
        payload: {
          trackId,
          trackDefinitionId,
          value,
          timestamp: new Date().getTime(),
        },
      };
    },
  ),
  decrement: createAction(
    'tracks/decrement',
    function decrementTrack(trackId, recordId) {
      return {
        payload: {
          trackId,
          recordId,
        },
      };
    },
  ),
};

const Reducer = createReducer(initialState, builder => {
  builder
    .addCase(Actions.fetch.fulfilled, (state, action) => {
      state.timeline = action.payload;
    })
    .addCase(Actions.increment, (state, action) => {
      const { trackId, trackDefinitionId, value } = action.payload;
      Collections.Tracks.addRecord(trackId, {
        trackDefinitionId,
        timestamp: new Date().getTime(),
        value,
      });
    })
    .addCase(Actions.decrement, (state, action) => {
      const { trackId, recordId } = action.payload;
      Collections.Tracks.removeRecord(trackId, recordId);
    });
});

export default Reducer;
