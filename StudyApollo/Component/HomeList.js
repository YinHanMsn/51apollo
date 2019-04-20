/**
* YinHan，邮箱 yinhanmsn@sian.com
* 首页列表
*/

import React, { Component, } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Navigator,
  Button,
  View,
  ListView,
  InteractionManager,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import EventBus from '../Fetch/EventBus';
import * as UrlUtil from '../Fetch/UrlUtil';
import * as ApiHelper from '../Fetch/ApiHelper';
import * as MenuPlate from '../Fetch/MenuPlate';
import HomeListCard from './HomeListCard';


const GET_SERVER_HOME_DATA_FOR_CHANNEL = 'getServerHomeDataForChannel';

export default class HomeList extends Component {


  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds
    };

    this.renderRow = this.renderRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }


  fetchData = () => {
    this.setState({
      ds: this.state.ds.cloneWithRows(MenuPlate.getMenuPlate)
    })
  };

  componentDidMount() {
    new EventBus().registerEvent(this, GET_SERVER_HOME_DATA_FOR_CHANNEL);
    InteractionManager.runAfterInteractions(this.fetchData);
  }

  componentWillUnmount() {
    new EventBus().unregisterEvent(this, GET_SERVER_HOME_DATA_FOR_CHANNEL);
  }


  renderRow = (row) => {

    
    return <HomeListCard data={row} navigation={this.props.navigation} />
  }

  render() {
    return (
      <ListView dataSource={this.state.ds} renderRow={this.renderRow}/>
    );
  }


 

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
