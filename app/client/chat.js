
/**
 * client js for page
 */
import '../pages/chat/styles.scss';
import ReactDOM from 'react-dom';
import render from  '../pages/chat/controller';

const { model } = window.__PRELOADED_STATE__;

ReactDOM.hydrate(
    render(model),
    document.getElementById('root-app'),
);
