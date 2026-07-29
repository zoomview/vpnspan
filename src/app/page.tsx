import Link from "next/link";
import { vpns, useCases } from "@/data/vpns";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`full-${i}`} className="h-4 w-4 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {half && (
        <svg className="h-4 w-4 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#44403c" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`empty-${i}`} className="h-4 w-4 text-[#44403c]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#44403c]/60 bg-gradient-to-b from-[#292524] to-[#1a1614]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge badge-amber mb-4">
              Updated for 2026
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#fafaf9] md:text-5xl lg:text-6xl">
              The VPNs That <span className="text-[#f59e0b]">Actually Work</span> in 2026
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#a8a29e] md:text-xl">
              We test speed, streaming support, security, and value — then rank
              them honestly. No fluff, no sponsored picks.
            </p>
          </div>
        </div>
      </section>

      {/* Top VPN Rankings */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-10">
          <h2 className="section-title">Top 5 VPNs for 2026</h2>
          <p className="section-subtitle">
            Ranked by speed, streaming ability, privacy, and overall value.
            Updated as of July 2026.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {vpns.map((vpn, index) => (
            <article
              key={vpn.id}
              className="vpn-card animate-fade-in flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rank badge */}
              <div className="mb-3 flex items-center justify-between">
                <span className="badge badge-amber">#{index + 1}</span>
                <StarRating rating={vpn.rating} />
              </div>

              {/* Logo + Name */}
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="vpn-logo-fallback shrink-0"
                  style={{ backgroundColor: vpn.logoBg }}
                >
                  {vpn.logoText}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-[#fafaf9]">
                    {vpn.name}
                  </h3>
                  <p className="truncate text-xs text-[#a8a29e]">
                    {vpn.tagline}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="mb-4 grid grid-cols-3 gap-2 border-y border-[#44403c]/60 py-3 text-center text-xs">
                <div>
                  <div className="font-semibold text-[#fafaf9]">
                    {vpn.serverCount.toLocaleString()}
                  </div>
                  <div className="text-[#a8a29e]">Servers</div>
                </div>
                <div>
                  <div className="font-semibold text-[#fafaf9]">
                    {vpn.countryCount}
                  </div>
                  <div className="text-[#a8a29e]">Countries</div>
                </div>
                <div>
                  <div className="font-semibold text-[#fafaf9]">
                    {vpn.maxDevices === Infinity ? "∞" : vpn.maxDevices}
                  </div>
                  <div className="text-[#a8a29e]">Devices</div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-3 text-center">
                <span className="text-lg font-bold text-[#f59e0b]">
                  {vpn.price}
                </span>
                <span className="text-xs text-[#a8a29e]">
                  {" "}{vpn.pricePeriod}
                </span>
              </div>

              {/* Best for tags */}
              <div className="mb-4 flex flex-wrap justify-center gap-1.5">
                {vpn.bestFor.map((tag) => (
                  <span key={tag} className="badge badge-gray text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-2">
                <Link
                  href={`/reviews/${vpn.slug}`}
                  className="flex-1 rounded-lg border border-[#44403c] bg-[#3f3a36] px-3 py-2 text-center text-xs font-medium text-[#fafaf9] transition-colors hover:bg-[#57534e]"
                >
                  Read Review
                </Link>
                <a
                  href={vpn.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex-1 rounded-lg bg-[#d97706] px-3 py-2 text-center text-xs font-medium text-white transition-colors hover:bg-[#f59e0b]"
                >
                  Visit Site
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-y border-[#44403c]/60 bg-[#292524]/50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-10">
            <h2 className="section-title">Find the Right VPN for You</h2>
            <p className="section-subtitle">
              Not all VPNs are the same. Pick a use case and see which one comes
              out on top.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {useCases.map((uc) => (
              <Link
                key={uc.slug}
                href={`/use-cases/${uc.slug}`}
                className="vpn-card group flex flex-col items-center text-center"
              >
                <span className="mb-3 text-3xl">{uc.icon}</span>
                <h3 className="text-sm font-bold text-[#fafaf9] group-hover:text-[#f59e0b] transition-colors">
                  {uc.title.replace(/ in 2026$/, "")}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#a8a29e]">
                  {uc.description.split(".")[0]}.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-10">
          <h2 className="section-title">Quick Comparison</h2>
          <p className="section-subtitle">
            Side-by-side overview of the top VPN providers.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#44403c]/60">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#292524]">
                <th className="px-4 py-3 font-semibold text-[#fafaf9]">VPN</th>
                <th className="px-4 py-3 font-semibold text-[#fafaf9]">Rating</th>
                <th className="hidden px-4 py-3 font-semibold text-[#fafaf9] md:table-cell">
                  Price
                </th>
                <th className="hidden px-4 py-3 font-semibold text-[#fafaf9] md:table-cell">
                  Speed
                </th>
                <th className="hidden px-4 py-3 font-semibold text-[#fafaf9] lg:table-cell">
                  Servers
                </th>
                <th className="hidden px-4 py-3 font-semibold text-[#fafaf9] lg:table-cell">
                  Streaming
                </th>
                <th className="px-4 py-3 font-semibold text-[#fafaf9]">Review</th>
              </tr>
            </thead>
            <tbody>
              {vpns.map((vpn) => (
                <tr
                  key={vpn.id}
                  className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white"
                        style={{ backgroundColor: vpn.logoBg }}
                      >
                        {vpn.logoText}
                      </span>
                      <span className="font-medium text-[#fafaf9]">
                        {vpn.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-[#f59e0b]">
                      {vpn.rating}
                    </span>
                    <span className="text-[#a8a29e]">/5</span>
                  </td>
                  <td className="hidden px-4 py-3 text-[#d6d3d1] md:table-cell">
                    {vpn.price}{vpn.pricePeriod}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`inline-block h-2 w-16 rounded-full ${
                          vpn.speedRating >= 4.5
                            ? "bg-[#84cc16]"
                            : vpn.speedRating >= 4
                              ? "bg-[#f59e0b]"
                              : "bg-[#f87171]"
                        }`}
                      />
                      <span className="text-xs text-[#a8a29e]">
                        {vpn.speedRating}/5
                      </span>
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-[#d6d3d1] lg:table-cell">
                    {vpn.serverCount.toLocaleString()}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <span className="text-xs text-[#84cc16]">
                      {vpn.streamingSupport.filter((s) => s.supported).length}/5
                    </span>
                    <span className="text-xs text-[#a8a29e]"> platforms</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/reviews/${vpn.slug}`}
                      className="text-xs font-medium text-[#f59e0b] transition-colors hover:text-[#fbbf24]"
                    >
                      Full Review →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#44403c]/60 bg-[#292524]/30">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center md:py-16">
          <h2 className="section-title">Not Sure Which VPN to Choose?</h2>
          <p className="mt-3 text-[#a8a29e]">
            Start by reading our in-depth reviews. Each one covers speed tests,
            streaming performance, security audits, and real-world usage so you
            can make an informed decision.
          </p>
          <Link
            href="/reviews"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d97706] px-6 py-3 font-medium text-white transition-colors hover:bg-[#f59e0b]"
          >
            Read All Reviews
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
