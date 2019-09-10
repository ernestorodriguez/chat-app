import { expect } from 'chai';
import ChatController from '../../../../lib/chat/ChatController';
import ChatView from '../../../../lib/chat/ChatView';
import ChatRoom from '../../../../lib/chat/ChatRoom';
import User from '../../../../lib/chat/User';

const history = [
    {
        text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.',
        author: 'rob',
        date: new Date('September 1, 2019 09:24:00').toString(),
        seen: new Date('September 1, 2019 09:24:00').toString(),
    },
    {
        text: 'Hi, I need help with the pricing',
        author: 'laura',
        date: new Date('September 9, 2019 10:10:00').toString(),
        seen: new Date('September 9, 2019 10:11:00').toString(),
    },
    {
        text: 'Happy to help you!\n What do you like to know?',
        author: 'rob',
        date: new Date('September 9, 2019 10:12:00').toString(),
        seen: new Date('September 9, 2019 10:12:00').toString(),
    },
    {
        text: 'I would like to know how I have to spent in this, can you guide me through this?',
        author: 'laura',
        date: new Date('September 9, 2019 10:13:00').toString(),
        seen: new Date('September 9, 2019 10:13:00').toString(),
    },
];
const lastTimeConnected = Date.now() - 60000 * 30;
const rob = new User({
    id: 'rob',
    name: 'Rob Anderson',
    lastTimeConnected: lastTimeConnected,
    avatar: 'https://placeimg.com/100/100/tech'
});

const laura = new User({
    id: 'laura',
    name: 'Laura Rodriguez',
    lastTimeConnected: lastTimeConnected,
    avatar: 'https://placeimg.com/100/100/tech'
});

describe('Chat Acceptance test ', () => {
    it('Laura start a new chat with Rob', () => {
        const chatRoom = new ChatRoom({
            from: laura,
            users: [
                rob,
            ],
            history: []
        }, {});
        const view = new ChatView(chatRoom);
        const controller = new ChatController(chatRoom, view);

        expect(controller.render()).to.be.deep.equals({
            model: {
                from: {
                    id: 'laura',
                    name: 'Laura Rodriguez',
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                },
                users: [{
                    id: 'rob',
                    name: 'Rob Anderson',
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                }],
                socket: {},
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
        });
    });

    it('Laura start a new chat with Rob and has previews chats', () => {
        const chatRoom = new ChatRoom({
            from: laura,
            users: [
                rob,
            ],
            history,
        }, {});

        const view = new ChatView(chatRoom);
        const controller = new ChatController(chatRoom, view);

        expect(controller.render()).to.be.deep.equals({
            model: {
                from: {
                    id: 'laura',
                    name: 'Laura Rodriguez',
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                },
                users: [{
                    id: 'rob',
                    name: 'Rob Anderson',
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                }],
                socket: {},
                pageContext: {
                    cta: 'Type a message...'
                },
                messages: [
                    { text: `September 1`, type: 'system' },
                    { text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', type: 'theirs' },
                    { text: `September 9`, type: 'system' },
                    { text: 'Hi, I need help with the pricing', type: 'my' },
                    { text: 'Happy to help you!\n What do you like to know?', type: 'theirs' },
                    { text: 'I would like to know how I have to spent in this, can you guide me through this?', type: 'my' },
                    { text: 'Just now. Seen', type: 'status' },
                ],
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
                messages: [
                    { text: `September 1`, type: 'system' },
                    { text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', type: 'theirs' },
                    { text: `September 9`, type: 'system' },
                    { text: 'Hi, I need help with the pricing', type: 'my' },
                    { text: 'Happy to help you!\n What do you like to know?', type: 'theirs' },
                    { text: 'I would like to know how I have to spent in this, can you guide me through this?', type: 'my' },
                    { text: 'Just now. Seen', type: 'status' },
                ],
                input: {
                    placeHolderText: 'Type a message...',
                }
            }
        });
    });

    it('Rob start a new chat with Laura and has previews chats', () => {
        const chatRoom = new ChatRoom({
            from: rob,
            users: [
                laura,
            ],
            history,
        }, {});

        const view = new ChatView(chatRoom);
        const controller = new ChatController(chatRoom, view);

        expect(controller.render()).to.be.deep.equals({
            model: {
                from: {
                    id: 'rob',
                    name: 'Rob Anderson',
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                },
                users: [{
                    id: 'laura',
                    name: 'Laura Rodriguez',
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                }],
                pageContext: {
                    cta: 'Type a message...'
                },
                socket: {},
                messages: [
                    { text: `September 1`, type: 'system' },
                    { text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', type: 'my' },
                    { text: `September 9`, type: 'system' },
                    { text: 'Hi, I need help with the pricing', type: 'theirs' },
                    { text: 'Happy to help you!\n What do you like to know?', type: 'my' },
                    { text: 'I would like to know how I have to spent in this, can you guide me through this?', type: 'theirs' },
                ],
            },
            chat: {
                header: {
                    title: 'Laura Rodriguez',
                    subtitle: 'Active in the last 30 Minutes',
                    image: {
                        src: 'https://placeimg.com/100/100/tech',
                        alt: '',
                    }
                },
                messages: [
                    { text: `September 1`, type: 'system' },
                    { text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', type: 'my' },
                    { text: `September 9`, type: 'system' },
                    { text: 'Hi, I need help with the pricing', type: 'theirs' },
                    { text: 'Happy to help you!\n What do you like to know?', type: 'my' },
                    { text: 'I would like to know how I have to spent in this, can you guide me through this?', type: 'theirs' },
                ],
                input: {
                    placeHolderText: 'Type a message...',
                }
            }
        });
    });

    it('Rob start a new chat with Laura and send her a message', (done) => {
        let messageSend = {};
        const eventStore = {};
        const chatRoom = new ChatRoom({
            from: rob,
            users: [
                laura,
            ],
            history: [],
        }, {
            on(event, callback) {
                eventStore[event] = callback;
            },
            emit(event, fromId, usersTarget, message) {
                eventStore[event](message);
                messageSend = { event, fromId, usersTarget, message };
            },
        });

        chatRoom.bindUpdate((data) => {
            expect(data).to.be.deep.equals({
                messages: [
                    { type: 'my', text: 'message to Laura' },
                    { type: 'status', text: 'Just now. Seen' }
                ]
            });
            done();
        });
        chatRoom.handleSubmit('message to Laura');
        expect(messageSend).to.be.deep.equals({
            event: 'chat message',
            fromId: 'rob',
            usersTarget: [laura],
            message: {
                author: 'rob',
                date: new Date(Date.now()).toString(),
                seen: null,
                text: 'message to Laura',
            }
        });
    });
});
