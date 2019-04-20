/**
* YinHan，邮箱 yinhanmsn@sian.com
* 面板列表
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
  Alert,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import EventBus from '../Fetch/EventBus';
import * as UrlUtil from '../Fetch/UrlUtil';
import * as ApiHelper from '../Fetch/ApiHelper';
import * as MenuPlate from '../Fetch/MenuPlate';
import ChannelListCard from './ChannelListCard';


const GET_SERVER_CHANNEL_DATA_FOR_CHANNEL = 'getServerChannelDataForChannel';

export default class ChannelList extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds,
      isLoad:false,
      none:0,
    };
    this.page = 1;
    this.arrayData = [];
    this.renderRow = this.renderRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }


  fetchData = () => {
    //url的id从menus获取，然后进行网络请求，获取数据

    if(this.page > 1) {
      this.setState({
        isLoad:true,
      });
    }

    let orderAndCount = '&order=asc&count=15';
    let page = '&page=' + this.page++;
    let requestURL = String(UrlUtil.BASE_URL + UrlUtil.GET_LIST_FOR_ID + this.props.data.tag_id + UrlUtil.GET_LIST_INCLUDE + orderAndCount + page);
    ApiHelper.get(requestURL, GET_SERVER_CHANNEL_DATA_FOR_CHANNEL, {});
  };

  handleEvent = (event, type) => {
    if (type === GET_SERVER_CHANNEL_DATA_FOR_CHANNEL) {
      if(event.posts != undefined && event.posts.length != 0) {
        this.arrayData = this.arrayData.concat(event.posts);
        this.setState({
          none:200,
          isLoad:false,
          ds: this.state.ds.cloneWithRows(this.arrayData), 
        })
      } else if (event.posts != undefined && event.posts.length == 0) {
        
        if(this.arrayData == null || this.arrayData.length == 0) {
          this.setState({
            none:-2,
          })  
        } else {
          Alert.alert("没有更多内容了！");
        }
      } else {
        this.setState({
          none:event.errorCode,
        })
      }
    }
  };


  componentDidMount() {
    new EventBus().registerEvent(this, GET_SERVER_CHANNEL_DATA_FOR_CHANNEL);
    InteractionManager.runAfterInteractions(this.fetchData);
  }

  componentWillUnmount() {
    new EventBus().unregisterEvent(this, GET_SERVER_CHANNEL_DATA_FOR_CHANNEL);
  }


  renderRow = (row) => {
    return <ChannelListCard data={row} navigation={this.props.navigation} />
  }

  render() {
    var tip = '正在加载中...\n';
    if (this.state.none == -1) {
      tip = '加载失败，请检查网络\n';
    } else if (this.state.none == -2) {
      tip = '毛都没有一根\n';
    }
  
    if (this.state.none == 200){
      return (
        <ListView dataSource={this.state.ds} renderRow={this.renderRow} 
        onEndReachedThreshold={20} onEndReached={ this.state.isLoad == false ? this.fetchData : null } />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.instructions}>{tip}</Text>
        </View>
      );
    }
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
