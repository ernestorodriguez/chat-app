import React from 'react';
import Message from './chatMessages-message';
import PropTypes from 'prop-types';

class ChatMessages extends React.Component {
    constructor(props) {
        super(props);
        this.messagesContainerRef = React.createRef();
    }
    scrollToBottom(speed) {
        TweenLite.to(this.messagesContainerRef.current, speed, { scrollTo: 'max'});
    }

    componentDidMount() {
        this.scrollToBottom(0);
    }

    componentDidUpdate() {
        this.scrollToBottom(.5);
    }

    render() {
        const { messageList } = this.props;
        const messages = messageList.map((messageData, index) => <Message key={index} {...messageData} />);

        return (
            <div className={'chat-messages'} ref={this.messagesContainerRef}>
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
