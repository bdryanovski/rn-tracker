import { configureStore } from '@reduxjs/toolkit';

// Reducers
import tracksReducer, {
  Actions as trackActions,
} from './reducers/tracks.reducer';

import tracksDefinitionReducer, {
  Actions as trackDefinitionActions,
} from './reducers/trackdefinitions.reducer';

// Configure the Application Store.
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
