import React from 'react';
import View from  './view';
import ChatComponent from '../../components/chat/index';
import Chat from '../../../lib/chat/Chat';

import Room from '../../../lib/chat/Room';
import User from '../../../lib/chat/User';
import TargetUser from '../../../lib/chat/TargetUser';


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

const targetUsers = {
    rob: new TargetUser({
        id: 'rob',
        name: 'Rob Anderson',
        lastTimeConnected:  Date.now() - 60000 * 30,
        avatar: 'https://placeimg.com/100/100/tech'
    }),

    laura: new TargetUser({
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
            targetUsers[data.targetUserId],
        ]
    };
};

export default function render(data, socket) {
    const chatRoom = new Room(chatMock(data), socket);
    const chat = new Chat(chatRoom);
    const model = chat.render();
    const config = {
        chat: new ChatComponent(model.chat, chatRoom),
        model: data,
        controller: chat,
    };

    return  <View {...config}/>;
}
