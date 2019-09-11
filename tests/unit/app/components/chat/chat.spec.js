import { expect } from 'chai';
import React from 'react';
import Chat from '../../../../../app/components/chat';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Room from '../../../../../lib/chat/Room';

configure({ adapter: new Adapter() });

const header  = {};
const messages = [];
const input = {};

describe('component Chat', () => {
    it('should render defined elements', () => {
        const chat = new Chat({
            header, messages, input
        }, new Room({
            from: {
                id: 'laura',
                name: 'Laura Rodriguez',
                lastTimeConnected: 123456789,
                avatar: 'https://placeimg.com/100/100/tech'
            },
            users: [{
                id: 'rob',
                name: 'Rob Anderson',
                lastTimeConnected: 123456789,
                avatar: 'https://placeimg.com/100/100/tech'
            }],
            socket: {},
            messages: [],
        }, {on: () =>{}}));

        const ChatReactView = chat.render();
        const wrapper = shallow(ChatReactView);

        expect(wrapper.html()).to.include('class="chat-component"');
    });

    it('should has valid render', () => {
        const chat = new Chat({
            header, messages, input
        }, new Room({
            from: {
                id: 'laura',
                name: 'Laura Rodriguez',
                lastTimeConnected: 123456789,
                avatar: 'https://placeimg.com/100/100/tech'
            },
            users: [{
                id: 'rob',
                name: 'Rob Anderson',
                lastTimeConnected: 123456789,
                avatar: 'https://placeimg.com/100/100/tech'
            }],
            socket: {},
            messages: [],
        }, {on: () =>{}}));
        const chatReactView = chat.render({}, {});
        const wrapper = shallow(chatReactView);

        expect(wrapper.html()).to.contain('as');
    });
});
