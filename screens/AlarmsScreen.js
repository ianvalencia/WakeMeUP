import React from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,         // Container component
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Constants, Icon, LinearGradient } from 'expo'

import TopBar from '../components/TopBar'
import Loader from '../components/Loader'
import AlarmsList from '../components/AlarmsList'

export default class AlarmsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      alarms: [
        {
          id: 1,
          label: '1st Class',
          hours: 7,
          minutes: 0,
          active: true,
          repeat: [0,0,1,0,0,0,0],
          special: false
        },
        {
          id: 2,
          label: 'Meds',
          hours: 12,
          minutes: 0,
          active: true,
          repeat: [0,0,0,0,0,1,0],
          special: false
        },
        {
          id: 3,
          label: 'Sample',
          hours: 16,
          minutes: 32,
          active: true,
          repeat: [0,0,0,1,0,1,0],
          special: false
        },
        {
          id: 4,
          label: 'Study',
          hours: 20,
          minutes: 30,
          active: true,
          repeat: [0,0,0,0,0,0,0],
          special: false
        },
        {
          id: 5,
          label: 'Meds',
          hours: 12,
          minutes: 0,
          active: true,
          repeat: [0,0,0,0,0,0,0],
          special: false
        },
        {
          id: 6,
          label: 'Sample',
          hours: 16,
          minutes: 32,
          active: true,
          repeat: [0,0,0,0,0,0,0],
          special: false
        },
        {
          id: 7,
          label: 'Study',
          hours: 20,
          minutes: 30,
          active: true,
          repeat: [0,0,0,0,0,0,0],
          special: false
        }
      ]
    }
  }

  componentDidMount() {
    this.setState( {loading: false} )
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <TopBar title='My Alarms' />
        <LinearGradient 
          colors={['#1D73B1', '#06D6A0']}
          style={styles.bodyContainer}>
          <AlarmsList alarms={this.state.alarms} />
        </LinearGradient>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  // Slide styles
  container: {
    flex: 1,
    backgroundColor: '#1D73B1',
    paddingTop: Constants.statusBarHeight,
  },
  bodyContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 0
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#fe5f55',
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 40,
    color: 'white'
  }
});

// ['#11998e', '#38ef7d'] - teal
// #FF416C #FF4B2B - pink orangeish