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
        <div className="flex flex-col h-screen max-w-md mx-auto bg-white font-inter">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                <button
                    onClick={handleBack}
                    className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
                    aria-label="Back"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
                </button>

                <div className="flex items-center gap-3">
                    <Bars3Icon className="w-6 h-6 text-gray-700" />
                    <div className="relative">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="appearance-none pl-3 pr-8 py-1.5 rounded-full border border-gray-300 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#73A2BF]"
                        >
                            <option value="English">English</option>
                            <option value="Sinhala">Sinhala</option>
                            <option value="Tamil">Tamil</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#FAFAFA]">
                {messages.map((msg, index) => {
                    const isMe = msg.sender_id === canonicalUserId;
                    return (
                        <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            {!isMe && (
                                <div className="flex-shrink-0 mr-2 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-[#73A2BF] flex items-center justify-center shadow-sm">
                                        <span className="text-white text-xs font-semibold">AI</span>
                                    </div>
                                </div>
                            )}

                            <div
                                className={`max-w-[78%] rounded-2xl px-4 py-2 ${
                                    isMe
                                        ? 'bg-white text-gray-900 shadow-sm border border-gray-200 rounded-br-sm'
                                        : 'bg-[#D0E9F2] text-gray-800 rounded-bl-sm border border-[#73A2BF]/10'
                                }`}
                            >
                                <p className="text-[13px] leading-relaxed font-roboto">{msg.content}</p>
                                {isMe && (
                                    <div className="text-[10px] text-gray-400 mt-1 text-right">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                )}
                            </div>

                            {isMe && (
                                <div className="flex-shrink-0 ml-2 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-[#F2622E] flex items-center justify-center shadow-sm">
                                        <span className="text-white text-xs font-semibold">{user?.first_name?.[0] || 'U'}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Composer */}
            <div className="px-4 py-4 border-t border-gray-100 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Ask anything about Your Service."
                            className="w-full px-4 py-3 pr-12 rounded-full bg-[#F29727]/15 border border-[#F29727]/30 text-sm placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#F29727] hover:bg-[#E1841F] disabled:bg-gray-300 transition"
                            aria-label="Send"
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
