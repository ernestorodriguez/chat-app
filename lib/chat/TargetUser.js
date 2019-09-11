import User from './User';

class TargetUser extends User {
    constructor(params) {
        super(params);
        this.isWriting = false;
    }

    onWriting(callback) {
        this.isWriting = true;
        callback();
    }

    onStopWriting(callback) {
        this.isWriting = false;
        callback();
    }
}

export default TargetUser;
