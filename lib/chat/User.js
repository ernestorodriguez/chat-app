class User {
    constructor({ id, name, lastTimeConnected, avatar}) {
        this.isWriting = false;
        Object.assign(this, { id, name, lastTimeConnected, avatar});
    }

    onWriting() {
        this.isWriting = true;
    }
    onStopWriting() {
        this.isWriting = false;
    }
}

export default User;
