import React from 'react';
import Message from "./chatMessages-message";
const PropTypes = require('prop-types');

class ChatMessages extends React.Component {
    render() {
        const { messageList } = this.props;
        const messages = messageList.map((messageData) => <Message {...messageData} />);
        return (
            <div className={'ui-chat-messages'}>
                <ul className={'ui-chat-messages__container'}>
                    { messages }
                </ul>
            </div>
        );
    }
}

ChatMessages.propTypes = {
    messageList: PropTypes.array.required,
};

ChatMessages.defaultProps = {
    messageList: [],
};

export default ChatMessages;