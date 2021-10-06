import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ScreenWrapper from '../components/screen-wrapper';
import Timeline from '../components/timeline';

import { Actions } from '../store/store';

function DashboardScreen({ navigation }) {
  const { timeline, trackDefinitions } = useSelector(state => {
    return {
      timeline: state.tracks.timeline,
      trackDefinitions: state.tracksDefinitions.list,
    };
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(Actions.tracks.fetch());
    dispatch(Actions.trackDefinitions.fetch());
  }, [dispatch]);

  return (
    // <ScreenWrapper>
    <Timeline
      timeline={timeline}
      tracks={trackDefinitions}
      navigation={navigation}
    />
    // </ScreenWrapper>
  );
}

export default DashboardScreen;
