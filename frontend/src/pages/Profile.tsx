import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';

const Profile: React.FC = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get('/users/me');
            setEmail(response.data.email || '');
            setFirstName(response.data.first_name || '');
            setLastName(response.data.last_name || '');
            setPhone(response.data.phone || '');
            setCompany(response.data.company || '');
            setRole(response.data.role || '');
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleSave = async () => {
        try {
            await apiClient.put('/users/me', {
                first_name: firstName,
                last_name: lastName,
                phone,
                company,
                role
            });
            setMessage('Profile updated successfully!');
            setIsEditing(false);
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error updating profile. Please try again.');
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Profile Settings</h1>
                <p className="page-description">Manage your account information and preferences</p>
            </div>

            <div className="module-grid">
                <div className="module-card">
                    <div className="section-header">
                        <h3 className="section-title">Personal Information</h3>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className="form-button"
                            style={{ width: 'auto', padding: '8px 20px' }}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                value={email}
                                className="form-input"
                                disabled
                                style={{ backgroundColor: 'var(--gray-light)' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="form-input"
                                disabled={!isEditing}
                                placeholder="Enter first name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="form-input"
                                disabled={!isEditing}
                                placeholder="Enter last name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-input"
                                disabled={!isEditing}
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Company</label>
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="form-input"
                                disabled={!isEditing}
                                placeholder="Enter company name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Role</label>
                            <input
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="form-input"
                                disabled={!isEditing}
                                placeholder="Enter your role"
                            />
                        </div>
                    </div>

                    {message && (
                        <div style={{
                            marginTop: '20px',
                            padding: '10px',
                            backgroundColor: message.includes('success') ? 'var(--success-light)' : 'var(--danger-light)',
                            color: message.includes('success') ? 'var(--success)' : 'var(--danger)',
                            borderRadius: 'var(--radius)',
                            fontSize: '14px'
                        }}>
                            {message}
                        </div>
                    )}
                </div>

                <div className="module-card">
                    <h3 className="section-title">Account Statistics</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                        <div>
                            <div className="summary-label">Documents Uploaded</div>
                            <div className="metric-large">24</div>
                        </div>
                        <div>
                            <div className="summary-label">AI Queries</div>
                            <div className="metric-large">156</div>
                        </div>
                        <div>
                            <div className="summary-label">Compliance Score</div>
                            <div className="metric-large">92%</div>
                        </div>
                        <div>
                            <div className="summary-label">Last Login</div>
                            <div className="metric-large">Today</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 