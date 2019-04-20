/**
* YinHan，邮箱 yinhanmsn@sian.com
* 首页列表Cell样式
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

const IMG_MENU_STUDY = '../img/menu/menu_img_study.png'
const IMG_MENU_OPEN = '../img/menu/menu_img_open.png'
const IMG_MENU_HARDWARE = '../img/menu/menu_img_hardware.png'

const IMG_MENU_QA = '../img/menu/menu_img_qa.png'
const IMG_MENU_VIDEO = '../img/menu/menu_img_video.png'

const IMG_MENU_CHAT = '../img/menu/menu_img_chat.png'
const IMG_MENU_FEEDBACK = '../img/menu/menu_img_feedback.png'
const IMG_MENU_ABOUT = '../img/menu/menu_img_about.png'

export default class HomeListCard extends Component {

    constructor(props) {
        super(props);
    }

    onClickItem = () => {
        const { navigate } = this.props.navigation;
        navigate('Channel', { data: this.props.data });
    }

    render() {

        let info = this.props.data ? this.props.data : null;
        let imgCover;
        if (info.index == 0) {
            imgCover = <Image source={require(IMG_MENU_STUDY)} style={styles.coverImg} />
        } else if (info.index == 1){
            imgCover = <Image source={require(IMG_MENU_OPEN)} style={styles.coverImg} />
        }else if (info.index == 2){
            imgCover = <Image source={require(IMG_MENU_HARDWARE)} style={styles.coverImg} />
        }else if (info.index == 3){
            imgCover = <Image source={require(IMG_MENU_QA)} style={styles.coverImg} />
        }else if (info.index == 4){
            imgCover = <Image source={require(IMG_MENU_VIDEO)} style={styles.coverImg} />
        }else if (info.index == 5){
            imgCover =  <Image source={require(IMG_MENU_CHAT)} style={styles.coverImg} />
        }else if (info.index == 6){
            imgCover = <Image source={require(IMG_MENU_FEEDBACK)} style={styles.coverImg} />
        } else {
            imgCover = <Image source={require(IMG_MENU_ABOUT)} style={styles.coverImg} />
        }

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.onClickItem}>
                    <View style={styles.longWidth}>
                        <View style={styles.leftView}>
                            {imgCover}
                        </View>
                        <View style={styles.rightView}>
                            <Text numberOfLines={2} style={{fontSize: 15, color: 'black', marginTop:10,}}>{info.title ? info.title : ''}</Text>
                            <Text numberOfLines={2} style={styles.descText}>{info.desc ? info.desc : ''}</Text>
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
        flexDirection: 'row',
        height: 60,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },

    leftView: {
        width: 80,
        marginTop:5,
        marginLeft:10,
        marginRight:10,
    },
    rightView: {
        flex: 1,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'center',

    },
    coverImg: {
        width: 80,
        height: 60,
        borderRadius: 3,
        justifyContent: 'flex-end',

    },
    descText: {
        color: '#999999',
        marginTop: 5,
        fontSize: 12,
        height:35,
    },
    showLine: {
        marginLeft: 15,
        height: 1,
        backgroundColor: '#f1f1f1',
    }
})
