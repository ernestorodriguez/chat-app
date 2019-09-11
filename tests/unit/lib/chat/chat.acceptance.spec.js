import chai, { expect } from 'chai';
import spies from 'chai-spies';
import ChatController from '../../../../lib/chat/ChatController';
import ChatView from '../../../../lib/chat/ChatView';
import ChatRoom from '../../../../lib/chat/ChatRoom';
import User from '../../../../lib/chat/User';
import _ from 'underscore';

chai.use(spies);

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

    it('Rob start a new chat with Laura and send her a message', () => {
        let messageSend = {};
        const eventStore = {};
        const callback = chai.spy();

        const socketMock = {
            on(event, callback) {
                eventStore[event] = callback;
            },
            emit(event, fromId, message, usersTarget ) {
                eventStore[event](fromId, message);
                messageSend = { event, fromId, usersTarget, message };
            },
        };

        chai.spy.on(socketMock, ['on', 'emit']);

        const chatRoom = new ChatRoom({
            from: rob,
            users: [
                laura,
            ],
            history: [],
        }, socketMock);

        const expectedCallback = {
            messages: [
                { type: 'my', text: 'message to Laura' },
                { type: 'status', text: 'Just now. Seen' }
            ]
        };

        chatRoom.bindUpdate(callback);
        chatRoom.handleInputChange();
        chatRoom.handleSubmit('message to Laura');

        expect(callback).to.have.been.called(1);
        expect(callback).to.first.been.with(expectedCallback);
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
        expect(socketMock.on).to.have.been.called(3);
        expect(socketMock.on).to.first.been.called.with('chat message');
        expect(socketMock.on).to.second.been.called.with('chat writing');
        expect(socketMock.on).to.third.been.called.with('chat stop-writing');
        expect(socketMock.emit).to.been.called(2);
    });

    it('Rob start a new chat with Laura and she send him a message', () => {
        let messageSend = {};
        const eventStore = {};
        const callsBackData = [];
        const callback = chai.spy((callData) => callsBackData.push(JSON.stringify(callData)));

        const socketMock = {
            on(event, callback) {
                eventStore[event] = callback;
            },
            emit(event, fromId, message, usersTarget ) {
                eventStore[event](fromId, message);
                messageSend = { event, fromId, usersTarget, message };
            },
        };

        chai.spy.on(socketMock, ['on', 'emit']);

        const chatRoom = new ChatRoom({
            from: rob,
            users: [
                laura,
            ],
            history: [],
        }, socketMock);

        const expectedCallback2 = {
            messages: [
                { type: 'theirs', text: 'message to Rob' },
            ]
        };

        const expectedCallback1 = {
            messages: [
                { type: 'theirs', text: '• • •' },
            ]
        };

        chatRoom.bindUpdate(callback);
        eventStore['chat writing'](laura.id);
        eventStore['chat message'](laura.id, {
            text: 'message to Rob',
            author: 'laura',
            date: null,
            seen: new Date('September 9, 2019 10:14:00').toString(),
        });

        console.log(callsBackData);

        expect(callsBackData).to.be.deep.equals([JSON.stringify(expectedCallback1), JSON.stringify(expectedCallback2)]);
    });
});
