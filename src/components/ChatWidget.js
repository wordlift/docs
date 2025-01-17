import React from 'react';

export default function ChatWidget() {
    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '400px',
            height: '600px',
            zIndex: 9999,
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <iframe
                src="https://copilotstudio.microsoft.com/environments/Default-efbef5c4-77ac-41d8-800a-2dec22f28e82/bots/Default_agentWordLift/webchat?__version__=2"
                frameBorder="0"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px'
                }}
                title="WordLift Chat"
            />
        </div>
    );
}