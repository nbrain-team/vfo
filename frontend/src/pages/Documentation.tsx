import React, { useState, useEffect } from 'react';

const Documentation: React.FC = () => {
    const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
    
    useEffect(() => {
        // Update timestamp every minute to show real-time nature
        const interval = setInterval(() => {
            setLastUpdated(new Date().toLocaleString());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const recentChanges = [
        {
            date: 'December 2024',
            category: 'Platform Enhancements',
            changes: [
                'Removed Welcome page from public access - users now go directly to dashboard after login',
                'Added 6 KPI boxes on dashboard: Leads, Booked, Show up Ratio, Signed, Avg $ per Matter, Matters In Process with 30-day/inception toggles',
                'Created pipeline widget between KPIs and Daily Brief showing all stages from Book Consults to Matter Fulfilled',
                'Renamed "Onboarding Pipeline" to "LIFTed Advisor Pipeline" with new tabbed interface',
                'Updated CRM columns: Position→Candidate Type, Status→Pipeline stages, Manager→Advisor, added progress bars',
                'Embedded Google Calendar in CRM client details view with full sync functionality',
                'Fixed Site Builder "Enable payments for booked consults" save functionality',
                'Added LawPay account credentials management (Merchant ID and Public Key fields)'
            ]
        },
        {
            date: 'December 2024',
            category: 'AdvisorIQ & Public Site',
            changes: [
                'Made all AdvisorIQ sections editable with hover edit buttons that save directly to public site',
                'Blog widget now fully functional with add/edit/delete posts and SEO content generation from transcripts',
                'Renamed "Consult" to "Consultations" with Google Calendar sync',
                'Added appointment types: Free 30-min, Paid 30-min ($375), Paid 60-min ($750)',
                'Integrated mock LawPay payment flow for paid consultations',
                'Made Client Portal, Testimonials, and Contact sections editable and synced to public site',
                'Duplicated current booking form with all questions in FormBuilder and mapped to public site'
            ]
        },
        {
            date: 'December 2024',
            category: 'Forms & Documents',
            changes: [
                'Added comprehensive "Paid 30-Minute Consultation Booking" form with all required fields',
                'Added "Life & Legacy Planning Questionnaire" with 50+ fields',
                'Added "Wealth Credit & Liquidity Assessment" form template',
                'Enhanced Document Library with "Life & Legacy Planning Summary" document template',
                'Added document generation workflow in Vault: select client, document, matter, generate draft, approve/send',
                'Implemented mail-merge placeholders for all document templates'
            ]
        },
        {
            date: 'December 2024',
            category: 'Workflow Automation',
            changes: [
                'Built comprehensive WYDAPT workflow automations with add rule functions',
                'Added pre-configured WYDAPT Matter Workflow with 8-step process',
                'Implemented quick rule buttons for common WYDAPT automations',
                'Enhanced automation status tab in CRM showing active workflows and configured rules',
                'Added stage-based automation triggers: Signed→Payment Instructions, Payment→Questionnaire, etc.',
                'Email templates now include public site header banner automatically',
                'Added merge tags with click-to-insert functionality for email templates'
            ]
        },
        {
            date: 'December 2024',
            category: 'Advanced Features',
            changes: [
                'Mapped LegalIQ to Vault for searching completed documents with analytics',
                'Enhanced Audit module with real-time system actions, searchable by client/matter/timestamp',
                'Added CSV export functionality to Audit logs',
                'Fixed CRM buttons: Add Lead Form opens FormBuilder, Add Service Type shows pricing',
                'Added pipeline widget duplicate to CRM overview tab with quick actions',
                'Implemented drag-and-drop functionality in pipeline with bot/advisor action rules',
                'Added visual pipeline with clickable stages for quick actions'
            ]
        }
    ];

    return (
        <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{
                background: 'var(--card-bg)',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: 'var(--shadow)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '36px', margin: 0, color: 'var(--primary)' }}>
                        AgentIQ VFO Platform - Technical Documentation
                    </h1>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Last Updated</div>
                        <div style={{ fontSize: '14px', fontWeight: '600' }}>{lastUpdated}</div>
                        <div style={{ 
                            marginTop: '4px',
                            padding: '4px 8px', 
                            background: '#22c55e', 
                            color: 'white', 
                            borderRadius: '4px',
                            fontSize: '11px',
                            display: 'inline-block'
                        }}>
                            LIVE
                        </div>
                    </div>
                </div>

                {/* Version Info */}
                <div style={{ 
                    background: 'var(--background-secondary)', 
                    padding: '16px', 
                    borderRadius: '8px',
                    marginBottom: '32px',
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                            <strong>Platform Version:</strong> 2.0.0
                        </div>
                        <div>
                            <strong>Frontend:</strong> React 18.2.0 + TypeScript
                        </div>
                        <div>
                            <strong>Backend:</strong> FastAPI + PostgreSQL
                        </div>
                        <div>
                            <strong>Deployment:</strong> Render.com
                        </div>
                    </div>
                </div>

                {/* Recent Changes Section */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        🔄 Recent Platform Updates
                    </h2>
                    {recentChanges.map((update, idx) => (
                        <div key={idx} style={{ marginBottom: '24px' }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                marginBottom: '12px'
                            }}>
                                <span style={{ 
                                    background: 'var(--primary)', 
                                    color: 'white', 
                                    padding: '4px 12px', 
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    fontWeight: '600'
                                }}>
                                    {update.date}
                                </span>
                                <h3 style={{ margin: 0, fontSize: '18px' }}>{update.category}</h3>
                            </div>
                            <ul style={{ margin: 0, paddingLeft: '24px' }}>
                                {update.changes.map((change, changeIdx) => (
                                    <li key={changeIdx} style={{ marginBottom: '8px', color: 'var(--text)' }}>
                                        {change}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* Executive Summary */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Executive Summary
                    </h2>
                    <p style={{ lineHeight: '1.8', color: 'var(--text)' }}>
                        AgentIQ VFO (Virtual Family Office) is a cutting-edge, AI-powered wealth management platform that revolutionizes how high-net-worth individuals and families manage their financial ecosystem. The platform has been significantly enhanced with advanced automation, drag-and-drop pipeline management, real-time documentation, and comprehensive workflow systems specifically designed for WYDAPT (Wyoming Directed Asset Protection Trust) matters.
                    </p>
                </section>

                {/* Platform Architecture */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Platform Architecture
                    </h2>
                    
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Technology Stack</h3>
                        
                        <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                            <h4 style={{ marginBottom: '12px' }}>Frontend</h4>
                            <ul>
                                <li><strong>Framework:</strong> React 18.2.0 with TypeScript 4.9+</li>
                                <li><strong>Routing:</strong> React Router v6</li>
                                <li><strong>State Management:</strong> React Hooks + Context API + LocalStorage</li>
                                <li><strong>UI Components:</strong> Custom component library with drag-and-drop support</li>
                                <li><strong>Styling:</strong> CSS Variables + Inline Styles</li>
                                <li><strong>Authentication:</strong> JWT + Google OAuth 2.0</li>
                                <li><strong>Build Tool:</strong> Vite</li>
                            </ul>
                            
                            <h4 style={{ marginBottom: '12px', marginTop: '20px' }}>Backend</h4>
                            <ul>
                                <li><strong>Framework:</strong> FastAPI (Python 3.9+)</li>
                                <li><strong>Database:</strong> PostgreSQL 14+ with SQLAlchemy ORM</li>
                                <li><strong>Authentication:</strong> JWT tokens + Google OAuth integration</li>
                                <li><strong>API Documentation:</strong> Auto-generated OpenAPI/Swagger</li>
                                <li><strong>Task Queue:</strong> Mock implementation (ready for Celery)</li>
                                <li><strong>File Storage:</strong> Local filesystem (ready for S3)</li>
                            </ul>
                            
                            <h4 style={{ marginBottom: '12px', marginTop: '20px' }}>AI/ML Stack</h4>
                            <ul>
                                <li><strong>LLM Integration:</strong> OpenAI GPT-4 API</li>
                                <li><strong>Document Processing:</strong> python-docx, PyPDF2</li>
                                <li><strong>Vector Search:</strong> Ready for Pinecone/Weaviate integration</li>
                                <li><strong>Analytics:</strong> Custom implementation with chart.js</li>
                            </ul>
                            
                            <h4 style={{ marginBottom: '12px', marginTop: '20px' }}>Third-party Services</h4>
                            <ul>
                                <li><strong>Authentication:</strong> Google OAuth 2.0</li>
                                <li><strong>Calendar:</strong> Google Calendar API</li>
                                <li><strong>Payments:</strong> LawPay (mock integration ready)</li>
                                <li><strong>Email:</strong> SMTP ready (currently mock)</li>
                                <li><strong>Deployment:</strong> Render.com (Auto-deploy from GitHub)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Core Modules */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Core Modules & Features
                    </h2>
                    
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {/* Dashboard Module */}
                        <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '12px' }}>📊 Dashboard</h3>
                            <p><strong>Purpose:</strong> Real-time KPI monitoring and pipeline visualization</p>
                            <h4>Key Features:</h4>
                            <ul>
                                <li>6 dynamic KPI boxes with 30-day/inception toggles</li>
                                <li>LIFTed Advisor Pipeline widget with stage visualization</li>
                                <li>Advisor Daily Brief with task management</li>
                                <li>Real-time data updates from CRM</li>
                            </ul>
                            <p><strong>Technical Implementation:</strong> React hooks for state management, localStorage for persistence</p>
                        </div>

                        {/* CRM Module */}
                        <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '12px' }}>👥 LIFTed Advisor Pipeline (CRM)</h3>
                            <p><strong>Purpose:</strong> Complete client lifecycle management with drag-and-drop</p>
                            <h4>Key Features:</h4>
                            <ul>
                                <li>Drag-and-drop pipeline management between stages</li>
                                <li>Quick actions on stage circles (bot vs advisor actions)</li>
                                <li>Google Calendar integration in client details</li>
                                <li>Automation status monitoring</li>
                                <li>CSV import/export functionality</li>
                                <li>Real-time pipeline analytics</li>
                            </ul>
                            <p><strong>Technical Implementation:</strong> HTML5 Drag and Drop API, React state management</p>
                        </div>

                        {/* Workflows Module */}
                        <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '12px' }}>🔄 Workflows (formerly Nurture)</h3>
                            <p><strong>Purpose:</strong> Automated workflow management for WYDAPT matters</p>
                            <h4>Key Features:</h4>
                            <ul>
                                <li>Pre-configured WYDAPT Matter Workflow (8 steps)</li>
                                <li>Email template management with header banners</li>
                                <li>Merge tag support with click-to-insert</li>
                                <li>Quick rule creation for common automations</li>
                                <li>Stage-based triggers and actions</li>
                            </ul>
                            <p><strong>Technical Implementation:</strong> Rule engine pattern, template system with HTML wrapper</p>
                        </div>

                        {/* AdvisorIQ Module */}
                        <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '12px' }}>🌐 AdvisorIQ</h3>
                            <p><strong>Purpose:</strong> Public-facing website management with live editing</p>
                            <h4>Key Features:</h4>
                            <ul>
                                <li>Hover-to-edit functionality for all sections</li>
                                <li>Blog management with SEO content generation</li>
                                <li>Consultation booking with appointment types</li>
                                <li>LawPay integration for paid consultations</li>
                                <li>Editable testimonials and contact info</li>
                                <li>Real-time sync to public site</li>
                            </ul>
                            <p><strong>Technical Implementation:</strong> EditableSection component, localStorage for persistence</p>
                        </div>

                        {/* Vault Module */}
                        <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '12px' }}>🗄️ Vault</h3>
                            <p><strong>Purpose:</strong> Secure document storage and generation</p>
                            <h4>Key Features:</h4>
                            <ul>
                                <li>Document generation workflow</li>
                                <li>Client-document-matter selection</li>
                                <li>Draft preview with approval flow</li>
                                <li>E-signature integration ready</li>
                                <li>Version control system</li>
                            </ul>
                            <p><strong>Technical Implementation:</strong> Mock document generation, template system</p>
                        </div>

                        {/* LegalIQ Module */}
                        <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '12px' }}>⚖️ LegalIQ</h3>
                            <p><strong>Purpose:</strong> AI-powered legal document analysis and vault integration</p>
                            <h4>Key Features:</h4>
                            <ul>
                                <li>Client vault document search</li>
                                <li>Document analytics dashboard</li>
                                <li>AI-powered information extraction</li>
                                <li>Entity analysis and insights</li>
                                <li>Cross-client document analytics</li>
                            </ul>
                            <p><strong>Technical Implementation:</strong> Integration with vault documents, analytics visualization</p>
                        </div>

                        {/* Audit Module */}
                        <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '12px' }}>📋 Audit</h3>
                            <p><strong>Purpose:</strong> Real-time system activity monitoring</p>
                            <h4>Key Features:</h4>
                            <ul>
                                <li>Real-time activity logging</li>
                                <li>Advanced filtering by module/client/date</li>
                                <li>CSV export functionality</li>
                                <li>Detailed log viewer modal</li>
                                <li>Color-coded status indicators</li>
                            </ul>
                            <p><strong>Technical Implementation:</strong> Mock real-time updates, comprehensive filtering system</p>
                        </div>

                        {/* Forms Module */}
                        <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '12px' }}>📝 Form Builder</h3>
                            <p><strong>Purpose:</strong> Dynamic form creation and management</p>
                            <h4>Key Features:</h4>
                            <ul>
                                <li>Paid consultation booking form (comprehensive)</li>
                                <li>Life & Legacy Planning Questionnaire</li>
                                <li>Wealth Credit & Liquidity Assessment</li>
                                <li>Form preview functionality</li>
                                <li>Public site mapping</li>
                            </ul>
                            <p><strong>Technical Implementation:</strong> Dynamic form rendering, field type system</p>
                        </div>

                        {/* Document Library */}
                        <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '12px' }}>📚 Document Library</h3>
                            <p><strong>Purpose:</strong> Template management with mail-merge capabilities</p>
                            <h4>Key Features:</h4>
                            <ul>
                                <li>30+ document templates</li>
                                <li>Placeholder detection and highlighting</li>
                                <li>Category-based organization</li>
                                <li>Delete functionality</li>
                                <li>Life & Legacy Planning Summary template</li>
                            </ul>
                            <p><strong>Technical Implementation:</strong> Template system with placeholder support</p>
                        </div>
                    </div>
                </section>

                {/* API Documentation */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        API Documentation
                    </h2>
                    
                    <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                        <h3>Authentication</h3>
                        <ul>
                            <li><strong>Method:</strong> JWT Bearer Token + Google OAuth 2.0</li>
                            <li><strong>Base URL:</strong> https://agentiq-vfo-backend.onrender.com/api</li>
                            <li><strong>Headers:</strong> Authorization: Bearer &lt;token&gt;</li>
                        </ul>
                        
                        <h3 style={{ marginTop: '20px' }}>Key Endpoints</h3>
                        <div style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                            <div style={{ marginBottom: '12px' }}>
                                <strong>POST /auth/register</strong> - User registration<br/>
                                <strong>POST /auth/login</strong> - User login<br/>
                                <strong>POST /auth/google</strong> - Google OAuth login<br/>
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                                <strong>GET /contacts/</strong> - List all contacts<br/>
                                <strong>POST /contacts/</strong> - Create new contact<br/>
                                <strong>GET /contacts/{'{id}'}</strong> - Get contact details<br/>
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                                <strong>GET /matters/</strong> - List all matters<br/>
                                <strong>POST /matters/</strong> - Create new matter<br/>
                                <strong>PUT /matters/{'{id}'}</strong> - Update matter<br/>
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                                <strong>GET /legal/entities/</strong> - List legal entities<br/>
                                <strong>POST /legal/entities/{'{id}'}/documents/</strong> - Upload document<br/>
                                <strong>POST /legal/extract</strong> - Extract document info<br/>
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                                <strong>GET /admin/forms/</strong> - List forms<br/>
                                <strong>POST /admin/forms/</strong> - Create form<br/>
                                <strong>GET /admin/templates/</strong> - List templates<br/>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Database Schema */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Database Schema
                    </h2>
                    
                    <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px' }}>
                        <h3>Core Tables</h3>
                        <pre>{`
users
├── id (UUID, PK)
├── email (String, Unique)
├── hashed_password (String)
├── full_name (String)
├── google_id (String, Optional)
├── is_active (Boolean)
├── created_at (Timestamp)
└── updated_at (Timestamp)

contacts
├── id (UUID, PK)
├── user_id (UUID, FK → users.id)
├── name (String)
├── email (String)
├── phone (String, Optional)
├── stage (Enum)
├── metadata (JSON)
└── created_at (Timestamp)

matters
├── id (UUID, PK)
├── contact_id (UUID, FK → contacts.id)
├── title (String)
├── pipeline (String)
├── stage (String)
├── metadata (JSON)
└── created_at (Timestamp)

entities
├── id (UUID, PK)
├── user_id (UUID, FK → users.id)
├── name (String)
├── type (String)
├── metadata (JSON)
└── created_at (Timestamp)

documents
├── id (UUID, PK)
├── entity_id (UUID, FK → entities.id)
├── filename (String)
├── content_type (String)
├── file_path (String)
├── metadata (JSON)
└── created_at (Timestamp)
                        `}</pre>
                    </div>
                </section>

                {/* Security & Compliance */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Security & Compliance
                    </h2>
                    
                    <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                        <h3>Security Measures</h3>
                        <ul>
                            <li><strong>Authentication:</strong> JWT tokens with expiration + Google OAuth 2.0</li>
                            <li><strong>Password Security:</strong> Bcrypt hashing with salt rounds</li>
                            <li><strong>API Security:</strong> CORS configuration, rate limiting ready</li>
                            <li><strong>Data Encryption:</strong> HTTPS in transit, encryption at rest ready</li>
                            <li><strong>Session Management:</strong> Secure token storage, automatic expiration</li>
                        </ul>
                        
                        <h3 style={{ marginTop: '20px' }}>Compliance Considerations</h3>
                        <ul>
                            <li><strong>GDPR:</strong> Data export/deletion capabilities ready</li>
                            <li><strong>CCPA:</strong> User data access controls implemented</li>
                            <li><strong>Financial Regulations:</strong> Audit trail, data retention policies</li>
                            <li><strong>Legal Requirements:</strong> Document versioning, access logs</li>
                        </ul>
                    </div>
                </section>

                {/* Deployment & DevOps */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Deployment & DevOps
                    </h2>
                    
                    <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                        <h3>Current Infrastructure</h3>
                        <ul>
                            <li><strong>Frontend:</strong> Render.com Static Site (Auto-deploy from GitHub main branch)</li>
                            <li><strong>Backend:</strong> Render.com Web Service (Auto-deploy from GitHub main branch)</li>
                            <li><strong>Database:</strong> PostgreSQL on Render</li>
                            <li><strong>Environment Variables:</strong> Managed via Render dashboard</li>
                        </ul>
                        
                        <h3 style={{ marginTop: '20px' }}>CI/CD Pipeline</h3>
                        <ul>
                            <li>GitHub → Push to main branch</li>
                            <li>Render → Automatic build and deployment</li>
                            <li>Frontend URL: https://agentiq-vfo-frontend.onrender.com</li>
                            <li>Backend URL: https://agentiq-vfo-backend.onrender.com</li>
                        </ul>
                        
                        <h3 style={{ marginTop: '20px' }}>Environment Variables</h3>
                        <div style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                            <strong>Frontend:</strong><br/>
                            VITE_API_BASE_URL<br/>
                            VITE_GOOGLE_CLIENT_ID<br/>
                            <br/>
                            <strong>Backend:</strong><br/>
                            DATABASE_URL<br/>
                            SECRET_KEY<br/>
                            GOOGLE_CLIENT_ID<br/>
                            GOOGLE_CLIENT_SECRET<br/>
                            GOOGLE_PROJECT_ID<br/>
                        </div>
                    </div>
                </section>

                {/* Getting Started */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Getting Started
                    </h2>
                    
                    <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '8px' }}>
                        <h3>Local Development Setup</h3>
                        <pre style={{ background: 'var(--background)', padding: '16px', borderRadius: '4px', overflow: 'auto' }}>{`
# Clone the repository
git clone https://github.com/nbrain-team/vfo.git
cd vfo

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt
cp .env.example .env  # Configure your environment variables
uvicorn app.main:app --reload

# Frontend setup (new terminal)
cd frontend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
                        `}</pre>
                        
                        <h3 style={{ marginTop: '20px' }}>Access Points</h3>
                        <ul>
                            <li><strong>Frontend:</strong> http://localhost:5174</li>
                            <li><strong>Backend API:</strong> http://localhost:8000</li>
                            <li><strong>API Documentation:</strong> http://localhost:8000/docs</li>
                        </ul>
                    </div>
                </section>

                {/* Footer */}
                <div style={{ 
                    marginTop: '60px', 
                    paddingTop: '20px', 
                    borderTop: '2px solid var(--border)',
                    textAlign: 'center',
                    color: 'var(--text-secondary)'
                }}>
                    <p>
                        AgentIQ VFO Platform Documentation • Version 2.0.0 • {new Date().getFullYear()}
                    </p>
                    <p style={{ fontSize: '12px', marginTop: '8px' }}>
                        This documentation updates in real-time as changes are made to the platform
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Documentation;