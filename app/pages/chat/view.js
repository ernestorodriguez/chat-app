import React from 'react';

const testString = `$(function () {
                        var socket = io();
                            $('form').submit(function(){
                            socket.emit('chat message', $('#m').val());
                            $('#m').val('');
                            return false;
                        });
                        socket.on('chat message', function(msg){
                            $('#messages').append($('<li>').text(msg));
                            window.scrollTo(0, document.body.scrollHeight);
                        });
                    });`

class View extends React.Component {

    render() {
        return (
            <div>
                <ul id="messages"></ul>
                <form action="">
                    <input id="m" autoComplete="off" />
                    <button>Send</button>
                </form>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js" />
                <script src="https://code.jquery.com/jquery-1.11.1.js" />
                <script dangerouslySetInnerHTML={{ __html: testString }} />
            </div>
        );
    }
}

export default View;