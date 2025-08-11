import React from 'react';

interface ModuleScore {
    overall: number;
    status: 'green' | 'orange' | 'red';
    lastUpdated: string;
    subScores?: {
        [key: string]: number;
    };
}

interface ModuleBaseProps {
    moduleName: string;
    moduleIcon: string;
    description: string;
    score: ModuleScore;
    children: React.ReactNode;
    alerts?: Array<{
        type: 'critical' | 'warning' | 'info';
        message: string;
    }>;
}

const ModuleBase: React.FC<ModuleBaseProps> = ({
    moduleName,
    moduleIcon,
    description,
    score,
    children,
    alerts = []
}) => {
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'green': return '#22c55e';
            case 'orange': return '#f59e0b';
            case 'red': return '#ef4444';
            default: return '#94a3b8';
        }
    };

    const getAlertColor = (type: string) => {
        switch(type) {
            case 'critical': return '#ef4444';
            case 'warning': return '#f59e0b';
            case 'info': return '#3b82f6';
            default: return '#94a3b8';
        }
    };

    return (
        <div className="page-container">
            {/* Module Header */}
            <div style={{
                background: 'var(--card-bg)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: 'var(--shadow)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '32px' }}>{moduleIcon}</span>
                        <div>
                            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                                {moduleName}
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                                {description}
                            </p>
                        </div>
                    </div>
                    
                    {/* Score Display */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: getStatusColor(score.status),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold'
                        }}>
                            {score.overall}
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                            Health Score
                        </p>
                    </div>
                </div>

                {/* Alerts */}
                {alerts.length > 0 && (
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {alerts.map((alert, index) => (
                            <div key={index} style={{
                                padding: '12px',
                                background: `${getAlertColor(alert.type)}15`,
                                borderLeft: `4px solid ${getAlertColor(alert.type)}`,
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}>
                                {alert.message}
                            </div>
                        ))}
                    </div>
                )}

                {/* Sub-scores if available */}
                {score.subScores && (
                    <div style={{ 
                        marginTop: '20px', 
                        display: 'grid', 
                        gridTemplateColumns: `repeat(${Object.keys(score.subScores).length}, 1fr)`,
                        gap: '16px'
                    }}>
                        {Object.entries(score.subScores).map(([key, value]) => (
                            <div key={key} style={{
                                padding: '12px',
                                background: 'var(--bg)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{value}%</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Module Content */}
            <div>
                {children}
            </div>
        </div>
    );
};

export default ModuleBase; 