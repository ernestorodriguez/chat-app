import { expect } from 'chai';
import controller from '../../../../../app/pages/chat/controller';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Chat Page controller', () => {
    it('mus call send with correct params', () => {
        const wrapper = shallow(controller({
            user: {
                name: 'Rob Anderson',
                lastTimeActive: 'Active in the last 15m',
                avatar: 'https://placeimg.com/100/100/tech'
            },
            messages: [
                { text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', own: false },
                { text: 'Hi, I need help with the pricing', own: true },
                { text: 'Happy to help you!\n What do you like to know?', own: false },
            ],
            pageContext: {
                actionText: 'Send',
                cta: 'Type a message..'
            }
        }));

        expect(wrapper.html()).to.contain('chat-component');
    });
});
