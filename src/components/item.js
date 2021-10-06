import * as React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';

import CommonStyle from '../styles/common';

import Button from './button';
import Card from './card';
import Progress from './progress';
import Caption from './caption';
import Paragraph from './paragraph';

function Item({ navigation, item, onUpdate = () => {} }) {
  const [count, setCount] = React.useState(item.value);

  const handle = v => {
    if (v <= 0) {
      setCount(0);
      return;
    }
    setCount(v);
    onUpdate(v);
  };

  const calculateProgress = () => {
    return (1 / (item.dayLimit || 1)) * count;
  };

  return (
    <Card style={styles.space}>
      <View style={styles.wrapper}>
        <Button
          style={styles.button}
          title="-"
          onPress={() => {
            handle(count - 1);
          }}
        />

        <Pressable
          style={styles.section}
          onPress={() => navigation.navigate('Details', { item: item })}
        >
          <Caption>{item.title}</Caption>
          <Paragraph>
            {count} {item.unit} from recommended {item.dayLimit}
          </Paragraph>
          <Progress size={8} progress={calculateProgress()} />
        </Pressable>

        <Button
          style={styles.button}
          title="+"
          onPress={() => {
            handle(count + 1);
          }}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  space: {
    marginVertical: 10,
  },

  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  section: {
    alignSelf: 'stretch',
    width: '75%',
  },
  button: {
    width: '10%',
    ...CommonStyle.buttonNormal,
  },
});

export default Item;
