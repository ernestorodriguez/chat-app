class Message {
    constructor({ type, messageData}) {
        this.type = type;
        this.text = messageData.text;
        this.data = messageData;
    }
}

export default Message;