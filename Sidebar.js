import React, { Component } from 'react';
import { Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Sidebar extends Component {
  render() {
    return (
      <Content style={{backgroundColor: '#fff'}}>
        <Text onPress={Actions.home}>Go to Home!</Text>
      </Content>
    )
  }
}
