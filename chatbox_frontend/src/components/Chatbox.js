import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { BiSend } from 'react-icons/bi';
import './Chatbox.css';
import ChatList from './ChatList';

const Chatbox = () => {
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isChatboxOpen, setIsChatboxOpen] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [chatlist, setChatlist] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [initialView, setInitialView] = useState(true);
    const [initialMessageSent, setInitialMessageSent] = useState(false);

    useEffect(() => {
        if (activeChat) {
            setNewMessage('');
        }
    }, [activeChat]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const message = {
            user: user || 'Anonymous',
            content: newMessage,
            timestamp: new Date()
        };

        if (!initialMessageSent) {
            if (!activeChat) {
                setMessages(prevMessages => {
                    const tempMessages = prevMessages.temp || [];
                    return { ...prevMessages, temp: [...tempMessages, message] };
                });
            } else {
                setMessages(prevMessages => {
                    const userMessages = prevMessages[activeChat.email] || [];
                    return { ...prevMessages, [activeChat.email]: [...userMessages, message] };
                });
            }

            setNewMessage('');
            setInitialMessageSent(true);
            setFormVisible(true);
        } else {
            setMessages(prevMessages => {
                const userMessages = prevMessages[activeChat.email] || [];
                return { ...prevMessages, [activeChat.email]: [...userMessages, message] };
            });

            setNewMessage('');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userDetails = { name: user, email, phone };
        setChatlist([...chatlist, userDetails]);
        setActiveChat(userDetails);
        setFormVisible(false);
        setUser('');
        setEmail('');
        setPhone('');

        setMessages(prevMessages => {
            const tempMessages = prevMessages.temp || [];
            delete prevMessages.temp;
            return { ...prevMessages, [userDetails.email]: tempMessages };
        });
    };

    const handleChatSelect = (user) => {
        setActiveChat(user);
        setFormVisible(false);
        setInitialMessageSent(false);
    };

    const handleAdminMessage = (adminMessage) => {
        if (adminMessage.trim() !== '') {
            const newMessage = {
                user: 'Admin',
                content: adminMessage,
                timestamp: new Date()
            };
            const email = activeChat.email;

            setMessages(prevMessages => {
                const userMessages = prevMessages[email] || [];
                return { ...prevMessages, [email]: [...userMessages, newMessage] };
            });
        }
    };

    return (
        <div>
            <div style={{marginTop:'2%'}}><center><h1>Shanmuga Hospital</h1></center></div>
            {!isChatboxOpen && (
                <div 
                    className="chat-icon"
                    onClick={() => setIsChatboxOpen(true)}
                >
                    <i className="bi bi-chat-left-dots" style={{ color: 'white', fontSize: '30px' }}></i>
                </div>
            )}

{isChatboxOpen && (initialView || chatlist.length === 0) && (
    <div className="chatbox">
        <div className="chatbox-header">
            <h3>{initialView ? "Conversation(s)" : "No ongoing conversation"}</h3>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsChatboxOpen(false)}></button>
        </div>
        <div className="chatbox-content text-center">
            {initialView ? (
                <>
                    <i className="bi bi-chat-dots" style={{ fontSize: '50px', color: '#999' }}></i>
                    <p>No ongoing conversation</p>
                    <Button variant="primary" onClick={() => setInitialView(false)}>Chat Now</Button>
                </>
            ) : (
                <p>No ongoing conversation</p>
            )}
        </div>
    </div>
)}


            {isChatboxOpen && !initialView && (
                <div className="chatbox">
                    <div className="chatbox-header">
                        <h3>Chat with us now</h3>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsChatboxOpen(false)}></button>
                    </div>

                    {formVisible && (
                        <Form onSubmit={handleFormSubmit} className="chatbox-form">
                            <div>Please fill in the below form so that we may assist you better</div>
                            <br/>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="text" 
                                    value={user} 
                                    onChange={(e) => setUser(e.target.value)} 
                                    placeholder="Enter your name" 
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Enter your email address" 
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="tel" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    placeholder="Enter your phone number" 
                                    required
                                />
                            </Form.Group>
                            <button style={{width:"80px"}} className="btn btn-success btn-md" type="submit">
                                Done
                            </button>
                        </Form>
                    )}

                    {!formVisible && (
                        <>
                            <div className="chatbox-messages">
                                {activeChat && messages[activeChat.email]?.map((msg, index) => (
                                    <div key={index}>
                                        <strong>{msg.user}</strong>: {msg.content} <em>({new Date(msg.timestamp).toLocaleString()})</em>
                                    </div>
                                ))}
                            </div>

                            <Form onSubmit={handleSubmit} className="chatbox-form">
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        value={newMessage} 
                                        onChange={(e) => setNewMessage(e.target.value)} 
                                        placeholder="Type your message..." 
                                        className="form-control chat-input"
                                    />
                                    <Button type="submit" className="btn btn-primary" style={{ width: "50px" }}>
                                        <BiSend />
                                    </Button>
                                </div>
                            </Form>
                        </>
                    )}
                </div>
            )}

            {isChatboxOpen && (
                <ChatList chatlist={chatlist} onChatSelect={handleChatSelect} messages={messages} onAdminMessage={handleAdminMessage} />
            )}
        </div>
    );
};

export default Chatbox;
