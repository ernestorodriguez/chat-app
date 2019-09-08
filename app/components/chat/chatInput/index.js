import React from 'react';
import PropTypes from 'prop-types';

class ChatInput extends React.Component {
    render() {
        const { placeHolderText } = this.props;

        return (
            <div className={'chat-input'}>
                <form className={'chat-input__form'} action="/">
                    <input placeholder={ placeHolderText } className={'chat-input__text-input'} id="message" autoComplete="off" />
                </form>
            </div>
        );
    }
}

ChatInput.propTypes = {
    placeHolderText: PropTypes.string.isRequired,
};


export default ChatInput;
