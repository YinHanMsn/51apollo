/*
* YinHan，邮箱 yinhanmsn@sian.com
* 评论列表Cell样式
*/
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    Image,
    TouchableWithoutFeedback,
    Alert,
    Platform,
    Dimensions,
}  from 'react-native';

import HTMLView from 'react-native-htmlview';

export default class CommentListCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let info = this.props.data ? this.props.data : null;
        var content = '<br />' + info.content;
        return (
            <View style={styles.container}>
                <View style={styles.showLine}/>
                <View style={{marginLeft:10,marginRight:10,marginTop:10, marginBottom:-20,}}>
                    <View style={{flexDirection:'row'}}>
                        <Text numberOfLines={1} style={{color: '#999999'}} >{'昵称: ' + info.author.name + '  '}</Text>
                        <Text numberOfLines={1} style={{color: '#999999'}} >{'日期: ' + info.date.split(" ")[0]}</Text>
                    </View>
                    <HTMLView value={content}  onLinkPress={(url) =>{
                    }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    showLine: {
        marginLeft: 15,
        height: 1,
        backgroundColor: 'white',
    }
})
