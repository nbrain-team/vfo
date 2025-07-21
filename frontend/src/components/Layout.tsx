import React from 'react';
import { Link, Outlet } from 'react-router-dom';

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
        <div className="flex h-screen bg-gray-100">
            <div className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-2xl font-bold">AGENTIQ VFO</h1>
                </div>
                <nav className="mt-5">
                    {modules.map(module => (
                        <Link
                            key={module.name}
                            to={module.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                        >
                            {module.name}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout; 