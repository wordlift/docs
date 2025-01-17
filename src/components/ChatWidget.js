import React, { useState } from 'react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 9999,
            }}
        >
            {isOpen ? (
                <div
                    style={{
                        width: '400px',
                        height: '600px',
                        border: 'none',
                        borderRadius: '10px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}
                >
                    <iframe
                        src="https://copilotstudio.microsoft.com/environments/Default-efbef5c4-77ac-41d8-800a-2dec22f28e82/bots/Default_agentWordLift/webchat?__version__=2"
                        frameBorder="0"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                        }}
                        title="WordLift Chat"
                    />
                    <button
                        onClick={toggleChat}
                        style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            background: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '20px',
                            padding: '5px'
                        }}
                    >
                        X
                    </button>
                </div>
            ) : (
                <button
                    onClick={toggleChat}
                    style={{
                        background: '#2769AA',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        cursor: 'pointer',
                        fontSize: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                >
                    💬
                </button>
            )}
        </div>
    );
}