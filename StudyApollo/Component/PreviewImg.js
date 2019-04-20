/**
 * YinHan
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
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HTMLView from 'react-native-htmlview';

export default class PreviewImg extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WebView source={{uri:this.props.url}} 
        javaScriptEnabled={true} 
        domStorageEnabled={true} 
        automaticallyAdjustContentInsets={true}
        style={{width:'100%',height:'100%'}} 
      />
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
});
