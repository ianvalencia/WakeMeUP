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
  }

  aestheticTime = () => {
    var { hours, minutes } = this.props.alarm
    const newHour = (hours%12)==0?12:(hours%12) 

    return (newHour<10?'0'+newHour:newHour)+':'+(minutes<10?'0'+minutes:minutes)+' '+(hours<12?'AM':'PM')
  }

  render() {
    const alarm = this.props.alarm
    return (
      <TouchableNativeFeedback>
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
          <Switch value={alarm.active} trackColor={{true: '#d1495b'}} thumbColor={'#fe5f55'}/>
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
    fontFamily: 'opensans',
    color: '#fe5f55'
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

