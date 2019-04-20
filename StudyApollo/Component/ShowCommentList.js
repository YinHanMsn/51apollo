/**
 * YinHan
 * 显示评论
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
import CommentListCard from './CommentListCard';


const GET_SERVER_CHANNEL_DATA_FOR_COMMENT = 'getServerChannelDataForComment';

export default class ShowCommentList extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds,
      none:0,
    };

    this.renderRow = this.renderRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }


  fetchData = () => {
    let requestURL = String(UrlUtil.BASE_URL + UrlUtil.GET_CONTENT_DETAIL + this.props.contentId + UrlUtil.GET_CONTENT_INCLUDE_COMMENT);
    ApiHelper.get(requestURL, GET_SERVER_CHANNEL_DATA_FOR_COMMENT, {});
  };

  handleEvent = (event, type) => {

    console.log('------------------event-------------', event);

    if (type === GET_SERVER_CHANNEL_DATA_FOR_COMMENT) {
      if(event.post.comments != undefined && event.post.comments.length != 0) {
        this.setState({
          none:200,
          ds: this.state.ds.cloneWithRows(event.post.comments), 
        })
      } else if (event.post.comments != undefined && event.post.comments.length == 0) {
        this.setState({
          none:-2,
        })
      } else {
        this.setState({
          none:event.errorCode,
        })
      }
    }
  };


  componentDidMount() {
    new EventBus().registerEvent(this, GET_SERVER_CHANNEL_DATA_FOR_COMMENT);
    InteractionManager.runAfterInteractions(this.fetchData);
  }

  componentWillUnmount() {
    new EventBus().unregisterEvent(this, GET_SERVER_CHANNEL_DATA_FOR_COMMENT);
  }


  renderRow = (row) => {
    return <CommentListCard data={row} navigation={this.props.navigation} />
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
        <ListView dataSource={this.state.ds} renderRow={this.renderRow}/>
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
