import React from 'react';
import ModuleTemplate from './ModuleTemplate';

const AssetIQ: React.FC = () => {
    const assets = [
        { type: 'Real Estate', description: 'Primary Residence - Palo Alto', value: '$3.2M', location: 'CA' },
        { type: 'Real Estate', description: 'Vacation Home - Aspen', value: '$2.1M', location: 'CO' },
        { type: 'Art Collection', description: 'Modern Art Portfolio', value: '$850K', location: 'Various' },
        { type: 'Vehicles', description: 'Luxury Vehicle Collection', value: '$420K', location: 'CA' },
        { type: 'Jewelry', description: 'Family Jewelry Collection', value: '$275K', location: 'Safe Deposit' },
    ];

    return (
        <ModuleTemplate 
            title="assetIQ" 
            description="Physical asset tracking and valuation"
        >
            <div className="module-grid">
                <div className="module-card">
                    <h3 className="card-title">Physical Assets</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Asset Type</th>
                                    <th>Description</th>
                                    <th>Value</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.map((asset, index) => (
                                    <tr key={index}>
                                        <td>{asset.type}</td>
                                        <td>{asset.description}</td>
                                        <td>{asset.value}</td>
                                        <td>{asset.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="module-card-row">
                    <div className="module-card small">
                        <h3 className="card-title">Total Asset Value</h3>
                        <div className="metric-large">$6.8M</div>
                        <p className="metric-subtitle">Physical assets</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Insurance Coverage</h3>
                        <div className="metric-large">$7.2M</div>
                        <p className="metric-subtitle">Full replacement value</p>
                    </div>
                </div>
            </div>
        </ModuleTemplate>
    );
};

export default AssetIQ; 