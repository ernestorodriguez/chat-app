import { expect } from 'chai';
import controller from '../../../../../app/pages/chat/controller';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Chat Page controller', () => {
    it('mus call send with correct params', () => {
        const wrapper = shallow(controller({
            model: {
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
                messages: [],
                pageContext: {
                    cta: 'Type a message...'
                }
            },
            chat: {
                header: {
                    title: 'Rob Anderson',
                    subtitle: 'Active in the last 30 Minutes',
                    image: {
                        src: 'https://placeimg.com/100/100/tech',
                        alt: '',
                    }
                },
                messages: [],
                input: {
                    placeHolderText: 'Type a message...',
                }
            }
        }));

        expect(wrapper.html()).to.contain('chat-component');
    });
});
