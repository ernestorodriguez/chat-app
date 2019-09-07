import { expect } from 'chai';
import React from 'react';
import Chat from '../../../../../app/components/chat';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



describe('component Chat', () => {
    it('should render defined elements', () => {
        const chat = new Chat({
            title: 'Rob Anderson',
        });
        const ChatView = chat.render();
        const wrapper = shallow(ChatView);

        expect(wrapper.html()).to.include('class="chat-component"');
    });
    it('should has valid render', () => {
        const params = {
            title: 'Rob Anderson',
        };
        const chat = new Chat(params);
        const ChatView = chat.render();
        const wrapper = shallow(ChatView);

        expect(wrapper.html()).to.contain('as');
    });
});
