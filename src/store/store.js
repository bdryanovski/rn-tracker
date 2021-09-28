import { configureStore } from '@reduxjs/toolkit';

// Reducers
import tracksReducer, {
  actions as trackActions,
} from './reducers/tracks.reducer';

import tracksDefinitionReducer, {
  actions as trackDefinitionActions,
} from './reducers/trackdefinitions.reducer';

function configureAppStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      tracks: tracksReducer,
      tracksDefinitions: tracksDefinitionReducer,
    },
    preloadedState,
  });

  return store;
}

export const Store = configureAppStore();

export const Actions = {
  tracks: { ...trackActions },
  trackDefinitions: { ...trackDefinitionActions },
};
