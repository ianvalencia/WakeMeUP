import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import AlarmsScreen from '../screens/AlarmsScreen'


export default createStackNavigator(
  {
    Alarms: AlarmsScreen,
  }
);
