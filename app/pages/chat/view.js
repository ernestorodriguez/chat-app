import React from 'react';
class View extends React.Component {
    render() {
        const { chat, model } = this.props;

        return (
            <div>
                {chat.render()}
                <script dangerouslySetInnerHTML={ {__html: ` window.__PRELOADED_STATE__ = ${JSON.stringify({ model })}`}} />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js" />
            </div>
        );
    }
}

export default View;
