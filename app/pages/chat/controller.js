import React from 'react';
import View from  './view';
import ChatComponent from '../../components/chat/index';

export default function render(model) {
    const config = {
        chat: new ChatComponent({
            title: 'Rob Anderson',
        }),
        model
    };

    return  <View {...config}/>;
}
