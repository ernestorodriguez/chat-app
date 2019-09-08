import React from 'react';

class View extends React.Component {
    render() {
        return (
            <div className={'demo-page'}>
                <iframe className={'demo-iFrame demo-iFrame--right'} src="/chat/rob" />
                <iframe className={'demo-iFrame demo-iFrame--left'} src="/chat/laura" />
            </div>
        );
    }
}

export default View;
