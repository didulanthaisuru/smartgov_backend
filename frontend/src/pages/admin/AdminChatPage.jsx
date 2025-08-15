import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    ArrowLeftIcon, 
    Bars3Icon, 
    PaperAirplaneIcon,
    ChatBubbleLeftRightIcon,
    UserIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000', {
    path: '/socket.io/',
    transports: ['polling', 'websocket'],
    withCredentials: true,
    forceNew: true
});

const AdminChatPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [language, setLanguage] = useState('English');
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserList, setShowUserList] = useState(true);
    const messagesEndRef = useRef(null);

    // Get canonical admin ID from multiple possible sources
    const adminCanonicalId = user?.admin_id || user?.id || user?._id;
    const adminCanonicalIdStr = adminCanonicalId != null ? String(adminCanonicalId) : '';
    
    // Debug admin info only when user changes
    useEffect(() => {
        console.log('Admin user object:', user);
        console.log('Admin canonical ID:', adminCanonicalIdStr);
    }, [user, adminCanonicalIdStr]);

    // Global listener for new user messages (notifications)
    useEffect(() => {
        // Join admin dashboard room for notifications
        socket.emit('join_room', { 
            room: 'admin_dashboard',
            user_type: 'admin'
        });

        // Listen for new user messages
        socket.on('new_user_message', (data) => {
            console.log('New user message notification:', data);
            // You can add toast notifications or update UI here
            // For example, highlight the user in the list who sent a new message
        });

        return () => {
            socket.off('new_user_message');
        };
    }, []);

    // Filter users based on search query
    const filteredUsers = users.filter(chatUser => 
        chatUser.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chatUser.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chatUser.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Fetch the list of users for the admin to chat with
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/chat/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Fetch chat history when a user is selected
    useEffect(() => {
        const fetchHistory = async () => {
            if (selectedUser) {
                try {
                    const token = localStorage.getItem('token');
                    const historyKey = selectedUser.nic || selectedUser._id;
                    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/chat/history/user/${historyKey}?direction=both`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setMessages(response.data);
                } catch (error) {
                    console.error('Error fetching chat history:', error);
                }
            }
        };
        fetchHistory();
    }, [selectedUser]);

    // Handle real-time messages
    useEffect(() => {
        let currentChatRoom = null;
        
        if (selectedUser) {
            // Normalize selected user id (could be _id, user_id or id)
            // When a user is selected, normalize to NIC first
            const selectedCanonicalId = selectedUser?.nic || selectedUser?._id || selectedUser?.user_id || selectedUser?.id || selectedUser?.userId;
            const chatRoom = selectedCanonicalId ? `user_chat_${selectedCanonicalId}` : null;
            currentChatRoom = chatRoom;
            
            console.log('=== ADMIN CHAT: Setting up for user ===');
            console.log('Selected user object:', selectedUser);
            console.log('Selected canonical ID:', selectedCanonicalId);
            console.log('Chat room:', chatRoom);
            
            // Join the specific user's chat room
            console.log('ADMIN CHAT: Joining room:', chatRoom);
            socket.emit('join_room', { 
                room: chatRoom,
                user_type: 'admin'
            });

            // Prevent duplicate listeners when switching users
            socket.off('receive_message');
            socket.on('receive_message', (message) => {
                console.log('=== ADMIN CHAT: Received message event ===', message);
                console.log('Selected user object:', selectedUser);
                console.log('Selected canonical ID:', selectedCanonicalId);
                console.log('Message sender ID:', message.sender_id);
                console.log('Message receiver ID:', message.receiver_id);
                console.log('Current chat room:', chatRoom);
                console.log('Message room:', message.room);
                
                // Check the filtering conditions
                const senderMatches = String(message.sender_id) === String(selectedCanonicalId);
                const receiverMatches = String(message.receiver_id) === String(selectedCanonicalId);
                console.log('Sender matches:', senderMatches);
                console.log('Receiver matches:', receiverMatches);
                console.log('Should show message:', senderMatches || receiverMatches);
                
                // Only update messages if it belongs to the currently selected chat
                if (String(message.sender_id) === String(selectedCanonicalId) || String(message.receiver_id) === String(selectedCanonicalId)) {
                    console.log('ADMIN CHAT: Message matches current chat, adding to messages');
                    setMessages((prevMessages) => {
                        console.log('ADMIN CHAT: Current message count:', prevMessages.length);
                        // De-dup guard by _id or content+timestamp+sender
                        const exists = prevMessages.some(m => (m._id && m._id === message._id) || (
                            m.content === message.content && String(m.timestamp) === String(message.timestamp) && String(m.sender_id) === String(message.sender_id)
                        ));
                        if (exists) return prevMessages;
                        const newMessages = [...prevMessages, message];
                        console.log('ADMIN CHAT: New message count:', newMessages.length);
                        return newMessages;
                    });
                } else {
                    console.log('ADMIN CHAT: Message does not match current chat, ignoring');
                }
            });

            // Listen for user typing
            socket.on('user_typing', (data) => {
                if (data.user_id === selectedCanonicalId) {
                    console.log('User is typing:', data.is_typing);
                }
            });

            // Listen for connection events
            socket.on('user_joined', (data) => {
                console.log('User joined room:', data);
            });

            socket.on('user_left', (data) => {
                console.log('User left room:', data);
            });

            // Mark messages as read when admin opens chat
            socket.emit('mark_read', {
                room: chatRoom,
                user_id: 'admin',
                timestamp: new Date().toISOString()
            });
        }
        
        return () => {
            // Leave the current room when switching users
            if (currentChatRoom) {
                console.log('ADMIN CHAT: Leaving room:', currentChatRoom);
                socket.emit('leave_room', { room: currentChatRoom });
            }
            console.log('ADMIN CHAT: Cleaning up socket listeners');
            socket.off('receive_message');
            socket.off('user_typing');
            socket.off('user_joined');
            socket.off('user_left');
        };
    }, [selectedUser, user?.id, user?._id, user?.user_id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !selectedUser || !user) return;

        // Prevent double submission
        if (e.target.dataset.submitting === 'true') return;
        e.target.dataset.submitting = 'true';
        
        // Use canonical IDs consistently
        // In handleSendMessage, use NIC-first for receiver and room
        const selectedCanonicalIdSend = selectedUser?.nic || selectedUser?._id || selectedUser?.user_id || selectedUser?.id || selectedUser?.userId;
        const chatRoomSend = selectedCanonicalIdSend ? `user_chat_${selectedCanonicalIdSend}` : null;
        const messageData = {
            room: chatRoomSend,
            sender_id: adminCanonicalIdStr,
            receiver_id: selectedCanonicalIdSend,
            content: newMessage,
            timestamp: new Date().toISOString(),
        };

        console.log('=== ADMIN SENDING MESSAGE ===');
        console.log('Admin user object:', user);
        console.log('Selected user object:', selectedUser);
        console.log('Admin canonical ID:', adminCanonicalId);
        console.log('User canonical ID:', selectedCanonicalIdSend);
        console.log('Chat room:', chatRoomSend);
        console.log('Message data:', messageData);

        // Add admin message to local state immediately (optimistic update)
        setMessages(prev => {
            console.log('ADMIN: Adding message to state, current count:', prev.length);
            const newMessages = [...prev, {
                ...messageData,
                sender_id: adminCanonicalIdStr,
                id: Date.now()
            }];
            console.log('ADMIN: New message count:', newMessages.length);
            return newMessages;
        });

        socket.emit('send_message', messageData);
        setNewMessage('');
        
        // Reset submission flag after a short delay
        setTimeout(() => {
            e.target.dataset.submitting = 'false';
        }, 1000);
    };

    const handleBack = () => {
        if (selectedUser && !showUserList) {
            setSelectedUser(null);
            setShowUserList(true);
        } else {
            navigate(-1);
        }
    };

    const handleUserSelect = (chatUser) => {
        setSelectedUser(chatUser);
        setShowUserList(false);
    };

    const getUserInitials = (chatUser) => {
        if (chatUser.first_name && chatUser.last_name) {
            return `${chatUser.first_name[0]}${chatUser.last_name[0]}`.toUpperCase();
        }
        return chatUser.email?.[0]?.toUpperCase() || 'U';
    };

    const getUserDisplayName = (chatUser) => {
        if (chatUser.first_name && chatUser.last_name) {
            return `${chatUser.first_name} ${chatUser.last_name}`;
        }
        return chatUser.email || 'Unknown User';
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
                
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-semibold text-gray-800">
                        {selectedUser && !showUserList 
                            ? getUserDisplayName(selectedUser)
                            : 'Admin Chat'
                        }
                    </h1>
                </div>
                
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

            {/* Main Content */}
            {showUserList ? (
                // User List View
                <div className="flex-1 flex flex-col">
                    {/* Search Bar */}
                    <div className="p-4 bg-white border-b">
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search users..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Users List */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <ChatBubbleLeftRightIcon className="w-16 h-16 mb-4" />
                                <p className="text-lg font-medium">No users found</p>
                                <p className="text-sm">Users will appear here when they start chatting</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {filteredUsers.map((chatUser) => (
                                    <div
                                        key={chatUser._id}
                                        onClick={() => handleUserSelect(chatUser)}
                                        className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <div className="flex-shrink-0 mr-3">
                                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">
                                                    {getUserInitials(chatUser)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {getUserDisplayName(chatUser)}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {chatUser.email}
                                            </p>
                                        </div>
                                        
                                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // Chat View
                <div className="flex-1 flex flex-col">
                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <ChatBubbleLeftRightIcon className="w-16 h-16 mb-4" />
                                <p className="text-lg font-medium">No messages yet</p>
                                <p className="text-sm">Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={msg.id || index} className={`flex ${String(msg.sender_id) === adminCanonicalIdStr ? 'justify-end' : 'justify-start'}`}>
                                    {String(msg.sender_id) !== adminCanonicalIdStr && (
                                        <div className="flex-shrink-0 mr-3">
                                            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">
                                                    {getUserInitials(selectedUser)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                        msg.sender_id === adminCanonicalId 
                                            ? 'bg-green-500 text-white rounded-br-sm' 
                                            : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                                    }`}>
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                        {msg.sender_id === adminCanonicalId && (
                                            <div className="text-xs text-green-100 mt-1 text-right">
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        )}
                                    </div>

                                    {msg.sender_id === adminCanonicalId && (
                                        <div className="flex-shrink-0 ml-3">
                                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">
                                                    A
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
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
                                    placeholder="Type your message..."
                                    className="w-full px-4 py-3 pr-12 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300 text-sm placeholder-gray-600"
                                />
                                <button 
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-full transition-colors"
                                >
                                    <PaperAirplaneIcon className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminChatPage;