import React from 'react';
import View from  './view';
import ChatComponent from '../../components/chat/index';
import Chat from '../../../lib/chat/Chat';

import Room from '../../../lib/chat/Room';
import User from '../../../lib/chat/User';
import TargetUser from '../../../lib/chat/TargetUser';

export default function render(data, socket) {
    const RoomConfig = {
        from: new User(data.user),
        users: [new TargetUser(data.targetUser)],
        history: data.history,
    };

    const chatRoom = new Room(RoomConfig, socket);
    const chat = new Chat(chatRoom);
    const model = chat.render();
    const config = {
        chat: new ChatComponent(model.chat, chatRoom),
        model: data,
        controller: chat,
    };

    return  <View {...config}/>;
}
