import React from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,         // Container component
  Dimensions
} from 'react-native';

import { Constants, Icon, LinearGradient } from 'expo'

export default class TopBar extends React.Component {
  render() {
    return (
        <View style={styles.topBar}>
            <Text style={styles.heading}>{this.props.title}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  topBar: {
    width: Dimensions.get('window').width,
    height: 75,
    //backgroundColor: 'red',
    justifyContent: 'center',
    padding: 20,
    //flexDirection: 'row'
  },
  heading: {
    fontFamily: 'opensans-extrabold',
    fontSize: 40,
    color: 'white'
  }
});