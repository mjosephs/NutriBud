/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Scene, Router} from 'react-native-router-flux';
import { Drawer, Text, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

import {
  AppRegistry,
  View
} from 'react-native';

import Home from './Home'
import PageTwo from './PageTwo'
import Sidebar from './Sidebar'
import search from './search'
import Cart from './Cart'

export default class TestProject extends Component {

  cartItems = []

  deleteItem (index) {
    this.cartItems.splice(index, 1)
    return this.cartItems;
  }

  addItem (item) {
    this.cartItems.push(item)
  }


  state = {
    sidebar: false
  }

  render() {

    return (

      <Container>
        <Router>
         <Scene key="root" hideNavBar={true}>
           <Scene key="home" component={Home} initial={true}/>
          <Scene key="pageTwo" component={PageTwo}/>
          <Scene key="search" addItem={(item) => this.addItem(item)} component={search}/>
          <Scene key="cart" cartItems={this.cartItems} deleteItem={(index) => this.deleteItem(index)} component={Cart}/>
         </Scene>
       </Router>
        {/*<Drawer
            open={this.state.sidebar}
            content={<Sidebar />}
            onClose={() => this.setState({sidebar: false})} >


            <Header>
                <Left>
                    <Button transparent onPress={() => this.setState({sidebar: true})}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Home</Title>
                </Body>
                <Right />
            </Header>

            <Router>
             <Scene key="root" hideNavBar={true}>
               <Scene key="home" component={Home} initial={true}/>
              <Scene key="pageTwo" component={PageTwo}/>
             </Scene>
           </Router>

            <Footer>
                <FooterTab>
                    <Button full>
                        <Text>Footer</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Drawer>
        */}

      </Container>

    );
  }
}

AppRegistry.registerComponent('TestProject', () => TestProject);
