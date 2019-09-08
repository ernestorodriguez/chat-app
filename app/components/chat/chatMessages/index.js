import React from 'react';
import Message from './chatMessages-message';
import PropTypes from 'prop-types';

class ChatMessages extends React.Component {
    render() {
        const { messageList } = this.props;
        const messages = messageList.map((messageData, index) => <Message key={index} {...messageData} />);

        return (
            <div className={'chat-messages'}>
                <ul className={'chat-messages__container'}>
                    { messages }
                </ul>
            </div>
        );
    }
}

ChatMessages.propTypes = {
    messageList: PropTypes.array.isRequired,
};

ChatMessages.defaultProps = {
    messageList: [],
};

export default ChatMessages;
