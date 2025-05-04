import React, { useState, useEffect } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import ChatArea from "../ChatArea/ChatArea";

const ChatPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load saved theme preference or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('whatsappTheme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
        }
    }, []);

    // Apply theme to <body> and store preference
    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('whatsappTheme', theme);
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);


    return (
        <div className="w-full h-screen overflow-hidden dark:bg-gray-900">
            <div className="flex h-full bg-gray-100 dark:bg-gray-900">
                {/* Sidebar takes 1/4 width */}
                <div className="w-0 md:w-1/4">
                    <Sidebar isDarkMode={isDarkMode} />
                </div>

                <div className="w-full md:w-3/4">
                    <ChatArea isDarkMode={isDarkMode} />
                </div>

            </div>
        </div>
    );
};

export default ChatPage;
