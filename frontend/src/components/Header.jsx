import { Link } from 'react-router-dom'
import LogoIcon from './LogoIcon'

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
                    <LogoIcon size={32} />
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        letterSpacing: '0.5px'
                    }}>
                        <span style={{ color: 'var(--text-primary)' }}>VPN</span>
                        <span style={{
                            background: 'linear-gradient(135deg, #3B82F6, #7C3AED)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Span</span>
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
