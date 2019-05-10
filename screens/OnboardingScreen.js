
import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View          // Container component
} from 'react-native';
import { Icon, LinearGradient } from 'expo';
import Swiper from '../components/Swiper';

export default class OnboardingScreen extends Component {
  handleStart = () => {
    this.props.navigation.navigate('App')
  }
  render() {
    return (
      <Swiper onStart={this.handleStart}>
        {/* First screen */}
        <LinearGradient 
          colors={['#1D73B1', '#06D6A0']}
          style={styles.slide}>
          <Icon.Ionicons name="ios-nutrition" {...iconStyles} />
          <Text style={styles.header}>EAT</Text>
          <Text style={styles.text}>Good nutrition is an important part of leading a healthy lifestyle</Text>
        </LinearGradient>
        {/* Second screen */}
        <LinearGradient 
          colors={['#1D73B1', '#06D6A0']}
          style={styles.slide}>
          <Icon.Ionicons name="ios-cloud-upload" {...iconStyles}/>
          <Text style={styles.header}>PRAY</Text>
          <Text style={styles.text}>Prayer is one of the most important things a Christian can do</Text>
        </LinearGradient>
        {/* Third screen */}
        <LinearGradient 
          colors={['#1D73B1', '#06D6A0']}
          style={styles.slide}>
          <Icon.Ionicons name="ios-heart" {...iconStyles}/>
          <Text style={styles.header}>LOVE</Text>
          <Text style={styles.text}>Where there is love there is life</Text>
        </LinearGradient>
      </Swiper>

    );
  }
}

const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    //fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    //fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});