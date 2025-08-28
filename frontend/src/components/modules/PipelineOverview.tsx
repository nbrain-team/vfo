import React from 'react';
import { Booking } from '../../adminData';

interface PipelineOverviewProps {
    bookings: Booking[];
}

const PipelineOverview: React.FC<PipelineOverviewProps> = ({ bookings }) => {
    const stages = [
        { key: 'book-consults', name: 'Book Consults', filter: (b: Booking) => b.stage === 'New', color: '#3C4630' },
        { key: 'pre-engagement', name: 'Pre-Engagement', filter: (b: Booking) => b.stage === 'Booked' || b.stage === 'Paid', color: '#C07C3D' },
        { key: 'engaged', name: 'Engaged', filter: (b: Booking) => b.stage === 'Signed', color: '#DCA85E' },
        { key: 'questionnaire', name: 'Questionnaire Received', filter: (b: Booking) => b.stage === 'Signed' && b.notes?.some(n => n.toLowerCase().includes('questionnaire')), color: '#E9EDE4' },
        { key: 'in-process', name: 'Matter in Process', filter: (b: Booking) => b.stage === 'Onboarding', color: '#22c55e' },
        { key: 'fulfilled', name: 'Matter Fulfilled', filter: (b: Booking) => b.stage === 'Completed', color: '#44ffff' }
    ];

    return (
        <div className="module-card">
            <h3 className="section-title">Pipeline Overview</h3>
            
            {/* Visual Pipeline */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginTop: '24px',
                marginBottom: '40px',
                position: 'relative',
                padding: '0 30px'
            }}>
                {/* Pipeline line */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50px',
                    right: '50px',
                    height: '4px',
                    background: 'var(--border-light)',
                    transform: 'translateY(-50%)',
                    zIndex: 0
                }}></div>
                
                {stages.map((stage, index) => {
                    const count = bookings.filter(stage.filter).length;
                    return (
                        <div key={stage.key} style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            flex: 1,
                            zIndex: 1
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: stage.color,
                                color: stage.key === 'questionnaire' ? 'var(--text-primary)' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '20px',
                                marginBottom: '12px',
                                border: '4px solid white',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {count}
                            </div>
                            <div style={{ 
                                fontSize: '13px', 
                                textAlign: 'center',
                                color: 'var(--text-secondary)',
                                maxWidth: '100px',
                                fontWeight: '500'
                            }}>
                                {stage.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Stage Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '32px' }}>
                {stages.map(stage => {
                    const stageBookings = bookings.filter(stage.filter);
                    return (
                        <div key={stage.key} style={{ 
                            background: 'var(--background-secondary)', 
                            padding: '16px', 
                            borderRadius: '8px',
                            border: '1px solid var(--border-light)'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)' }}>
                                    {stage.name}
                                </h4>
                                <span style={{
                                    background: stage.color,
                                    color: stage.key === 'questionnaire' ? 'var(--text-primary)' : 'white',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    {stageBookings.length}
                                </span>
                            </div>
                            {stageBookings.length > 0 ? (
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                    {stageBookings.slice(0, 3).map(booking => (
                                        <li key={booking.id} style={{ 
                                            fontSize: '12px', 
                                            padding: '4px 0',
                                            color: 'var(--text-secondary)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {booking.name}
                                        </li>
                                    ))}
                                    {stageBookings.length > 3 && (
                                        <li style={{ 
                                            fontSize: '11px', 
                                            padding: '4px 0',
                                            color: 'var(--text-muted)',
                                            fontStyle: 'italic'
                                        }}>
                                            +{stageBookings.length - 3} more
                                        </li>
                                    )}
                                </ul>
                            ) : (
                                <div style={{ 
                                    fontSize: '12px', 
                                    color: 'var(--text-muted)',
                                    fontStyle: 'italic'
                                }}>
                                    No clients in this stage
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PipelineOverview;
