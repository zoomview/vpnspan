import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import VPNDetail from './pages/VPNDetail'
import About from './pages/About'

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
                </footer>
            </div>
        </Router>
    )
}

export default App
