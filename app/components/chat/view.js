import React from 'react';
import ChatHeader from './chatHeader/index';
import ChatMessages from './chatMessages/index';
import ChatInput from './chatInput/index';


class View extends React.Component {
    updateState(data) {
        this.setState(data);
    }

    componentDidMount() {
        const bindEvents = this.props.controller.bindEvents.bind(this.props.controller);

        bindEvents((data) => { this.updateState(data); });
    }

    inputSubmitHandler(event) {
        const callBack = this.props.controller.sendMessage.bind(this.props.controller);

        callBack(event);
    }

    inputChangeAction() {
        this.props.controller.userIsActive.bind(this.props.controller)();
    }

    handleInputIdle() {
        this.props.controller.userIsInactive.bind(this.props.controller)();
    }

    render() {
        const { headerData, messagesData, inputData } = this.props;

        return (
            <div className={'chat-component'}>
                <div className={'chat-component__container'}>
                    <ChatHeader {...headerData} />
                    <ChatMessages {...messagesData}/>
                    <ChatInput
                        submitAction={(event) => this.inputSubmitHandler(event)}
                        changeAction={(event) => this.inputChangeAction(event)}
                        idleAction={(event) => this.handleInputIdle(event)}
                        {...inputData}
                    />
                </div>
            </div>
        );
    }
}

export default View;
