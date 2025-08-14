import React, { useState, useEffect, useRef } from 'react';

// --- Icon Components ---
const MenuIcon = () => (
    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
);
const DropdownIcon = () => (
    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);
const BotAvatar = () => (
    <div className="w-8 h-8 bg-[#D3F2EE] rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 8V10M15 8V10M9 14H15M4.99989 15.022C5.07747 16.0157 5.45373 16.9439 6.06929 17.691C7.30143 19.1815 9.51296 20 12 20C14.487 20 16.6986 19.1815 17.9307 17.691C18.5463 16.9439 18.9225 16.0157 19.0001 15.022M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.8293 3 15.5284 3.54719 16.9439 4.48157" stroke="#005D5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);
const UserAvatar = () => (
    <div className="w-8 h-8 bg-[#FFEAD9] rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 12C12 12 15 13.5 15 16V20H9V16C9 13.5 12 12 12 12Z" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);
const BackArrowIcon = () => (
    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
);
const SendIcon = () => (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
    </svg>
);


// --- Main Responsive Chatbot Page Component ---
const ChatbotPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'This AI chatbot has been developed to optimize communication and simplify work processes, ultimately leading to smoother operations.' },
        { id: 2, sender: 'user', text: 'Thank You :)' }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: newMessage.trim() }]);
            setNewMessage('');
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'How else can I help you today?' }]);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className="flex flex-col h-screen bg-[#F8FAFC] font-sans">
            
            {/* --- Header --- */}
            <header className="flex items-center justify-between px-4 py-3 border-b bg-white/90 backdrop-blur-sm shadow-sm flex-shrink-0">
                <button className="p-2"><MenuIcon /></button>
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50">
                    <span className="text-sm text-gray-800 font-medium">English</span>
                    <DropdownIcon />
                </div>
            </header>

            {/* --- Chat Messages Container --- */}
            <main ref={chatContainerRef} className="flex-1 px-4 py-4 space-y-5 overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'bot' && <BotAvatar />}
                        <div className={`max-w-[75%] bg-white border border-gray-200 rounded-xl p-3 shadow-sm`}>
                            <p className="text-sm text-gray-700 leading-relaxed break-words">
                                {msg.text}
                            </p>
                        </div>
                        {msg.sender === 'user' && <UserAvatar />}
                    </div>
                ))}
            </main>

            {/* --- Chat Input Footer --- */}
            <footer className="p-4 pt-3 bg-white/90 backdrop-blur-sm border-t flex-shrink-0">
                <div className="flex items-center gap-3 max-w-2xl mx-auto">
                    <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                        <BackArrowIcon />
                    </button>
                    <div className="flex-1 relative">
                         <input
                            type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress} placeholder="Ask anything about Your Service."
                            className="w-full bg-[#FFEAD9] border border-transparent rounded-lg py-3 pl-4 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#8B4513] rounded-md hover:bg-opacity-90 active:scale-95 transition-all flex items-center justify-center shadow"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatbotPage;
