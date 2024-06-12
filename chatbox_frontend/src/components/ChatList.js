// ChatList.js
import React, { useState } from 'react';
import './ChatList.css';

const ChatList = ({ chatlist = [], onChatSelect }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [adminMessage, setAdminMessage] = useState('');
    const [conversation, setConversation] = useState([]);

    const handleChatSelect = (user) => {
        setSelectedUser(user);
        setConversation(user.messages || []);
        onChatSelect(user);
    };

    const handleAdminMessageChange = (e) => {
        setAdminMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (adminMessage.trim() !== '') {
            const newMessage = {
                user: 'Admin',
                content: adminMessage,
                timestamp: new Date()
            };
            setConversation([...conversation, newMessage]);
            setAdminMessage('');
        }
    };

    return (
        <div className="chat-list-container">
            <div className="chat-list">
                {chatlist.map((user, index) => (
                    <div 
                        key={index} 
                        className={`chat-list-item ${selectedUser === user ? 'active' : ''}`} 
                        onClick={() => handleChatSelect(user)}
                    >
                        {user.name}
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div className="chat-conversation-container">
                    <div className="chat-conversation">
                        {conversation.map((message, index) => (
                            <div key={index}>
                                <strong>{message.user}</strong>: {message.content} <em>({new Date(message.timestamp).toLocaleString()})</em>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input-container">
                        <input 
                            type="text" 
                            value={adminMessage} 
                            onChange={handleAdminMessageChange} 
                            placeholder="Type your message..." 
                            className="chat-input" 
                        />
                        <button className="send-button" onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatList;
