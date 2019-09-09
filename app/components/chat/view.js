import React from 'react';
import ChatHeader from './chatHeader/index';
import ChatMessages from './chatMessages/index';
import ChatInput from './chatInput/index';


class View extends React.Component {
    render() {
        const { headerData, messagesData, inputData, controller } = this.props;

        return (
            <div className={'chat-component'}>
                <div className={'chat-component__container'}>
                    <ChatHeader {...headerData} />
                    <ChatMessages {...messagesData}/>
                    <ChatInput submitAction={controller.handleSubmit} {...inputData}/>
                </div>
            </div>
        );
    }
}

export default View;
