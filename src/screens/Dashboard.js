import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
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
    dispatch(Actions.tracks.fetchTimeline());
    dispatch(Actions.trackDefinitions.fetchTrackDefinitions());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Timeline
        timeline={timeline}
        tracks={trackDefinitions}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
});

export default DashboardScreen;
