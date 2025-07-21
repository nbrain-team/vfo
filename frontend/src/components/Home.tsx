import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Welcome to AGENTIQ VFO</h1>
            <p className="mt-4">
                Please <Link to="/login" className="text-blue-500">Login</Link> or <Link to="/register" className="text-blue-500">Register</Link> to continue.
            </p>
        </div>
    );
};

export default Home; 