import Message from './Message';

const getMonthName = (index) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return months[index];
};

class ChatRoom {
    constructor({ from, users, history = [] }) {
        this.from = from;
        this.users = users;
        this.messages = this.generateMessages(history);
        this.pageContext = {
            cta: 'Type a message...',
        };
    }

    generateMessages(messagesData) {
        const messages = messagesData.map((messageData) => {
            return new Message({
                type: this.from.id === messageData.author?  'my' : 'theirs',
                messageData,
            });
        });

        return this.generateSystemMessages(messages);
    }

    generateSystemMessages(messages) {
        const result = [];

        let currentDate = {};

        let seenLastMessage = null;

        messages.forEach((message) => {
            seenLastMessage = message.data.seen;
            const date = new Date(message.data.date);
            const month = date.getMonth();
            const day = date.getDate();

            if (currentDate.month !== month || currentDate.day !== day) {
                currentDate = { month, day };
                const systemMessage = new Message({
                    type: 'system',
                    messageData: {
                        text: `${getMonthName(month)} ${day}`
                    },
                });

                result.push(systemMessage);
            }

            result.push(message);
        });

        if (result.length) {
            const systemMessageLastSeen = new Message({
                type: 'status',
                messageData: {
                    text: `Just now. Seen`,
                },
            });

            result.push(systemMessageLastSeen);
        }
        result.forEach((message) => {
            delete message.data;
        });

        return result;
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("asdasdasd sasd");
    }
}

export default ChatRoom;