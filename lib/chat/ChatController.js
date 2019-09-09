class ChatController {
    constructor(chatRoom, view) {
        this.chatRoom = chatRoom;
        this.view = view;
    }

    render() {
        return {
            model: this.chatRoom,
            chat: this.view.render(this.chatRoom),
        };
    }
}

export default ChatController;
