import { _ } from 'underscore';
import Message from './Message';
import DateHelpers from '../utils/DateHelpers';

class ChatRoom {
    constructor({ from, users, history = [] }, socket) {
        this.from = from;
        this.users = users;
        this.generateMessages(history);
        this.pageContext = {
            cta: 'Type a message...',
        };
        this.socket = socket;
    }

    generateMessages(history) {
        const messagesData = this.processResponse(history);
        const messages = this.generateSystemMessages(messagesData);

        this.createStatusMessage(messages);
        this.cleanMessages(messages);
        this.messages = messages;
    }

    processResponse(messagesData) {
        return messagesData.map((messageData) => this.createMessage(messageData));
    }

    cleanMessages(result) {
        // TODO remove this and fix test
        result.forEach((message) => {
            delete message.data;
        });
    }

    createMessage(messageData) {
        return new Message({
            type: this.from.id === messageData.author ? 'my' : 'theirs',
            messageData,
        });
    }

    createSystemMessage(result, day, month, nextDate) {
        const systemMessage = new Message({
            type: 'system',
            messageData: {
                text: `${DateHelpers.getMonthName(month)} ${day}`,
                date: Date.parse(nextDate) || Date.now(),
            },
        });

        result.push(systemMessage);
    }

    createStatusMessage(result) {
        this.removeStatusMessage(result);

        const lastMessage = _.last(result);

        if (lastMessage && lastMessage.type === 'my') {
            const systemMessageLastSeen = new Message({
                type: 'status',
                messageData: {
                    text: `Just now. Seen`,
                    date: lastMessage.date,
                },
            });

            result.push(systemMessageLastSeen);
        }
    }

    removeStatusMessage(result) {
        result.forEach((message) => {
            if (message.type === 'status') {
                const index = _.indexOf(result, message);
                result.splice(index, 1);
            }
        });
    }

    generateSystemMessages(messages) {
        let currentDate;
        const result = [];

        messages.forEach((message) => {
            const date = new Date(Number.parseInt(message.date));

            this.generateStatusMessageIfApplies(currentDate, date, result);
            currentDate = date;
            result.push(message);
        });

        return result;
    }

    generateStatusMessageIfApplies(previewsData, nextData, result) {
        const previewsDate = new Date(previewsData);
        const nextDate = new Date(nextData);
        const month = nextDate.getMonth();
        const day = nextDate.getDate();

        if (previewsDate.getMonth() !== month || previewsDate.getDate() !== day) {

            this.createSystemMessage(result, day, month, nextData);
        }
    }

    generateMessageModelFromData(message) {
        return {
            text: message,
            author: this.from.id,
            date: Date.now(),
            seen: null,
        };
    }

    handleSubmit(message) {
        const newMessageModel = this.generateMessageModelFromData(message);

        this.socket.emit('chat message', this.from.id, newMessageModel, this.users);
    }

    handleInputChange() {
        this.socket.emit('chat writing', this.from.id);
    }

    handleInputIdle() {
        // TODO handle This Internal
        this.socket.emit('chat stop-writing', this.from.id);
        this.isWritting = false;
        this.messages.pop();
    }

    bindUpdate(callback) {
        this.isWritting = false;
        this.socket.on('chat message', (id, message) => {
            const messageGenerate = this.createMessage(message);

            if (this.isWritting) {
                this.isWritting = false;
                this.messages.pop();
            }

            const lastMessage = _.last(this.messages) || {};

            this.generateStatusMessageIfApplies(lastMessage.date, message.date, this.messages);
            this.addNewMessage(messageGenerate);
            this.cleanMessages(this.messages);
            callback({
                messages: this.messages,
            });
        });

        this.socket.on('chat writing', (id) => {
            if (id === this.from.id || this.isWritting) {
                return;
            }
            this.isWritting = true;
            const messageGenerate = this.createMessage({
                text: '• • •',
                author: id,
                date: Date.now(),
                seen: null,
            });
            this.removeStatusMessage(this.messages);
            this.messages.push(messageGenerate);
            this.cleanMessages(this.messages);
            callback({
                messages: this.messages,
            });
        });

        this.socket.on('chat stop-writing', (id) => {
            if (id === this.from.id || !this.isWritting) {
                return;
            }

            this.isWritting = false;
            this.messages.pop();
            this.createStatusMessage(this.messages);
            this.cleanMessages(this.messages);
            callback({
                messages: this.messages,
            });
        });
    }

    addNewMessage(messageGenerate) {
        this.messages.push(messageGenerate);
        this.createStatusMessage(this.messages);
    }
}

export default ChatRoom;
