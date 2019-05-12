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
  TouchableNativeFeedback
} from 'react-native';

export default class AlarmsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.alarm
  }

  aestheticTime = () => {
    var { hours, minutes } = this.props.alarm
    const newHour = (hours%12)==0?12:(hours%12) 

    return (newHour<10?'0'+newHour:newHour)+':'+(minutes<10?'0'+minutes:minutes)+' '+(hours<12?'AM':'PM')
  }

  POST = (url, data) => {
    fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } 

  _handleSubmit = async () => {
    try {
      let url = 'http://ec2-13-58-151-189.us-east-2.compute.amazonaws.com/alarms/update'
      var data = this.state
      data.repeat = JSON.stringify(data.repeat)
      //data.hours = JSON.stringify(data.hours)
      //data.minutes = JSON.stringify(data.minutes)
      data=[data]
      this.POST(url, data)
    } catch (error) {
    }
  }

  render() {
    var alarm = this.state
    if((typeof alarm.repeat)=="string") {
      alarm.repeat = JSON.parse(alarm.repeat)
    }
    
      
    return (
      <TouchableNativeFeedback onPress={() => { this.props.onEdit(alarm) }}>
      <View style={styles.alarmCardContainer}>
        <View style={styles.details}>    
            <Text style={styles.label}>{alarm.label}</Text>
            <Text style={styles.time}>{this.aestheticTime()}</Text>
            <View style={styles.repeat}>
              <Text style={alarm.repeat[0]?styles.activeDay:styles.inactiveDay}>SUN</Text>
              <Text style={alarm.repeat[1]?styles.activeDay:styles.inactiveDay}>MON</Text>
              <Text style={alarm.repeat[2]?styles.activeDay:styles.inactiveDay}>TUE</Text>
              <Text style={alarm.repeat[3]?styles.activeDay:styles.inactiveDay}>WED</Text>
              <Text style={alarm.repeat[4]?styles.activeDay:styles.inactiveDay}>THU</Text>
              <Text style={alarm.repeat[5]?styles.activeDay:styles.inactiveDay}>FRI</Text>
              <Text style={alarm.repeat[6]?styles.activeDay:styles.inactiveDay}>SAT</Text>
            </View>
        </View>
        <View style={styles.switch}>
          <Switch value={alarm.active} trackColor={{true: '#3459B5'}} thumbColor={'#497dff'} onValueChange={async ()=>{
            await this.setState({ active: !this.state.active })
            await this._handleSubmit()
            this.props.onChangeActive()
          }}/>
        </View>
      </View>
      </TouchableNativeFeedback>
    )   
  }
}

const styles = StyleSheet.create({
  alarmCardContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    flexDirection: 'row'
  },
  label: {
    fontFamily: 'opensans',
    color: 'white',
    fontSize: 20
  },
  time: {
    fontFamily: 'opensans-bold',
    fontSize: 50,
    color: 'white'
  },
  inactiveDay: {
    fontFamily: 'opensans',
    color: 'white'
  },
  activeDay: {
    fontFamily: 'opensans-semibold',
    color: '#497dff'
  },
  details: {
    flex: 3
  },
  switch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  repeat: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

