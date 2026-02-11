import { FileText } from 'lucide-react'

export default function Terms() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <FileText size={40} color="var(--accent-primary)" />
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Terms of Service</h1>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Last updated: February 11, 2026
            </p>

            <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        1. Acceptance of Terms
                    </h2>
                    <p>
                        By accessing and using VPNSpan ("the Service"), you accept and agree to be bound by these Terms of Service.
                        If you do not agree to these terms, please do not use the Service.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        2. Description of Service
                    </h2>
                    <p>
                        VPNSpan provides real-time monitoring and performance data for various VPN services.
                        We test VPN services automatically and display the results on our website. The Service is provided "as is"
                        for informational purposes only.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        3. Use of Service
                    </h2>
                    <p>You agree to use the Service only for lawful purposes. You must not:</p>
                    <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Interfere with or disrupt the Service or servers</li>
                        <li>Use automated tools to scrape or download content excessively</li>
                        <li>Misrepresent your affiliation with any person or entity</li>
                        <li>Violate any applicable laws or regulations</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        4. Disclaimer of Warranties
                    </h2>
                    <p>
                        <strong>The Service is provided "as is" without warranties of any kind, either express or implied.</strong>
                    </p>
                    <p style={{ marginTop: '1rem' }}>We do not warrant that:</p>
                    <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                        <li>The Service will be uninterrupted or error-free</li>
                        <li>VPN performance data will be accurate at all times</li>
                        <li>The Service will meet your specific requirements</li>
                        <li>Any errors or defects will be corrected</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        5. Limitation of Liability
                    </h2>
                    <p>
                        To the maximum extent permitted by law, VPNSpan shall not be liable for any indirect, incidental,
                        special, consequential, or punitive damages, including but not limited to loss of profits, data, or use.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        Our total liability to you for any claims arising from the use of the Service shall not exceed
                        the amount you paid to us (if any) in the past 12 months.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        6. Intellectual Property
                    </h2>
                    <p>
                        All content on VPNSpan, including text, graphics, logos, data compilations, and software,
                        is the property of VPNSpan or its content suppliers and is protected by copyright and other intellectual property laws.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        You may view and use the content for personal, non-commercial purposes only.
                        Any other use requires our prior written permission.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        7. Affiliate Links and Commissions
                    </h2>
                    <p>
                        VPNSpan contains affiliate links to VPN service providers. When you click these links and make a purchase,
                        we may earn a commission at no additional cost to you.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        <strong>Important</strong>: Our affiliate relationships do not influence our testing methodology or the accuracy
                        of our performance data. All VPN services are tested using the same automated procedures.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        8. Third-Party Services
                    </h2>
                    <p>
                        The Service may contain links to third-party websites or services (including VPN providers) that are not owned
                        or controlled by VPNSpan.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        We have no control over and assume no responsibility for the content, privacy policies, or practices of any
                        third-party websites or services. You acknowledge and agree that VPNSpan shall not be liable for any damage
                        or loss caused by your use of third-party services.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        9. Indemnification
                    </h2>
                    <p>
                        You agree to indemnify and hold harmless VPNSpan and its affiliates from any claims, losses, damages, liabilities,
                        and expenses arising from your use of the Service or violation of these Terms.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        10. Changes to Terms
                    </h2>
                    <p>
                        We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated
                        "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the revised Terms.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        11. Termination
                    </h2>
                    <p>
                        We reserve the right to terminate or suspend your access to the Service immediately, without prior notice,
                        for any reason, including but not limited to breach of these Terms.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        12. Governing Law
                    </h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of the United States,
                        without regard to its conflict of law provisions.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        13. Contact Information
                    </h2>
                    <p>
                        If you have questions about these Terms, please contact us:
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
