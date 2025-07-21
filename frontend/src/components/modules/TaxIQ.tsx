import React from 'react';
import ModuleTemplate from './ModuleTemplate';

const TaxIQ: React.FC = () => {
    const taxData = [
        { category: 'Federal Income Tax', estimated: '$420,000', paid: '$105,000', remaining: '$315,000' },
        { category: 'State Income Tax', estimated: '$85,000', paid: '$21,250', remaining: '$63,750' },
        { category: 'Capital Gains Tax', estimated: '$125,000', paid: '$0', remaining: '$125,000' },
        { category: 'Property Tax', estimated: '$45,000', paid: '$22,500', remaining: '$22,500' },
    ];

    return (
        <ModuleTemplate 
            title="taxIQ" 
            description="Tax optimization and strategic planning"
        >
            <div className="module-grid">
                <div className="module-card-row">
                    <div className="module-card small">
                        <h3 className="card-title">Estimated Tax 2024</h3>
                        <div className="metric-large">$675K</div>
                        <p className="metric-subtitle">Total liability</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Tax Paid YTD</h3>
                        <div className="metric-large">$148.8K</div>
                        <p className="metric-subtitle">22% of estimate</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Tax Savings</h3>
                        <div className="metric-large">$82K</div>
                        <p className="metric-subtitle">Through optimization</p>
                    </div>
                </div>

                <div className="module-card">
                    <h3 className="card-title">Tax Obligations</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Tax Category</th>
                                    <th>Estimated</th>
                                    <th>Paid YTD</th>
                                    <th>Remaining</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taxData.map((tax, index) => (
                                    <tr key={index}>
                                        <td>{tax.category}</td>
                                        <td>{tax.estimated}</td>
                                        <td>{tax.paid}</td>
                                        <td>{tax.remaining}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ModuleTemplate>
    );
};

export default TaxIQ; 