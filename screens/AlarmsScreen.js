import React from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,         // Container component
  Dimensions,
  TouchableOpacity,
  AsyncStorage
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
      alarms: [],
      disabled: false
    }
  }

  async componentDidMount() {
    try {
      await this._getAlarms()
      this.setState({ loading: false })
      this.props.navigation.addListener(
        'didFocus',
        this._onFocus
      )
    } catch(error) {
      alert(error)
    }
  }

  componentWillMount() {

  }

  _getAlarms = async() => {
    try {
      //alert('Fetching!')
      let response = await fetch(
        'http://ec2-13-58-151-189.us-east-2.compute.amazonaws.com/alarms/getAll',
      )
      let responseJson = await response.json()
      this.setState({ alarms: responseJson, disabled: false })
    } catch (error) {
      alert(error)
      this.setState({ disabled: true })
    }
  }

  _onFocus = async () => {
    this.setState({ loading: true })
    await this._getAlarms()
    this.setState({ loading: false })  
  }

  _handleEdit = (newAlarm) => {
    this.props.navigation.navigate('EditAlarm', {
      alarm: newAlarm
    })
  }

  _showFAB = () => {
    if(!this.state.disabled) {
      return (
        <TouchableOpacity style={styles.fab} onPress={() => this.props.navigation.navigate('CreateAlarm')}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      )
    }
    return null
  }

  _showAlarmsList = () => {
    if(!this.state.disabled) {
      return (
        <AlarmsList alarms={this.state.alarms} onEdit={this._handleEdit} onChangeActive={this._onFocus}/>
      )
    }
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 30}}>
      <TouchableOpacity onPress={this._onFocus} style={{flex: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 15, margin: 15/2, backgroundColor: '#497dff'}}>
          <Text style={{fontFamily: 'opensans-bold', fontSize: 20, color: 'white'}}>REFRESH</Text>
      </TouchableOpacity>
      </View>
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <TopBar title='My Alarms' />
        <LinearGradient 
          colors={['#171717', '#171717']}
          style={styles.bodyContainer}>
          {this._showAlarmsList()}
        </LinearGradient>
        {this._showFAB()}
      
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  // Slide styles
  container: {
    flex: 1,
    backgroundColor: '#171717',
    paddingTop: Constants.statusBarHeight,
  },
  bodyContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 0, 
    justifyContent: 'center'
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#497dff',
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 40,
    color: 'white'
  }
})

// ['#11998e', '#38ef7d'] - teal
// #FF416C #FF4B2B - pink orangeish