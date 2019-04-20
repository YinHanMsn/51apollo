/*
* YinHan，邮箱 yinhanmsn@sian.com
* 说明
* 注册EventBus事件和响应事件以及移除事件
*/

let instance = null;
let eventSubscribers = {};

export default class EventBus {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    sendEvent = (event, type) => {
        let subscribers = eventSubscribers[type];
        if (subscribers && subscribers.length > 0) {
            subscribers.forEach((subscriber) => {
                if (subscriber && subscriber !== null && typeof subscriber.handleEvent == 'function') {
                    subscriber.handleEvent(event, type);
                }
            });
        }
    };

    registerEvent = (subscriber, type) => {
        let subscribers = eventSubscribers[type];
        if (subscribers) {
            subscribers.push(subscriber);
        } else {
            eventSubscribers[type] = [subscriber];
        }
    };

    unregisterEvent = (subscriber, type) => {
        let subscribers = eventSubscribers[type];
        if (subscribers) {
            eventSubscribers[type] = subscribers.filter((sub) => sub !== subscriber)
        }
    }
}
