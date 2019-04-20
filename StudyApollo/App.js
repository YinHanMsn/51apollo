/**
 * YinHan，邮箱 yinhanmsn@sian.com
 * 说明
 * 主入口页面
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Navigator,
  Button,
  View,
  Alert,
  AsyncStorage,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeList from './Component/HomeList';
import ChannelList from './Component/ChannelList';
import ContentDetail from './Component/ContentDetail';
import PreviewImg from './Component/PreviewImg';
import ShowCommentList from './Component/ShowCommentList';

//首页
class HomeListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '板块',
  });
  render() {
    return (
      <HomeList navigation={this.props.navigation} />
    );
  }
}


//点击首页模块进入到这个页面
class ChannelListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.data.title}`,
    headerBackTitle:'返回',
  });
  render() {
    const { params } = this.props.navigation.state;
    return (
      <ChannelList navigation={this.props.navigation} data={params.data} />
    );
  }
}

class ContentDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerBackTitle:'返回',
  });
  render() {
    const { params } = this.props.navigation.state;
    return (
      <ContentDetail navigation={this.props.navigation} contentId={params.contentId} />
    );
  }
}


class PreviewImgScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '预览',
  });
  render() {
    const { params } = this.props.navigation.state;
    return (
      <PreviewImg navigation={this.props.navigation} url={params.strURL} />
    );
  }
}


class ShowCommentListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '评论',
  });
  render() {
    const { params } = this.props.navigation.state;
    return (
      <ShowCommentList navigation={this.props.navigation} contentId={params.contentId} />
    );
  }
}

//app入口
const EntryApp = StackNavigator({
  Home:       { screen: HomeListScreen },
  Channel:    { screen: ChannelListScreen },
  Content:    { screen: ContentDetailScreen },
  Preview:    { screen: PreviewImgScreen },
  ShowComment:{ screen: ShowCommentListScreen },  
});

export default class App extends Component {
  render() {
    return <EntryApp />;
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
  coverImg: {
    width: 44,
    height: 44,
    borderRadius: 3,
    justifyContent: 'flex-end',
  },
});
