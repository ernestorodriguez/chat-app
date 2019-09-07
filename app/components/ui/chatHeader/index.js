import React from 'react';
const PropTypes = require('prop-types');

class ChatHeader extends React.Component {
    render() {
        const { title, subtitle, image } = this.props;
        return (
            <div className={'ui-chat-header'}>
                <div className={'ui-chat-header__image'}>
                    <img {...image} />
                </div>
                <div className={'ui-chat-header__info'}>
                    <div className={'ui-chat-header__info-title'}> { title } </div>
                    <div className={'ui-chat-header__info-subtitle'}> { subtitle }</div>
               </div>
            </div>
        );
    }
}

ChatHeader.propTypes = {
    title: PropTypes.string.required,
    subtitle: PropTypes.string.required,
    image: {
        src: PropTypes.string.required,
        alt: PropTypes.string.required,
    }
};


export default ChatHeader;