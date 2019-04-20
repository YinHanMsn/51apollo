/*
* YinHan，邮箱 yinhanmsn@sian.com
* 面板列表中的Cell样式
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

import * as MenuPlate from '../Fetch/MenuPlate';

export default class ChannelListCard extends Component {

    constructor(props) {
        super(props);
    }

    onClickItem = () => {
        const { navigate } = this.props.navigation;
        navigate('Content', { title: this.props.data.title, contentId: this.props.data.id});
    }

    render() {
        let info = this.props.data ? this.props.data : null;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.onClickItem}>
                    <View style={styles.longWidth}>
                        <Text numberOfLines={1} style={{fontSize: 15, color: 'black', marginTop:5, height:20}}>{info.title}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text numberOfLines={1} style={styles.descText}>{'作者: ' + info.author.name}</Text>
                            <Text numberOfLines={1} style={styles.descText}>{'日期: ' + info.date.split(" ")[0]}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.showLine}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    longWidth: {
        height: 45,
        marginLeft: 10,
        marginRight: 5,
        marginBottom: 10,
    },
    descText: {
        color: '#999999',
        marginTop: 5,
        marginRight:10,
        fontSize: 12,
        height:15,
    },
    showLine: {
        marginLeft: 15,
        height: 1,
        backgroundColor: '#f1f1f1',
    }
})
