import React from 'react';
import ChatHeader from './chatHeader/index';
import ChatMessages from './chatMessages/index';
import ChatInput from './chatInput/index';


class View extends React.Component {
    updateState(data) {
        this.setState(data);
    }

    inputSubmitHandler(event) {
        const callBack = this.props.controller.handleSubmit.bind(this.props.controller);

        callBack(event, (data) => {
            this.updateState(data);
        });
    }

    render() {
        const { headerData, messagesData, inputData } = this.props;

        return (
            <div className={'chat-component'}>
                <div className={'chat-component__container'}>
                    <ChatHeader {...headerData} />
                    <ChatMessages {...messagesData}/>
                    <ChatInput submitAction={(event) => this.inputSubmitHandler(event)} {...inputData}/>
                </div>
            </div>
        );
    }
}

export default View;
