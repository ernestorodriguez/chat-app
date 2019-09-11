import { _ } from 'underscore';
import Message from './Message';
import DateHelpers from '../utils/DateHelpers';

class Room {
    /**
     * @class
     * @param from
     * @param users
     * @param history
     * @param socket
     */
    constructor({ from, users, history = [] }, socket) {
        this.from = from;
        this.targetUsers = users;
        this.socket = socket;
        this.users = { [from.id]: from };

        users.map((user) => (this.users[user.id] = user));
        this.generateMessages(history);
    }

    /**
     * @method
     * @param message {string}
     * @public
     */
    sendMessage(message) {
        const newMessageModel = this.generateMessageModelFromData(message);

        this.socket.emit('chat message', this.from.id, newMessageModel, this.targetUsers);
    }

    /**
     * @method
     * @public
     */
    userIsActive() {
        this.socket.emit('chat writing', this.from.id);
    }

    /**
     * @method
     * @public
     */
    userIsInactive() {
        // TODO handle This Internal
        this.socket.emit('chat stop-writing', this.from.id);
        this.isWritting = false;
        this.messages.pop();
    }

    /**
     * @method
     * @param callback {function}
     * @public
     */
    bindEvents(callback) {
        this.isWritting = false;
        this.socket.on('chat message', (id, message) => {
            this.onMessage(message, callback);
        });

        this.socket.on('chat writing', (id) => {
            this.onWriting(id, callback);
        });

        this.socket.on('chat stop-writing', (id) => {
            this.onStopWriting(id, callback);
        });
    }

    onWriting(id, callback) {
        this.users[id].onWriting(() => {

            if (this.isWritting) {
                return;
            }

            const messageGenerate = this.createMessage({
                text: '• • •',
                author: id,
                date: Date.now(),
                seen: null,
            });

            this.isWritting = true;
            this.removeStatusMessage(this.messages);
            this.messages.push(messageGenerate);
            this.cleanMessages(this.messages);
            callback({
                messages: this.messages,
            });
        });
    }

    onStopWriting(id, callback) {
        this.users[id].onStopWriting(() => {
            if (!this.isWritting) {
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

    onMessage(message, callback) {
        const messageGenerate = this.createMessage(message);

        this.removeLastMessageIfApply();

        const lastMessage = _.last(this.messages) || {};

        this.generateStatusMessageIfApplies(lastMessage.date, message.date, this.messages);
        this.addNewMessage(messageGenerate);
        this.cleanMessages(this.messages);
        callback({
            messages: this.messages,
        });
    }

    removeLastMessageIfApply() {
        if (this.isWritting) {
            this.isWritting = false;
            this.messages.pop();
        }
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

    addNewMessage(messageGenerate) {
        this.messages.push(messageGenerate);
        this.createStatusMessage(this.messages);
    }
}

export default Room;
