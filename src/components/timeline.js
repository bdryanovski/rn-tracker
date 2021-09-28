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

import { isToday, isYesterday } from '../utils/date';

import CommonStyle from '../styles/common';

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

function mergeData(timeline, tracks) {
  return timeline.reduce((acc, item) => {
    const newItem = {
      ...item,
    };
    newItem.data = [...item.data]
      .map(track => {
        return {
          ...track,
          ...(tracks.find(t => t._id === track.trackDefinitionId) || {}),
        };
      })
      .reduce((acc, item) => {
        const idx = acc.findIndex(
          t => t.trackDefinitionId === item.trackDefinitionId,
        );
        if (idx === -1) {
          return [...acc, item];
        } else {
          acc[idx] = {
            ...acc[idx],
            value: acc[idx].value + item.value,
          };
          return acc;
        }
      }, []);
    acc.push(newItem);
    return acc;
  }, []);
}

const Timeline = ({ navigation, timeline, tracks }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={mergeData(timeline, tracks)}
        keyExtractor={item => item._id}
        renderItem={({ item }, index) => {
          return (
            <Item key={index} navigation={navigation} item={{ ...item }} />
          );
        }}
        renderSectionHeader={({ section }, index) => {
          return (
            <Text key={index} style={styles.header}>
              {section.date /* {humanReadableDate(section.date)} */}
            </Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: StatusBar.currentHeight,
  },
  header: CommonStyle.timelineHeader,
});

export default Timeline;
