import chai, { expect } from 'chai';
import spies from 'chai-spies';
import Chat from '../../../../lib/chat/Chat';
import ChatView from '../../../../lib/chat/Renderer';
import Room from '../../../../lib/chat/Room';
import User from '../../../../lib/chat/User';
import TargetUser from '../../../../lib/chat/TargetUser';

chai.use(spies);

const history = [
    {
        text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.',
        author: 'rob',
        date: 1567340640000,
        seen: 1567340640000,
    },
    {
        text: 'Hi, I need help with the pricing',
        author: 'laura',
        date: 1568034600000,
        seen: 1568034600000,
    },
    {
        text: 'Happy to help you!\n What do you like to know?',
        author: 'rob',
        date: 1568034720000,
        seen: 1568034720000,
    },
    {
        text: 'I would like to know how I have to spent in this, can you guide me through this?',
        author: 'laura',
        date: 1568034780000,
        seen: 1568034780000,
    },
];

const now = 1568172711052;
const lastTimeConnected = now - 60000 * 30;
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

const robTarget = new TargetUser({
    id: 'rob',
    name: 'Rob Anderson',
    lastTimeConnected: lastTimeConnected,
    avatar: 'https://placeimg.com/100/100/tech'
});

const lauraTarget = new TargetUser({
    id: 'laura',
    name: 'Laura Rodriguez',
    lastTimeConnected: lastTimeConnected,
    avatar: 'https://placeimg.com/100/100/tech'
});

describe('Chat Acceptance test ', () => {
    before(() => {
        chai.spy.on(Date, ['now'], () => now );
    });

    after(() => {
        chai.spy.restore();
    });

    it('Laura start a new chat with Rob', () => {
        const chatRoom = new Room({
            from: laura,
            users: [
                robTarget,
            ],
            history: []
        }, {});
        const view = new ChatView(chatRoom);
        const chat = new Chat(chatRoom, view);

        expect(chat.render()).to.be.deep.equals({
            model: {
                from: {
                    id: 'laura',
                    name: 'Laura Rodriguez',
                    isWriting: false,
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                },
                targetUsers: [{
                    id: 'rob',
                    isWriting: false,
                    name: 'Rob Anderson',
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                }],
                socket: {},
                messages: [],
                users: {
                    laura: {
                        id: 'laura',
                        name: 'Laura Rodriguez',
                        isWriting: false,
                        lastTimeConnected: lastTimeConnected,
                        avatar: 'https://placeimg.com/100/100/tech'
                    },
                    rob: {
                        id: 'rob',
                        name: 'Rob Anderson',
                        isWriting: false,
                        lastTimeConnected: lastTimeConnected,
                        avatar: 'https://placeimg.com/100/100/tech'
                    }
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
        const chatRoom = new Room({
            from: laura,
            users: [
                robTarget,
            ],
            history,
        }, {});

        const view = new ChatView(chatRoom);
        const chat = new Chat(chatRoom, view);

        expect(chat.render()).to.be.deep.equals({
            model: {
                from: {
                    id: 'laura',
                    name: 'Laura Rodriguez',
                    isWriting: false,
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                },
                targetUsers: [{
                    id: 'rob',
                    name: 'Rob Anderson',
                    isWriting: false,
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                }],
                users: {
                    laura: {
                        id: 'laura',
                        name: 'Laura Rodriguez',
                        isWriting: false,
                        lastTimeConnected: lastTimeConnected,
                        avatar: 'https://placeimg.com/100/100/tech'
                    },
                    rob: {
                        id: 'rob',
                        name: 'Rob Anderson',
                        isWriting: false,
                        lastTimeConnected: lastTimeConnected,
                        avatar: 'https://placeimg.com/100/100/tech'
                    }
                },
                socket: {},
                messages: [
                    { date: 1567340640000, text: `September 1`, type: 'system'},
                    { date: 1567340640000, text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', type: 'theirs' },
                    { date: 1568034600000, text: `September 9`, type: 'system' },
                    { date: 1568034600000, text: 'Hi, I need help with the pricing', type: 'my' },
                    { date: 1568034720000, text: 'Happy to help you!\n What do you like to know?', type: 'theirs' },
                    { date: 1568034780000, text: 'I would like to know how I have to spent in this, can you guide me through this?', type: 'my' },
                    { date: 1568034780000, text: 'Just now. Seen', type: 'status' },
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
                    { date: 1567340640000, text: `September 1`, type: 'system',  },
                    { date: 1567340640000, text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', type: 'theirs' },
                    { date: 1568034600000, text: `September 9`, type: 'system' },
                    { date: 1568034600000, text: 'Hi, I need help with the pricing', type: 'my' },
                    { date: 1568034720000, text: 'Happy to help you!\n What do you like to know?', type: 'theirs' },
                    { date: 1568034780000, text: 'I would like to know how I have to spent in this, can you guide me through this?', type: 'my' },
                    { date: 1568034780000, text: 'Just now. Seen', type: 'status' },
                ],
                input: {
                    placeHolderText: 'Type a message...',
                }
            }
        });
    });

    it('Rob start a new chat with Laura and has previews chats', () => {
        const chatRoom = new Room({
            from: rob,
            users: [
                lauraTarget,
            ],
            history,
        }, {});

        const view = new ChatView(chatRoom);
        const chat = new Chat(chatRoom, view);

        expect(chat.render()).to.be.deep.equals({
            model: {
                from: {
                    id: 'rob',
                    name: 'Rob Anderson',
                    isWriting: false,
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                },
                targetUsers: [{
                    id: 'laura',
                    name: 'Laura Rodriguez',
                    isWriting: false,
                    lastTimeConnected: lastTimeConnected,
                    avatar: 'https://placeimg.com/100/100/tech'
                }],
                users: {
                    laura: {
                        id: 'laura',
                        name: 'Laura Rodriguez',
                        isWriting: false,
                        lastTimeConnected: lastTimeConnected,
                        avatar: 'https://placeimg.com/100/100/tech'
                    },
                    rob: {
                        id: 'rob',
                        name: 'Rob Anderson',
                        isWriting: false,
                        lastTimeConnected: lastTimeConnected,
                        avatar: 'https://placeimg.com/100/100/tech'
                    }
                },
                socket: {},
                messages: [
                    { date: 1567340640000, text: `September 1`, type: 'system' },
                    { date: 1567340640000, text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', type: 'my' },
                    { date: 1568034600000, text: `September 9`, type: 'system' },
                    { date: 1568034600000, text: 'Hi, I need help with the pricing', type: 'theirs' },
                    { date: 1568034720000, text: 'Happy to help you!\n What do you like to know?', type: 'my' },
                    { date: 1568034780000, text: 'I would like to know how I have to spent in this, can you guide me through this?', type: 'theirs' },
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
                    { date: 1567340640000, text: `September 1`, type: 'system' },
                    { date: 1567340640000, text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.', type: 'my' },
                    { date: 1568034600000, text: `September 9`, type: 'system' },
                    { date: 1568034600000, text: 'Hi, I need help with the pricing', type: 'theirs' },
                    { date: 1568034720000, text: 'Happy to help you!\n What do you like to know?', type: 'my' },
                    { date: 1568034780000, text: 'I would like to know how I have to spent in this, can you guide me through this?', type: 'theirs' },
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

        const chatRoom = new Room({
            from: rob,
            users: [
                lauraTarget,
            ],
            history: [],
        }, socketMock);

        const expectedCallback = {
            messages: [
                { date: 1568172711052, type: 'system', text: 'September 11' },
                { date: 1568172711052, type: 'my', text: 'message to Laura' },
                { date: 1568172711052, type: 'status', text: 'Just now. Seen' }
            ]
        };

        chatRoom.bindEvents(callback);
        chatRoom.userIsActive();
        chatRoom.userIsInactive();
        chatRoom.sendMessage('message to Laura');

        expect(callback).to.have.been.called(1);
        expect(callback).to.first.been.with(expectedCallback);
        expect(messageSend).to.be.deep.equals({
            event: 'chat message',
            fromId: 'rob',
            usersTarget: [laura],
            message: {
                author: 'rob',
                date: 1568172711052,
                seen: null,
                text: 'message to Laura',
            }
        });

        expect(socketMock.on).to.have.been.called(3);
        expect(socketMock.on).to.first.been.called.with('chat message');
        expect(socketMock.on).to.second.been.called.with('chat writing');
        expect(socketMock.on).to.third.been.called.with('chat stop-writing');
        expect(socketMock.emit).to.been.called(3);
    });

    it('Rob start a new chat with Laura and she send him a message', () => {
        let messageSend = {};
        const eventStore = {};
        const callsBackData = [];
        const callback = chai.spy((callData) => {
            callsBackData.push(JSON.parse(JSON.stringify(callData)));
        });

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

        const chatRoom = new Room({
            from: rob,
            users: [
                lauraTarget,
            ],
            history: [history[2]],
        }, socketMock);


        const expectedCallback1 = {
            messages: [
                { date: 1568034720000, type: 'system', text: `September 9`},
                { date: 1568034720000, type: 'my', text: 'Happy to help you!\n What do you like to know?' },
                { date: 1568172711052, type: 'theirs', text: '• • •' },
            ]
        };

        const expectedCallback2 = {
            messages: [
                { date: 1568034720000, text: `September 9`, type: 'system' },
                { date: 1568034720000, type: 'my', text: 'Happy to help you!\n What do you like to know?' },
                { date: 1568034720000, type: 'status', text: 'Just now. Seen' }
            ]
        };

        const expectedCallback3 = {
            messages: [
                { date: 1568034720000, text: `September 9`, type: 'system' },
                { date: 1568034720000, type: 'my', text: 'Happy to help you!\n What do you like to know?' },
                { date: 1568172711052, type: 'theirs', text: '• • •' },
            ]
        };

        const expectedCallback4 = {
            messages: [
                { date: 1568034720000, text: `September 9`, type: 'system' },
                { date: 1568034720000, type: 'my', text: 'Happy to help you!\n What do you like to know?' },
                { date: 1568172711052, text: `September 16`, type: 'system' },
                { date: 1568639640000, type: 'theirs', text: 'message to Rob' },
            ]
        };

        chatRoom.bindEvents(callback);
        eventStore['chat writing'](laura.id);
        eventStore['chat stop-writing'](laura.id);
        eventStore['chat writing'](laura.id);
        eventStore['chat message'](laura.id, {
            text: 'message to Rob',
            author: 'laura',
            date: Date.parse('September 16, 2019 10:14:00'),
            seen: null,
        });

        expect(callsBackData).to.be.deep.equals([
            expectedCallback1,
            expectedCallback2,
            expectedCallback3,
            expectedCallback4
        ]);
    });
});
