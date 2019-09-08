import { expect } from 'chai';
import React from 'react';
import  ChatInput from '../../../../../../app/components/chat/chatInput/index';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const params = {
    placeHolderText: 'Type a message..'
};

describe('component chatInput', () => {
    it('should render defined elements', () => {
        const wrapper = shallow(<ChatInput {...params} />);

        expect(wrapper.html()).to.include('class="chat-input"');
    });
    it('should has valid render', () => {
        const wrapper = shallow(<ChatInput {...params} />);

        expect(wrapper.html()).to.contain(params.placeHolderText);
    });
});
