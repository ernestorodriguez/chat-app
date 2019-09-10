import React from 'react';
import View from  './view';
import ChatComponent from '../../components/chat/index';
import ChatController from '../../../lib/chat/ChatController';

import ChatRoom from '../../../lib/chat/ChatRoom';
import User from '../../../lib/chat/User';

const users = {
    rob: new User({
        id: 'rob',
        name: 'Rob Anderson',
        lastTimeConnected:  Date.now() - 60000 * 30,
        avatar: 'https://placeimg.com/100/100/tech'
    }),

    laura: new User({
        id: 'laura',
        name: 'Laura Rodriguez',
        lastTimeConnected: Date.now(),
        avatar: 'https://placeimg.com/100/100/tech'
    }),
};
const chatMock = function(data) {
    return {
        from: users[data.userId],
        history: [
            {
                text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.',
                author: 'rob',
                date: new Date('September 1, 2019 09:24:00').toString(),
                seen: new Date('September 1, 2019 09:24:00').toString(),
            },
            {
                text: 'Hi, I need help with the pricing',
                author: 'laura',
                date: new Date('September 9, 2019 10:10:00').toString(),
                seen: new Date('September 9, 2019 10:11:00').toString(),
            },
            {
                text: 'Happy to help you!\n What do you like to know?',
                author: 'rob',
                date: new Date('September 9, 2019 10:12:00').toString(),
                seen: new Date('September 9, 2019 10:12:00').toString(),
            },
            {
                text: 'I would like to know how I have to spent in this, can you guide me through this?',
                author: 'laura',
                date: new Date('September 9, 2019 10:13:00').toString(),
                seen: new Date('September 9, 2019 10:13:00').toString(),
            },
        ],
        users: [
            users[data.targetUserId],
        ]
    };
};

export default function render(data, socket) {
    const chatRoom = new ChatRoom(chatMock(data), socket);
    const controller = new ChatController(chatRoom);
    const model = controller.render();
    const config = {
        chat: new ChatComponent(model.chat, chatRoom),
        model: data,
        controller,
    };

    return  <View {...config}/>;
}
