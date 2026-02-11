import { Shield } from 'lucide-react'

export default function Privacy() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Shield size={40} color="var(--accent-primary)" />
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Privacy Policy</h1>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Last updated: February 11, 2026
            </p>

            <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        1. Information We Collect
                    </h2>
                    <p>
                        VPNSpan collects minimal information to provide our VPN monitoring service:
                    </p>
                    <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                        <li><strong>Analytics Data</strong>: We use Google Analytics to collect anonymous usage statistics including page views, session duration, and traffic sources.</li>
                        <li><strong>Technical Data</strong>: Server logs may contain IP addresses, browser type, and referring pages for security and performance purposes.</li>
                        <li><strong>Contact Information</strong>: If you contact us via email, we store your email address and message content.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        2. How We Use Information
                    </h2>
                    <p>We use collected information to:</p>
                    <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                        <li>Improve our VPN monitoring service and user experience</li>
                        <li>Analyze website traffic and usage patterns</li>
                        <li>Respond to user inquiries and support requests</li>
                        <li>Ensure website security and prevent abuse</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        3. Cookies and Tracking
                    </h2>
                    <p>
                        We use cookies and similar tracking technologies for analytics purposes:
                    </p>
                    <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                        <li><strong>Google Analytics</strong>: Uses cookies to track anonymous user behavior and generate usage reports.</li>
                        <li><strong>Essential Cookies</strong>: Required for basic website functionality.</li>
                    </ul>
                    <p style={{ marginTop: '1rem' }}>
                        You can disable cookies in your browser settings, though this may affect website functionality.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        4. Third-Party Services
                    </h2>
                    <p>We use the following third-party services:</p>
                    <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                        <li><strong>Google Analytics</strong>: For website analytics (<a href="https://policies.google.com/privacy" style={{ color: 'var(--accent-primary)' }}>Privacy Policy</a>)</li>
                        <li><strong>Cloudflare</strong>: For DNS and CDN services (<a href="https://www.cloudflare.com/privacypolicy/" style={{ color: 'var(--accent-primary)' }}>Privacy Policy</a>)</li>
                        <li><strong>Digital Ocean</strong>: For hosting services (<a href="https://www.digitalocean.com/legal/privacy-policy" style={{ color: 'var(--accent-primary)' }}>Privacy Policy</a>)</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        5. Affiliate Links
                    </h2>
                    <p>
                        VPNSpan contains affiliate links to VPN services. When you click these links and make a purchase,
                        we may earn a commission. This does not affect the price you pay or the information we collect about you.
                        Our affiliate partnerships do not influence our VPN testing methodology or results.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        6. Data Security
                    </h2>
                    <p>
                        We implement industry-standard security measures to protect your data:
                    </p>
                    <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                        <li>HTTPS encryption for all data transmission</li>
                        <li>Secure server infrastructure with regular updates</li>
                        <li>Limited data retention (logs kept for 30 days maximum)</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        7. Your Rights (GDPR Compliance)
                    </h2>
                    <p>If you are in the European Union, you have the following rights:</p>
                    <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                        <li><strong>Access</strong>: Request a copy of your personal data</li>
                        <li><strong>Rectification</strong>: Request correction of inaccurate data</li>
                        <li><strong>Erasure</strong>: Request deletion of your personal data</li>
                        <li><strong>Objection</strong>: Object to processing of your data</li>
                        <li><strong>Portability</strong>: Request transfer of your data</li>
                    </ul>
                    <p style={{ marginTop: '1rem' }}>
                        To exercise these rights, contact us at <a href="mailto:contact@vpnspan.com" style={{ color: 'var(--accent-primary)' }}>contact@vpnspan.com</a>
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        8. Children's Privacy
                    </h2>
                    <p>
                        VPNSpan is not intended for children under 13 years of age. We do not knowingly collect
                        personal information from children. If you believe we have collected information from a child,
                        please contact us immediately.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        9. Changes to This Policy
                    </h2>
                    <p>
                        We may update this Privacy Policy from time to time. Changes will be posted on this page
                        with an updated "Last updated" date. Continued use of our service after changes constitutes
                        acceptance of the revised policy.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        10. Contact Us
                    </h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us:
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        Email: <a href="mailto:contact@vpnspan.com" style={{ color: 'var(--accent-primary)' }}>contact@vpnspan.com</a><br />
                        Website: <a href="https://vpnspan.com" style={{ color: 'var(--accent-primary)' }}>https://vpnspan.com</a>
                    </p>
                </section>
            </div>
        </div>
    )
}
