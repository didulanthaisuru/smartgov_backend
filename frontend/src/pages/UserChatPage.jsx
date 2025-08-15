import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftIcon, Bars3Icon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000', {
    path: '/socket.io/',
    transports: ['polling', 'websocket'],
    withCredentials: true,
    forceNew: true
});

const UserChatPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [language, setLanguage] = useState('English');
    const messagesEndRef = useRef(null);
    const isSubmittingRef = useRef(false);

    // Normalize user id coming from auth payload. Backend users may have
    // `id` (from _id field), `_id` (string ObjectId), `user_id` (numeric), or fallback to `nic`.
    const canonicalUserId = user.nic || user._id || user.id;
    const chatRoom = `user_chat_${canonicalUserId}`;

    console.log('=== USER CHAT INITIALIZATION ===');
    console.log('User data structure:', user);
    console.log('Available user fields:', user ? Object.keys(user) : 'No user');
    console.log('user.id:', user?.id);
    console.log('user._id:', user?._id);
    console.log('user.user_id:', user?.user_id);
    console.log('user.nic:', user?.nic);
    console.log(`Canonical User ID: ${canonicalUserId}`);
    console.log(`Chat room: ${chatRoom}`);
    console.log('================================');

    useEffect(() => {
        // Add initial bot message
        const initialMessage = {
            id: 'initial',
            sender_id: 'bot',
            content: 'This AI chatbot has been developed to optimize communication and simplify work processes, ultimately leading to smoother operations.',
            timestamp: new Date().toISOString()
        };
        setMessages([initialMessage]);

        // Fetch chat history on component mount
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                // Call user-scoped endpoint; backend derives user from token
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/chat/history/self`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(prev => [...prev, ...response.data]);
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };
        fetchHistory();
    }, [user, canonicalUserId]);

    useEffect(() => {
        // Define message handler outside the conditional block
        const handleIncomingMessage = (message) => {
            console.log("=== USER CHAT: Received message event ===", message);
            console.log("User canonical ID:", canonicalUserId);
            console.log("Message sender ID:", message.sender_id);
            console.log("Current chat room:", chatRoom);
            console.log("Message room:", message.room);
            
            // Add message to the chat
            setMessages((prevMessages) => {
                console.log("USER CHAT: Adding message to state, current count:", prevMessages.length);
                const newMessages = [...prevMessages, message];
                console.log("USER CHAT: New message count:", newMessages.length);
                return newMessages;
            });
        };

        if (chatRoom) {
            console.log('User connecting to Socket.IO chat room:', chatRoom);
            console.log('User canonical ID:', canonicalUserId);

            // Join the user-specific room
            socket.emit('join_room', { 
                room: chatRoom,
                user_type: 'user'
            });

            // Ensure no duplicate listeners, then listen for incoming messages
            socket.off('receive_message');
            socket.on('receive_message', handleIncomingMessage);

            // Listen for admin typing
            socket.on('user_typing', (data) => {
                if (data.user_id !== canonicalUserId) {
                    // Handle typing indicator for admin
                    console.log('Admin is typing:', data.is_typing);
                }
            });

            // Listen for message read confirmations
            socket.on('messages_read', (data) => {
                console.log('Messages read by admin:', data);
            });

            // Listen for connection events
            socket.on('user_joined', (data) => {
                console.log('User joined room:', data);
            });

            socket.on('user_left', (data) => {
                console.log('User left room:', data);
            });
        }

        // Clean up the listeners on component unmount
        return () => {
            console.log("USER CHAT: Cleaning up socket listeners");
            socket.off('receive_message', handleIncomingMessage);
            socket.off('user_typing');
            socket.off('messages_read');
            socket.off('user_joined');
            socket.off('user_left');
        };
    }, [chatRoom, canonicalUserId]);

    useEffect(() => {
        // Auto-scroll to the latest message
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !user) return;
        // Prevent duplicate sends across renders
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;

        const messageData = {
            room: chatRoom,
            // Use canonical id so admin and user use the same id format
            sender_id: canonicalUserId,
            receiver_id: 'admin',
            content: newMessage,
            timestamp: new Date().toISOString(),
        };

        console.log('User sending message:', messageData);
        console.log('Chat room:', chatRoom);

        // Add user message to local state immediately (optimistic update)
        setMessages(prev => [...prev, {
            ...messageData,
            sender_id: canonicalUserId, // Use consistent ID
            id: Date.now()
        }]);

        socket.emit('send_message', messageData);
        setNewMessage('');
        
        // Reset submission flag after a short delay
        setTimeout(() => {
            isSubmittingRef.current = false;
        }, 600);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
            {/* Header */}
            <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
                <button 
                    onClick={handleBack}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
                </button>
                
                <div className="flex items-center">
                    <Bars3Icon className="w-6 h-6 text-gray-600 mr-4" />
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="English">English</option>
                        <option value="Sinhala">Sinhala</option>
                        <option value="Tamil">Tamil</option>
                    </select>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={msg.id || index} className={`flex ${msg.sender_id === canonicalUserId ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender_id !== canonicalUserId && (
                            <div className="flex-shrink-0 mr-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">AI</span>
                                </div>
                            </div>
                        )}
                        
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            msg.sender_id === canonicalUserId 
                                ? 'bg-blue-500 text-white rounded-br-sm' 
                                : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                        }`}>
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                            {msg.sender_id === canonicalUserId && (
                                <div className="text-xs text-blue-100 mt-1 text-right">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            )}
                        </div>

                        {msg.sender_id === canonicalUserId && (
                            <div className="flex-shrink-0 ml-3">
                                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        {user?.first_name?.[0] || 'U'}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white px-4 py-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Ask anything about Your Service..."
                            className="w-full px-4 py-3 pr-12 bg-orange-100 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm placeholder-gray-600"
                        />
                        <button 
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 rounded-full transition-colors"
                        >
                            <PaperAirplaneIcon className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserChatPage;
