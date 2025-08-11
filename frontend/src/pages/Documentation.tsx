import React from 'react';

const Documentation: React.FC = () => {
    return (
        <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{
                background: 'var(--card-bg)',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: 'var(--shadow)'
            }}>
                <h1 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--primary)' }}>
                    LIFTed VFO Platform - Comprehensive Technical Documentation
                </h1>

                {/* Executive Summary */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Executive Summary
                    </h2>
                    <p style={{ lineHeight: '1.8', color: 'var(--text)' }}>
                        LIFTed VFO (Virtual Family Office) is a cutting-edge, AI-powered wealth management platform that revolutionizes how high-net-worth individuals and families manage their financial ecosystem. Built with state-of-the-art technology, the platform combines advanced artificial intelligence, behavioral analytics, and comprehensive financial management tools into a unified, intuitive interface.
                    </p>
                </section>

                {/* Platform Architecture */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Platform Architecture
                    </h2>
                    
                    <h3 style={{ fontSize: '22px', marginTop: '24px', marginBottom: '12px', color: 'var(--primary)' }}>
                        Technology Stack
                    </h3>

                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '18px', marginBottom: '12px' }}>Backend Infrastructure</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li><strong>Framework:</strong> FastAPI (Python 3.13)</li>
                            <li><strong>Database:</strong> PostgreSQL with SQLAlchemy ORM</li>
                            <li><strong>Authentication:</strong> JWT (JSON Web Tokens) with OAuth2</li>
                            <li><strong>API Design:</strong> RESTful architecture with OpenAPI/Swagger documentation</li>
                            <li><strong>Security:</strong> Passlib with bcrypt hashing, CORS middleware</li>
                            <li><strong>Deployment:</strong> Docker containerization, Render cloud platform</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '18px', marginBottom: '12px' }}>Frontend Architecture</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li><strong>Framework:</strong> React 18 with TypeScript</li>
                            <li><strong>Build Tool:</strong> Vite for optimized bundling and HMR</li>
                            <li><strong>Routing:</strong> React Router v6 for SPA navigation</li>
                            <li><strong>State Management:</strong> React Hooks and Context API</li>
                            <li><strong>Data Visualization:</strong> Recharts for interactive charts</li>
                            <li><strong>HTTP Client:</strong> Axios with interceptors for API communication</li>
                            <li><strong>Styling:</strong> Custom CSS with CSS Variables for theming</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '18px', marginBottom: '12px' }}>AI & Machine Learning Stack</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li><strong>LLM Integration:</strong>
                                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                                    <li>OpenAI GPT-4o (primary model)</li>
                                    <li>GPT-4o-mini (cost-optimized tasks)</li>
                                    <li>GPT-3.5-turbo (high-volume operations)</li>
                                    <li>Claude 3.5 Sonnet (specialized analysis)</li>
                                </ul>
                            </li>
                            <li><strong>Vector Database:</strong> Pinecone for semantic search</li>
                            <li><strong>Document Processing:</strong>
                                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                                    <li>PyPDF2 for PDF extraction</li>
                                    <li>python-docx for Word documents</li>
                                    <li>Unstructured for general document parsing</li>
                                </ul>
                            </li>
                            <li><strong>Embeddings:</strong> OpenAI text-embedding-3-small</li>
                            <li><strong>RAG Framework:</strong> Langchain with custom pipelines</li>
                            <li><strong>Text Chunking:</strong> RecursiveCharacterTextSplitter (1000 chars, 200 overlap)</li>
                        </ul>
                    </div>
                </section>

                {/* Core Modules */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Core Modules & Features
                    </h2>

                    {/* Dashboard */}
                    <div style={{ marginBottom: '32px', padding: '20px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            1. Dashboard (Liberation Journey Tracker)
                        </h3>
                        <p style={{ marginBottom: '12px' }}><strong>Purpose:</strong> Central command center for financial liberation journey</p>
                        
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Features:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Dynamic personalized greetings with time-based context</li>
                            <li>Liberation Journey visualization (5 stages: Obscured → Awakening → Stabilizing → Liberating → Regenerative)</li>
                            <li>Real-time Liberation Score (0-100) with trend analysis</li>
                            <li>Self-Mastery Score tracking</li>
                            <li>Module Health Scores with traffic-light indicators</li>
                            <li>Money Dysmorphia indicators with progress bars</li>
                            <li>Values Alignment circular progress visualization</li>
                            <li>Recommended actions with priority ranking</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Technical Implementation:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Real-time data aggregation from all modules</li>
                            <li>Weighted scoring algorithms for liberation metrics</li>
                            <li>Predictive analytics for journey progression</li>
                            <li>Custom React components with responsive design</li>
                        </ul>
                    </div>

                    {/* agentIQ */}
                    <div style={{ marginBottom: '32px', padding: '20px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            2. agentIQ - AI Agent Management
                        </h3>
                        <p style={{ marginBottom: '12px' }}><strong>Purpose:</strong> Orchestrate intelligent AI agents for automated tasks</p>
                        
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Features:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Custom AI agent creation and management</li>
                            <li>Pre-built agent templates (Tax Optimizer, Document Analyzer, etc.)</li>
                            <li>Agent performance metrics and accuracy tracking</li>
                            <li>Natural language chat interface</li>
                            <li>Document Q&A with source citations</li>
                            <li>Multi-agent collaboration workflows</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>AI Technology:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li><strong>RAG Pipeline:</strong>
                                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                                    <li>Document ingestion → Text extraction → Chunking (1000 chars)</li>
                                    <li>Embedding generation (OpenAI text-embedding-3-small)</li>
                                    <li>Vector storage in Pinecone (1536 dimensions)</li>
                                    <li>Semantic search with cosine similarity</li>
                                    <li>Context-aware prompt engineering</li>
                                    <li>GPT-4o for response generation</li>
                                </ul>
                            </li>
                            <li><strong>Chat Memory:</strong> Conversation history with context window management</li>
                            <li><strong>Source Attribution:</strong> Automatic citation of document sources</li>
                            <li><strong>Hallucination Prevention:</strong> Fact-checking against vector database</li>
                        </ul>
                    </div>

                    {/* legalIQ */}
                    <div style={{ marginBottom: '32px', padding: '20px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            3. legalIQ - Document Intelligence
                        </h3>
                        <p style={{ marginBottom: '12px' }}><strong>Purpose:</strong> Intelligent legal document management and analysis</p>
                        
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Features:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Secure document vault with encryption</li>
                            <li>AI-powered document analysis and summarization</li>
                            <li>Key terms and risk extraction</li>
                            <li>Compliance tracking and alerts</li>
                            <li>Multi-format support (PDF, DOCX, TXT)</li>
                            <li>Version control and audit trails</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Document Processing Pipeline:</h4>
                        <ol style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li><strong>Upload & Storage:</strong> Secure file upload with validation</li>
                            <li><strong>Text Extraction:</strong> Format-specific parsers</li>
                            <li><strong>Preprocessing:</strong> Cleaning, normalization</li>
                            <li><strong>Chunking:</strong> Semantic segmentation (1000 chars)</li>
                            <li><strong>Embedding:</strong> Vector representation generation</li>
                            <li><strong>Indexing:</strong> Pinecone vector database storage</li>
                            <li><strong>Analysis:</strong> GPT-4o for insights generation</li>
                        </ol>
                    </div>

                    {/* wealthIQ */}
                    <div style={{ marginBottom: '32px', padding: '20px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            4. wealthIQ - Investment Portfolio Management
                        </h3>
                        <p style={{ marginBottom: '12px' }}><strong>Purpose:</strong> Centralized wealth tracking and optimization</p>
                        
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Features:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Real-time portfolio valuation ($266M example portfolio)</li>
                            <li>Asset allocation visualization (pie charts, treemaps)</li>
                            <li>Performance vs. benchmark analysis</li>
                            <li>Top holdings concentration alerts</li>
                            <li>Financial goals progress tracking</li>
                            <li>Cash flow projections</li>
                            <li>Liquidity analysis and runway calculations</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Analytics Engine:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Monte Carlo simulations for risk assessment</li>
                            <li>Modern Portfolio Theory optimization</li>
                            <li>Sharpe ratio calculations</li>
                            <li>Beta and correlation analysis</li>
                            <li>Custom benchmarking</li>
                        </ul>
                    </div>

                    {/* insuranceIQ */}
                    <div style={{ marginBottom: '32px', padding: '20px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            5. insuranceIQ - Risk Management
                        </h3>
                        <p style={{ marginBottom: '12px' }}><strong>Purpose:</strong> Comprehensive insurance coverage optimization</p>
                        
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Features:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Coverage adequacy scoring (0-100)</li>
                            <li>Premium tracking and optimization</li>
                            <li>Deductible and out-of-pocket progress</li>
                            <li>Claims history and processing</li>
                            <li>Risk gap analysis</li>
                            <li>Policy renewal reminders</li>
                            <li>Multi-carrier management</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Risk Assessment:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Coverage vs. exposure analysis</li>
                            <li>Premium efficiency scoring</li>
                            <li>Claims ratio tracking</li>
                            <li>Predictive risk modeling</li>
                        </ul>
                    </div>

                    {/* taxIQ */}
                    <div style={{ marginBottom: '32px', padding: '20px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            6. taxIQ - Strategic Tax Planning
                        </h3>
                        <p style={{ marginBottom: '12px' }}><strong>Purpose:</strong> Tax optimization and compliance management</p>
                        
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Features:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Current tax obligations tracking</li>
                            <li>Multi-year tax history analysis</li>
                            <li>Effective rate optimization</li>
                            <li>Tax-loss harvesting opportunities</li>
                            <li>Deductions maximization</li>
                            <li>Filing deadline management</li>
                            <li>Form generation (W-2, 1099, K-1)</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Tax Intelligence:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Scenario modeling for tax strategies</li>
                            <li>Real-time tax liability calculations</li>
                            <li>Optimization recommendations</li>
                            <li>Regulatory compliance monitoring</li>
                        </ul>
                    </div>

                    {/* cryptoIQ */}
                    <div style={{ marginBottom: '32px', padding: '20px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            7. cryptoIQ - Digital Asset Management
                        </h3>
                        <p style={{ marginBottom: '12px' }}><strong>Purpose:</strong> Cryptocurrency portfolio and DeFi tracking</p>
                        
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Features:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Multi-chain portfolio aggregation</li>
                            <li>DeFi position monitoring</li>
                            <li>Tax event tracking for crypto</li>
                            <li>Security status dashboard</li>
                            <li>Hardware wallet integration</li>
                            <li>Protocol risk assessment</li>
                            <li>Impermanent loss calculations</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Blockchain Integration:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Real-time price feeds</li>
                            <li>On-chain data analysis</li>
                            <li>Smart contract interaction</li>
                            <li>Gas optimization</li>
                            <li>Yield farming analytics</li>
                        </ul>
                    </div>

                    {/* valuesIQ */}
                    <div style={{ marginBottom: '32px', padding: '20px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            8. valuesIQ - Behavioral Intelligence
                        </h3>
                        <p style={{ marginBottom: '12px' }}><strong>Purpose:</strong> Align financial decisions with personal values</p>
                        
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Features:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Values alignment wheel (radar chart)</li>
                            <li>Core values assessment and tracking</li>
                            <li>Liberation Journey progress mapping</li>
                            <li>Resource allocation vs. values analysis</li>
                            <li>AI-powered journaling with voice-to-text</li>
                            <li>Family governance framework</li>
                            <li>Impact measurement</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Behavioral Analytics:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Values-based scoring algorithms</li>
                            <li>Behavioral pattern recognition</li>
                            <li>Cognitive bias detection</li>
                            <li>Decision alignment tracking</li>
                        </ul>
                    </div>

                    {/* healthIQ */}
                    <div style={{ marginBottom: '32px', padding: '20px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            9. healthIQ - Healthcare Financial Planning
                        </h3>
                        <p style={{ marginBottom: '12px' }}><strong>Purpose:</strong> Healthcare coverage and HSA optimization</p>
                        
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Features:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Healthcare plan comparison</li>
                            <li>HSA investment tracking ($42.5K balance)</li>
                            <li>Deductible and out-of-pocket tracking</li>
                            <li>Preventive care scheduling</li>
                            <li>Wellness metrics integration</li>
                            <li>Claims processing assistance</li>
                            <li>Tax-advantaged strategy optimization</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>HSA Intelligence:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Investment allocation optimization</li>
                            <li>Tax savings calculations</li>
                            <li>Contribution maximization alerts</li>
                            <li>Qualified expense tracking</li>
                        </ul>
                    </div>

                    {/* vCTO */}
                    <div style={{ marginBottom: '32px', padding: '20px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            10. vCTO - Virtual Chief Technology Officer
                        </h3>
                        <p style={{ marginBottom: '12px' }}><strong>Purpose:</strong> AI agent builder and automation workflows</p>
                        
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Features:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Custom AI agent creation studio</li>
                            <li>Drag-and-drop workflow builder</li>
                            <li>API usage monitoring and cost optimization</li>
                            <li>Model performance tracking</li>
                            <li>Automation impact metrics (47 hours/month saved)</li>
                            <li>Multi-model orchestration</li>
                            <li>Training and fine-tuning interface</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Technical Capabilities:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Multi-model support (GPT-4o, Claude 3.5, GPT-3.5)</li>
                            <li>Rate limiting and failover</li>
                            <li>Cost optimization routing</li>
                            <li>Custom prompt engineering</li>
                            <li>Webhook integrations</li>
                            <li>Scheduled automations</li>
                        </ul>
                    </div>
                </section>

                {/* Behavioral Intelligence Layer */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Behavioral Intelligence Layer
                    </h2>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            Money Dysmorphia Detection
                        </h3>
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Components:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Scarcity Mindset Score (0-100)</li>
                            <li>Wealth Shame Index</li>
                            <li>Financial Avoidance Patterns</li>
                            <li>Comparison Trap Indicators</li>
                        </ul>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Algorithm:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Behavioral data collection from user interactions</li>
                            <li>Pattern recognition using ML models</li>
                            <li>Psychological profiling based on financial decisions</li>
                            <li>Real-time scoring and alerting</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            Liberation Journey Framework
                        </h3>
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Stages:</h4>
                        <ol style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li><strong>Obscured (0-20%):</strong> Limited financial awareness</li>
                            <li><strong>Awakening (20-40%):</strong> Beginning consciousness</li>
                            <li><strong>Stabilizing (40-60%):</strong> Building foundation</li>
                            <li><strong>Liberating (60-80%):</strong> Achieving freedom</li>
                            <li><strong>Regenerative (80-100%):</strong> Creating legacy</li>
                        </ol>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Progression Metrics:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Financial literacy score</li>
                            <li>Decision quality index</li>
                            <li>Values alignment percentage</li>
                            <li>Behavioral consistency rating</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            Self-Mastery Scoring
                        </h3>
                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Dimensions:</h4>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Emotional regulation in financial decisions</li>
                            <li>Long-term thinking capability</li>
                            <li>Risk tolerance alignment</li>
                            <li>Goal achievement rate</li>
                        </ul>
                    </div>
                </section>

                {/* AI Implementation Details */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        AI Implementation Details
                    </h2>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            RAG (Retrieval-Augmented Generation) System
                        </h3>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Architecture:</h4>
                        <div style={{
                            padding: '16px',
                            background: 'var(--bg)',
                            borderRadius: '8px',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            overflowX: 'auto'
                        }}>
                            User Query → Query Enhancement → Embedding Generation<br/>
                            → Vector Search (Pinecone) → Context Retrieval<br/>
                            → Prompt Construction → LLM Generation → Response Validation<br/>
                            → Source Attribution → User Response
                        </div>

                        <h4 style={{ fontSize: '16px', marginTop: '16px', marginBottom: '8px' }}>Key Components:</h4>
                        
                        <ol style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li><strong>Document Processing Service</strong>
                                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                                    <li>Supports PDF, DOCX, TXT, HTML</li>
                                    <li>Intelligent chunking with overlap</li>
                                    <li>Metadata preservation</li>
                                    <li>Language detection</li>
                                </ul>
                            </li>
                            
                            <li style={{ marginTop: '12px' }}><strong>Vector Database (Pinecone)</strong>
                                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                                    <li>1536-dimensional embeddings</li>
                                    <li>Cosine similarity search</li>
                                    <li>Metadata filtering</li>
                                    <li>Namespace isolation per user</li>
                                </ul>
                            </li>
                            
                            <li style={{ marginTop: '12px' }}><strong>Prompt Engineering</strong>
                                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                                    <li>Dynamic system prompts</li>
                                    <li>Context window optimization</li>
                                    <li>Few-shot examples</li>
                                    <li>Chain-of-thought reasoning</li>
                                </ul>
                            </li>
                            
                            <li style={{ marginTop: '12px' }}><strong>Response Generation</strong>
                                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                                    <li>Temperature control for creativity</li>
                                    <li>Token limit management</li>
                                    <li>Streaming responses</li>
                                    <li>Error handling and retry logic</li>
                                </ul>
                            </li>
                        </ol>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            AI Agent Examples
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Tax Optimizer Agent</h4>
                                <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
                                    <li>Model: GPT-4o</li>
                                    <li>Tasks: 156 completed</li>
                                    <li>Accuracy: 94%</li>
                                    <li>Capabilities: Tax strategy analysis, deduction identification, compliance checking</li>
                                </ul>
                            </div>
                            
                            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Document Analyzer Agent</h4>
                                <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
                                    <li>Model: Claude 3.5</li>
                                    <li>Tasks: 89 completed</li>
                                    <li>Accuracy: 96%</li>
                                    <li>Capabilities: Contract review, risk extraction, term summarization</li>
                                </ul>
                            </div>
                            
                            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Investment Scout Agent</h4>
                                <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
                                    <li>Model: GPT-4o</li>
                                    <li>Tasks: 234 completed</li>
                                    <li>Accuracy: 88%</li>
                                    <li>Capabilities: Market analysis, opportunity identification, risk assessment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Security & Compliance */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Security & Compliance
                    </h2>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            Data Security
                        </h3>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li><strong>Encryption:</strong> AES-256 at rest, TLS 1.3 in transit</li>
                            <li><strong>Authentication:</strong> Multi-factor authentication (MFA)</li>
                            <li><strong>Authorization:</strong> Role-based access control (RBAC)</li>
                            <li><strong>Audit Logging:</strong> Complete activity tracking</li>
                            <li><strong>Data Isolation:</strong> Tenant-specific namespaces</li>
                            <li><strong>Backup:</strong> Automated daily backups with geo-redundancy</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            Privacy & Compliance
                        </h3>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li><strong>GDPR Compliant:</strong> Right to erasure, data portability</li>
                            <li><strong>CCPA Compliant:</strong> California privacy rights</li>
                            <li><strong>SOC 2 Type II:</strong> Security controls audit</li>
                            <li><strong>HIPAA Ready:</strong> Healthcare data protection</li>
                            <li><strong>PCI DSS:</strong> Payment card security</li>
                            <li><strong>Zero-Trust Architecture:</strong> Never trust, always verify</li>
                        </ul>
                    </div>
                </section>

                {/* Performance Metrics */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Performance Metrics
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                        <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', textAlign: 'center' }}>
                            <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Response Time</h4>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>&lt; 200ms</div>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Average API latency</p>
                        </div>
                        
                        <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', textAlign: 'center' }}>
                            <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Uptime</h4>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>99.99%</div>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Service availability</p>
                        </div>
                        
                        <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', textAlign: 'center' }}>
                            <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>AI Accuracy</h4>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>94%</div>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Average model accuracy</p>
                        </div>
                        
                        <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', textAlign: 'center' }}>
                            <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Time Saved</h4>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>47 hrs/mo</div>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Through automation</p>
                        </div>
                    </div>
                </section>

                {/* Integration Ecosystem */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Integration Ecosystem
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                        {[
                            { name: 'MonarchMoney.com', category: 'Budgeting' },
                            { name: 'Wealth.com', category: 'Investment' },
                            { name: 'Mint.com', category: 'Finance' },
                            { name: 'LLCAttorney.com', category: 'Legal' },
                            { name: 'Altruist', category: 'RIA Platform' },
                            { name: 'SDM.co', category: 'Crypto' },
                            { name: 'NY Life', category: 'Insurance' },
                            { name: 'Plaid', category: 'Banking API' },
                            { name: 'Stripe', category: 'Payments' },
                            { name: 'QuickBooks', category: 'Accounting' },
                            { name: 'Xero', category: 'Bookkeeping' },
                            { name: 'DocuSign', category: 'E-Signature' }
                        ].map(integration => (
                            <div key={integration.name} style={{
                                padding: '12px',
                                background: 'var(--bg)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{integration.name}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                    {integration.category}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Future Roadmap */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Future Roadmap
                    </h2>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            Q4 2024
                        </h3>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Mobile applications (iOS & Android)</li>
                            <li>Advanced estate planning module</li>
                            <li>Real-time collaboration features</li>
                            <li>Enhanced voice interface</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            Q1 2025
                        </h3>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>Blockchain-based document verification</li>
                            <li>Advanced predictive analytics</li>
                            <li>Family member portal</li>
                            <li>International tax optimization</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>
                            Q2 2025
                        </h3>
                        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
                            <li>AI-powered investment recommendations</li>
                            <li>Automated compliance reporting</li>
                            <li>Virtual reality data visualization</li>
                            <li>Quantum-resistant encryption</li>
                        </ul>
                    </div>
                </section>

                {/* Version Information */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                        Version Information
                    </h2>

                    <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', fontFamily: 'monospace' }}>
                        <div>Platform Version: 2.0.0</div>
                        <div>API Version: v2</div>
                        <div>Last Updated: December 2024</div>
                        <div>Build: Production</div>
                        <div>Environment: Cloud (Render)</div>
                    </div>
                </section>

                <div style={{
                    marginTop: '40px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>
                        LIFTed VFO - Elevating Wealth Management Through AI
                    </h3>
                    <p style={{ fontSize: '16px', opacity: 0.9 }}>
                        Empowering families to achieve financial liberation through intelligent automation and behavioral insights
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Documentation; 