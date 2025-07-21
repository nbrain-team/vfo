import React from 'react';
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

const Layout: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <div className="w-64 bg-white border-r border-gray-200">
                <div className="flex items-center justify-center h-16 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800">AGENTIQ VFO</h1>
                </div>
                <nav className="mt-4">
                    {modules.map(module => (
                        <NavLink
                            key={module.name}
                            to={module.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-gray-200 hover:text-gray-700 ${
                                    isActive ? 'bg-gray-200 text-gray-800' : ''
                                }`
                            }
                        >
                            <span className="mx-4 font-medium">{module.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
                    <div></div>
                    <div>
                        {/* User profile / logout button can go here */}
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout; 