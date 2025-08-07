import React, { useState, useRef, useEffect } from 'react';
import apiClient from '../apiClient';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: any[];
}

interface DocumentChatProps {
    entityId?: string;
    documentType?: string;
    contextType?: 'legal' | 'financial' | 'general';
}

const DocumentChat: React.FC<DocumentChatProps> = ({ 
    entityId, 
    documentType, 
    contextType = 'legal' 
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSources, setShowSources] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            // Prepare conversation history
            const conversationHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await apiClient.post('/chat/chat', {
                query: inputText,
                entity_id: entityId,
                document_type: documentType,
                context_type: contextType,
                conversation_history: conversationHistory
            });

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.data.answer,
                timestamp: new Date(),
                sources: response.data.sources
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'I apologize, but I encountered an error processing your request. Please try again.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const suggestedQuestions = [
        "What are the key provisions in the trust document?",
        "Who are the successor trustees?",
        "What are the distribution conditions?",
        "Are there any compliance deadlines coming up?",
        "What are the tax implications mentioned in the documents?"
    ];

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '600px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--card-bg)',
            overflow: 'hidden'
        }}>
            {/* Chat Header */}
            <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'var(--gray-lighter)'
            }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                    📚 Document Assistant
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Ask questions about your documents using AI
                </p>
            </div>

            {/* Messages Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                backgroundColor: 'var(--gray-lighter)'
            }}>
                {messages.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            Start by asking a question about your documents
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                            {suggestedQuestions.map((question, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInputText(question)}
                                    style={{
                                        padding: '8px 12px',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius)',
                                        backgroundColor: 'var(--card-bg)',
                                        color: 'var(--text-primary)',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                                        e.currentTarget.style.borderColor = 'var(--border)';
                                    }}
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                style={{
                                    marginBottom: '16px',
                                    display: 'flex',
                                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <div style={{
                                    maxWidth: '70%',
                                    padding: '12px 16px',
                                    borderRadius: 'var(--radius-lg)',
                                    backgroundColor: message.role === 'user' ? 'var(--primary)' : 'var(--card-bg)',
                                    color: message.role === 'user' ? 'white' : 'var(--text-primary)',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    <div style={{ 
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        whiteSpace: 'pre-wrap'
                                    }}>
                                        {message.content}
                                    </div>
                                    
                                    {/* Sources */}
                                    {message.sources && message.sources.length > 0 && (
                                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                                            <button
                                                onClick={() => setShowSources(showSources === message.id ? null : message.id)}
                                                style={{
                                                    fontSize: '12px',
                                                    color: message.role === 'user' ? 'white' : 'var(--primary)',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                    textDecoration: 'underline'
                                                }}
                                            >
                                                📎 View Sources ({message.sources.length})
                                            </button>
                                            
                                            {showSources === message.id && (
                                                <div style={{ marginTop: '8px' }}>
                                                    {message.sources.map((source, idx) => (
                                                        <div key={idx} style={{
                                                            fontSize: '11px',
                                                            padding: '6px',
                                                            marginTop: '4px',
                                                            backgroundColor: 'var(--gray-lighter)',
                                                            borderRadius: 'var(--radius)',
                                                            color: 'var(--text-secondary)'
                                                        }}>
                                                            <strong>{source.document}</strong> - Page {source.page}
                                                            <div style={{ marginTop: '4px', fontStyle: 'italic' }}>
                                                                "{source.excerpt}"
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    
                                    <div style={{ 
                                        fontSize: '11px',
                                        color: message.role === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)',
                                        marginTop: '8px'
                                    }}>
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'flex-start',
                                marginBottom: '16px'
                            }}>
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: 'var(--radius-lg)',
                                    backgroundColor: 'var(--card-bg)',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area */}
            <div style={{
                padding: '16px',
                borderTop: '1px solid var(--border)',
                backgroundColor: 'var(--card-bg)'
            }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask a question about your documents..."
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            fontSize: '14px',
                            resize: 'none',
                            minHeight: '40px',
                            maxHeight: '100px',
                            fontFamily: 'inherit'
                        }}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim() || isLoading}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: inputText.trim() && !isLoading ? 'var(--primary)' : 'var(--gray-light)',
                            color: inputText.trim() && !isLoading ? 'white' : 'var(--text-muted)',
                            border: 'none',
                            borderRadius: 'var(--radius)',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: inputText.trim() && !isLoading ? 'pointer' : 'not-allowed',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        {isLoading ? 'Thinking...' : 'Send'}
                    </button>
                </div>
            </div>

            {/* Typing Animation CSS */}
            <style>{`
                .typing-indicator {
                    display: flex;
                    gap: 4px;
                }
                .typing-indicator span {
                    width: 8px;
                    height: 8px;
                    background-color: var(--text-secondary);
                    border-radius: 50%;
                    animation: typing 1.4s infinite;
                }
                .typing-indicator span:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .typing-indicator span:nth-child(3) {
                    animation-delay: 0.4s;
                }
                @keyframes typing {
                    0%, 60%, 100% {
                        transform: translateY(0);
                        opacity: 0.5;
                    }
                    30% {
                        transform: translateY(-10px);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default DocumentChat; 