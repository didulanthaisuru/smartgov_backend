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
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000', {
    path: '/socket.io/',
    transports: ['polling', 'websocket'],
    withCredentials: true,
    forceNew: true,
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

    // Canonical admin ID
    const adminCanonicalId = user?.admin_id || user?.id || user?._id;
    const adminCanonicalIdStr = adminCanonicalId != null ? String(adminCanonicalId) : '';

    useEffect(() => {
        console.log('Admin user object:', user);
        console.log('Admin canonical ID:', adminCanonicalIdStr);
    }, [user, adminCanonicalIdStr]);

    // Notifications room for admin
    useEffect(() => {
        socket.emit('join_room', {
            room: 'admin_dashboard',
            user_type: 'admin',
        });
        socket.on('new_user_message', (data) => {
            console.log('New user message notification:', data);
        });
        return () => socket.off('new_user_message');
    }, []);

    // Filtered users for search
    const filteredUsers = users.filter((u) =>
        (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.first_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.last_name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/chat/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchUsers();
    }, []);

    // Fetch history for selected user
    useEffect(() => {
        const fetchHistory = async () => {
            if (!selectedUser) return;
            try {
                const token = localStorage.getItem('token');
                const historyKey = selectedUser.nic || selectedUser._id;
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/chat/history/user/${historyKey}?direction=both`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setMessages(res.data);
            } catch (err) {
                console.error('Error fetching chat history:', err);
            }
        };
        fetchHistory();
    }, [selectedUser]);

    // Real-time join/leave and listeners for selected user
    useEffect(() => {
        let currentChatRoom = null;
        if (selectedUser) {
            const selectedCanonicalId =
                selectedUser?.nic ||
                selectedUser?._id ||
                selectedUser?.user_id ||
                selectedUser?.id ||
                selectedUser?.userId;
            const chatRoom = selectedCanonicalId ? `user_chat_${selectedCanonicalId}` : null;
            currentChatRoom = chatRoom;

            console.log('ADMIN CHAT: Joining room:', chatRoom);
            socket.emit('join_room', { room: chatRoom, user_type: 'admin' });

            socket.off('receive_message');
            socket.on('receive_message', (message) => {
                if (
                    String(message.sender_id) === String(selectedCanonicalId) ||
                    String(message.receiver_id) === String(selectedCanonicalId)
                ) {
                    setMessages((prev) => {
                        const exists = prev.some(
                            (m) => (m._id && m._id === message._id) ||
                                (m.content === message.content && String(m.timestamp) === String(message.timestamp) && String(m.sender_id) === String(message.sender_id))
                        );
                        if (exists) return prev;
                        return [...prev, message];
                    });
                }
            });

            socket.on('user_typing', (data) => {
                if (data.user_id === selectedCanonicalId) {
                    console.log('User is typing:', data.is_typing);
                }
            });

            socket.on('user_joined', (data) => console.log('User joined room:', data));
            socket.on('user_left', (data) => console.log('User left room:', data));

            socket.emit('mark_read', {
                room: chatRoom,
                user_id: 'admin',
                timestamp: new Date().toISOString(),
            });
        }

        return () => {
            if (currentChatRoom) {
                console.log('ADMIN CHAT: Leaving room:', currentChatRoom);
                socket.emit('leave_room', { room: currentChatRoom });
            }
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
        if (e.target.dataset.submitting === 'true') return;
        e.target.dataset.submitting = 'true';

        const selectedCanonicalIdSend =
            selectedUser?.nic ||
            selectedUser?._id ||
            selectedUser?.user_id ||
            selectedUser?.id ||
            selectedUser?.userId;
        const chatRoomSend = selectedCanonicalIdSend ? `user_chat_${selectedCanonicalIdSend}` : null;
        const messageData = {
            room: chatRoomSend,
            sender_id: adminCanonicalIdStr,
            receiver_id: selectedCanonicalIdSend,
            content: newMessage,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, { ...messageData, sender_id: adminCanonicalIdStr, id: Date.now() }]);
        socket.emit('send_message', messageData);
        setNewMessage('');
        setTimeout(() => (e.target.dataset.submitting = 'false'), 1000);
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
        <div className="flex flex-col h-screen max-w-md mx-auto bg-white font-inter">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition" aria-label="Back">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
                </button>

                <div className="flex-1 text-center">
                    <h1 className="text-base font-medium text-gray-800">
                        {selectedUser && !showUserList ? getUserDisplayName(selectedUser) : 'Admin Chat'}
                    </h1>
                </div>

                <div className="flex items-center gap-3">
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
                    <Bars3Icon className="w-6 h-6 text-gray-700" />
                </div>
            </div>

            {/* Main Content */}
            {showUserList ? (
                <div className="flex-1 flex flex-col">
                    {/* Search */}
                    <div className="p-4 bg-white border-b">
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search users..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#73A2BF]"
                            />
                        </div>
                    </div>

                    {/* Users */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <ChatBubbleLeftRightIcon className="w-16 h-16 mb-4" />
                                <p className="text-lg font-medium">No users found</p>
                                <p className="text-sm">Users will appear here when they start chatting</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {filteredUsers.map((chatUser) => (
                                    <div
                                        key={chatUser._id}
                                        onClick={() => handleUserSelect(chatUser)}
                                        className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <div className="flex-shrink-0 mr-3">
                                            <div className="w-12 h-12 rounded-full bg-[#73A2BF] text-white flex items-center justify-center">
                                                <span className="text-sm font-semibold">{getUserInitials(chatUser)}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{getUserDisplayName(chatUser)}</p>
                                            <p className="text-xs text-gray-500 truncate">{chatUser.email}</p>
                                        </div>
                                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#FAFAFA]">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <ChatBubbleLeftRightIcon className="w-16 h-16 mb-4" />
                                <p className="text-lg font-medium">No messages yet</p>
                                <p className="text-sm">Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => {
                                const isMe = String(msg.sender_id) === adminCanonicalIdStr;
                                return (
                                    <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        {!isMe && (
                                            <div className="flex-shrink-0 mr-2 mt-1">
                                                <div className="w-8 h-8 rounded-full bg-[#73A2BF] flex items-center justify-center shadow-sm">
                                                    <span className="text-white text-xs font-semibold">U</span>
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
                                                    <span className="text-white text-xs font-semibold">A</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
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
                                    placeholder="Type your message..."
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
            )}
        </div>
    );
};

export default AdminChatPage;