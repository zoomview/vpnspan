import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Header() {
    return (
        <header style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 2rem',
            boxShadow: 'var(--shadow)'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)',
                    textDecoration: 'none'
                }}>
                    <Activity size={32} color="var(--accent-primary)" />
                    <span>VPN<span style={{ color: 'var(--accent-primary)' }}>Span</span></span>
                </Link>

                <nav style={{
                    display: 'flex',
                    gap: '2rem',
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
