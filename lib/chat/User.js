class User {
    constructor({ id, name, lastTimeConnected, avatar}) {
        this.isWriting = false;
        Object.assign(this, { id, name, lastTimeConnected, avatar});
    }

    getMessageType(messageAutor) {
        return messageAutor === this.id ? 'my' : 'theirs';
    }

    onWriting() {
        this.isWriting = true;
    }
    onStopWriting() {
        this.isWriting = false;
    }
}

export default User;
