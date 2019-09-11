import { expect } from 'chai';
import React from 'react';
import  ChatMessages from '../../../../../../app/components/chat/chatMessages/index';
import  Message from '../../../../../../app/components/chat/chatMessages/chatMessages-message';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('component chatMessages', () => {
    it('should render defined elements', () => {
        global.TweenLite = {
            to() {}
        };
        const view = <ChatMessages messageList={[]} />;

        const wrapper = shallow(view);

        expect(wrapper.html()).to.include('class="chat-messages"');
    });
    it('should has valid render', () => {
        const params = {
            messageList: [
                { text: 'First Message', type: 'my' },
                { text: 'Response Message', type: 'theirs' },
                { text: 'Response Message', type: 'system' },
                { text: 'Response Message', type: 'status' },
            ]
        };
        const wrapper = shallow(<ChatMessages {...params} />);

        expect(wrapper.find(Message)).to.have.lengthOf(4);
        // TODO ADD TEST FOR CASES
    });
});
