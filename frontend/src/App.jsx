import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import VPNDetail from './pages/VPNDetail'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

function App() {
    return (
        <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/vpn/:id" element={<VPNDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                    </Routes>
                </main>
                <footer style={{
                    padding: '2rem',
                    textAlign: 'center',
                    borderTop: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem'
                }}>
                    <p>VPNSpan © 2026 - Real-time VPN Performance Monitoring</p>
                    <p style={{ marginTop: '0.5rem' }}>
                        Monitoring data updates every 30 minutes
                    </p>
                    <p style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
                        <span>|</span>
                        <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
                        <span>|</span>
                        <a href="mailto:contact@vpnspan.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</a>
                    </p>
                </footer>
            </div>
        </Router>
    )
}

export default App
