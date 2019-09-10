import { expect } from 'chai';
import React from 'react';
import Chat from '../../../../../app/components/chat';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatRoom from "../../../../../lib/chat/ChatRoom";

configure({ adapter: new Adapter() });

const header  = {};
const messages = [];
const input = {};


describe('component Chat', () => {
    it('should render defined elements', () => {
        const chat = new Chat({
            header, messages, input
        }, new ChatRoom({}, {on: () =>{}}));

        const ChatReactView = chat.render();
        const wrapper = shallow(ChatReactView);

        expect(wrapper.html()).to.include('class="chat-component"');
    });
    it('should has valid render', () => {
        const chat = new Chat({
            header, messages, input
        }, new ChatRoom({}, {on: () =>{}}));
        const chatReactView = chat.render({}, {});
        const wrapper = shallow(chatReactView);

        expect(wrapper.html()).to.contain('as');
    });
});
