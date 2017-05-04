import React, { Component } from 'react';
import { StatusBar } from 'react-native'
import { FooterTab, Footer, Icon, Title, Header, Left, Right, Button, Body, List, ListItem, Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
var DialogAndroid = require('react-native-dialogs');

export default class Home extends Component {

  items = [{
    input: true,
    name: 'Calories',
    option: 2000,

  }, {
    name: 'Protein',
    option: 'Off',
    low: '<40g',
    medium: '40-60g',
    high: '>60g'

  }, {
    name: 'Carbs',
    option: 'Off',
    low: '<200g',
    medium: '200-400g',
    high: '>400g'

  }, {
    name: 'Fat',
    option: 'Off',
    low: '<10g',
    medium: '50-80g',
    high: '>80g'
  }, {
    input: true,
    inputOptional: true,
    name: 'Budget',
    option: 'Off',
    format: function(value) {
      if(value == 'Off') return value
      return '$' + value
    }
  }]

  inPress(key, item) {
    var options = {
      title: item.name,
      content: 'Input the amount of ' + item.name.toLowerCase() + ' you want per day',
      input: {
        type: 2,
        callback: (input) => {
          if (input == ''){
            if(item.inputOptional) {
              this.items[key].option = 'Off'
            }
          }
          else {
            this.items[key].option = parseInt(input)
          }
          this.forceUpdate()
        }
      },
      positiveText: 'OK',
      negativeText: 'Cancel',
    };

    if(item.inputOptional) {
      options.content += '\n\nLeave blank to turn off'
    }

    var dialog = new DialogAndroid();
    dialog.set(options);
    dialog.show();
  }

  press(key, item) {
    if(item.input) {
      return this.inPress(key, item)
    }
    var options = {
      title: item.name,
      content: 'Select the amount of ' + item.name.toLowerCase() + ' you want per day',
      negativeText: 'Cancel',
      items: ['Off', 'Low: ' + item.low, 'Medium: ' + item.medium, 'High: ' + item.high],
      itemsCallback: (index, obj) => {
        let opt = ['Off','Low', 'Med','High']
        this.items[key].option = opt[index]

        this.forceUpdate()
      }
    };


    var dialog = new DialogAndroid();
    dialog.set(options);
    dialog.show();

  }

  render() {

    return (
      <Container>
        <Header style={{backgroundColor: '#5cb85c'}}>
            <Body>
                <Title>
                <Icon name="ios-leaf" style={{color: '#fff'}} />
                &nbsp;
                NutriBud
                </Title>
            </Body>
            <Right>
                <Text style={{ color: 'white'}} onPress={Actions.cart}>My Items</Text>
            </Right>
        </Header>
        <Content>
          <StatusBar backgroundColor="green" />
          <List>
            <ListItem itemHeader first>
                <Text>INPUT YOUR DESIRED DAILY NUTRITION:</Text>
            </ListItem>
            {this.items.map((i, key) => {
              return (
                <ListItem key={key}>

                  <Left>
                    <Text>{i.name} per day:</Text>
                  </Left>
                  <Right>
                    <Button light onPress = {() => this.press(key, i)}>
                      <Text>{i.format ? i.format(i.option) : i.option.toString()}</Text>
                    </Button>
                  </Right>

                  {//<Text note>{i.option}</Text>
                  }

                </ListItem>
            )})}
          </List>
        </Content>

        <Footer >
          <FooterTab >
            <Button full success onPress={Actions.search}>
              <Text style={{ color: 'white', fontSize: 15}}>Search</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    )
  }
}
