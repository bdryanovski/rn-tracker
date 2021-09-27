import { createAction, createReducer } from '@reduxjs/toolkit';

import { Collections } from '../../database';

const initialState = {
  list: [],
};

const fetchTracks = createAction('fetchTracks');
const updateTrack = createAction('updateTrack');

export const actions = {
  fetchTracks: fetchTracks,
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchTracks, state => {
      state.list = Collections.Tracks.fetch().map(r => r.title);
    })
    .addCase(updateTrack, (state, action) => {
      const { track } = action.payload;
      Collections.Tracks.update(track);
    });
});

export default reducer;
