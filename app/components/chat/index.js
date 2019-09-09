import React from 'react';
import View from './view';


class ChatComponent {
    constructor({ header, messages, input}, controller) {
        this.controller = controller;
        this.headerData = header;
        this.messagesData = {
            messageList: messages,
        };
        this.inputData = input;
    }
    render() {
        return <View {...this} />;
    }
}

export default ChatComponent;
