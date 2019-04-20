/**
 * YinHan，邮箱 yinhanmsn@sian.com
 * 页面详情
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
  Dimensions,
  ScrollView,
  WebView,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HTMLView from 'react-native-htmlview';

import EventBus from '../Fetch/EventBus';
import * as UrlUtil from '../Fetch/UrlUtil';
import * as ApiHelper from '../Fetch/ApiHelper';


const GET_SERVER_CONTENT_DATA_FOR_CHANNEL = 'getServerContentDataForChannel';

class BottomBar extends Component {



  render() {
    return (
        <View style={{flexDirection:'row',}}>

          <TouchableWithoutFeedback onPress={this.props.postComment}>
              <View style={styles.bottomBarBtn}>
                <Text style={{color:'white'}}>{'发布评论'}</Text>
              </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.props.showComment}>
            <View style={styles.bottomBarBtn}>
              <Text style={{color:'white'}}>{'查看评论'}</Text>
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.props.openURL}>
              <View style={styles.bottomBarBtn}>
                <Text style={{color:'white'}}>{'浏览器观看'}</Text>
              </View>
          </TouchableWithoutFeedback>
      </View>
    );
  }
}


export default class ContentDetail extends Component {


  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
        postData:'',
        none:0,
    }
  }

  
  fetchData = () => {
    let requestURL = String(UrlUtil.BASE_URL + UrlUtil.GET_CONTENT_DETAIL + this.props.contentId + UrlUtil.GET_CONTENT_INCLUDE);

    ApiHelper.get(requestURL, GET_SERVER_CONTENT_DATA_FOR_CHANNEL, {});
  };

  handleEvent = (event, type) => {
    if (type === GET_SERVER_CONTENT_DATA_FOR_CHANNEL) {
      if(event.post != undefined && event.post.title.length != 0) {
        this.setState({
          none:200,
          postData: event.post,
        })
      } else {
        this.setState({
          none:event.errorCode,
        });
      }
    }
  };


  onClickPostComment = () => {
    alert("您点击了发布评论");
  }
  
  onClickShowComment = () => {
    const { navigate } = this.props.navigation;
    navigate('ShowComment', { contentId: this.props.contentId});
  }

  onClickOpenURL = () => {
    Linking.openURL(this.state.postData.url);
  }

  componentDidMount() {
    new EventBus().registerEvent(this, GET_SERVER_CONTENT_DATA_FOR_CHANNEL);
    InteractionManager.runAfterInteractions(this.fetchData);
  }

  componentWillUnmount() {
    new EventBus().unregisterEvent(this, GET_SERVER_CONTENT_DATA_FOR_CHANNEL);
  }


  render() {
    var tip = '正在加载中...\n';
    if (this.state.none == -1) {
      tip = '加载失败，请检查网络\n';
    } else if (this.state.none == -2) {
      tip = '毛都没有一根\n';
    }

    if (this.state.none == 200) {
      return (
        <View style={styles.container}>
          <ScrollView style={{marginLeft:5, marginRight:5, marginTop:5,}}>
            <Text numberOfLines={20} style={{fontSize: 28, color: 'black', marginTop:5, marginBottom:10}}>{this.state.postData.title}</Text>
            <View style={{marginBottom:10}}>
              <Text numberOfLines={1} style={styles.descText}>{'作者: ' + this.state.postData.author.name}</Text>
              <Text numberOfLines={1} style={styles.descText}>{'发布日期: ' +  this.state.postData.date.split(" ")[0]}</Text>
            </View>
            <View style={{height:1, backgroundColor:'#333333', marginBottom:20,}} />
            <HTMLView value={this.state.postData.content} style={styles.htmlViewHeight}  onLinkPress={(url) =>{
                const { navigate } = this.props.navigation;
                navigate('Preview', { strURL: url});
            }} />
          </ScrollView>
          <BottomBar postComment={this.onClickPostComment} showComment={this.onClickShowComment} openURL={this.onClickOpenURL}/>
        </View>
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
  htmlViewHeight: {
   
  },
  bottomBarBtn: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#333333'
  },
});
