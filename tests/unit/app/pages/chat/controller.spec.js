import { expect } from 'chai';
import controller from '../../../../../app/pages/chat/controller';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Chat Page controller', () => {
    it('must render chat component', () => {
        const wrapper = shallow(controller({
            user: {
                id: 'rob',
                name: 'Rob Anderson',
                lastTimeConnected:  Date.now() - 60000 * 30,
                avatar: 'https://placeimg.com/100/100/tech'
            },
            targetUser: {
                id: 'laura',
                name: 'Laura Rodriguez',
                lastTimeConnected: Date.now(),
                avatar: 'https://placeimg.com/100/100/tech'
            },
        }));

        expect(wrapper.html()).to.contain('chat-component');
    });
});
