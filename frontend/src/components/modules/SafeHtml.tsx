import React from 'react';
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
    html: string;
}

const SafeHtml: React.FC<SafeHtmlProps> = ({ html }) => {
    const sanitized = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
    return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};

export default SafeHtml;

