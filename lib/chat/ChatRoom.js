import { _ } from 'underscore';
import Message from './Message';
import DateHelpers from '../utils/DateHelpers';

class ChatRoom {
    constructor({ from, users, history = [] }) {
        this.from = from;
        this.users = users;
        this.generateMessages(history);
        this.pageContext = {
            cta: 'Type a message...',
        };
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

    createSystemMessage(result, day, month) {
        const systemMessage = new Message({
            type: 'system',
            messageData: {
                text: `${DateHelpers.getMonthName(month)} ${day}`
            },
        });

        result.push(systemMessage);
    }

    createStatusMessage(result) {
        result.forEach((message) => {
            if (message.type === 'status') {
                const index = _.indexOf(result, message);

                result.splice(index, 1);
            }
        });
        const lastMessage = _.last(result);

        if (lastMessage && lastMessage.type === 'my') {
            const systemMessageLastSeen = new Message({
                type: 'status',
                messageData: {
                    text: `Just now. Seen`,
                },
            });

            result.push(systemMessageLastSeen);
        }
    }

    generateSystemMessages(messages) {
        let currentDate = {};
        const result = [];

        messages.forEach((message) => {
            const date = new Date(message.data.date);
            const month = date.getMonth();
            const day = date.getDate();

            if (currentDate.month !== month || currentDate.day !== day) {
                currentDate = { month, day };
                this.createSystemMessage(result, day, month);
            }

            result.push(message);
        });

        return result;
    }

    handleSubmit(message, callback) {
        const newMessageModel = {
            text: message,
            author: this.from.id,
            date: new Date(Date.now()).toString(),
            seen: null,
        };

        const messageGenerate = this.createMessage(newMessageModel);

        this.addNewMessage(messageGenerate);

        callback({
            messages: this.messages,
        });
    }

    addNewMessage(messageGenerate) {
        this.messages.push(messageGenerate);
        this.createStatusMessage(this.messages);
    }
}

export default ChatRoom;
