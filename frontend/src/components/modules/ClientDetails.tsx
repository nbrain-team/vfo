import React, { useState } from 'react';
import { Booking, updateBooking } from '../../adminData';

interface ClientDetailsProps {
    client: Booking;
    onUpdate: () => void;
    onBack?: () => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client, onUpdate, onBack }) => {
    const [showCalendar, setShowCalendar] = useState(false);

    const getCandidateType = (booking: Booking) => {
        if (booking.stage === 'New') return 'Lead';
        if (booking.stage === 'Booked') return 'Free Consult';
        if (booking.stage === 'Paid') return 'Paid Consult';
        if (booking.stage === 'Signed') return booking.pkg?.includes('WYDAPT') ? 'Engaged WYDAPT' : 'Engaged LLPS';
        return 'Engaged';
    };

    const handleStageChange = (newStage: Booking['stage']) => {
        updateBooking(client.id, { stage: newStage });
        onUpdate();
    };

    return (
        <div className="module-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 className="section-title" style={{ margin: 0 }}>Client Details - {client.name}</h3>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="button-outline"
                        style={{ width: 'auto', fontSize: '14px' }}
                    >
                        Back to Pipeline
                    </button>
                )}
            </div>
            
            {/* Main Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                <div>
                    <h4 style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-secondary)' }}>Contact Information</h4>
                    <div style={{ display: 'grid', gap: '12px' }}>
                        <div>
                            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Name</label>
                            <div style={{ fontWeight: '500' }}>{client.name}</div>
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email</label>
                            <div>{client.email}</div>
                        </div>
                        {client.phone && (
                            <div>
                                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Phone</label>
                                <div>{client.phone}</div>
                            </div>
                        )}
                        <div>
                            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Candidate Type</label>
                            <div>{getCandidateType(client)}</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-secondary)' }}>Status & Progress</h4>
                    <div style={{ display: 'grid', gap: '12px' }}>
                        <div>
                            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Current Stage</label>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                {(['New', 'Booked', 'Paid', 'Signed', 'Onboarding', 'Completed'] as Booking['stage'][]).map(stage => (
                                    <button
                                        key={stage}
                                        onClick={() => handleStageChange(stage)}
                                        style={{
                                            padding: '4px 12px',
                                            fontSize: '12px',
                                            border: '1px solid var(--border)',
                                            borderRadius: '4px',
                                            background: client.stage === stage ? 'var(--primary)' : 'var(--background-secondary)',
                                            color: client.stage === stage ? 'white' : 'var(--text-primary)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {stage}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Start Date</label>
                            <div>{new Date(client.createdAt || '').toLocaleDateString()}</div>
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Package</label>
                            <div>{client.pkg || 'Not specified'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendar Section */}
            <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '14px', margin: 0, color: 'var(--text-secondary)' }}>Calendar & Appointments</h4>
                    <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="button-outline"
                        style={{ width: 'auto', fontSize: '12px', padding: '4px 12px' }}
                    >
                        {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
                    </button>
                </div>

                {showCalendar && (
                    <div style={{ 
                        width: '100%', 
                        height: '600px', 
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: 'var(--background-secondary)'
                    }}>
                        <iframe
                            src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(client.email)}&ctz=America/Denver`}
                            style={{ border: 0, width: '100%', height: '100%' }}
                            frameBorder="0"
                            scrolling="no"
                        ></iframe>
                    </div>
                )}
            </div>

            {/* Tasks Section */}
            <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-secondary)' }}>LIFTed Bot & Advisor Tasks</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ 
                        padding: '12px', 
                        background: 'var(--background-secondary)', 
                        borderRadius: '6px',
                        border: '1px solid var(--border-light)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: '500', fontSize: '13px' }}>Send Welcome Email</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                    Assigned to: LIFTed Bot
                                </div>
                            </div>
                            <span className="status-badge pending">Pending</span>
                        </div>
                    </div>
                    <div style={{ 
                        padding: '12px', 
                        background: 'var(--background-secondary)', 
                        borderRadius: '6px',
                        border: '1px solid var(--border-light)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: '500', fontSize: '13px' }}>Prepare Engagement Letter</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                    Assigned to: Advisor
                                </div>
                            </div>
                            <span className="status-badge pending">Pending</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents Section */}
            <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-secondary)' }}>Documents & Forms</h4>
                {client.docs && client.docs.length > 0 ? (
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {client.docs.map((doc, index) => (
                            <div key={index} style={{ 
                                padding: '8px 12px', 
                                background: 'var(--background-secondary)', 
                                borderRadius: '4px',
                                fontSize: '13px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span>{doc}</span>
                                <button className="button-outline" style={{ 
                                    width: 'auto', 
                                    fontSize: '11px', 
                                    padding: '2px 8px' 
                                }}>
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                        No documents uploaded yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientDetails;
