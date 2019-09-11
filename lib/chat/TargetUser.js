import User from './User';

class TargetUser extends User {
    constructor(params) {
        super(params);
        this.isWriting = false;
    }

    onWriting(callback) {
        if (!this.isWriting) {
            this.isWriting = true;

            callback();
        }
    }

    onStopWriting(callback) {
        if (this.isWriting) {
            this.isWriting = false;
            callback();
        }
    }
}

export default TargetUser;
