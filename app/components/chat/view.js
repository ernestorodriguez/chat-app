import React from 'react';
import ChatHeader from '../ui/chatHeader/index';
import ChatMessages from '../ui/chatMessages/index';
import ChatInput from '../ui/chatInput/index';


class View extends React.Component {
    render() {
        const { headerData, messagesData, imputData } = this.props;

        return (
            <div className={'chat-component'}>
                <ChatHeader {...headerData} />
                <ChatMessages {...messagesData}/>
                <ChatInput {...imputData}/>
            </div>
        );
    }
}

export default View;
