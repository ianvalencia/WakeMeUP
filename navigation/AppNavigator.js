import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AppStack from './AppStack'

export default createAppContainer(createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    App: AppStack,
    AuthLoading: AuthLoadingScreen,
    Onboarding: OnboardingScreen,
  }, {
    initialRouteName: 'AuthLoading',
  }
));