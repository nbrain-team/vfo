import React, { useState, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const modules = [
    { name: 'agentIQ', path: '/agent' },
    { name: 'legalIQ', path: '/legal' },
    { name: 'riskIQ', path: '/risk' },
    { name: 'wealthIQ', path: '/wealth' },
    { name: 'trustIQ', path: '/trust' },
    { name: 'cryptoIQ', path: '/crypto' },
    { name: 'taxIQ', path: '/tax' },
    { name: 'assetIQ', path: '/asset' },
    { name: 'healthIQ', path: '/health' },
    { name: 'homeIQ', path: '/home' },
    { name: 'promptIQ', path: '/prompt' },
    { name: 'signalIQ', path: '/signal' },
];

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex">
            <div
                className={`sidebar ${isExpanded ? 'expanded' : ''}`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <div className="sidebar-logo">
                    <h1 className="sidebar-nav-label">{isExpanded ? 'AGENTIQ' : 'A'}</h1>
                </div>
                <nav className="sidebar-nav-group">
                    {modules.map(module => (
                        <NavLink
                            key={module.name}
                            to={module.path}
                            className="sidebar-nav-item"
                            title={module.name}
                        >
                            <span className="sidebar-nav-label">{module.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className={`content-area ${isExpanded ? 'expanded' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default MainLayout; 