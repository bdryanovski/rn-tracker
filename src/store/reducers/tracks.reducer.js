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

const fetchTracks = createAction('fetchTracks');

const fetchTimeline = createAsyncThunk('fetchTimeline', async () => {
  const data = await Collections.Tracks.fetchTimeline();
  return data.toJSON();
});

const incrementTrack = createAction(
  'incrementTrack',
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
);

const decrementTrack = createAction(
  'decrementTrack',
  function decrementTrack(trackId, recordId) {
    return {
      payload: {
        trackId,
        recordId,
      },
    };
  },
);

export const actions = {
  fetchTimeline: fetchTimeline,
  fetchTracks: fetchTracks,
  incrementTrack: incrementTrack,
  decrementTrack: decrementTrack,
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchTimeline.fulfilled, (state, action) => {
      state.timeline = action.payload;
    })
    .addCase(fetchTracks, state => {
      // state.list = Collections.Tracks.fetch().map(r => r.toJSON());
    })
    .addCase(incrementTrack, (state, action) => {
      const { trackId, trackDefinitionId, value } = action.payload;
      Collections.Tracks.addRecord(trackId, {
        trackDefinitionId,
        timestamp: new Date().getTime(),
        value,
      });
    })
    .addCase(decrementTrack, (state, action) => {
      const { trackId, recordId } = action.payload;
      Collections.Tracks.removeRecord(trackId, recordId);
    });
});

export default reducer;
