import React from 'react';
import Chatbox from './components/Chatbox';
import ChatList from './components/ChatList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
    return ( 
        <div>
            <ChatList />
            <Chatbox/>
        </div>
    );
};

export default App;
