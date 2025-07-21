import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

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

const MainLayout: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex h-screen">
            <div
                className={`flex-shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <div className="flex items-center justify-center h-16 border-b">
                    <h1 className={`text-xl font-bold text-gray-800 ${!isExpanded && 'hidden'}`}>AGENTIQ</h1>
                    <h1 className={`text-xl font-bold text-gray-800 ${isExpanded && 'hidden'}`}>A</h1>
                </div>
                <nav className="mt-4">
                    {modules.map(module => (
                        <NavLink
                            key={module.name}
                            to={module.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''}`
                            }
                            title={module.name}
                        >
                            <span className="text-lg">{module.name.charAt(0)}</span>
                            <span className={`ml-4 ${!isExpanded && 'hidden'}`}>{module.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout; 