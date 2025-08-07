import React, { useState, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const modules = [
    { name: 'Dashboard', path: '/platform' },
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
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="main-layout">
            <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
                <div className="sidebar-logo">
                    <h1>LIFTed VFO</h1>
                </div>
                <nav className="sidebar-nav-group">
                    {modules.map(module => (
                        <NavLink
                            key={module.name}
                            to={module.path}
                            className={({ isActive }) => 
                                `sidebar-nav-item ${isActive ? 'active' : ''}`
                            }
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