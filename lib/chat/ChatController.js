import ChatView from './ChatView';
class ChatController {
    constructor(chatRoom) {
        this.chatRoom = chatRoom;
        this.view = new ChatView(chatRoom);
    }

    render() {
        return {
            model: this.chatRoom,
            chat: this.view.render(this.chatRoom),
        };
    }
}

export default ChatController;
