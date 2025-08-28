import React, { useState } from 'react';
import { Booking, updateBooking } from '../../adminData';

interface PipelineOverviewProps {
    bookings: Booking[];
}

const PipelineOverview: React.FC<PipelineOverviewProps> = ({ bookings }) => {
    const [draggedClient, setDraggedClient] = useState<Booking | null>(null);
    const [dragOverStage, setDragOverStage] = useState<string | null>(null);
    const [showRuleModal, setShowRuleModal] = useState(false);
    const [selectedStage, setSelectedStage] = useState<string>('');
    const [selectedAction, setSelectedAction] = useState<'bot' | 'advisor'>('bot');
    
    const stages = [
        { key: 'book-consults', name: 'Book Consults', stage: 'New', filter: (b: Booking) => b.stage === 'New', color: '#3C4630' },
        { key: 'pre-engagement', name: 'Pre-Engagement', stage: 'Booked', filter: (b: Booking) => b.stage === 'Booked' || b.stage === 'Paid', color: '#C07C3D' },
        { key: 'engaged', name: 'Engaged', stage: 'engaged', filter: (b: Booking) => b.stage === 'engaged', color: '#DCA85E' },
        { key: 'questionnaire', name: 'Questionnaire Received', stage: 'questionnaire_received', filter: (b: Booking) => b.stage === 'questionnaire_received', color: '#E9EDE4' },
        { key: 'in-process', name: 'Matter in Process', stage: 'matter_in_process', filter: (b: Booking) => b.stage === 'matter_in_process', color: '#22c55e' },
        { key: 'fulfilled', name: 'Matter Fulfilled', stage: 'matter_fulfilled', filter: (b: Booking) => b.stage === 'matter_fulfilled', color: '#44ffff' }
    ];

    const handleDragStart = (e: React.DragEvent, booking: Booking) => {
        setDraggedClient(booking);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnter = (stageKey: string) => {
        setDragOverStage(stageKey);
    };

    const handleDragLeave = () => {
        setDragOverStage(null);
    };

    const handleDrop = (e: React.DragEvent, targetStage: typeof stages[0]) => {
        e.preventDefault();
        if (draggedClient) {
            updateBooking(draggedClient.id, { stage: targetStage.stage as any });
            window.location.reload(); // Refresh to show updated data
        }
        setDraggedClient(null);
        setDragOverStage(null);
    };

    const stageActions = {
        'book-consults': {
            bot: ['Send welcome email', 'Schedule follow-up', 'Add to nurture sequence'],
            advisor: ['Call client', 'Send custom email', 'Mark as priority']
        },
        'pre-engagement': {
            bot: ['Send payment link', 'Send engagement letter', 'Create calendar invite'],
            advisor: ['Review client info', 'Prepare for call', 'Send personal note']
        },
        'engaged': {
            bot: ['Send questionnaire', 'Schedule kickoff call', 'Create client folder'],
            advisor: ['Review engagement terms', 'Assign team member', 'Schedule strategy session']
        },
        'questionnaire': {
            bot: ['Generate documents', 'Send reminder', 'Extract key data'],
            advisor: ['Review responses', 'Identify issues', 'Plan next steps']
        },
        'in-process': {
            bot: ['Track document status', 'Send progress update', 'Schedule review'],
            advisor: ['Review drafts', 'Client meeting', 'Finalize documents']
        },
        'fulfilled': {
            bot: ['Schedule annual review', 'Send satisfaction survey', 'Archive documents'],
            advisor: ['Send thank you', 'Request testimonial', 'Discuss referrals']
        }
    };

    return (
        <div className="module-card">
            <h3 className="section-title">Pipeline Overview</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '-8px', marginBottom: '16px' }}>
                Drag clients between stages to update their status. Click stage circles for quick actions.
            </p>
            
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
                            <div 
                                style={{
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
                                    border: dragOverStage === stage.key ? '4px solid var(--primary)' : '4px solid white',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    transform: dragOverStage === stage.key ? 'scale(1.15)' : 'scale(1)'
                                }}
                                onClick={() => {
                                    setSelectedStage(stage.key);
                                    setShowRuleModal(true);
                                }}
                                onDragOver={handleDragOver}
                                onDragEnter={() => handleDragEnter(stage.key)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, stage)}
                                title="Click for quick actions"
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

            {/* Stage Details with Draggable Clients */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '32px' }}>
                {stages.map(stage => {
                    const stageBookings = bookings.filter(stage.filter);
                    return (
                        <div 
                            key={stage.key} 
                            style={{ 
                                background: dragOverStage === stage.key ? 'var(--card-hover)' : 'var(--background-secondary)', 
                                padding: '16px', 
                                borderRadius: '8px',
                                border: dragOverStage === stage.key ? '2px dashed var(--primary)' : '1px solid var(--border-light)',
                                transition: 'all 0.2s ease',
                                minHeight: '150px'
                            }}
                            onDragOver={handleDragOver}
                            onDragEnter={() => handleDragEnter(stage.key)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, stage)}
                        >
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
                                    {stageBookings.map(booking => (
                                        <li 
                                            key={booking.id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, booking)}
                                            style={{ 
                                                fontSize: '12px', 
                                                padding: '6px 8px',
                                                margin: '4px 0',
                                                background: 'var(--background)',
                                                borderRadius: '4px',
                                                cursor: 'grab',
                                                color: 'var(--text-secondary)',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                transition: 'all 0.2s ease',
                                                border: '1px solid transparent'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.border = '1px solid var(--primary)';
                                                e.currentTarget.style.background = 'var(--card-hover)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.border = '1px solid transparent';
                                                e.currentTarget.style.background = 'var(--background)';
                                            }}
                                            title={`Drag to move ${booking.name} to another stage`}
                                        >
                                            {booking.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div style={{ 
                                    fontSize: '12px', 
                                    color: 'var(--text-muted)',
                                    fontStyle: 'italic',
                                    textAlign: 'center',
                                    marginTop: '24px'
                                }}>
                                    Drop clients here
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions Modal */}
            {showRuleModal && (
                <div className="modal-overlay" onClick={() => setShowRuleModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <h3 className="modal-title">
                            Quick Actions - {stages.find(s => s.key === selectedStage)?.name}
                        </h3>
                        
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                                <button
                                    className={selectedAction === 'bot' ? 'form-button' : 'button-outline'}
                                    style={{ width: 'auto' }}
                                    onClick={() => setSelectedAction('bot')}
                                >
                                    Bot Actions
                                </button>
                                <button
                                    className={selectedAction === 'advisor' ? 'form-button' : 'button-outline'}
                                    style={{ width: 'auto' }}
                                    onClick={() => setSelectedAction('advisor')}
                                >
                                    Advisor Actions
                                </button>
                            </div>
                            
                            <div style={{ display: 'grid', gap: '8px' }}>
                                {stageActions[selectedStage as keyof typeof stageActions]?.[selectedAction]?.map((action, idx) => (
                                    <button
                                        key={idx}
                                        className="button-outline"
                                        style={{ 
                                            width: '100%', 
                                            textAlign: 'left',
                                            padding: '12px 16px',
                                            justifyContent: 'flex-start'
                                        }}
                                        onClick={() => {
                                            alert(`${selectedAction === 'bot' ? 'Bot' : 'Advisor'} action: ${action}`);
                                            setShowRuleModal(false);
                                        }}
                                    >
                                        <span style={{ marginRight: '8px' }}>
                                            {selectedAction === 'bot' ? '🤖' : '👤'}
                                        </span>
                                        {action}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="modal-actions">
                            <button className="button-outline" onClick={() => setShowRuleModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PipelineOverview;