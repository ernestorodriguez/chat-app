import React from 'react';

class Message extends React.Component {
    render() {
        const { text, type } = this.props;

        return (
            <li className={`chat-messages__message chat-messages__message--${ type }`}>
                { text }
            </li>
        );
    }
}

export default Message;
