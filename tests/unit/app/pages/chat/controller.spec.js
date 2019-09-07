import { expect } from 'chai';
import controller from '../../../../../app/pages/chat/controller';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Chat Page controller', () => {
    it('mus call send with correct params', () => {
        const wrapper = shallow(controller({}));

        expect(wrapper.html()).to.contain('chat-component');
    });
});
