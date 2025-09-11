import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { useNavigate } from 'react-router-dom';
import EditableSection from './EditableSection';
import { getSiteConfig, saveSiteConfig } from '../../adminData';
import LawPayIntegration from '../LawPayIntegration';

type TabKey = 'overview' | 'blog' | 'services' | 'consultations' | 'client-portal' | 'testimonials' | 'contact' | 'consult';

interface ServiceItem {
    id: string;
    title: string;
    subtitle: string;
    bullets: string[];
}

interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    createdAt: string;
    published: boolean;
    featured?: boolean;
}

interface PortalAction {
    id: string;
    title: string;
    description: string;
    formId: string | null;
    docs: string[];
}

const AgentIQ: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabKey>('overview');
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [scheduled, setScheduled] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    
    // Site content state
    const siteConfig = getSiteConfig();
    const [advisorName, setAdvisorName] = useState(siteConfig.advisorName || 'Matt Meuli');
    const [advisorDescription, setAdvisorDescription] = useState(
        siteConfig.advisorDescription || 
        'Get expert asset protection advice and strategies to help shield your wealth from anything and anyone.'
    );
    const [advisorPhone, setAdvisorPhone] = useState(siteConfig.advisorPhone || '(307) 463-3600');
    
    // Blog state
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(siteConfig.blogPosts || [
        {
            id: 'post-1',
            title: 'Understanding Asset Protection Trusts',
            content: 'A comprehensive guide to how asset protection trusts work and their benefits...',
            excerpt: 'A comprehensive guide to how asset protection trusts work and their benefits...',
            createdAt: new Date().toISOString(),
            published: true
        },
        {
            id: 'post-2',
            title: 'Wyoming vs Other States: A Comparison',
            content: 'Why Wyoming offers the strongest asset protection laws in the United States...',
            excerpt: 'Why Wyoming offers the strongest asset protection laws in the United States...',
            createdAt: new Date().toISOString(),
            published: true
        }
    ]);
    const [showBlogEditor, setShowBlogEditor] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogFeatured, setBlogFeatured] = useState(false);
    const [showSeoGenerator, setShowSeoGenerator] = useState(false);
    const [transcript, setTranscript] = useState('');
    
    // Client Portal state
    const [clientPortalActions, setClientPortalActions] = useState<PortalAction[]>((siteConfig as any).clientPortalActions || [
        {
            id: 'contribution',
            title: 'Contribution to Trust',
            description: 'Start a contribution — we will generate the right forms for signatures and minutes.',
            formId: null,
            docs: [
                'Questionnaire',
                'Trustee Acceptance of Contribution',
                'State Special Meeting Minutes and Resolutions',
                'Affidavit of Settlor'
            ]
        },
        {
            id: 'distribution',
            title: 'Distributions From Trust (DDC)',
            description: 'Request a discretionary distribution with proper DDC documentation.',
            formId: null,
            docs: [
                'DDC Minutes Appointing WAPA',
                'DDC Acceptance of Appointment',
                'Investment Committee Questionnaire',
                'DDC Distribution Request Form',
                'DDC Minutes Approving Distribution',
                'State Distribution Meeting Minutes'
            ]
        },
        {
            id: 'investment',
            title: 'Investment Decisions',
            description: 'Create or update the Investment Committee and record decisions.',
            formId: null,
            docs: [
                'Investment Committee Creation and Appointment',
                'Investment Committee Questionnaire',
                'Investment Committee Meeting Minutes'
            ]
        },
        {
            id: 'pftc-docs',
            title: 'Wyoming Private Family Trust Documents',
            description: 'Establish the PFTC with the required organizational documents.',
            formId: null,
            docs: [
                'PTC Operating Agreement (single or two grantors)',
                'PTC Organizational Minutes (single or multi-member)'
            ]
        }
    ]);
    const [showPortalEditor, setShowPortalEditor] = useState(false);
    const [editingPortalAction, setEditingPortalAction] = useState<PortalAction | null>(null);
    
    const handleContentSave = (field: string, value: string) => {
        const updatedConfig = {
            ...siteConfig,
            [field]: value
        };
        saveSiteConfig(updatedConfig);
        
        // Update local state
        switch(field) {
            case 'advisorName':
                setAdvisorName(value);
                break;
            case 'advisorDescription':
                setAdvisorDescription(value);
                break;
            case 'advisorPhone':
                setAdvisorPhone(value);
                break;
            case 'contactPhone':
                setContactPhone(value);
                break;
            case 'contactEmail':
                setContactEmail(value);
                break;
            case 'contactAddress':
                setContactAddress(value);
                break;
            case 'testimonials':
                setEditableTestimonials(JSON.parse(value));
                break;
        }
    };
    
    // Service functions
    const handleSaveService = () => {
        if (!editingService || !editingService.title) return;
        
        let updatedServices;
        if (editingService.id) {
            // Update existing service
            updatedServices = services.map(service => 
                service.id === editingService.id ? editingService : service
            );
        } else {
            // Add new service
            const newService = {
                ...editingService,
                id: `service-${Date.now()}`
            };
            updatedServices = [...services, newService];
        }
        
        setServices(updatedServices);
        const updatedConfig = {
            ...siteConfig,
            services: updatedServices
        };
        saveSiteConfig(updatedConfig);
        
        setShowServiceEditor(false);
        setEditingService(null);
    };
    
    const deleteService = (serviceId: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        
        const updatedServices = services.filter(service => service.id !== serviceId);
        setServices(updatedServices);
        
        const updatedConfig = {
            ...siteConfig,
            services: updatedServices
        };
        saveSiteConfig(updatedConfig);
    };
    
    const addServiceBullet = () => {
        if (!editingService) return;
        setEditingService({
            ...editingService,
            bullets: [...editingService.bullets, '']
        });
    };
    
    const updateServiceBullet = (index: number, value: string) => {
        if (!editingService) return;
        const newBullets = [...editingService.bullets];
        newBullets[index] = value;
        setEditingService({
            ...editingService,
            bullets: newBullets
        });
    };
    
    const removeServiceBullet = (index: number) => {
        if (!editingService) return;
        setEditingService({
            ...editingService,
            bullets: editingService.bullets.filter((_, i) => i !== index)
        });
    };

    // Consultation functions
    const handleSaveConsultType = () => {
        if (!editingConsultType || !editingConsultType.name) return;
        
        let updatedTypes;
        if (editingConsultType.id) {
            // Update existing type
            updatedTypes = appointmentTypes.map(type => 
                type.id === editingConsultType.id ? editingConsultType : type
            );
        } else {
            // Add new type
            const newType = {
                ...editingConsultType,
                id: `type-${Date.now()}`
            };
            updatedTypes = [...appointmentTypes, newType];
        }
        
        setAppointmentTypes(updatedTypes);
        const updatedConfig = {
            ...siteConfig,
            appointmentTypes: updatedTypes
        };
        saveSiteConfig(updatedConfig);
        
        setShowConsultEditor(false);
        setEditingConsultType(null);
    };
    
    const deleteConsultType = (typeId: string) => {
        if (!confirm('Are you sure you want to delete this consultation type?')) return;
        
        const updatedTypes = appointmentTypes.filter(type => type.id !== typeId);
        setAppointmentTypes(updatedTypes);
        
        const updatedConfig = {
            ...siteConfig,
            appointmentTypes: updatedTypes
        };
        saveSiteConfig(updatedConfig);
    };

    // Client Portal functions
    const handleSavePortalAction = () => {
        if (!editingPortalAction || !editingPortalAction.title) return;
        
        let updatedActions;
        if (editingPortalAction.id) {
            // Update existing action
            updatedActions = clientPortalActions.map(action => 
                action.id === editingPortalAction.id ? editingPortalAction : action
            );
        } else {
            // Add new action
            const newAction = {
                ...editingPortalAction,
                id: `action-${Date.now()}`
            };
            updatedActions = [...clientPortalActions, newAction];
        }
        
        setClientPortalActions(updatedActions);
        const updatedConfig = {
            ...siteConfig,
            clientPortalActions: updatedActions
        };
        saveSiteConfig(updatedConfig);
        
        setShowPortalEditor(false);
        setEditingPortalAction(null);
    };
    
    const deletePortalAction = (actionId: string) => {
        if (!confirm('Are you sure you want to delete this action?')) return;
        
        const updatedActions = clientPortalActions.filter(action => action.id !== actionId);
        setClientPortalActions(updatedActions);
        
        const updatedConfig = {
            ...siteConfig,
            clientPortalActions: updatedActions
        };
        saveSiteConfig(updatedConfig);
    };

    // Blog functions
    const handleSaveBlog = () => {
        const post: BlogPost = editingPost || {
            id: `post-${Date.now()}`,
            title: blogTitle,
            content: blogContent,
            excerpt: blogContent.substring(0, 150) + '...',
            createdAt: new Date().toISOString(),
            published: true,
            featured: blogFeatured
        };
        
        if (editingPost) {
            post.title = blogTitle;
            post.content = blogContent;
            post.excerpt = blogContent.substring(0, 150) + '...';
            post.featured = blogFeatured;
        }
        
        const updatedPosts = editingPost 
            ? blogPosts.map(p => p.id === editingPost.id ? post : p)
            : [...blogPosts, post];
            
        setBlogPosts(updatedPosts);
        saveSiteConfig({ ...siteConfig, blogPosts: updatedPosts });
        
        // Reset editor
        setShowBlogEditor(false);
        setEditingPost(null);
        setBlogTitle('');
        setBlogContent('');
        setBlogFeatured(false);
    };
    
    const handleDeleteBlog = (postId: string) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            const updatedPosts = blogPosts.filter(p => p.id !== postId);
            setBlogPosts(updatedPosts);
            saveSiteConfig({ ...siteConfig, blogPosts: updatedPosts });
        }
    };
    
    const handleEditBlog = (post: BlogPost) => {
        setEditingPost(post);
        setBlogTitle(post.title);
        setBlogContent(post.content);
        setShowBlogEditor(true);
    };
    
    const generateSeoContent = () => {
        // Simple SEO optimization of the transcript
        const lines = transcript.split('\n').filter(l => l.trim());
        const title = lines[0] || 'New Blog Post';
        const content = lines.join('\n\n');
        
        setBlogTitle(title);
        setBlogContent(content);
        setShowSeoGenerator(false);
        setTranscript('');
    };

    // Services state
    const [services, setServices] = useState<ServiceItem[]>((siteConfig as any).services || [
        {
            id: 'wy-apt',
            title: 'Wyoming Asset Protection Trusts',
            subtitle: 'Shield personal assets from lawsuits and creditor claims under Wyoming law.',
            bullets: [
                'Domestic Asset Protection Trusts (DAPT) with strong legal framework',
                'Maintain access and control through structured provisions',
                'Clear, enforceable documents without offshore complexity'
            ]
        },
        {
            id: 'pftc',
            title: 'Private Family Trust Companies',
            subtitle: 'Greater control, privacy, and continuity by serving as trustee for your trust.',
            bullets: [
                'Form a Wyoming Private Family Trust Company',
                'Enhance privacy and centralize management of family assets',
                'Built to meet state compliance standards'
            ]
        },
        {
            id: 'maintenance',
            title: 'Ongoing Trust Support & Maintenance',
            subtitle: 'Year-one guidance, distributions, minutes, and trustee documentation — plus annual maintenance.',
            bullets: [
                'Distribution processing with documentation',
                'Meeting minutes and trustee records',
                'Annual maintenance to keep operations smooth'
            ]
        }
    ]);
    const [showServiceEditor, setShowServiceEditor] = useState(false);
    const [editingService, setEditingService] = useState<ServiceItem | null>(null);

    const testimonials = [
        {
            name: 'Jim R',
            quote: 'They were very thorough and most importantly helpful in assisting us getting accounts and assets transferred into our new trust. I HIGHLY recommend these people.'
        },
        {
            name: 'Gordon Middleton',
            quote: 'Liz was wonderful about explaining everything to us in terminology we could understand. We would highly recommend their firm.'
        },
        {
            name: 'Maury Dobbie',
            quote: 'They are wonderful to work with, knowledgeable, and helpful. We would highly recommend their firm.'
        },
        {
            name: 'Betsy Cairo',
            quote: 'On top of things. Thorough and friendly. Explained the process at each step. Highly recommend.'
        }
    ];

    const consultSlots = [
        'Tue 10:00 AM MT',
        'Tue 2:00 PM MT',
        'Wed 11:30 AM MT',
        'Thu 9:00 AM MT',
        'Fri 1:00 PM MT'
    ];


    const renderBlog = () => (
        <>
            <div className="module-card">
                <h2 className="section-title">My Blog</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Create SEO-optimized articles and blog posts for your site
                </p>
                
                <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
                    <button 
                        className="form-button" 
                        style={{ width: 'auto' }}
                        onClick={() => {
                            setEditingPost(null);
                            setBlogTitle('');
                            setBlogContent('');
                            setShowBlogEditor(true);
                        }}
                    >
                        + Create New Blog Post
                    </button>
                    <button 
                        className="button-outline" 
                        style={{ width: 'auto' }}
                        onClick={() => setShowSeoGenerator(true)}
                    >
                        Generate from Transcript
                    </button>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                    {blogPosts.map(post => (
                        <div key={post.id} className="module-card" style={{ background: 'var(--gray-light)' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{post.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                                {post.excerpt}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        className="button-outline" 
                                        style={{ width: 'auto' }}
                                        onClick={() => handleEditBlog(post)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="button-outline" 
                                        style={{ width: 'auto' }}
                                        onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                                    >
                                        View
                                    </button>
                                    <button 
                                        className="button-outline" 
                                        style={{ width: 'auto' }}
                                        onClick={() => handleDeleteBlog(post.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Blog Editor Modal */}
            {showBlogEditor && (
                <div className="modal-overlay" onClick={() => setShowBlogEditor(false)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', width: '90%' }}>
                        <h2 style={{ marginBottom: '20px' }}>
                            {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                        </h2>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-input"
                                value={blogTitle}
                                onChange={(e) => setBlogTitle(e.target.value)}
                                placeholder="Enter blog post title"
                            />
                        </div>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">Content</label>
                            <textarea
                                className="form-input"
                                value={blogContent}
                                onChange={(e) => setBlogContent(e.target.value)}
                                placeholder="Write your blog post content here... (You can use HTML for formatting)"
                                style={{ minHeight: '300px', resize: 'vertical' }}
                            />
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                                Tip: You can add images using HTML: {`<img src="image-url" alt="description" style="max-width: 100%;" />`}
                            </p>
                        </div>
                        
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={blogFeatured}
                                    onChange={(e) => setBlogFeatured(e.target.checked)}
                                />
                                Feature this post on home page
                            </label>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button
                                className="button-outline"
                                onClick={() => {
                                    setShowBlogEditor(false);
                                    setEditingPost(null);
                                    setBlogTitle('');
                                    setBlogContent('');
                                    setBlogFeatured(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="form-button"
                                onClick={handleSaveBlog}
                                disabled={!blogTitle || !blogContent}
                            >
                                {editingPost ? 'Update' : 'Publish'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SEO Generator Modal */}
            {showSeoGenerator && (
                <div className="modal-overlay" onClick={() => setShowSeoGenerator(false)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%' }}>
                        <h2 style={{ marginBottom: '20px' }}>Generate SEO Content from Transcript</h2>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <label className="form-label">Paste Audio Transcript or Raw Content</label>
                            <textarea
                                className="form-input"
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                                placeholder="Paste your audio transcript or raw content here..."
                                style={{ minHeight: '200px', resize: 'vertical' }}
                            />
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button
                                className="button-outline"
                                onClick={() => {
                                    setShowSeoGenerator(false);
                                    setTranscript('');
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="form-button"
                                onClick={() => {
                                    generateSeoContent();
                                    setShowBlogEditor(true);
                                }}
                                disabled={!transcript}
                            >
                                Generate & Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    const renderOverview = () => (
        <>
            <div className="module-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <EditableSection
                        content={<h2 style={{ margin: 0 }}>Meet {advisorName}</h2>}
                        onSave={(value) => handleContentSave('advisorName', value.replace('Meet ', ''))}
                    />
                    <EditableSection
                        content={
                            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                                {advisorDescription}
                            </p>
                        }
                        onSave={(value) => handleContentSave('advisorDescription', value)}
                    />
                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                        <button className="form-button" style={{ width: 'auto' }} onClick={() => setActiveTab('consult')}>Book an Appointment</button>
                        <button className="button-outline" style={{ width: 'auto' }} onClick={() => setActiveTab('contact')}>
                            Call: {advisorPhone}
                        </button>
                    </div>
                </div>
            </div>

            <div className="module-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {services.map(svc => (
                    <div className="module-card" key={svc.id}>
                        <h3 className="section-title" style={{ marginBottom: '6px' }}>{svc.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{svc.subtitle}</p>
                        <ul style={{ marginTop: '12px', paddingLeft: '18px' }}>
                            {svc.bullets.map((b, i) => (
                                <li key={i} style={{ marginBottom: '6px' }}>{b}</li>
                            ))}
                        </ul>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="button-outline" style={{ width: 'auto' }} onClick={() => { setActiveTab('services'); setSelectedService(svc.id); }}>View Details</button>
                            <button className="form-button" style={{ width: 'auto' }} onClick={() => setActiveTab('consultations')}>Start Consult</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="module-card">
                <h3 className="section-title">How We Work</h3>
                <div className="module-card-row" style={{ marginTop: '8px' }}>
                    <div style={{ background: 'var(--gray-light)', padding: '16px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 600, marginBottom: '6px' }}>Step 1: Schedule a Consultation</div>
                        <div style={{ color: 'var(--text-secondary)' }}>Focused call to understand your goals and whether a Wyoming trust is the right fit.</div>
                    </div>
                    <div style={{ background: 'var(--gray-light)', padding: '16px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 600, marginBottom: '6px' }}>Step 2: Custom Plan Design</div>
                        <div style={{ color: 'var(--text-secondary)' }}>We draft your custom trust and, if needed, a private trust company — all fully compliant with Wyoming law.</div>
                    </div>
                    <div style={{ background: 'var(--gray-light)', padding: '16px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 600, marginBottom: '6px' }}>Step 3: Implementation & Follow-Up</div>
                        <div style={{ color: 'var(--text-secondary)' }}>We handle filings, deliver all legal docs, and support your first year with documentation, minutes, and distribution guidance.</div>
                    </div>
                </div>
            </div>
        </>
    );

    const renderServices = () => (
        <>
            <div className="module-grid">
                <div className="module-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 className="section-title">Our Core Services</h3>
                        <button 
                            className="form-button" 
                            style={{ width: 'auto' }}
                            onClick={() => {
                                setEditingService({
                                    id: '',
                                    title: '',
                                    subtitle: '',
                                    bullets: ['']
                                });
                                setShowServiceEditor(true);
                            }}
                        >
                            + Add Service
                        </button>
                    </div>
                    <div className="module-card-row" style={{ marginTop: '12px' }}>
                        {services.map(svc => (
                            <div key={svc.id} style={{ 
                                border: '1px solid var(--border)', 
                                borderRadius: 8, 
                                padding: 16, 
                                background: 'var(--bg)',
                                position: 'relative'
                            }}>
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '8px', 
                                    right: '8px',
                                    display: 'flex',
                                    gap: '4px'
                                }}>
                                    <button
                                        className="button-outline"
                                        style={{ 
                                            width: 'auto', 
                                            padding: '4px 8px',
                                            fontSize: '12px'
                                        }}
                                        onClick={() => {
                                            setEditingService(svc);
                                            setShowServiceEditor(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="button-outline"
                                        style={{ 
                                            width: 'auto', 
                                            padding: '4px 8px',
                                            fontSize: '12px',
                                            color: 'var(--danger)'
                                        }}
                                        onClick={() => deleteService(svc.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div style={{ paddingRight: '80px' }}>
                                    <div style={{ fontWeight: 600, marginBottom: 6 }}>{svc.title}</div>
                                    <div style={{ 
                                        color: 'var(--text-secondary)', 
                                        marginBottom: 10,
                                        fontSize: '14px',
                                        maxWidth: '300px'
                                    }}>{svc.subtitle.substring(0, 100)}{svc.subtitle.length > 100 ? '...' : ''}</div>
                                    <ul style={{ paddingLeft: 18 }}>
                                        {svc.bullets.slice(0, 3).map((b, i) => (
                                            <li key={i} style={{ marginBottom: 6, fontSize: '14px' }}>
                                                {b.substring(0, 50)}{b.length > 50 ? '...' : ''}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button className="button-outline" style={{ width: 'auto', marginTop: 10 }} onClick={() => setSelectedService(svc.id)}>View Details</button>
                            </div>
                        ))}
                    </div>
                </div>

            {selectedService && (
                <div className="module-card">
                    <h3 className="section-title">{services.find(s => s.id === selectedService)?.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 6 }}>{services.find(s => s.id === selectedService)?.subtitle}</p>
                    <div style={{ marginTop: 12 }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>What this includes</div>
                        <ul style={{ paddingLeft: 18 }}>
                            {services.find(s => s.id === selectedService)?.bullets.map((b, i) => (
                                <li key={i} style={{ marginBottom: 6 }}>{b}</li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                        <button className="form-button" style={{ width: 'auto' }} onClick={() => setActiveTab('consultations')}>Proceed to Consult</button>
                        <button className="button-outline" style={{ width: 'auto' }} onClick={() => setSelectedService(null)}>Close</button>
                    </div>
                </div>
            )}
            
            {/* Service Editor Modal */}
            {showServiceEditor && editingService && (
                <div style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    background: 'rgba(0,0,0,0.5)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 50 
                }}
                onClick={() => setShowServiceEditor(false)}
                >
                    <div 
                        className="module-card" 
                        style={{ 
                            width: '90%', 
                            maxWidth: '600px', 
                            maxHeight: '80vh',
                            overflow: 'auto',
                            background: '#ffffff' 
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="section-title" style={{ marginBottom: '20px' }}>
                            {editingService.id ? 'Edit' : 'Add'} Service
                        </h2>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Service Title (Max 50 characters)</label>
                            <input 
                                className="form-input" 
                                value={editingService.title || ''}
                                onChange={(e) => setEditingService({ 
                                    ...editingService, 
                                    title: e.target.value.substring(0, 50)
                                })}
                                placeholder="e.g., Wyoming Asset Protection Trusts"
                                maxLength={50}
                            />
                            <small style={{ color: 'var(--text-secondary)' }}>
                                {editingService.title?.length || 0}/50 characters
                            </small>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Service Subtitle (Max 150 characters)</label>
                            <textarea 
                                className="form-input" 
                                value={editingService.subtitle || ''}
                                onChange={(e) => setEditingService({ 
                                    ...editingService, 
                                    subtitle: e.target.value.substring(0, 150)
                                })}
                                placeholder="Brief description of the service"
                                rows={2}
                                maxLength={150}
                            />
                            <small style={{ color: 'var(--text-secondary)' }}>
                                {editingService.subtitle?.length || 0}/150 characters
                            </small>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Bullet Points (Max 100 characters each)</label>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                {editingService.bullets.map((bullet: string, index: number) => (
                                    <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                        <input 
                                            className="form-input"
                                            value={bullet}
                                            onChange={(e) => updateServiceBullet(index, e.target.value.substring(0, 100))}
                                            placeholder="Service feature or benefit"
                                            maxLength={100}
                                        />
                                        <button 
                                            className="button-outline"
                                            style={{ width: 'auto', minWidth: '80px' }}
                                            onClick={() => removeServiceBullet(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    className="button-outline"
                                    style={{ width: 'auto' }}
                                    onClick={addServiceBullet}
                                    disabled={editingService.bullets.length >= 5}
                                >
                                    + Add Bullet Point (Max 5)
                                </button>
                            </div>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Button Text</label>
                            <input 
                                className="form-input" 
                                placeholder="View Details"
                                disabled
                                value="View Details"
                            />
                            <small style={{ display: 'block', marginTop: '4px', color: 'var(--text-secondary)' }}>
                                Button customization coming in future update
                            </small>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button 
                                className="button-outline" 
                                onClick={() => {
                                    setShowServiceEditor(false);
                                    setEditingService(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="form-button" 
                                onClick={handleSaveService}
                                disabled={!editingService.title || editingService.bullets.filter((b: string) => b.trim()).length === 0}
                            >
                                Save Service
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );

    // Consultation state
    const [appointmentTypes, setAppointmentTypes] = useState([
        { id: 'free-30', name: 'Free 30-min Consultation', duration: 30, price: 0, isPaid: false },
        { id: 'paid-30', name: 'Paid 30-min Consultation', duration: 30, price: 375, isPaid: true },
        { id: 'paid-60', name: 'Paid 60-min Deep Dive', duration: 60, price: 750, isPaid: true }
    ]);
    const [selectedAppointmentType, setSelectedAppointmentType] = useState(appointmentTypes[0]);
    const [showPayment, setShowPayment] = useState(false);
    const [showConsultEditor, setShowConsultEditor] = useState(false);
    const [editingConsultType, setEditingConsultType] = useState<any>(null);
    
    // Contact info state
    const [contactPhone, setContactPhone] = useState(siteConfig.contactPhone || '(307) 463-3600');
    const [contactEmail, setContactEmail] = useState(siteConfig.contactEmail || 'hello@wyomingassetprotectiontrust.com');
    const [contactAddress, setContactAddress] = useState(siteConfig.contactAddress || '1621 Central Avenue #8866, Cheyenne, WY 82001');
    
    // Testimonials state
    type Testimonial = { name: string; quote: string };
    const [editableTestimonials, setEditableTestimonials] = useState<Testimonial[]>(Array.isArray(siteConfig.testimonials) ? siteConfig.testimonials : testimonials);
    
    const renderConsultations = () => (
        <>
            <div className="module-grid">
                <div className="module-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div>
                            <h3 className="section-title">Schedule a Consultation</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Choose your consultation type and select an available time.</p>
                        </div>
                        <button 
                            className="form-button" 
                            style={{ width: 'auto' }}
                            onClick={() => {
                                setEditingConsultType({
                                    name: '',
                                    duration: 30,
                                    price: 0,
                                    isPaid: false
                                });
                                setShowConsultEditor(true);
                            }}
                        >
                            + Add Type
                        </button>
                    </div>
                    
                    {/* Appointment Types */}
                    <div style={{ marginBottom: '20px' }}>
                        <label className="form-label">Appointment Type</label>
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {appointmentTypes.map(type => (
                                <div 
                                    key={type.id}
                                    style={{
                                        padding: '16px',
                                        border: `2px solid ${selectedAppointmentType.id === type.id ? 'var(--primary)' : 'var(--border)'}`,
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        background: selectedAppointmentType.id === type.id ? 'var(--primary-light)' : 'transparent',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '8px', 
                                        right: '8px',
                                        display: 'flex',
                                        gap: '4px'
                                    }}>
                                        <button
                                            className="button-outline"
                                            style={{ 
                                                width: 'auto', 
                                                padding: '4px 8px',
                                                fontSize: '12px'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingConsultType(type);
                                                setShowConsultEditor(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="button-outline"
                                            style={{ 
                                                width: 'auto', 
                                                padding: '4px 8px',
                                                fontSize: '12px',
                                                color: 'var(--danger)'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteConsultType(type.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    
                                    <div 
                                        onClick={() => {
                                            setSelectedAppointmentType(type);
                                            setShowPayment(type.isPaid);
                                        }}
                                        style={{ paddingRight: '80px' }}
                                    >
                                        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{type.name}</div>
                                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                            {type.duration} minutes • {type.isPaid ? `$${type.price}` : 'Free'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                {/* Google Calendar Sync */}
                <div style={{ marginBottom: '20px' }}>
                    <label className="form-label">Available Times (Google Calendar)</label>
                    <div className="module-card-row" style={{ marginTop: 12 }}>
                        {consultSlots.map(slot => (
                            <button
                                key={slot}
                                className={`time-button ${selectedSlot === slot ? 'active' : ''}`}
                                style={{ padding: '10px 16px' }}
                                onClick={() => setSelectedSlot(slot)}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                    <button
                        className="form-button"
                        style={{ width: 'auto' }}
                        disabled={!selectedSlot}
                        onClick={() => {
                            if (selectedAppointmentType.isPaid) {
                                setShowPayment(true);
                            } else {
                                setScheduled(true);
                            }
                        }}
                    >
                        {selectedAppointmentType.isPaid ? `Continue to Payment ($${selectedAppointmentType.price})` : 'Confirm Appointment'}
                    </button>
                    <button className="button-outline" style={{ width: 'auto' }} onClick={() => setSelectedSlot(null)}>Clear</button>
                </div>
                {scheduled && (
                    <div style={{ marginTop: 16, background: 'var(--success-light)', color: 'var(--success)', padding: 12, borderRadius: 8 }}>
                        ✓ {selectedAppointmentType.name} confirmed for {selectedSlot}. Google Calendar invite sent!
                    </div>
                )}
            </div>

            {showPayment && selectedAppointmentType.isPaid && (
                <div className="module-card">
                    <h3 className="section-title">Payment Information</h3>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ padding: '16px', background: 'var(--gray-light)', borderRadius: '8px', marginBottom: '16px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Order Summary</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span>{selectedAppointmentType.name}</span>
                                <span>${selectedAppointmentType.price}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span>Date & Time</span>
                                <span>{selectedSlot}</span>
                            </div>
                            <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <span>Total</span>
                                <span>${selectedAppointmentType.price}</span>
                            </div>
                        </div>
                        
                        <LawPayIntegration
                            amount={selectedAppointmentType.price}
                            description={`${selectedAppointmentType.name} - ${selectedSlot}`}
                            clientName="Test Client"
                            clientEmail="client@example.com"
                            onSuccess={(paymentId) => {
                                console.log('Payment successful:', paymentId);
                                setScheduled(true);
                                setShowPayment(false);
                                alert(`Payment successful! Reference: ${paymentId}`);
                            }}
                            onError={(error) => {
                                console.error('Payment error:', error);
                                alert(`Payment failed: ${error}`);
                            }}
                            onCancel={() => {
                                setShowPayment(false);
                            }}
                        />
                    </div>
                </div>
            )}
            
            {/* Consultation Type Editor Modal */}
            {showConsultEditor && editingConsultType && (
                <div style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    background: 'rgba(0,0,0,0.5)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 50 
                }}
                onClick={() => setShowConsultEditor(false)}
                >
                    <div 
                        className="module-card" 
                        style={{ 
                            width: '90%', 
                            maxWidth: '500px', 
                            background: '#ffffff' 
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="section-title" style={{ marginBottom: '20px' }}>
                            {editingConsultType.id ? 'Edit' : 'Add'} Consultation Type
                        </h2>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Name</label>
                            <input 
                                className="form-input" 
                                value={editingConsultType.name || ''}
                                onChange={(e) => setEditingConsultType({ 
                                    ...editingConsultType, 
                                    name: e.target.value 
                                })}
                                placeholder="e.g., Free Consultation"
                            />
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Duration (minutes)</label>
                            <input 
                                className="form-input" 
                                type="number"
                                value={editingConsultType.duration || 30}
                                onChange={(e) => setEditingConsultType({ 
                                    ...editingConsultType, 
                                    duration: parseInt(e.target.value) || 30
                                })}
                                min="15"
                                step="15"
                            />
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">
                                <input 
                                    type="checkbox"
                                    checked={editingConsultType.isPaid || false}
                                    onChange={(e) => setEditingConsultType({ 
                                        ...editingConsultType, 
                                        isPaid: e.target.checked,
                                        price: e.target.checked ? editingConsultType.price || 375 : 0
                                    })}
                                    style={{ marginRight: '8px' }}
                                />
                                This is a paid consultation
                            </label>
                        </div>
                        
                        {editingConsultType.isPaid && (
                            <div style={{ marginBottom: '20px' }}>
                                <label className="form-label">Price ($)</label>
                                <input 
                                    className="form-input" 
                                    type="number"
                                    value={editingConsultType.price || 0}
                                    onChange={(e) => setEditingConsultType({ 
                                        ...editingConsultType, 
                                        price: parseInt(e.target.value) || 0
                                    })}
                                    min="0"
                                />
                                <small style={{ display: 'block', marginTop: '4px', color: 'var(--text-secondary)' }}>
                                    This will be processed through LawPay integration
                                </small>
                            </div>
                        )}
                        
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button 
                                className="button-outline" 
                                onClick={() => {
                                    setShowConsultEditor(false);
                                    setEditingConsultType(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="form-button" 
                                onClick={handleSaveConsultType}
                                disabled={!editingConsultType.name}
                            >
                                Save Type
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );

    const renderClientPortal = () => (
        <>
            <div className="module-grid">
                <div className="module-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 className="section-title">Client Portal Actions</h3>
                        <button 
                            className="form-button" 
                            style={{ width: 'auto' }}
                            onClick={() => {
                                setEditingPortalAction({
                                    id: '',
                                    title: '',
                                    description: '',
                                    formId: null,
                                    docs: []
                                });
                                setShowPortalEditor(true);
                            }}
                        >
                            + Add Action
                        </button>
                    </div>
                    
                    <div className="module-card-row" style={{ marginTop: 12 }}>
                        {clientPortalActions.map(action => (
                            <div key={action.id} style={{ 
                                border: '1px solid var(--border)', 
                                borderRadius: 8, 
                                padding: 16, 
                                background: 'var(--bg)',
                                position: 'relative'
                            }}>
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '8px', 
                                    right: '8px',
                                    display: 'flex',
                                    gap: '4px'
                                }}>
                                    <button
                                        className="button-outline"
                                        style={{ 
                                            width: 'auto', 
                                            padding: '4px 8px',
                                            fontSize: '12px'
                                        }}
                                        onClick={() => {
                                            setEditingPortalAction(action);
                                            setShowPortalEditor(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="button-outline"
                                        style={{ 
                                            width: 'auto', 
                                            padding: '4px 8px',
                                            fontSize: '12px',
                                            color: 'var(--danger)'
                                        }}
                                        onClick={() => deletePortalAction(action.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                
                                <div style={{ fontWeight: 600, marginBottom: 6, paddingRight: '80px' }}>{action.title}</div>
                                <div style={{ color: 'var(--text-secondary)', marginBottom: 10 }}>{action.description}</div>
                                
                                {action.formId && (
                                    <div style={{ 
                                        fontSize: '12px', 
                                        color: 'var(--success)', 
                                        marginBottom: '8px' 
                                    }}>
                                        ✓ Linked to form
                                    </div>
                                )}
                                
                                <button 
                                    className="button-outline" 
                                    style={{ width: 'auto' }} 
                                    onClick={() => setSelectedAction(action.id)}
                                >
                                    Preview
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div style={{ 
                        marginTop: '16px', 
                        padding: '12px', 
                        background: 'var(--primary-light)', 
                        borderRadius: '6px',
                        fontSize: '13px'
                    }}>
                        <strong>Note:</strong> Link these actions to forms in the Form Builder to enable client self-service.
                    </div>
                </div>

                {selectedAction && (
                    <div className="module-card">
                        <h3 className="section-title">{clientPortalActions.find(a => a.id === selectedAction)?.title}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>This action will generate the following documents:</p>
                        <ul style={{ paddingLeft: 18 }}>
                            {clientPortalActions.find(a => a.id === selectedAction)?.docs.map((d, i) => (
                                <li key={i} style={{ marginBottom: 6 }}>{d}</li>
                            ))}
                        </ul>
                        <div style={{ display: 'flex', gap: 10, marginTop: '16px' }}>
                            <button 
                                className="form-button" 
                                style={{ width: 'auto' }}
                                onClick={() => {
                                    const action = clientPortalActions.find(a => a.id === selectedAction);
                                    if (action?.formId) {
                                        navigate('/admin/formbuilder');
                                    } else {
                                        alert('No form linked. Link a form in the edit dialog.');
                                    }
                                }}
                            >
                                {clientPortalActions.find(a => a.id === selectedAction)?.formId ? 
                                    'Open Linked Form' : 'No Form Linked'
                                }
                            </button>
                            <button className="button-outline" style={{ width: 'auto' }} onClick={() => setSelectedAction(null)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Portal Action Editor Modal */}
            {showPortalEditor && editingPortalAction && (
                <div style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    background: 'rgba(0,0,0,0.5)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 50 
                }}
                onClick={() => setShowPortalEditor(false)}
                >
                    <div 
                        className="module-card" 
                        style={{ 
                            width: '90%', 
                            maxWidth: '600px', 
                            background: '#ffffff' 
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="section-title" style={{ marginBottom: '20px' }}>
                            {editingPortalAction.id ? 'Edit' : 'Add'} Portal Action
                        </h2>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Action Title</label>
                            <input 
                                className="form-input" 
                                value={editingPortalAction.title}
                                onChange={(e) => setEditingPortalAction({ 
                                    ...editingPortalAction, 
                                    title: e.target.value 
                                })}
                                placeholder="e.g., Create New Trust"
                            />
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Description</label>
                            <textarea 
                                className="form-input" 
                                value={editingPortalAction.description}
                                onChange={(e) => setEditingPortalAction({ 
                                    ...editingPortalAction, 
                                    description: e.target.value 
                                })}
                                placeholder="Brief description of what this action does"
                                rows={3}
                            />
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Link to Form (Optional)</label>
                            <select 
                                className="form-input"
                                value={editingPortalAction.formId || ''}
                                onChange={(e) => setEditingPortalAction({ 
                                    ...editingPortalAction, 
                                    formId: e.target.value || null 
                                })}
                            >
                                <option value="">No form linked</option>
                                <option value="form-paid-consult-booking">Paid 30-Minute Consultation Booking</option>
                                <option value="form-trustee-acceptance">Trustee Acceptance of Contribution</option>
                                <option value="form-investment-minutes">Investment Committee Meeting Minutes</option>
                                <option value="form-asset-protection-trust">Asset Protection Trust Questionnaire</option>
                                <option value="form-durable-poa">Durable Power of Attorney</option>
                                <option value="form-healthcare-poa">Health Care Power of Attorney</option>
                            </select>
                            <small style={{ display: 'block', marginTop: '4px', color: 'var(--text-secondary)' }}>
                                Forms are created in the Form Builder module
                            </small>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Generated Documents</label>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                {editingPortalAction.docs.map((doc: string, index: number) => (
                                    <div key={index} style={{ display: 'flex', gap: '8px' }}>
                                        <input 
                                            className="form-input"
                                            value={doc}
                                            onChange={(e) => {
                                                const newDocs = [...editingPortalAction.docs];
                                                newDocs[index] = e.target.value;
                                                setEditingPortalAction({ 
                                                    ...editingPortalAction, 
                                                    docs: newDocs 
                                                });
                                            }}
                                            placeholder="Document name"
                                        />
                                        <button 
                                            className="button-outline"
                                            style={{ width: 'auto' }}
                                            onClick={() => {
                                                const newDocs = editingPortalAction.docs.filter((_: any, i: number) => i !== index);
                                                setEditingPortalAction({ 
                                                    ...editingPortalAction, 
                                                    docs: newDocs 
                                                });
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    className="button-outline"
                                    style={{ width: 'auto' }}
                                    onClick={() => setEditingPortalAction({ 
                                        ...editingPortalAction, 
                                        docs: [...editingPortalAction.docs, ''] 
                                    })}
                                >
                                    + Add Document
                                </button>
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button 
                                className="button-outline" 
                                onClick={() => {
                                    setShowPortalEditor(false);
                                    setEditingPortalAction(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="form-button" 
                                onClick={handleSavePortalAction}
                                disabled={!editingPortalAction.title}
                            >
                                Save Action
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    const renderTestimonials = () => (
        <div className="module-card">
            <EditableSection
                content={
                    <>
                        <h3 className="section-title">What Our Clients Say</h3>
                        <div className="module-card-row" style={{ marginTop: 12 }}>
                            {editableTestimonials.map((t: Testimonial, i: number) => (
                                <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 16, background: 'var(--bg)' }}>
                                    <div style={{ fontWeight: 600, marginBottom: 6 }}>{t.name}</div>
                                    <div style={{ color: 'var(--text-secondary)' }}>"{t.quote}"</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 16, color: 'var(--text-secondary)' }}>45+ five-star reviews</div>
                    </>
                }
                onSave={(value) => {
                    // For now, save the entire testimonials array as JSON
                    handleContentSave('testimonials', JSON.stringify(editableTestimonials));
                }}
            />
        </div>
    );

    const renderContact = () => (
        <div className="module-grid">
            <div className="module-card">
                <h3 className="section-title">Contact Us</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                    <EditableSection
                        content={<div><strong>Phone:</strong> {contactPhone}</div>}
                        onSave={(value) => handleContentSave('contactPhone', value.replace('Phone: ', ''))}
                    />
                    <EditableSection
                        content={<div><strong>Email:</strong> {contactEmail}</div>}
                        onSave={(value) => handleContentSave('contactEmail', value.replace('Email: ', ''))}
                    />
                    <EditableSection
                        content={<div><strong>Address:</strong> {contactAddress}</div>}
                        onSave={(value) => handleContentSave('contactAddress', value.replace('Address: ', ''))}
                    />
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                    <button className="form-button" style={{ width: 'auto' }} onClick={() => setActiveTab('consultations')}>Book an Appointment</button>
                    <button className="button-outline" style={{ width: 'auto' }} onClick={() => navigate('/wyoming-apt')}>Visit Public Page</button>
                </div>
            </div>

            <div className="module-card">
                <h3 className="section-title">Why Work With Matt?</h3>
                <ul style={{ paddingLeft: 18 }}>
                    <li>Bulletproof legal protection using Wyoming’s strongest-in-the-nation trust laws</li>
                    <li>Custom strategies — never cookie-cutter solutions</li>
                    <li>30+ years of experience in risk mitigation and trust formation</li>
                    <li>A calm, clear approach to complex legal issues</li>
                </ul>
            </div>
        </div>
    );

    return (
        <ModuleTemplate 
            title="Wyoming Asset Protection Trust"
            description="Static, no-API mock experience replacing AgentIQ for the Wyoming APT workflow"
        >
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {([
                    { key: 'overview', label: '◻︎ My Web Content' },
                    { key: 'blog', label: '◻︎ My Blog' },
                    { key: 'services', label: '◻︎ Services' },
                    { key: 'consultations', label: '◻︎ Consultations' },
                    { key: 'client-portal', label: '◻︎ Client Portal' },
                    { key: 'testimonials', label: '◻︎ Testimonials' },
                    { key: 'contact', label: '◻︎ Contact' }
                ] as { key: TabKey; label: string }[]).map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`time-button ${activeTab === tab.key ? 'active' : ''}`}
                        style={{ padding: '10px 20px' }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'blog' && renderBlog()}
            {activeTab === 'services' && renderServices()}
            {activeTab === 'consultations' && renderConsultations()}
            {activeTab === 'client-portal' && renderClientPortal()}
            {activeTab === 'testimonials' && renderTestimonials()}
            {activeTab === 'contact' && renderContact()}
        </ModuleTemplate>
    );
};

export default AgentIQ;