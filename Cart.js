import React, { Component } from 'react';
import { StatusBar } from 'react-native'
import { Thumbnail, FooterTab, Footer, Icon, Title, Header, Left, Right, Button, Body, List, ListItem, Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
var DialogAndroid = require('react-native-dialogs');

export default class Cart extends Component {

  press(key, item) {
    if(item.input) {
      return this.inPress(key, item)
    }
    var options = {
      title: item.name,
      content: 'Calories: ' + item.nutrition[0] + '\nProtein: ' + item.nutrition[1] + 'g\nFat: ' + item.nutrition[2] + 'g\nCarbs: ' + item.nutrition[3] + 'g\n\nPrice: ' + item.price,
      negativeText: 'Cancel',
      //items: ['Off', 'Low: ' + item.low, 'Medium: ' + item.medium, 'High: ' + item.high],
      //itemsCallback: (index, obj) => {
      //  let opt = ['Off','Low', 'Med','High']
      //  this.items[key].option = opt[index]

      //  this.forceUpdate()
      // }
    };


    var dialog = new DialogAndroid();
    dialog.set(options);
    dialog.show();
  }

  delPress(key, item) {

    var options = {
      title: item.name,
      content: 'Are you sure you want to delete this item?',
      negativeText: 'Cancel',
      positiveText: 'Delete',
      onPositive: () => {
        this.props.cartItems = this.props.deleteItem(key)
        this.forceUpdate()
      }
      //items: ['Off', 'Low: ' + item.low, 'Medium: ' + item.medium, 'High: ' + item.high],
      //itemsCallback: (index, obj) => {
      //  let opt = ['Off','Low', 'Med','High']
      //  this.items[key].option = opt[index]

      //  this.forceUpdate()
      // }

    };


    var dialog = new DialogAndroid();
    dialog.set(options);
    dialog.show();
  }

  getTotalPrice() {
    var total = 0;
    this.props.cartItems.forEach((i) => { total += i.price });
    return total;
  }


  render() {
    return (
      <Container>
      <Header style={{backgroundColor: '#5cb85c'}}>
              <Left>
                  <Button transparent onPress={Actions.pop}>
                      <Icon name='arrow-back' />
                  </Button>
              </Left>
              <Body>
                  <Title>My Items</Title>
                  <Title style={{fontSize: 14}}>Total: ${this.getTotalPrice().toFixed(2)}</Title>
              </Body>
              <Right>



              </Right>
          </Header>
        <Content>
          <StatusBar backgroundColor="green" />

          <List>

            {this.props.cartItems.map((i, key) => {
              return (
                <ListItem key={key} onPress = {() => this.press(key, i)}>
                <Thumbnail square source={{uri: i.image}} />
                      <Body>
                        <Text>{i.name}</Text>
                        <Text>${i.price.toFixed(2)}</Text>
                      </Body>
                      <Right>
                        <Button transparent onPress={() => this.delPress(key, i)}>
                            <Icon name='ios-close-circle' style={{color: '#f00', width: 20}} />
                        </Button>
                      </Right>
                </ListItem>
            )})}
          </List>

        </Content>
      </Container>
    )
  }
}
