import React from 'react';
class View extends React.Component {
    render() {
        const { chat, model } = this.props;

        return (
            <div>
                {chat.render()}
                <script dangerouslySetInnerHTML={ {__html: ` window.__PRELOADED_STATE__ = ${JSON.stringify({ model })}`}} />
            </div>
        );
    }
}

export default View;
