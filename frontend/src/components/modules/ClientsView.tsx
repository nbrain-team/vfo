import React, { useState } from 'react';
import { Booking } from '../../adminData';
import ClientDetails from './ClientDetails';

interface ClientsViewProps {
    bookings: Booking[];
    onSelectClient: (id: string) => void;
    selectedId: string | null;
}

const ClientsView: React.FC<ClientsViewProps> = ({ bookings, onSelectClient, selectedId }) => {
    // Calculate progress percentage based on stage
    const getProgress = (stage: Booking['stage']) => {
        const stages = ['New', 'Booked', 'Paid', 'Signed', 'Onboarding', 'Completed'];
        const currentIndex = stages.indexOf(stage);
        return Math.round(((currentIndex + 1) / stages.length) * 100);
    };

    // Map stage to candidate type
    const getCandidateType = (booking: Booking) => {
        if (booking.stage === 'New') return 'Lead';
        if (booking.stage === 'Booked') return 'Free Consult';
        if (booking.stage === 'Paid') return 'Paid Consult';
        if (booking.stage === 'Signed') return booking.pkg?.includes('WYDAPT') ? 'Engaged WYDAPT' : 'Engaged LLPS';
        return 'Engaged';
    };

    // Map stage to pipeline status
    const getPipelineStatus = (stage: Booking['stage']) => {
        const statusMap = {
            'New': 'Booked Consult',
            'Booked': 'Pre-Engagement',
            'Paid': 'Pre-Engagement',
            'Signed': 'Engaged',
            'Onboarding': 'Matter in Process',
            'Completed': 'Matter Fulfilled'
        };
        return statusMap[stage] || stage;
    };

    const selectedClient = bookings.find(b => b.id === selectedId);

    if (selectedClient) {
        return <ClientDetails 
            client={selectedClient} 
            onUpdate={() => onSelectClient(selectedClient.id)} 
            onBack={() => onSelectClient('')}
        />;
    }

    return (
        <div className="module-card">
            <h3 className="section-title">Client Pipeline</h3>
            <div className="table-container" style={{ marginTop: 12 }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Candidate Type</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Start Date</th>
                            <th>Advisor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr 
                                key={booking.id} 
                                onClick={() => onSelectClient(booking.id)}
                                style={{ 
                                    cursor: 'pointer',
                                    background: selectedId === booking.id ? 'var(--primary-light)' : 'transparent'
                                }}
                            >
                                <td>
                                    <div>
                                        <strong>{booking.name}</strong>
                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                            {booking.email}
                                        </div>
                                    </div>
                                </td>
                                <td>{getCandidateType(booking)}</td>
                                <td>
                                    <span className="status-badge" style={{
                                        background: booking.stage === 'Completed' ? '#22c55e' : 
                                                   booking.stage === 'Onboarding' ? '#DCA85E' : 
                                                   booking.stage === 'Signed' ? '#C07C3D' : 
                                                   'var(--primary)'
                                    }}>
                                        {getPipelineStatus(booking.stage)}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ 
                                            flex: 1, 
                                            height: '8px', 
                                            background: 'var(--border-light)', 
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${getProgress(booking.stage)}%`,
                                                height: '100%',
                                                background: booking.stage === 'Completed' ? '#22c55e' : 'var(--primary)',
                                                transition: 'width 0.3s ease'
                                            }}></div>
                                        </div>
                                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', minWidth: '35px' }}>
                                            {getProgress(booking.stage)}%
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                        {new Date(booking.createdAt || '').toLocaleDateString()}
                                    </div>
                                </td>
                                <td>Matt Johnson</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientsView;
