import React, { useState } from 'react';
import './ChatList.css';
import { FaPaperPlane, FaArrowLeft } from 'react-icons/fa';

const ChatList = ({ chatlist = [], onChatSelect, messages, onAdminMessage }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [adminMessage, setAdminMessage] = useState('');

    const handleChatSelect = (user) => {
        setSelectedUser(user);
        onChatSelect(user);
    };

    const handleAdminMessageChange = (e) => {
        setAdminMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (adminMessage.trim() !== '') {
            onAdminMessage(adminMessage);
            setAdminMessage('');
        }
    };

    const handleBackClick = () => {
        setSelectedUser(null);
    };

    return (
        <div className="whatsapp-container">
            {!selectedUser ? (
                <div className="sidebar">
                    <div className="chat-list">
                        {chatlist.map((user, index) => (
                            <div 
                                key={index} 
                                className={`chat-list-item ${selectedUser && selectedUser.email === user.email ? 'active' : ''}`} 
                                onClick={() => handleChatSelect(user)}>
                                <div className="chat-details">
                                    <div className="chat-name">{user.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="chat-conversation-container">
                    <button className="back-button" onClick={handleBackClick}>
                        <FaArrowLeft /> Back
                    </button>
                    <div className="chat-conversation">
                        {messages[selectedUser.email]?.map((message, index) => (
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
                        <button className="send-button" onClick={handleSendMessage}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatList;
