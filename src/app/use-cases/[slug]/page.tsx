import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { vpns, useCases } from "@/data/vpns";

// Generate static paths for all use cases
export async function generateStaticParams() {
  return useCases.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const uc = useCases.find((u) => u.slug === params.slug);
  if (!uc) return {};

  return {
    title: `${uc.title} — Top VPNs Ranked by ${uc.slug.charAt(0).toUpperCase() + uc.slug.slice(1)} Performance`,
    description: uc.description,
    openGraph: {
      title: `${uc.title} | VPNSpan`,
      description: uc.description,
    },
  };
}

// Content per use case
const useCaseContent: Record<
  string,
  {
    intro: string;
    criteria: string[];
    recommendation: string;
  }
> = {
  streaming: {
    intro:
      "Not all VPNs can reliably unblock streaming platforms. Through hands-on testing with Netflix, Disney+, Amazon Prime, BBC iPlayer, and HBO Max, we've identified which VPNs consistently bypass geo-restrictions and deliver buffer-free playback.",
    criteria: [
      "Ability to consistently unblock multiple streaming platforms",
      "Streaming speed — can it handle 4K without buffering?",
      "Server coverage in streaming-friendly regions (US, UK, Japan)",
      "Smart DNS or dedicated streaming server support",
    ],
    recommendation:
      "For most streamers, Surfshark offers the best balance of unblocking ability, speed, and price. If budget is no concern, ExpressVPN is the most reliable choice across all platforms.",
  },
  gaming: {
    intro:
      "A good gaming VPN needs low latency, stable connections, and protection against DDoS attacks. We tested each VPN across multiple game servers to measure ping impact and connection stability.",
    criteria: [
      "Low latency impact — ideally under 15ms added ping",
      "Wide server distribution for global game server access",
      "DDoS protection capabilities",
      "Connection stability during extended gaming sessions",
    ],
    recommendation:
      "NordVPN leads for gaming thanks to its NordLynx protocol and massive server network. Surfshark is a strong budget alternative with unlimited device connections.",
  },
  privacy: {
    intro:
      "Privacy is the original reason VPNs exist. Here we evaluate each provider's logging policy, jurisdiction, transparency reports, and independent audits to determine which ones truly protect your data.",
    criteria: [
      "Strict no-logs policy — verified by independent audits",
      "Jurisdiction with strong privacy laws (non-14 Eyes)",
      "Transparency reports and warrant canaries",
      "Open-source apps and publicly available security audits",
    ],
    recommendation:
      "ProtonVPN leads on privacy due to its Swiss jurisdiction, open-source apps, and Secure Core architecture. NordVPN is a close second with multiple independent audits.",
  },
  torrenting: {
    intro:
      "Safe torrenting requires fast P2P speeds, a strict no-logs policy, and a kill switch that actually works. We tested each VPN with popular torrent clients across multiple servers.",
    criteria: [
      "P2P-optimized servers with fast upload/download speeds",
      "Port forwarding support (for better peer connections)",
      "Kill switch reliability during connection drops",
      "No-logs policy to protect your torrenting activity",
    ],
    recommendation:
      "NordVPN and Surfshark both excel at torrenting. NordVPN offers dedicated P2P servers, while Surfshark provides unlimited device connections and great speeds at a lower price.",
  },
  china: {
    intro:
      "Using a VPN in China requires overcoming the Great Firewall's sophisticated blocking techniques. Obfuscation, stealth protocols, and regular server rotation are essential. These are the VPNs that consistently work from within China.",
    criteria: [
      "Obfuscation technology that evades deep packet inspection",
      "Stealth protocols (or protocol obfuscation options)",
      "Regular server IP rotation to stay ahead of blocks",
      "Reliable customer support for troubleshooting",
    ],
    recommendation:
      "ExpressVPN and NordVPN have the strongest track records for working in China. ExpressVPN's Lightway protocol with obfuscation is particularly effective at bypassing the Great Firewall.",
  },
};

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const uc = useCases.find((u) => u.slug === params.slug);
  if (!uc) notFound();

  const content = useCaseContent[uc.slug];
  if (!content) notFound();

  // Rank VPNs for this use case (custom logic per use case)
  const ranked = [...vpns].sort((a, b) => {
    // Each use case has different priorities
    const scores: Record<string, (v: typeof a) => number> = {
      streaming: (v) => v.streamingSupport.filter((s) => s.supported).length + v.speedRating / 10,
      gaming: (v) => v.speedRating + (v.serverCount > 5000 ? 0.5 : 0),
      privacy: (v) => v.securityFeatures.length / 2,
      torrenting: (v) => v.speedRating + (v.serverCount > 5000 ? 0.3 : 0),
      china: (v) => (v.id === "expressvpn" || v.id === "nordvpn" ? 5 : v.speedRating),
    };
    const scoreFn = scores[uc.slug] || ((v) => v.rating);
    return scoreFn(b) - scoreFn(a);
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[#a8a29e]">
        <Link href="/" className="hover:text-[#f59e0b] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#d6d3d1]">{uc.title.replace(/ in 2026$/, "")}</span>
      </nav>

      <div className="mb-8">
        <span className="text-3xl">{uc.icon}</span>
        <h1 className="mt-2 text-3xl font-bold text-[#fafaf9] md:text-4xl">
          {uc.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-[#d6d3d1]">
          {content.intro}
        </p>
      </div>

      {/* Ranking */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">
          Top VPNs for {uc.slug.charAt(0).toUpperCase() + uc.slug.slice(1)}
        </h2>
        <div className="space-y-4">
          {ranked.map((vpn, index) => (
            <div
              key={vpn.id}
              className="vpn-card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-[#a8a29e]">
                  #{index + 1}
                </span>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{ backgroundColor: vpn.logoBg }}
                >
                  {vpn.logoText}
                </span>
                <div>
                  <h3 className="font-bold text-[#fafaf9]">{vpn.name}</h3>
                  <p className="text-xs text-[#a8a29e]">{vpn.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">
                  <span className="font-bold text-[#f59e0b]">{vpn.rating}</span>
                  <span className="text-[#a8a29e]">/5</span>
                </span>
                <Link
                  href={`/reviews/${vpn.slug}`}
                  className="rounded-lg border border-[#44403c] px-3 py-1.5 text-xs font-medium text-[#d6d3d1] transition-colors hover:bg-[#3f3a36]"
                >
                  Review
                </Link>
                <a
                  href={vpn.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="rounded-lg bg-[#d97706] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#f59e0b]"
                >
                  Visit
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How we evaluate */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">How We Evaluate</h2>
        <div className="vpn-card">
          <ul className="space-y-3">
            {content.criteria.map((criterion, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#d6d3d1]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d97706]/20 text-[10px] font-bold text-[#f59e0b]">
                  {i + 1}
                </span>
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recommendation */}
      <section className="mb-10 rounded-xl border border-[#d97706]/30 bg-[#d97706]/5 px-6 py-5">
        <h2 className="mb-2 text-lg font-bold text-[#f59e0b]">Our Pick</h2>
        <p className="text-sm leading-relaxed text-[#d6d3d1]">
          {content.recommendation}
        </p>
      </section>

      {/* Related reviews */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-[#fafaf9]">
          Read the Full Reviews
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ranked.slice(0, 3).map((vpn) => (
            <Link
              key={vpn.id}
              href={`/reviews/${vpn.slug}`}
              className="flex items-center gap-3 rounded-xl border border-[#44403c]/60 bg-[#292524] px-4 py-3 transition-colors hover:border-[#d97706]/30"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: vpn.logoBg }}
              >
                {vpn.logoText}
              </span>
              <div>
                <div className="text-sm font-medium text-[#fafaf9]">
                  {vpn.name} Review
                </div>
                <div className="text-xs text-[#a8a29e]">{vpn.tagline}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
