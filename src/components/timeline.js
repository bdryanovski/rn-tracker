import * as React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  StatusBar,
} from 'react-native';

import Item from './item';
import Button from './button';

import { GenerateTrackers } from '../utils/generate-data';
import { isToday, isYesterday } from '../utils/date';

import CommonStyle from '../styles/common';

// @TODO replace this with actual data?!
const DATA = GenerateTrackers();

function humanReadableDate(timestamp) {
  if (isToday(timestamp)) {
    return 'Today';
  }
  if (isYesterday(timestamp)) {
    return 'Yesterday';
  }

  return new Date(timestamp).toLocaleDateString('en-us', {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
  });
}

const Timeline = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item.date + index}
      renderItem={({ item }) => {
        return <Item navigation={navigation} item={item} />;
      }}
      renderSectionHeader={({ section }) => {
        return (
          <Text style={styles.header}>{humanReadableDate(section.date)}</Text>
        );
      }}
      renderSectionFooter={() => {
        return (
          <Button
            style={CommonStyle.buttonTimelineAddMore}
            title="Add more"
            onPress={() => {}}
          />
        );
      }}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: StatusBar.currentHeight,
  },
  header: CommonStyle.timelineHeader,
});

export default Timeline;
