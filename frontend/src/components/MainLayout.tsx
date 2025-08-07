import React, { useState, ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const modules = [
    { name: 'Dashboard', path: '/platform', icon: '📊' },
    { name: 'agentIQ', path: '/agent', icon: '🤖' },
    { name: 'legalIQ', path: '/legal', icon: '⚖️' },
];

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_name');
        navigate('/login');
    };

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
                <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) => 
                            `sidebar-nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="sidebar-nav-label">Profile</span>
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="sidebar-nav-item"
                        style={{ 
                            width: '100%', 
                            border: 'none', 
                            background: 'transparent',
                            textAlign: 'left',
                            cursor: 'pointer'
                        }}
                    >
                        <span className="sidebar-nav-label">Logout</span>
                    </button>
                </div>
            </div>
            <div className={`content-area ${isExpanded ? 'expanded' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default MainLayout; 