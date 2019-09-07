import React from 'react';
const PropTypes = require('prop-types');

class ChatInput extends React.Component {
    render() {
        const { buttonText, placeHolderText } = this.props;
        return (
            <div className={'ui-chat-input'}>
                <form className={'ui-chat-input__form'} action="/">
                    <input placeholder={ placeHolderText } className={'ui-chat-input__text-input'} id="message" autoComplete="off" />
                    <button className={'ui-chat-input__button'}>{buttonText}</button>
                </form>
            </div>
        );
    }
}

ChatInput.propTypes = {
    buttonText: PropTypes.string.required,
};


export default ChatInput;