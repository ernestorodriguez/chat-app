const KVS = {
    ['laura - rob']: [
        {
            text: 'Welcome!\nPlease let us know if you have any questions about our business solutions.',
            author: 'rob',
            date: Date.parse('September 1, 2019 09:24:00').toString(),
            seen: Date.parse('September 1, 2019 09:24:00').toString(),
        },
        {
            text: 'Hi, I need help with the pricing',
            author: 'laura',
            date: Date.parse('September 9, 2019 10:10:00').toString(),
            seen: Date.parse('September 9, 2019 10:11:00').toString(),
        },
        {
            text: 'Happy to help you!\n What do you like to know?',
            author: 'rob',
            date: Date.parse('September 9, 2019 10:12:00').toString(),
            seen: Date.parse('September 9, 2019 10:12:00').toString(),
        },
        {
            text: 'I would like to know how I have to spent in this, can you guide me through this?',
            author: 'laura',
            date: Date.parse('September 9, 2019 10:13:00').toString(),
            seen: Date.parse('September 9, 2019 10:13:00').toString(),
        },
    ],
};

class KvsService {
    constructor() {
        this.kvs = KVS;
    }

    get(key) {
        return this.kvs[key];
    }

    set(object) {
        Object.assign(this.kvs, object);
    }

    remove(key) {
        delete this.kvs[key];
    }
}

export default KvsService;
