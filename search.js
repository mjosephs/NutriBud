import React, { Component } from 'react';
import { ToastAndroid, StatusBar } from 'react-native'
import { Thumbnail, FooterTab, Footer, Icon, Title, Header, Left, Right, Button, Body, List, ListItem, Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
var DialogAndroid = require('react-native-dialogs');

export default class search extends Component {

  caloriesPerDay = 2500

  results = [{

    name: 'Goya Black Beans 15 oz.',
    desc: 'Test desc',
    image: 'https://securecontent.shoprite.com/legacy/productimagesroot/DJ/0/33480.jpg',
    nutrition: [200,20,20,20],
    calories: 90,
    protein: 7,
    fat: 0.5,
    carbs: 19,
    price: 0.89
  },{

    name: 'ShopRite Black Beans 15 oz.',
    desc: 'Test desc',
    image: 'https://securecontent.shoprite.com/legacy/productimagesroot/DJ/8/166498.jpg',
    nutrition: [200,20,20,20],
    calories: 120,
    protein: 8,
    fat: 0,
    carbs: 21,
    price: 0.79
  },{

    name: 'ShopRite Large White Eggs',
    desc: 'Test desc',
    image: 'https://securecontent.shoprite.com/legacy/productimagesroot/DJ/8/174498.jpg',
    calories: 70,
    protein: 6,
    fat: 5,
    carbs: 0,
    price: 1.99
  },{

    name: 'Chicken Boneless/Skinless Breast',
    desc: 'Family Pack 3 pounds or more',
    image: 'https://securecontent.shoprite.com/legacy/productimagesroot/DJ/7/596707.jpg',
    calories: 165,
    protein: 31,
    fat: 4,
    carbs: 0,
    price: 1.99
  },{

    name: 'Chobani Greek Yogurt - Non-Fat Plain Blended',
    desc: 'Non-fat yogurt. 0% milkfat. Only natural ingredients. No artificial sweeteners. No preservatives. Includes live and active cultures. Three types of probiotics',
    image: 'https://securecontent.shoprite.com/legacy/productimagesroot/DJ/1/676971.jpg',
    calories: 90,
    protein: 15,
    fat: 0,
    carbs: 7,
    price: 1.00

  }]

  press(key, item) {
    if(item.input) {
      return this.inPress(key, item)
    }
    content = item.desc
      + '\n\nCalories: ' + item.calories
      + '\nProtein: ' + item.protein
      + 'g\nFat: ' + item.fat
      + 'g\nCarbs: ' + item.carbs
      + 'g\n\nPrice: $' + item.price.toFixed(2)
      + '\nCost to get ' + this.caloriesPerDay + ' Cal: $' + (this.caloriesPerDay / item.calories * item.price).toFixed(2)
    var options = {
      title: item.name,
      content: content,
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

  sortPress() {

    var options = {
      title: 'Sort by:',
      content: '' ,
      negativeText: 'Cancel',

      items: ['Price', 'Protein', 'Fat', 'Carbs'],
      itemsCallback: (index, obj) => {
        //update page with correctly sorted items

        this.forceUpdate()
      }
    };


    var dialog = new DialogAndroid();
    dialog.set(options);
    dialog.show();
  }

  addItem(i) {
    this.props.addItem(i)
    ToastAndroid.show(i.name + ' added to my items!', ToastAndroid.SHORT);
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
                  <Title>Search Results</Title>
              </Body>
              <Right>

                  <Text style={{ color: 'white'}} onPress={() => this.sortPress()}>Sort</Text>

              </Right>
          </Header>
        <Content>
          <StatusBar backgroundColor="green" />

          <List>

            {this.results.map((i, key) => {
              return (
                <ListItem key={key} onPress = {() => this.press(key, i)}>
                  <Thumbnail square source={{uri: i.image}} />
                  <Body>
                    <Text>{i.name}</Text>
                    <Text>${i.price.toFixed(2)}</Text>
                    <Text note>P{Math.round(i.protein * 4 / i.calories * 100)}% C{Math.round(i.carbs * 4 / i.calories * 100)}% F{Math.round(i.fat * 9 / i.calories * 100)}%</Text>

                  </Body>
                  <Right>
                    <Button transparent onPress={() => this.addItem(i)}>
                        <Icon name='ios-add-circle' style={{color: '#5cb85c', width: 20}} />
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
