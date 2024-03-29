import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './navigator';
import * as RootNavigation from './navigator';

import DetailScreen from './screens/Details';
import DashboardScreen from './screens/Dashboard';
import CreateTracker from './screens/CreateTracker';

import Button from './components/button';

// Themes
import CommonStyle, { NavigationTheme } from './styles/common';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
      <Stack.Navigator initialRouteName="DashboardScreen">
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerRight: () => (
              <Button
                style={CommonStyle.buttonNavigation}
                onPress={() => {
                  RootNavigation.navigate('CreateTracker');
                }}
                title="Create"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{
            headerRight: () => (
              <Button
                style={CommonStyle.buttonNavigation}
                onPress={() => {}}
                title="Edit"
              />
            ),
          }}
        />
        <Stack.Screen name="CreateTracker" component={CreateTracker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
