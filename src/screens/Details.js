import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import Card from '../components/card';
import Spacer from '../components/spacer';
import Headline from '../components/headline';
import Subheading from '../components/subheading';
import Paragraph from '../components/paragraph';

function DetailScreen({ route }) {
  let item = {
    title: 'No title',
    value: 0,
    unit: 'unknown',
  };

  if (route && route.params) {
    item = route.params.item;
  }
  return (
    <View style={styles.container}>
      <Headline>Details Screen {item.title}</Headline>

      <View style={styles.stats}>
        <Card style={styles.statBlock}>
          <Subheading>Daily Stats</Subheading>
          <Paragraph>
            {item.value}/{item.unit}
          </Paragraph>
        </Card>
        <Card style={styles.statBlock}>
          <Subheading>Overall Stats</Subheading>
          <Paragraph>
            {item.value}/{item.unit}
          </Paragraph>
        </Card>
      </View>

      <Spacer />

      <Card>
        <Subheading>Weekly Statistic</Subheading>
      </Card>

      <Spacer />

      <Card>
        <Subheading>Monthly Statistic</Subheading>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-between',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBlock: {
    width: '48%',
    height: '100%',
  },
});

export default DetailScreen;
