import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import AlarmsScreen from '../screens/AlarmsScreen'
import CreateAlarmScreen from '../screens/CreateAlarmScreen'
import EditAlarmScreen from '../screens/EditAlarmScreen'

export default createStackNavigator(
  {
    Alarms: AlarmsScreen,
    CreateAlarm: CreateAlarmScreen,
    EditAlarm: EditAlarmScreen
  }
);
