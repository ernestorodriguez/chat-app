
/**
 * client js for page
 */
import '../pages/chat/styles.scss';
import ReactDOM from 'react-dom';
import render from  '../pages/chat/controller';
import io from 'socket.io-client';
import {TweenLite, ScrollToPlugin } from 'gsap/all';
const plugins = [ScrollToPlugin];

const { model } = window.__PRELOADED_STATE__;

ReactDOM.hydrate(
    render(model, io()),
    document.getElementById('root-app'),
);
