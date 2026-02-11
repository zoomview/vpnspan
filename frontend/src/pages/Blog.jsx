import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const blogPosts = [
    {
        id: 'how-we-test-vpns',
        title: 'How We Test VPNs: Our Methodology',
        excerpt: 'Learn about our automated testing process that monitors VPN performance 24/7 across multiple servers and locations.',
        date: '2026-02-11',
        readTime: '5 min read',
        author: 'VPNSpan Team',
        category: 'Methodology'
    }
]

export default function Blog() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>VPN Insights & Guides</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Expert analysis, performance reports, and guides to help you choose the best VPN service
                </p>
            </div>

            {/* Blog Posts Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem'
            }}>
                {blogPosts.map(post => (
                    <article key={post.id} style={{
                        background: 'var(--bg-secondary)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}>
                        <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ padding: '2rem' }}>
                                {/* Category */}
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    background: 'var(--accent-primary)',
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    marginBottom: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {post.category}
                                </div>

                                {/* Title */}
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '0.75rem',
                                    color: 'var(--text-primary)',
                                    lineHeight: '1.3'
                                }}>
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    marginBottom: '1.5rem',
                                    lineHeight: '1.6'
                                }}>
                                    {post.excerpt}
                                </p>

                                {/* Meta */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    fontSize: '0.875rem',
                                    color: 'var(--text-muted)',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--border-color)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={16} />
                                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Clock size={16} />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                {/* Read More */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginTop: '1rem',
                                    color: 'var(--accent-primary)',
                                    fontWeight: '500'
                                }}>
                                    <span>Read Article</span>
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            {/* Empty State (when more posts exist) */}
            {blogPosts.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: 'var(--text-secondary)'
                }}>
                    <p style={{ fontSize: '1.2rem' }}>No articles yet. Check back soon!</p>
                </div>
            )}
        </div>
    )
}
