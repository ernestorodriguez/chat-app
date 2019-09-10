import React from 'react';
import PropTypes from 'prop-types';

class ChatInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.inputValue === '') {
            return;
        }

        this.props.submitAction(this.state.inputValue);

        this.setState({
            inputValue: '',
        });
    }

    handleChange(event) {
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }

        this.setState({
            inputValue: event.target.value,
        });

        this.props.changeAction();

        this.changeTimeout = setTimeout(() => {
            this.props.idleAction();
        }, 2000);
    }

    render() {
        const { placeHolderText } = this.props;

        return (
            <div className={'chat-input'}>
                <form className={'chat-input__form'} action="/" onSubmit={this.handleSubmit.bind(this)}>
                    <input
                        value={ this.state.inputValue }
                        onChange={ this.handleChange.bind(this) }
                        placeholder={ placeHolderText }
                        className={'chat-input__text-input'}
                        id="message" autoComplete="off" />
                </form>
            </div>
        );
    }
}

ChatInput.propTypes = {
    placeHolderText: PropTypes.string.isRequired,
};


export default ChatInput;
