import { configureStore } from '@reduxjs/toolkit';

// Reducers
import tracksReducer, { actions } from './reducers/tracks.reducer';

function configureAppStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      tracks: tracksReducer,
    },
    preloadedState,
  });

  return store;
}

export const Store = configureAppStore();

export const Actions = {
  tracks: { ...actions },
};

// console.log('Actions', Actions, Actions.tracks.fetchTracks());
//
// Store.dispatch(Actions.tracks.fetchTracks());
console.log(Store.getState());
