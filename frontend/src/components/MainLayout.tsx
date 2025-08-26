import React, { useState, ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const modules = [
    { name: 'Dashboard', path: '/platform', icon: '📊︎' },
    { name: 'Calendar', path: '/admin/calendar', icon: '🗓︎' },
    { name: 'CRM', path: '/admin/crm', icon: '📇︎' },
    { name: 'Site Builder', path: '/admin/site', icon: '🌐︎' },
    { name: 'Documents', path: '/admin/engagement', icon: '✍︎' },
    { name: 'Vault', path: '/admin/vault', icon: '🗄︎' },
    { name: 'Nurture', path: '/admin/nurture', icon: '📣︎' },
    { name: 'Pipelines', path: '/admin/pipelines', icon: '🧩' },
    { name: 'Audit', path: '/admin/audit', icon: '🧾' },
    { name: 'advisorIQ', path: '/agent', icon: '🤖︎' },
    { name: 'legalIQ', path: '/legal', icon: '⚖︎' },
    { name: 'insuranceIQ', path: '/insurance', icon: '🛡︎' },
    { name: 'financialIQ', path: '/wealth', icon: '💰︎' },
    { name: 'taxIQ', path: '/tax', icon: '📋︎' },
    { name: 'cryptoIQ', path: '/crypto', icon: '₿' },
    { name: 'valuesIQ', path: '/values', icon: '🎯︎' },
    { name: 'healthIQ', path: '/health', icon: '🏥︎' },
    { name: 'vCTO', path: '/vcto', icon: '🚀︎' },
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

    const role = (localStorage.getItem('role') || 'Admin') as 'Admin'|'Staff'|'Client';

    return (
        <div className="main-layout">
            <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
                <div 
                    className="sidebar-logo"
                    onClick={() => navigate('/platform')}
                    style={{ cursor: 'pointer' }}
                >
                    <h1>LIFTed VFO</h1>
                </div>
                <nav className="sidebar-nav-group">
                    {modules.filter(m => {
                        const isAdminRoute = m.path.startsWith('/admin/');
                        if (role === 'Client' && isAdminRoute) return false;
                        if (role === 'Staff' && (m.name === 'Pipelines' || m.name === 'Audit')) return false;
                        return true;
                    }).map(module => (
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
                    <a
                        href="/wyoming-apt"
                        target="_blank"
                        rel="noreferrer"
                        className="sidebar-nav-item"
                    >
                        <span className="sidebar-nav-label">Public Site</span>
                    </a>
                    <NavLink
                        to="/docs"
                        className={({ isActive }) =>
                            `sidebar-nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="sidebar-nav-label">Documentation</span>
                    </NavLink>
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