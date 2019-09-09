import React from 'react';

class View extends React.Component {
    render() {
        return (
            <div className={'demo-page'}>
                <iframe className={'demo-iFrame demo-iFrame--right'} src="/chat/rob/laura" />
                <iframe className={'demo-iFrame demo-iFrame--left'} src="/chat/laura/rob" />
            </div>
        );
    }
}

export default View;
