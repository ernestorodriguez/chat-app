import React from 'react';
import View from  './view';
import ChatComponent from '../../components/chat/index';

export default function render(model) {
    const config = {
        chat: new ChatComponent({
            header: {
                title: model.user.name,
                subtitle: model.user.lastTimeActive,
                image: {
                    src: model.user.avatar,
                    alt: '',
                }
            },
            messages: model.messages,
            input: {
                placeHolderText: model.pageContext.cta,
            }
        }),
        model
    };

    return  <View {...config}/>;
}
