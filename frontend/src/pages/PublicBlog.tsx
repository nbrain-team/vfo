import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSiteConfig } from '../adminData';

interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    createdAt: string;
    published: boolean;
}

const PublicBlog: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
    
    useEffect(() => {
        const siteConfig = getSiteConfig();
        const blogPosts = siteConfig.blogPosts || [];
        const publishedPosts = blogPosts.filter((p: BlogPost) => p.published);
        
        if (postId) {
            const foundPost = publishedPosts.find((p: BlogPost) => p.id === postId);
            setPost(foundPost || null);
        } else {
            setAllPosts(publishedPosts);
        }
    }, [postId]);
    
    if (postId && !post) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>Post not found</h1>
                <button onClick={() => navigate('/blog')}>Back to blog</button>
            </div>
        );
    }
    
    if (postId && post) {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
                <button 
                    onClick={() => navigate('/blog')}
                    style={{ marginBottom: '20px', color: 'var(--primary)', textDecoration: 'none', cursor: 'pointer' }}
                >
                    ← Back to blog
                </button>
                <article>
                    <h1 style={{ marginBottom: '12px' }}>{post.title}</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <div 
                        style={{ lineHeight: '1.8', fontSize: '18px' }}
                        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
                    />
                </article>
            </div>
        );
    }
    
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Blog</h1>
            <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
                {allPosts.map(post => (
                    <article 
                        key={post.id}
                        style={{ 
                            border: '1px solid var(--border)', 
                            borderRadius: '8px', 
                            padding: '24px',
                            cursor: 'pointer',
                            transition: 'box-shadow 0.2s'
                        }}
                        onClick={() => navigate(`/blog/${post.id}`)}
                        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
                    >
                        <h2 style={{ marginBottom: '12px' }}>{post.title}</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                        <p>{post.excerpt}</p>
                        <a 
                            style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/blog/${post.id}`);
                            }}
                        >
                            Read more →
                        </a>
                    </article>
                ))}
            </div>
            {allPosts.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No blog posts published yet.
                </p>
            )}
        </div>
    );
};

export default PublicBlog;
