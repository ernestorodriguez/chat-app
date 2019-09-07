import React from 'react';
import PropTypes from 'prop-types';

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
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }),
};


export default ChatHeader;
