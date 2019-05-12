import React from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,         // Container component
  FlatList, 
  Switch,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback, 
  TimePickerAndroid,
  TextInput,
  Button
} from 'react-native';

import {LinearGradient, Constants} from 'expo'

import TopBar from './TopBar'

export default class AlarmsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.alarm
    if(this.state==null) {
    }
    this._days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  }
  POST = async(url, data) => {
    try {
      await fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      this.props.onSubmit()
    } catch(error) {
      alert(error)
    }
  } 
  aestheticTime = () => {
    var { hours, minutes } = this.state
    const newHour = (hours%12)==0?12:(hours%12) 

    return (newHour<10?'0'+newHour:newHour)+':'+(minutes<10?'0'+minutes:minutes)+' '+(hours<12?'AM':'PM')
  }

  showPicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({ hour: this.state.hours, minute: this.state.minutes });
      if (action === TimePickerAndroid.dismissedAction) {
      } else {
        this.setState({ hours: hour, minutes: minute })
      }
    } catch (error) {
      alert(error)
    }
  };

  _handleDayPress = (index) => {
    var repeat = this.state.repeat
    repeat[index] = this.state.repeat[index]==0?1:0
    this.setState({ repeat })
  }

  _handleSubmit = async () => {
    try {
      let url = this.props.mode=='create'?'http://ec2-13-58-151-189.us-east-2.compute.amazonaws.com/alarms/post':'http://ec2-13-58-151-189.us-east-2.compute.amazonaws.com/alarms/update'
      var data = this.state
      if((typeof data.repeat)!='string') {
        data.repeat = JSON.stringify(data.repeat)
      }
      //data.hours = JSON.stringify(data.hours)
      //data.minutes = JSON.stringify(data.minutes)
      data=[data]
      this.POST(url, data)
    } catch (error) {
      alert(error)
    }
  }

  _handleDelete = async () => {
    try {
      let url = 'http://ec2-13-58-151-189.us-east-2.compute.amazonaws.com/alarms/delete'
      var data = { aid: this.state.aid }
      data=[data]
      this.POST(url, data)
    } catch (error) {
    }
  }

  _showDeleteButton = () => {
    if(this.props.mode=='edit'){
      return (
        <TouchableOpacity onPress={() => {this._handleDelete()}} style={{flex: 1, borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center', padding: 15, margin: 15/2, borderColor: '#fe5f55'}}>
            <Text style={{fontFamily: 'opensans-bold', fontSize: 20, color: '#fe5f55'}}>DELETE</Text>
        </TouchableOpacity>
      )
    }
    return null
  }


  render() {
    return (
      <View style={styles.container}>
        <TopBar title={this.props.mode=='create'?'Create Alarm':'Edit Alarm'} />
        <LinearGradient 
          colors={['#171717', '#171717']}
          style={styles.bodyContainer}>
          <TouchableNativeFeedback onPress={this.showPicker}>
            <View style={styles.timePicker}>
              <Text style={styles.time}>{this.aestheticTime()}</Text>
            </View>
          </TouchableNativeFeedback>
          <View style={styles.border} />
          <Text style={styles.label}>Repeat</Text>
          <View style={styles.repeat}>
            {this.state.repeat.map((x, index) => {
              return(<TouchableWithoutFeedback onPress={() => this._handleDayPress(index)} key={index}>
                <View style={x?styles.activeContainer:styles.inactiveContainer}>
                  <Text style={x?styles.activeDay:styles.inactiveDay}>{this._days[index]}</Text>
                </View>
              </TouchableWithoutFeedback>)
            })}
          </View>
          <View style={styles.border} />
          <Text style={styles.label}>Name</Text>
          <View style={styles.input}>
            <TextInput style={styles.textInput} value={this.state.label} onChangeText={(label) => {
              this.setState({label})
            }} />
          </View>
          <View style={styles.border} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <Text style={styles.label}>Static</Text>
            </View>
            <View style={{flex: 1}}>
              <Switch value={this.state.special} trackColor={{true: '#3459B5'}} thumbColor={'#497dff'} onValueChange={()=>{this.setState({ special: !this.state.special})}}/>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 20, marginTop: 10}}>
            <TouchableOpacity onPress={this.props.onCancel} style={{flex: 1, borderRadius: 10, borderWidth: 2, alignItems: 'center', padding: 15, margin: 15/2, borderColor: 'white'}}>
              <Text style={styles.label}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, borderRadius: 10, alignItems: 'center', padding: 15, margin: 15/2, backgroundColor: '#497dff'}} onPress={async () => {
              await this._handleSubmit()
            }}>
              <Text style={styles.label}>SAVE</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            {this._showDeleteButton()}
          </View>
          
        </LinearGradient>
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
    //alignItems: 'center'
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
  },
  time: {
    fontFamily: 'opensans-extrabold',
    fontSize: 75,
    color: 'white'
  },
  timePicker: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10
  },
  border: {
    backgroundColor: 'white',
    height: 1,
    marginVertical: 15
  },
  label: {
    fontFamily: 'opensans-bold',
    fontSize: 20,
    color: 'white'
  },
  inactiveDay: {
    fontFamily: 'opensans',
    color: 'white',
  },
  inactiveContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  activeDay: {
    fontFamily: 'opensans',
    color: '#497dff'
  },
  activeContainer: {
    borderWidth: 1,
    borderColor: '#497dff',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  repeat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingHorizontal: 0
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    paddingVertical: 5, 
    borderRadius: 10,
    marginVertical: 10
  },
  textInput: {
    fontFamily: 'opensans',
    color: 'white',
  }
});

