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
        history: data.history,
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
