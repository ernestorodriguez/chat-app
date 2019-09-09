import React from 'react';
import View from  './view';
import ChatComponent from '../../components/chat/index';
import ChatController from '../../../lib/chat/ChatController';
import ChatView from '../../../lib/chat/ChatView';
import ChatRoom from '../../../lib/chat/ChatRoom';
import User from '../../../lib/chat/User';


export default function render(data) {
    const lastTimeConnected = Date.now() - 60000 * 30;
    const users = {
        rob: new User({
            id: 'rob',
            name: 'Rob Anderson',
            lastTimeConnected: lastTimeConnected,
            avatar: 'https://placeimg.com/100/100/tech'
        }),

        laura: new User({
            id: 'laura',
            name: 'Laura Rodriguez',
            lastTimeConnected: Date.now(),
            avatar: 'https://placeimg.com/100/100/tech'
        }),
    };
    const chatRoom = new ChatRoom({
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
    });
    const view = new ChatView(chatRoom);
    const controller = new ChatController(chatRoom, view);
    const model = controller.render();
    const config = {
        chat: new ChatComponent(model.chat, chatRoom),
        model: data,
        controller,
    };

    return  <View {...config}/>;
}
