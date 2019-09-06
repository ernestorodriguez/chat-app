import React from 'react';
import Message from "./chatMessages-message";
const PropTypes = require('prop-types');

class ChatMessages extends React.Component {
    render() {
        const { messageList } = this.props;
        const messages = messageList.map((messageData) => <Message {...messageData} />);
        return (
            <ul className={'ui-chat-messages'}>
                { messages }
            </ul>
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