import { expect } from 'chai';
import React from 'react';
import  ChatInput from '../../../../../../app/components/ui/chatInput';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const params = {
    buttonText: 'Send',
    placeHolderText: 'Type a message..'
};

describe('component chatInput', () => {
    it('should render defined elements', () => {
        const wrapper = shallow(<ChatInput {...params} />);

        expect(wrapper.html()).to.include('class="ui-chat-input"');
    });
    it('should has valid render', () => {
        const wrapper = shallow(<ChatInput {...params} />);

        expect(wrapper.html()).to.contain(params.buttonText);
        expect(wrapper.html()).to.contain(params.placeHolderText);
    });
});
