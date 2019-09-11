import Message from './Message';
import MessagesCollection from './MessagesCollection';

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
        this.socket.emit('chat stop-writing', this.from.id);
        this.messagesCollection.pop();
    }

    /**
     * @method
     * @param callback {function}
     * @public
     */
    bindEvents(callback) {
        this.socket.on('chat message', (id, message) => {
            this.onMessage(id, message, callback);
        });

        this.socket.on('chat writing', (id) => {
            this.onWriting(id, callback);
        });

        this.socket.on('chat stop-writing', (id) => {
            this.onStopWriting(id, callback);
        });
    }

    getMessages() {
        return this.messagesCollection.getMessages();
    }

    onWriting(id, callback) {
        this.users[id].onWriting(() => {
            const messageGenerate = this.createMessage({
                text: '• • •',
                author: id,
                date: Date.now(),
                seen: null,
            });

            this.messagesCollection.removeStatusMessage();
            this.messagesCollection.addNewMessage(messageGenerate);
            callback({
                messages: this.messagesCollection.getMessages(),
            });
        });
    }

    onStopWriting(id, callback) {
        this.users[id].onStopWriting(() => {
            this.messagesCollection.pop();
            this.messagesCollection.createStatusMessage();
            callback({
                messages: this.messagesCollection.getMessages(),
            });
        });
    }

    onMessage(id, message, callback) {
        this.removeLastMessageIfApply(id);

        const messageGenerate = this.createMessage(message);

        this.messagesCollection.generateStatusMessageIfApplies(message.date);
        this.messagesCollection.addNewMessage(messageGenerate);
        callback({
            messages: this.messagesCollection.getMessages(),
        });
    }

    removeLastMessageIfApply(id) {
        if (this.users[id].isWriting) {
            this.users[id].isWriting = false;
            this.messagesCollection.pop();
        }
    }

    generateMessages(history) {
        this.messagesCollection = new MessagesCollection({ history, from: this.from });
    }

    createMessage(messageData) {
        return new Message({
            type: this.from.getMessageType(messageData.author),
            messageData,
        });
    }

    generateMessageModelFromData(message) {
        return {
            text: message,
            author: this.from.id,
            date: Date.now(),
            seen: null,
        };
    }
}

export default Room;
