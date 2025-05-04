import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client"; 

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [socket, setSocket] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false); 

    useEffect(() => {
        const SOCKET_SERVER_URL =  'https://jibber-backend.onrender.com' ;
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || {});
        const newSocket = io(SOCKET_SERVER_URL, {
            transports: ["websocket", "polling"],
            auth: {
                user: userInfo
            },
        });
    
        console.log("Initializing Socket.IO client:", newSocket);
        setSocket(newSocket);
    }, []);
    
    

    return (
        <ChatContext.Provider value={{ selectedRoom, setSelectedRoom, socket, isDarkMode, setIsDarkMode }}>
            {children}
        </ChatContext.Provider>
    );
};
