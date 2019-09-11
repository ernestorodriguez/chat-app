import _ from 'underscore';

class Renderer {
    // TODO CHANGE NAME
    constructor(chatRoom) {
        this.chatRoom = chatRoom;
    }

    render() {
        const userTarget = _.first(this.chatRoom.targetUsers);

        return {
            header: {
                title: userTarget.name,
                subtitle: this.lastTimeConnected(userTarget),
                image: {
                    src: userTarget.avatar,
                    alt: '',
                }
            },
            messages:  this.chatRoom.messages,
            input: {
                placeHolderText: 'Type a message...',
            },
        };
    }

    lastTimeConnected(userTarget) {
        const timePass = Date.now() - Number.parseInt(userTarget.lastTimeConnected);
        const seconds = Math.floor(timePass / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        let message;

        if (days && days > 1) {
            message = `${days} Days`;
        } else if (hours && hours > 1) {
            message = `${hours} Hours`;
        } else if (minutes && minutes > 1) {
            message = `${minutes} Minutes`;
        } else {
            message = `minute`;
        }

        return `Active in the last ${message}`;
    }
}

export default Renderer;
