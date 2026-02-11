import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Header() {
    return (
        <header style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Logo */}
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textDecoration: 'none',
                    color: 'var(--text-primary)'
                }}>
                    <Activity size={28} color="var(--accent-primary)" />
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        VPN Span
                    </span>
                </Link>

                {/* Navigation */}
                <nav style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--bg-tertiary)'
                            e.target.style.color = 'var(--text-primary)'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent'
                            e.target.style.color = 'var(--text-secondary)'
                        }}>
                        Dashboard
                    </Link>
                    <Link to="/blog" style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--bg-tertiary)'
                            e.target.style.color = 'var(--text-primary)'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent'
                            e.target.style.color = 'var(--text-secondary)'
                        }}>
                        Blog
                    </Link>
                    <Link to="/about" style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--bg-tertiary)'
                            e.target.style.color = 'var(--text-primary)'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent'
                            e.target.style.color = 'var(--text-secondary)'
                        }}>
                        About
                    </Link>
                </nav>
            </div>
        </header>
    )
}
