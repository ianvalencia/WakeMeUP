import React from 'react';

import AlarmForm from '../components/AlarmForm'

export default class CreateAlarmScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  

  
    this.state = {
      //id: 1,
      label: "",
      hours: 7,
      minutes: 0,
      active: true,
      repeat: [0,0,0,0,0,0,0],
      special: false
    }
    this._handleCreate = this.props.navigation.getParam('handleCreate', null);
  }

  _handleCancel = () => {
    this.props.navigation.navigate('Alarms')
  }

  _handleSubmit = () => {
    this.props.navigation.navigate('Alarms')
  }

  render() {
    return (
      <AlarmForm mode='create' alarm={this.state} onCancel={this._handleCancel} onSubmit={this._handleSubmit}/>
    )
  }
}
