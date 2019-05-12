import React from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,         // Container component
  FlatList
} from 'react-native';

import AlarmCard from './AlarmCard'

export default class AlarmsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alarms: []
    }
  }

  _keyExtractor = (item, index) => JSON.stringify(item.aid);

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 15,
        }}
      />
    );
  };

  render() {
    if(this.props.alarms.length==0) {
      return (
        <View style={styles.noAlarmsContainer}>
          <Text style={styles.noAlarmsText}>No alarms set</Text>
        </View>

      )
    }
    else {
      return (
        <FlatList
          data={this.props.alarms}
          renderItem={({item}) => <AlarmCard alarm={item} onEdit={this.props.onEdit} onChangeActive={this.props.onChangeActive}/>}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          showsVerticalScrollIndicator={false}
        />
        
      )
    }
    
  }
}

const styles = StyleSheet.create({
  noAlarmsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noAlarmsText: {
    fontFamily: 'opensans',
    fontSize: 25,
    color: 'white',
    alignContent: 'center'
  },
  alarmCardContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15
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
  repeat: {
    fontFamily: 'opensans',
    color: 'white'
  },
});

// ['#11998e', '#38ef7d'] - teal
// #FF416C #FF4B2B - pink orangeish