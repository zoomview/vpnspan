import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — VPNSpan",
  description: "VPNSpan privacy policy. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="section-title mb-8">Privacy Policy</h1>

      <div className="prose-custom space-y-6">
        <p>
          <em>Last updated: July 2026</em>
        </p>

        <h2>Information We Collect</h2>
        <p>
          VPNSpan collects minimal information necessary to operate our website.
          We do not collect, log, or store any VPN connection data, browsing
          activity, or personal communications.
        </p>
        <ul>
          <li>
            <strong>Analytics data:</strong> We use privacy-focused analytics to
            understand which pages are visited. This includes anonymized page
            views, referral sources, and browser type. No personal identifiers
            are stored.
          </li>
          <li>
            <strong>Affiliate links:</strong> When you click an affiliate link
            on our site, the affiliate network may place a cookie to track the
            referral. These cookies are managed by the affiliate network, not by
            VPNSpan.
          </li>
          <li>
            <strong>Contact information:</strong> If you email us at
            contact@vpnspan.com, we retain your email address and message
            history only as long as necessary to respond to your inquiry.
          </li>
        </ul>

        <h2>How We Use Information</h2>
        <ul>
          <li>To improve our website content and user experience</li>
          <li>To track affiliate referrals (solely for commission attribution)</li>
          <li>To respond to inquiries sent via email</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          VPNSpan uses minimal cookies. Affiliate networks may place cookies
          when you click an outbound link to a VPN provider&apos;s website. You can
          control cookie preferences through your browser settings.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services for analytics and affiliate tracking.
          These services have their own privacy policies governing data
          collection and use. We select partners who respect user privacy and
          minimize data collection.
        </p>

        <h2>Affiliate Disclosure</h2>
        <p>
          VPNSpan participates in affiliate marketing programs. When you
          purchase a VPN service through links on our site, we may earn a
          commission at no additional cost to you. This does not influence our
          reviews or rankings.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement reasonable security measures to protect any information
          collected through our website. However, no online service can
          guarantee complete security.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be
          posted on this page with an updated &quot;Last updated&quot; date.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us at{" "}
          <a href="mailto:contact@vpnspan.com">contact@vpnspan.com</a>.
        </p>
      </div>
    </div>
  );
}
