class User {
    constructor({ id, name, lastTimeConnected, avatar}) {
        Object.assign(this, { id, name, lastTimeConnected, avatar});
    }
}

export default User;