class Message {
    constructor({ type, messageData}) {
        this.type = type;
        this.text = messageData.text;
        this.date = messageData.date;
    }
}

export default Message;