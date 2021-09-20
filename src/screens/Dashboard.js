import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Timeline from '../components/timeline';

function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Timeline navigation={navigation} />
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
