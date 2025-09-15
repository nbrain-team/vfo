import React, { useState, ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface Module {
    name: string;
    path: string;
    icon: string;
    isSection?: boolean;
}

const modules: Module[] = [
    { name: 'Dashboard', path: '/platform', icon: '📊︎' },
    { name: 'Calendar', path: '/admin/calendar', icon: '🗓︎' },
    { name: 'Formbuilder', path: '/admin/formbuilder', icon: '📝' },
    { name: 'Document Library', path: '/admin/documents', icon: '📚' },
    { name: 'Vault', path: '/admin/vault', icon: '🔒' },
    { name: 'Workflows', path: '/admin/nurture', icon: '⚡' },
    { name: 'CRM', path: '/admin/crm', icon: '📇︎' },
    { name: 'Audit Trail', path: '/admin/audit', icon: '🧾' },
    { name: 'Modules', path: '#', icon: '📦', isSection: true },
    { name: 'advisorIQ', path: '/agent', icon: '🤖︎' },
    { name: 'legalIQ', path: '/legal', icon: '⚖︎' },
    { name: 'insuranceIQ', path: '/insurance', icon: '🛡︎' },
    { name: 'financialIQ', path: '/wealth', icon: '💰︎' },
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

    const role = (localStorage.getItem('role') || 'Admin') as 'SuperAdmin'|'Admin'|'Staff'|'Client';

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
                    {modules.filter(module => {
                        // Client view restrictions per changes7.docx
                        if (role === 'Client') {
                            const allowed = ['Dashboard', 'Vault'];
                            return allowed.includes(module.name);
                        }
                        // SuperAdmin sees only Super Admin nav item(s)
                        if (role === 'SuperAdmin') {
                            const allowed = ['Dashboard'];
                            return allowed.includes(module.name);
                        }
                        return true;
                    }).map(module => {
                        if (module.isSection) {
                            return (
                                <div key={module.name} className="sidebar-section-header">
                                    {module.name}
                                </div>
                            );
                        }
                        return (
                            <NavLink
                                key={module.name}
                                to={module.path}
                                className={({ isActive }) => 
                                    `sidebar-nav-item ${isActive ? 'active' : ''}`
                                }
                            >
                                <span className="sidebar-nav-label">{module.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
                <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    {role === 'SuperAdmin' && (
                        <NavLink
                            to="/superadmin"
                            className={({ isActive }) =>
                                `sidebar-nav-item ${isActive ? 'active' : ''}`
                            }
                        >
                            <span className="sidebar-nav-label">Super Admin</span>
                        </NavLink>
                    )}
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