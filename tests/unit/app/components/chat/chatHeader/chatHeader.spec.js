import { expect } from 'chai';
import React from 'react';
import  ChatHeader from '../../../../../../app/components/chat/chatHeader/index';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const params = {
    title: 'Rob Anderson',
    subtitle: 'Active in the last 15m',
    image: {
        src: '/images/user/rob?small',
        alt: 'Alternative text'
    }
};

describe('component chatHeader', () => {
    it('should render defined elements', () => {
        const wrapper = shallow(<ChatHeader {...params} />);

        expect(wrapper.html()).to.include('class="chat-header"');
    });
    it('should has valid render', () => {
        const wrapper = shallow(<ChatHeader {...params} />);

        expect(wrapper.html()).to.contain(params.title);
        expect(wrapper.html()).to.contain(params.subtitle);
        expect(wrapper.html()).to.contain(params.image.src);
        expect(wrapper.html()).to.contain(params.image.alt);
    });
});
