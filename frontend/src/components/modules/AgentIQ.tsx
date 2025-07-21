import React, { useState, useEffect } from 'react';
import apiClient from '../../apiClient';

interface Agent {
    id: number;
    name: string;
    description: string;
}

const AgentIQ: React.FC = () => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await apiClient.get('/agent/agents/');
                setAgents(response.data);
            } catch (error) {
                console.error('Error fetching agents:', error);
            }
        };
        fetchAgents();
    }, []);

    const handleSendMessage = async () => {
        if (!selectedAgent || !message) return;
        
        const userMessage = `You: ${message}`;
        setChatHistory(prev => [...prev, userMessage]);

        try {
            const response = await apiClient.post(`/agent/agents/${selectedAgent.id}/chat`, { message });
            const agentMessage = `Agent: ${response.data}`;
            setChatHistory(prev => [...prev, agentMessage]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            setChatHistory(prev => [...prev, 'Agent: Error sending message.']);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">agentIQ</h1>
            <p>AI copilot + orchestration layer</p>

            <div className="mt-6">
                <h2 className="text-xl font-bold">Select an Agent</h2>
                <select
                    onChange={(e) => {
                        const agent = agents.find(agent => agent.id === parseInt(e.target.value));
                        setSelectedAgent(agent || null);
                        setChatHistory([]);
                    }}
                    className="p-2 border rounded"
                >
                    <option value="">-- Select an Agent --</option>
                    {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                </select>
            </div>

            {selectedAgent && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold">Chat with {selectedAgent.name}</h2>
                    <div className="h-64 overflow-y-auto border rounded p-4 bg-white">
                        {chatHistory.map((msg, index) => (
                            <p key={index} className="whitespace-pre-wrap">{msg}</p>
                        ))}
                    </div>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-grow p-2 border rounded-l"
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-r">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentIQ; 