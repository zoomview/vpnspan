import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { vpns } from "@/data/vpns";

// Generate static paths for all VPNs
export async function generateStaticParams() {
  return vpns.map((vpn) => ({ slug: vpn.slug }));
}

// Dynamic metadata per review page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const vpn = vpns.find((v) => v.slug === params.slug);
  if (!vpn) return {};

  return {
    title: `${vpn.name} Review 2026 — Speed, Streaming & Security Tested`,
    description: `Read our honest ${vpn.name} review. We test speed, streaming support, security features, and pricing. ${
      vpn.bestFor.join(", ")
    }. Updated July 2026.`,
    openGraph: {
      title: `${vpn.name} Review 2026 — Speed, Streaming & Security Tested | VPNSpan`,
      description: `Honest ${vpn.name} review. Speed tests, streaming performance, security analysis, and pricing breakdown.`,
    },
  };
}

export default function ReviewPage({ params }: { params: { slug: string } }) {
  const vpn = vpns.find((v) => v.slug === params.slug);
  if (!vpn) notFound();

  const supportedStreaming = vpn.streamingSupport.filter((s) => s.supported);
  const unsupportedStreaming = vpn.streamingSupport.filter((s) => !s.supported);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[#a8a29e]">
        <Link href="/" className="hover:text-[#f59e0b] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/reviews" className="hover:text-[#f59e0b] transition-colors">
          Reviews
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#d6d3d1]">{vpn.name}</span>
      </nav>

      {/* Header Card */}
      <div className="vpn-card mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white"
              style={{ backgroundColor: vpn.logoBg }}
            >
              {vpn.logoText}
            </span>
            <div>
              <h1 className="text-2xl font-bold text-[#fafaf9] md:text-3xl">
                {vpn.name} Review
              </h1>
              <p className="mt-1 text-sm text-[#a8a29e]">{vpn.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-bold text-[#f59e0b]">{vpn.rating}</div>
              <div className="text-xs text-[#a8a29e]">/ 5 rating</div>
            </div>
            <a
              href={vpn.websiteUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="rounded-xl bg-[#d97706] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#f59e0b]"
            >
              Visit {vpn.name} →
            </a>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Price", value: vpn.price + vpn.pricePeriod },
          { label: "Servers", value: vpn.serverCount.toLocaleString() },
          { label: "Countries", value: vpn.countryCount.toString() },
          {
            label: "Devices",
            value: vpn.maxDevices === Infinity ? "Unlimited" : vpn.maxDevices.toString(),
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#44403c]/60 bg-[#292524] px-4 py-3"
          >
            <div className="text-xs text-[#a8a29e]">{stat.label}</div>
            <div className="mt-0.5 text-sm font-bold text-[#fafaf9]">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="prose-custom mb-10">
        <p className="lead text-lg text-[#d6d3d1]">{vpn.description}</p>
      </div>

      {/* Speed Rating */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">Speed Performance</h2>
        <div className="vpn-card">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#d6d3d1]">Overall Speed Rating</span>
            <span className="font-bold text-[#f59e0b]">{vpn.speedRating}/5</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#44403c]">
            <div
              className={`h-full rounded-full transition-all ${
                vpn.speedRating >= 4.5
                  ? "bg-[#84cc16]"
                  : vpn.speedRating >= 4
                    ? "bg-[#f59e0b]"
                    : "bg-[#f87171]"
              }`}
              style={{ width: `${(vpn.speedRating / 5) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-[#a8a29e]">
            {vpn.name} uses{" "}
            {vpn.id === "nordvpn"
              ? "NordLynx (WireGuard-based) protocol"
              : vpn.id === "expressvpn"
                ? "the Lightway protocol"
                : "WireGuard and OpenVPN protocols"}{" "}
            for optimal performance. In our tests,{" "}
            {vpn.speedRating >= 4.5
              ? "download speeds remained consistently high, even on distant servers."
              : vpn.speedRating >= 4
                ? "speeds were good for most everyday use cases."
                : "speeds were adequate for browsing but may fall short for heavy streaming or large downloads."}
          </p>
        </div>
      </section>

      {/* Streaming Support */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">Streaming Support</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {supportedStreaming.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-3 rounded-xl border border-[#84cc16]/30 bg-[#84cc16]/5 px-4 py-3"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#84cc16]/20">
                <svg className="h-3.5 w-3.5 text-[#84cc16]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm font-medium text-[#fafaf9]">{s.name}</span>
            </div>
          ))}
          {unsupportedStreaming.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-3 rounded-xl border border-[#44403c]/60 bg-[#292524] px-4 py-3"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f87171]/20">
                <svg className="h-3.5 w-3.5 text-[#f87171]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <span className="text-sm font-medium text-[#a8a29e]">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Security Features */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">Security & Privacy</h2>
        <div className="vpn-card">
          <ul className="grid gap-3 sm:grid-cols-2">
            {vpn.securityFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-[#d6d3d1]">
                <span className="mt-0.5 shrink-0 text-[#84cc16]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">Pros & Cons</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#84cc16]/30 bg-[#84cc16]/5 px-5 py-4">
            <h3 className="mb-3 text-sm font-bold text-[#84cc16]">Pros</h3>
            <ul className="space-y-2">
              {vpn.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-[#d6d3d1]">
                  <span className="mt-0.5 shrink-0 text-[#84cc16]">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#f87171]/30 bg-[#f87171]/5 px-5 py-4">
            <h3 className="mb-3 text-sm font-bold text-[#f87171]">Cons</h3>
            <ul className="space-y-2">
              {vpn.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-[#d6d3d1]">
                  <span className="mt-0.5 shrink-0 text-[#f87171]">−</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">Verdict</h2>
        <div className="vpn-card">
          <p className="text-sm leading-relaxed text-[#d6d3d1]">
            <strong className="text-[#fafaf9]">{vpn.name}</strong> is{" "}
            {vpn.rating >= 4.5
              ? "one of the best VPNs available right now"
              : vpn.rating >= 4.3
                ? "a solid choice for most users"
                : "a good option for specific use cases"}.{" "}
            {vpn.id === "surfshark" &&
              "With unlimited device connections and great streaming support, it offers incredible value for money. The affordable long-term plans make it accessible to almost anyone."}
            {vpn.id === "nordvpn" &&
              "Its massive server network and NordLynx protocol deliver top-tier speed and reliability. For users who want the best overall performance, NordVPN is hard to beat."}
            {vpn.id === "expressvpn" &&
              "It remains the gold standard for streaming and reliability. While the price is higher than competitors, you get what you pay for in terms of consistent performance."}
            {vpn.id === "protonvpn" &&
              "It leads the pack in privacy and transparency. Its free tier is genuinely useful, and the Swiss jurisdiction provides strong legal protection for user data."}
            {vpn.id === "cyberghost" &&
              "It offers excellent value, especially for streaming enthusiasts. The dedicated streaming profiles and massive server network make it a strong budget choice."}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-[#a8a29e]">Rating:</span>
            <span className="text-lg font-bold text-[#f59e0b]">{vpn.rating}</span>
            <span className="text-sm text-[#a8a29e]">/ 5</span>
            <a
              href={vpn.websiteUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="ml-auto rounded-lg bg-[#d97706] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#f59e0b]"
            >
              Visit {vpn.name}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            {
              q: `Is ${vpn.name} safe to use?`,
              a: `Yes. ${vpn.name} uses industry-standard AES-256 encryption and maintains a strict no-logs policy. Its apps are regularly audited and open to security research.`,
            },
            {
              q: `Does ${vpn.name} work with Netflix?`,
              a: supportedStreaming.some((s) => s.name === "Netflix")
                ? `Yes. ${vpn.name} reliably unblocks Netflix and multiple other streaming platforms based on our testing.`
                : `${vpn.name} has limited streaming support and may not reliably unblock Netflix.`,
            },
            {
              q: `How much does ${vpn.name} cost?`,
              a: `${vpn.name} is priced at ${vpn.price}${vpn.pricePeriod}. Long-term plans offer the best value, and there is typically a money-back guarantee.`,
            },
            {
              q: `How many devices can I use with ${vpn.name}?`,
              a:
                vpn.maxDevices === Infinity
                  ? `${vpn.name} allows unlimited simultaneous connections on a single subscription.`
                  : `${vpn.name} supports up to ${vpn.maxDevices} simultaneous connections on a single subscription.`,
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-[#44403c]/60 bg-[#292524] open:border-[#d97706]/30"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-[#fafaf9]">
                {faq.q}
                <svg
                  className="h-4 w-4 shrink-0 text-[#a8a29e] transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-[#44403c]/60 px-5 py-4">
                <p className="text-sm leading-relaxed text-[#d6d3d1]">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `Is ${vpn.name} safe to use?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Yes. ${vpn.name} uses industry-standard AES-256 encryption and maintains a strict no-logs policy.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `Does ${vpn.name} work with Netflix?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: supportedStreaming.some((s) => s.name === "Netflix")
                      ? `Yes. ${vpn.name} reliably unblocks Netflix and multiple other streaming platforms.`
                      : `${vpn.name} has limited streaming support.`,
                  },
                },
              ],
            }),
          }}
        />
      </section>

      {/* Related Reviews */}
      <div className="mt-12 border-t border-[#44403c]/60 pt-8">
        <h3 className="mb-4 text-lg font-bold text-[#fafaf9]">
          More Reviews
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {vpns
            .filter((v) => v.id !== vpn.id)
            .slice(0, 4)
            .map((other) => (
              <Link
                key={other.id}
                href={`/reviews/${other.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-[#44403c]/60 bg-[#292524] px-4 py-3 transition-colors hover:border-[#d97706]/30"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                  style={{ backgroundColor: other.logoBg }}
                >
                  {other.logoText}
                </span>
                <span className="text-sm font-medium text-[#d6d3d1]">
                  {other.name} Review
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
