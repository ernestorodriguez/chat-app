import Message from './Message';
import { _ } from 'underscore';
import DateHelpers from '../utils/DateHelpers';

class MessagesCollection {
    constructor({history, from}) {
        this.from = from;
        this.messages = [];

        const messagesData = this.processResponse(history);

        this.generateSystemMessages(messagesData);
        this.createStatusMessage();
    }

    /**
     * @public
     * @param messagesData
     */
    pop() {
        console.log('pop');
        this.messages.pop();
    }

    getMessages() {
        return this.messages;
    }

    addNewMessage(messageGenerate) {
        this.messages.push(messageGenerate);
        this.createStatusMessage();
    }

    processResponse(messagesData) {
        return messagesData.map((messageData) => this.createMessage(messageData));
    }

    createMessage(messageData) {
        return new Message({
            type: this.from.getMessageType(messageData.author),
            messageData,
        });
    }

    generateSystemMessages(messages) {
        let currentDate;
        const result = [];

        messages.forEach((message) => {
            const date = new Date(Number.parseInt(message.date));

            this.generateStatusMessageIfApplies(date);
            currentDate = date;
            this.messages.push(message);
        });

        return result;
    }

    generateStatusMessageIfApplies(nextData) {
        console.log(nextData)
        const lastMessage = _.last(this.messages) || {};
        const previewsData = lastMessage.date || 0;
        const previewsDate = new Date(previewsData);
        const nextDate = new Date(nextData);
        const month = nextDate.getMonth();
        const day = nextDate.getDate();

        if (previewsDate.getMonth() !== month || previewsDate.getDate() !== day) {
            this.createSystemMessage(day, month, nextData);
        }
    }

    createSystemMessage(day, month, nextDate) {
        const systemMessage = new Message({
            type: 'system',
            messageData: {
                text: `${DateHelpers.getMonthName(month)} ${day}`,
                date: Date.parse(nextDate) || Date.now(),
            },
        });

        this.messages.push(systemMessage);
    }

    createStatusMessage() {
        this.removeStatusMessage();

        const lastMessage = _.last(this.messages);

        if (lastMessage && lastMessage.type === 'my') {
            const systemMessageLastSeen = new Message({
                type: 'status',
                messageData: {
                    text: `Just now. Seen`,
                    date: lastMessage.date,
                },
            });

            this.messages.push(systemMessageLastSeen);
        }
    }

    removeStatusMessage() {
        this.messages.forEach((message) => {
            if (message.type === 'status') {
                const index = _.indexOf(this.messages, message);

                this.messages.splice(index, 1);
            }
        });
    }


}

export default MessagesCollection;
