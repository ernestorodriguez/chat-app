import { expect } from 'chai';
import React from 'react';
import  ChatMessages from '../../../../../../app/components/ui/chatMessages';
import  Message from '../../../../../../app/components/ui/chatMessages/chatMessages-message';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('component chatMessages', () => {
    it('should render defined elements', () => {
        const wrapper = shallow(<ChatMessages messageList={[]} />);
        expect(wrapper.html()).to.include('class="ui-chat-messages"');
    });
    it('should has valid render', () => {
        const params = {
            messageList: [
                { text: 'First Message', own: false },
                { text: 'Response Message', own: true }
            ]
        };
        const wrapper = shallow(<ChatMessages {...params} />);
        expect(wrapper.find(Message)).to.have.lengthOf(2);
        expect(wrapper.find(Message).first().render().text()).to.include('First Message');
        expect(wrapper.find(Message).last().render().text()).to.include('Response Message');
        expect(wrapper.find(Message).last().render().hasClass('ui-chat-messages_message--my')).to.be.equals(true);
        expect(wrapper.find(Message).first().render().hasClass('ui-chat-messages_message--theirs')).to.be.equals(true);
    });
});