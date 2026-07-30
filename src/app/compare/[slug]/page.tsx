import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons } from "@/data/comparisons";
import { vpns } from "@/data/vpns";

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const comp = comparisons.find((c) => c.slug === params.slug);
  if (!comp) return {};

  return {
    title: comp.title,
    description: comp.description,
    openGraph: {
      title: `${comp.title} | VPNSpan`,
      description: comp.description,
    },
  };
}

export default function CompareDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const comp = comparisons.find((c) => c.slug === params.slug);
  if (!comp) notFound();

  const vpnA = vpns.find((v) => v.id === comp.vpnA);
  const vpnB = vpns.find((v) => v.id === comp.vpnB);
  if (!vpnA || !vpnB) notFound();

  const winner =
    comp.winner === "A"
      ? vpnA
      : comp.winner === "B"
        ? vpnB
        : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[#a8a29e]">
        <Link href="/" className="transition-colors hover:text-[#f59e0b]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/compare"
          className="transition-colors hover:text-[#f59e0b]"
        >
          Compare
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#d6d3d1]">
          {vpnA.name} vs {vpnB.name}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#fafaf9] md:text-4xl">
          {vpnA.name} vs {vpnB.name}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-[#a8a29e]">
          {comp.description}
        </p>
      </div>

      {/* VS cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {/* VPN A */}
        <div className="rounded-2xl border border-[#44403c] bg-[#292524] p-5 transition-all hover:border-[#d97706]/30">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white"
              style={{ backgroundColor: vpnA.logoBg }}
            >
              {vpnA.logoText}
            </span>
            <div>
              <h2 className="text-lg font-bold text-[#fafaf9]">{vpnA.name}</h2>
              <p className="text-xs text-[#a8a29e]">{vpnA.tagline}</p>
            </div>
          </div>
          <div className="mb-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#f59e0b]">
              {vpnA.price}
            </span>
            <span className="text-xs text-[#a8a29e]">{vpnA.pricePeriod}</span>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-[#fafaf9]">
              {vpnA.rating}
            </span>
            <span className="text-xs text-[#a8a29e]">/ 5</span>
            <span className="text-xs text-[#a8a29e]">·</span>
            <span className="text-xs text-[#a8a29e]">
              {vpnA.serverCount.toLocaleString()} servers
            </span>
          </div>
          <Link
            href={`/reviews/${vpnA.slug}`}
            className="block rounded-lg border border-[#44403c] py-2 text-center text-sm font-medium text-[#d6d3d1] transition-colors hover:bg-[#3f3a36]"
          >
            Read {vpnA.name} Review
          </Link>
        </div>

        {/* VPN B */}
        <div className="rounded-2xl border border-[#44403c] bg-[#292524] p-5 transition-all hover:border-[#d97706]/30">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white"
              style={{ backgroundColor: vpnB.logoBg }}
            >
              {vpnB.logoText}
            </span>
            <div>
              <h2 className="text-lg font-bold text-[#fafaf9]">{vpnB.name}</h2>
              <p className="text-xs text-[#a8a29e]">{vpnB.tagline}</p>
            </div>
          </div>
          <div className="mb-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#f59e0b]">
              {vpnB.price}
            </span>
            <span className="text-xs text-[#a8a29e]">{vpnB.pricePeriod}</span>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-[#fafaf9]">
              {vpnB.rating}
            </span>
            <span className="text-xs text-[#a8a29e]">/ 5</span>
            <span className="text-xs text-[#a8a29e]">·</span>
            <span className="text-xs text-[#a8a29e]">
              {vpnB.serverCount.toLocaleString()} servers
            </span>
          </div>
          <Link
            href={`/reviews/${vpnB.slug}`}
            className="block rounded-lg border border-[#44403c] py-2 text-center text-sm font-medium text-[#d6d3d1] transition-colors hover:bg-[#3f3a36]"
          >
            Read {vpnB.name} Review
          </Link>
        </div>
      </div>

      {/* Intro */}
      <div className="prose-custom mb-10">
        <p className="text-lg leading-relaxed text-[#d6d3d1]">{comp.intro}</p>
      </div>

      {/* Head-to-head comparison table */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">
          Head-to-Head: {vpnA.name} vs {vpnB.name}
        </h2>
        <div className="overflow-hidden rounded-xl border border-[#44403c]/60">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#292524]">
                <th className="px-4 py-3 font-semibold text-[#a8a29e]">Category</th>
                <th className="px-4 py-3 text-center font-semibold text-[#fafaf9]">
                  {vpnA.name}
                </th>
                <th className="px-4 py-3 text-center font-semibold text-[#fafaf9]">
                  {vpnB.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Rating",
                  aVal: `${vpnA.rating}/5`,
                  bVal: `${vpnB.rating}/5`,
                  winner: vpnA.rating > vpnB.rating ? "A" : vpnB.rating > vpnA.rating ? "B" : "tie",
                },
                {
                  label: "Starting Price",
                  aVal: vpnA.price,
                  bVal: vpnB.price,
                  winner: comp.priceWinner,
                },
                {
                  label: "Servers",
                  aVal: vpnA.serverCount.toLocaleString(),
                  bVal: vpnB.serverCount.toLocaleString(),
                  winner:
                    vpnA.serverCount > vpnB.serverCount ? "A" : "B",
                },
                {
                  label: "Countries",
                  aVal: `${vpnA.countryCount}`,
                  bVal: `${vpnB.countryCount}`,
                  winner:
                    vpnA.countryCount > vpnB.countryCount ? "A" : "B",
                },
                {
                  label: "Max Devices",
                  aVal:
                    vpnA.maxDevices === Infinity
                      ? "Unlimited"
                      : `${vpnA.maxDevices}`,
                  bVal:
                    vpnB.maxDevices === Infinity
                      ? "Unlimited"
                      : `${vpnB.maxDevices}`,
                  winner:
                    vpnA.maxDevices === Infinity
                      ? "A"
                      : vpnB.maxDevices === Infinity
                        ? "B"
                        : vpnA.maxDevices > vpnB.maxDevices
                          ? "A"
                          : "B",
                },
                {
                  label: "Speed",
                  aVal: `${vpnA.speedRating}/5`,
                  bVal: `${vpnB.speedRating}/5`,
                  winner: comp.speedWinner,
                },
                {
                  label: "Streaming",
                  aVal: `${vpnA.streamingSupport.filter((s) => s.supported).length}/5 platforms`,
                  bVal: `${vpnB.streamingSupport.filter((s) => s.supported).length}/5 platforms`,
                  winner: comp.streamingWinner,
                },
                {
                  label: "Privacy",
                  aVal: `${vpnA.securityFeatures.length} features`,
                  bVal: `${vpnB.securityFeatures.length} features`,
                  winner: comp.privacyWinner,
                },
              ].map((row) => (
                <tr
                  key={row.label}
                  className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]"
                >
                  <td className="px-4 py-3 font-medium text-[#fafaf9]">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={
                        row.winner === "A"
                          ? "font-semibold text-[#84cc16]"
                          : "text-[#d6d3d1]"
                      }
                    >
                      {row.aVal}
                    </span>
                    {row.winner === "A" && (
                      <span className="ml-1 text-[10px] text-[#84cc16]">✓</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={
                        row.winner === "B"
                          ? "font-semibold text-[#84cc16]"
                          : "text-[#d6d3d1]"
                      }
                    >
                      {row.bVal}
                    </span>
                    {row.winner === "B" && (
                      <span className="ml-1 text-[10px] text-[#84cc16]">✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Winner callout */}
      {winner && (
        <section className="mb-10 rounded-xl border border-[#d97706]/30 bg-[#d97706]/5 px-6 py-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md bg-[#d97706] px-2 py-0.5 text-xs font-bold text-white">
              WINNER
            </span>
            <span className="text-lg font-bold text-[#fafaf9]">
              {winner.name}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#d6d3d1]">
            {comp.winnerText}
          </p>
        </section>
      )}

      {/* Pros & Cons side by side */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">
          {vpnA.name} vs {vpnB.name}: Pros & Cons
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#84cc16]/30 bg-[#84cc16]/5 px-5 py-4">
            <h3 className="mb-3 text-sm font-bold text-[#84cc16]">
              {vpnA.name} Pros
            </h3>
            <ul className="space-y-2">
              {vpnA.pros.slice(0, 4).map((pro) => (
                <li
                  key={pro}
                  className="flex items-start gap-2 text-sm text-[#d6d3d1]"
                >
                  <span className="mt-0.5 shrink-0 text-[#84cc16]">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#84cc16]/30 bg-[#84cc16]/5 px-5 py-4">
            <h3 className="mb-3 text-sm font-bold text-[#84cc16]">
              {vpnB.name} Pros
            </h3>
            <ul className="space-y-2">
              {vpnB.pros.slice(0, 4).map((pro) => (
                <li
                  key={pro}
                  className="flex items-start gap-2 text-sm text-[#d6d3d1]"
                >
                  <span className="mt-0.5 shrink-0 text-[#84cc16]">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">
          Verdict: Which Is Better?
        </h2>
        <div className="rounded-2xl border border-[#44403c] bg-[#292524] p-6">
          <p className="text-sm leading-relaxed text-[#d6d3d1]">
            {comp.verdict}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-[#fafaf9]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {comp.faqs.map((faq) => (
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
                <p className="text-sm leading-relaxed text-[#d6d3d1]">
                  {faq.a}
                </p>
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
              mainEntity: comp.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      </section>

      {/* Related links */}
      <div className="border-t border-[#44403c]/60 pt-8">
        <h3 className="mb-4 text-lg font-bold text-[#fafaf9]">
          Individual Reviews
        </h3>
        <div className="flex flex-wrap gap-3">
          {[vpnA, vpnB].map((vpn) => (
            <Link
              key={vpn.id}
              href={`/reviews/${vpn.slug}`}
              className="flex items-center gap-2.5 rounded-xl border border-[#44403c]/60 bg-[#292524] px-4 py-3 transition-colors hover:border-[#d97706]/30"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: vpn.logoBg }}
              >
                {vpn.logoText}
              </span>
              <span className="text-sm font-medium text-[#d6d3d1]">
                {vpn.name} Review
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
