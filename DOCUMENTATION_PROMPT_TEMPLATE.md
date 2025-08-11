# Universal Documentation Generator Prompt Template for Cursor

## PROMPT TO COPY AND PASTE:

---

Please create a comprehensive technical documentation page for this entire platform/application. Follow these exact specifications:

### 1. DOCUMENTATION REQUIREMENTS:

Create a dedicated documentation page that includes:

**STRUCTURE:**
- Create a new route `/docs` or `/documentation` 
- Add a navigation link to access the documentation (in header/sidebar)
- Make it a clean, professional, single-page document
- Use proper HTML/React/Vue formatting with inline styles for a polished look
- Ensure it's copy-paste ready for external documents

**CONTENT SECTIONS TO INCLUDE:**

1. **Executive Summary**
   - Platform overview and value proposition
   - Target audience and use cases
   - Key differentiators

2. **Platform Architecture**
   - Technology Stack (with versions):
     - Backend (framework, database, authentication, APIs)
     - Frontend (framework, routing, state management, UI libraries)
     - AI/ML Stack (if applicable)
     - Third-party services
   - System architecture diagram (describe if can't render)
   - Deployment infrastructure

3. **Core Modules & Features**
   For EACH module/feature in the application:
   - Module name and purpose
   - Key features (bulleted list)
   - Technical implementation details
   - Data flow and interactions
   - API endpoints used
   - Database schemas involved

4. **API Documentation**
   - Authentication methods
   - Base URLs and environments
   - Rate limiting
   - Error handling
   - Complete endpoint list with:
     - Method (GET/POST/PUT/DELETE)
     - Path
     - Parameters
     - Request/Response examples
     - Status codes

5. **Database Schema**
   - Tables/Collections overview
   - Relationships diagram
   - Key fields and data types
   - Indexes and constraints

6. **Security & Compliance**
   - Authentication & Authorization
   - Data encryption methods
   - Compliance standards (GDPR, HIPAA, etc.)
   - Security best practices implemented
   - Audit logging

7. **Performance Metrics**
   - Response time targets
   - Uptime SLA
   - Scalability metrics
   - Optimization strategies

8. **Integration Ecosystem**
   - Third-party integrations
   - Webhooks
   - APIs consumed
   - Data synchronization

9. **User Roles & Permissions**
   - Role definitions
   - Permission matrix
   - Access control lists

10. **Development Guidelines**
    - Code style and standards
    - Git workflow
    - Testing requirements
    - CI/CD pipeline

11. **Deployment & DevOps**
    - Environment setup
    - Configuration management
    - Monitoring and logging
    - Backup and recovery

12. **Future Roadmap**
    - Planned features
    - Technical debt items
    - Scaling considerations

13. **Troubleshooting**
    - Common issues and solutions
    - Debug procedures
    - Log locations

14. **Contact & Support**
    - Support channels
    - SLA information
    - Escalation procedures

15. **Version Information**
    - Current version
    - Changelog highlights
    - Breaking changes

### 2. STYLING REQUIREMENTS:

Use this style structure:
```javascript
// For React/JSX:
<div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}}>
    <h1 style={{ fontSize: '36px', color: '#primary-color' }}>
        [Platform Name] - Comprehensive Documentation
    </h1>
    
    <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
            fontSize: '28px', 
            borderBottom: '2px solid #border-color',
            paddingBottom: '8px'
        }}>
            Section Title
        </h2>
        // Content here
    </section>
</div>
```

### 3. ANALYSIS INSTRUCTIONS:

Before creating the documentation:

1. **Scan the entire codebase** to identify:
   - All routes and pages
   - All components and modules
   - All API endpoints
   - All database models/schemas
   - All services and utilities
   - Configuration files
   - Package dependencies

2. **Extract technical details**:
   - Read package.json/requirements.txt/Gemfile for dependencies
   - Identify authentication methods from auth files
   - Find all API routes from router files
   - Locate database schemas from model files
   - Identify third-party integrations from service files

3. **Determine the tech stack** by examining:
   - File extensions (.jsx, .tsx, .vue, .py, .rb, etc.)
   - Framework-specific files (next.config.js, vite.config.ts, etc.)
   - Database connection files
   - Docker/deployment configurations

### 4. SPECIFIC DETAILS TO CAPTURE:

For each module/feature found, document:
- **Purpose**: What problem it solves
- **User Journey**: How users interact with it
- **Technical Flow**: Step-by-step process
- **Data Handling**: What data is processed/stored
- **Dependencies**: What it relies on
- **Performance**: Any optimization or caching

For AI/ML features (if present):
- Model types and versions
- Training data sources
- Inference pipeline
- Accuracy metrics
- Cost considerations

### 5. OUTPUT FORMAT:

Create the documentation as a single component file that:
- Is self-contained and renderable
- Uses semantic HTML structure
- Includes a table of contents with anchor links
- Has collapsible sections for better navigation
- Includes code examples where relevant
- Features metric cards for key statistics

### 6. EXAMPLE SECTIONS TO GENERATE:

```javascript
// Performance Metrics Card Example
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
    <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
        <h4>Response Time</h4>
        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>< 200ms</div>
        <p>Average API latency</p>
    </div>
</div>

// Feature List Example
<ul style={{ lineHeight: '1.8' }}>
    <li><strong>Feature Name:</strong> Description of what it does</li>
    <li><strong>Technical Detail:</strong> How it's implemented</li>
</ul>

// Code Example Block
<div style={{ 
    padding: '16px', 
    background: '#f8f8f8', 
    borderRadius: '8px', 
    fontFamily: 'monospace',
    overflow: 'auto'
}}>
    <code>
        // Code example here
    </code>
</div>
```

### 7. FINAL CHECKLIST:

Ensure the documentation includes:
- [ ] All user-facing features
- [ ] All technical components
- [ ] Complete API reference
- [ ] Security considerations
- [ ] Performance benchmarks
- [ ] Deployment instructions
- [ ] Contact information
- [ ] Version details
- [ ] Future roadmap
- [ ] Professional formatting
- [ ] Clear hierarchy
- [ ] Comprehensive coverage

### 8. IMPLEMENTATION:

After creating the documentation component:
1. Add the route to the main router/App file
2. Add a navigation link (button/menu item) to access it
3. Ensure it's accessible when logged in (or publicly if preferred)
4. Test that all sections render correctly
5. Verify it's mobile-responsive

**Make the documentation so comprehensive that someone could understand the entire system architecture, rebuild it, or maintain it just from reading this document.**

---

## END OF PROMPT

## USAGE INSTRUCTIONS:

1. Copy everything between the "---" markers above
2. Paste into Cursor in any project
3. Cursor will analyze your entire codebase and create comprehensive documentation
4. The AI will create a dedicated documentation page/component
5. It will add routing and navigation to access the documentation
6. The result will be a professional, complete technical document

## CUSTOMIZATION TIPS:

- Add project-specific sections by including them in the prompt
- Adjust styling by modifying the style examples
- Request specific frameworks by mentioning them
- Add company branding by including brand colors/logos in the prompt
- Request different formats (Markdown, PDF-ready, etc.) by specifying

## NOTES:

- Works best with well-structured codebases
- The AI will adapt to your specific tech stack
- Documentation will be proportional to project complexity
- Can be re-run periodically to update documentation 