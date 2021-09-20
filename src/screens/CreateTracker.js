import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import CommonStyle from '../styles/common';

import Headline from '../components/headline';
import Input from '../components/forms/input2';
import Button from '../components/button';

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

  return (
    <View style={styles.container}>
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
  },

  button: {
    ...CommonStyle.horizontalButton,
    ...CommonStyle.buttonTimelineAddMore,
  },
});

export default CreateTracker;
