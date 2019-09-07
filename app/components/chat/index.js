import React from 'react';
import View from './view';


class ChatComponent {
    constructor({ title }) {
        this.headerData = {
            title,
            subtitle: 'asdasd',
            image: {
                src: 'asdasd',
                alt: '',
            }
        };
        this.messagesData = {
            messageList: [],
        };
        this.imputData = {
            buttonText: 'Send'
        };
    }
    render() {
        return <View {...this} />;
    }
}

export default ChatComponent;
