/*
* YinHan，邮箱 yinhanmsn@sian.com
* 说明
* 基于EventBus的网络请求工具，请求的结果通过EventBus发布。
* 为每个请求指定类型名称，并在需要处理结果的地方注册对应的事件监听，最后通过handleEvent方法接收数据并处理
*/
import {Platform,} from 'react-native';
import EventBus from './EventBus';

/**
 * GET请求
 * @param url url地址，可以直接带参数，也可以通过后面的params对象传进来
 * @param eventType 用来指定Event类型，通过注册对应的监听并实现handleEvent方法来处理返回的结果。<br>
 * 正常情况返回json对象，出错返回错误对象，格式：{errorCode: number, msg: string}
 * @param params 自定义参数对象，{key1: value1, key2: value2, ....}，如果已经在url地址里写了这里就不用传
 */
export const get = (url, eventType, params) => {
    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    console.log('apiHelper GET:' + url);
    if (url) {
        //fetch请求
        fetch(url, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                response.json().then(responseJson => {
                    console.log('apiHelper response' + JSON.stringify(responseJson));
                    if (eventType) {
                        new EventBus().sendEvent(responseJson, eventType);
                    }
                }).catch((e) => {
                    let error = {
                        errorCode: -2,
                        msg: '',
                    };
                    new EventBus().sendEvent(error, eventType);
                })
            } else {
                console.log('apiHelper response error code:' + response.status);
                let error = {
                    errorCode: response.status,
                    msg: response.statusText
                };
                new EventBus().sendEvent(error, eventType);
            }
        }).catch((e) => {
            console.warn('Fetch GET data error:' + e);
            let error = {
                errorCode: -1,
                msg: '',
            };
            new EventBus().sendEvent(error, eventType);
        })
    }
}

/**
 * POST请求
 * @param url url地址
 * @param eventType 用来指定Event类型，通过注册对应的监听并实现handleEvent方法来处理返回的结果，出错返回错误对象，格式：{errorCode: number, msg: string}
 * @param params 自定义参数对象，{key1: value1, key2: value2, ....}
 */
export const post = (url, eventType, params) => {
    if (url) {
        // let formData = new FormData();
        // if (params) {
        //     Object.keys(params).forEach(key => formData.append(key, params[key]))
        // }
        let bodyStr = '';
        let paramsArray = [];
        if (params) {
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            bodyStr += paramsArray.join('&')
        }
        console.log('apiHelper POST:' + url + ' params:' + bodyStr);
        //fetch请求
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: bodyStr,
        }).then((response) => {
            if (response.ok) {
                response.json().then(responseJson => {
                    if (eventType) {
                        new EventBus().sendEvent(responseJson, eventType);
                    }
                })
            } else {
                let error = {
                    errorCode: response.status,
                    msg: response.statusText
                };
                new EventBus().sendEvent(error, eventType);
            }
        }).catch((e) => {
            console.warn('Fetch POST data error:' + e);
            let error = {
                errorCode: -1,
                msg: '',
            };
            new EventBus().sendEvent(error, eventType);
        })
    }
}
