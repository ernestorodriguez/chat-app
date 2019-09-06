import React from 'react';

class View extends React.Component {
    render() {
        return (
            <div>
                <ul></ul>
                <form action="">
                    <input id="m" autoComplete="off" />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}

export default View;