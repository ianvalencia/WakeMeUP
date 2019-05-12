import React from 'react';

import AlarmForm from '../components/AlarmForm'

export default class EditAlarmScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  
    this.state = {
      label: "",
      hours: 7,
      minutes: 0,
      active: true,
      repeat: [0,0,0,0,0,0,0],
      special: false
    }
    this._alarm = this.props.navigation.getParam('alarm', null);
  }

  _handleCancel = () => {
    this.props.navigation.navigate('Alarms')
  }

  _handleSubmit = () => {
    this.props.navigation.navigate('Alarms')
  }

  render() {
    return (
      <AlarmForm mode='edit' alarm={this._alarm} onCancel={this._handleCancel} onSubmit={this._handleSubmit}/>
    )
  }
}
