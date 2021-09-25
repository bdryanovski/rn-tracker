import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';

import CommonStyle from '../styles/common';

import Headline from '../components/headline';
import Input from '../components/forms/input2';
import Button from '../components/button';

import { Collections } from '../database/index';

const Item = ({ item }) => {
  const onPressFunction = id => {
    console.log('selected must close dialog and go back dashboard', id);
  };

  return (
    <View style={styles.item}>
      <Pressable onPress={() => onPressFunction(item.id)}>
        <Text style={styles.title}>{item.title}</Text>
      </Pressable>
    </View>
  );
};

function CreateTracker({ route }) {
  const [title, setTitle] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [dayLimit, setDayLimit] = React.useState('');

  const handleSave = () => {
    console.log({
      title: title,
      unit: unit,
      dayLimit: dayLimit,
    });
  };

  // @TODO that is a bit sketchy here
  const DATA = Collections.TrackLists.fetch().map(record => {
    return {
      id: record._id,
      title: record.title,
    };
  });

  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={Item} keyExtractor={item => item.id} />
      <Headline>Create new "Tracker"</Headline>
      <Input
        label="Title"
        value={title}
        autoFocus={true}
        placeholder="ex: Dog walks"
        onChangeText={text => setTitle(text)}
      />
      <Input
        label="Unit"
        value={unit}
        placeholder="ex: times or cups"
        helperMessage="The name of the unit that will be counted"
        onChangeText={text => setUnit(text)}
      />
      <Input
        label="Day limit"
        value={dayLimit}
        keyboardType="numeric"
        placeholder="ex: 10 or 5"
        helperMessage="The recommended day limit for each day"
        onChangeText={text => setDayLimit(text)}
      />

      <Button
        style={styles.button}
        title="Save & Create"
        onPress={() => handleSave()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },

  button: {
    ...CommonStyle.horizontalButton,
    ...CommonStyle.buttonTimelineAddMore,
  },

  item: {
    backgroundColor: 'white',
    padding: 8,
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
  },
});

export default CreateTracker;
