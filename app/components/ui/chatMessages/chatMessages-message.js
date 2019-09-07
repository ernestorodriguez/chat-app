import React from 'react';

class Message extends React.Component {
    render() {
        const { text, own } = this.props;

        return (
            <li className={`ui-chat-messages_message ui-chat-messages_message--${ own ? 'my' : 'theirs'}`}>
                { text }
            </li>
        );
    }
}

export default Message;
