import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — VPNSpan",
  description: "VPNSpan terms of service. Understand the rules and guidelines for using our website.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="section-title mb-8">Terms of Service</h1>

      <div className="prose-custom space-y-6">
        <p>
          <em>Last updated: July 2026</em>
        </p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using VPNSpan, you agree to be bound by these terms
          of service. If you do not agree, please do not use our website.
        </p>

        <h2>Information Accuracy</h2>
        <p>
          VPNSpan provides VPN reviews and comparisons based on our testing and
          research. While we strive for accuracy, VPN services change
          frequently — server counts, pricing, and features may vary. We
          recommend verifying current information on the VPN provider&apos;s
          official website before making a purchase.
        </p>

        <h2>Affiliate Relationships</h2>
        <p>
          VPNSpan participates in affiliate marketing programs. When you click
          on affiliate links and make a purchase, we may earn a commission at no
          extra cost to you. This relationship does not compromise our editorial
          independence. All reviews and rankings are based on our genuine
          assessment.
        </p>

        <h2>No Endorsement</h2>
        <p>
          Our reviews and comparisons are opinions based on testing. We do not
          endorse or guarantee the performance, security, or privacy practices
          of any VPN provider. Users should conduct their own due diligence
          before selecting a VPN service.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on VPNSpan, including text, graphics, logos, and page
          design, is our property unless otherwise noted. You may not reproduce,
          distribute, or modify our content without permission.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          VPNSpan is provided &quot;as is&quot; without any warranties. We are not
          liable for any damages arising from your use of our website or from
          your use of any VPN service referenced on our site.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to update these terms at any time. Continued use
          of the site after changes constitutes acceptance of the new terms.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these terms, contact us at{" "}
          <a href="mailto:contact@vpnspan.com">contact@vpnspan.com</a>.
        </p>
      </div>
    </div>
  );
}
