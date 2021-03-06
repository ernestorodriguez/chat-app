import React from 'react';
import PropTypes from 'prop-types';

class ChatHeader extends React.Component {
    render() {
        const { title, subtitle, image } = this.props;

        return (
            <div className={'chat-header'}>
                <div className={'chat-header__container'}>
                    <div className={'chat-header__image'}>
                        <div className={'chat-header__image-wrapper'}>
                            <img className={'image'} {...image} />
                        </div>
                    </div>
                    <div className={'chat-header__info'}>
                        <div className={'chat-header__info-title'}> { title } </div>
                        <div className={'chat-header__info-subtitle'}> { subtitle }</div>
                   </div>
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
