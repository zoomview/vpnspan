import type { Metadata } from "next";
import Link from "next/link";
import { vpns } from "@/data/vpns";

export const metadata: Metadata = {
  title: "VPN Comparison — Side-by-Side Speed, Price & Features",
  description:
    "Compare the top VPNs side by side. See how Surfshark, NordVPN, ExpressVPN, ProtonVPN, and CyberGhost stack up on speed, price, streaming, and security.",
  openGraph: {
    title: "VPN Comparison — Side-by-Side Speed, Price & Features | VPNSpan",
    description:
      "Compare top VPNs side by side. Speed, price, streaming, and security — all in one table.",
  },
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-10">
        <h1 className="section-title">VPN Comparison</h1>
        <p className="section-subtitle">
          A complete side-by-side comparison of the top VPN providers. Filter by
          speed, price, streaming support, or security features.
        </p>
      </div>

      {/* Feature comparison table */}
      <div className="mb-12 overflow-x-auto rounded-xl border border-[#44403c]/60">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="bg-[#292524]">
              <th className="sticky left-0 z-10 bg-[#292524] px-4 py-3 font-semibold text-[#fafaf9]">
                Feature
              </th>
              {vpns.map((vpn) => (
                <th
                  key={vpn.id}
                  className="px-4 py-3 text-center font-semibold text-[#fafaf9]"
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white"
                      style={{ backgroundColor: vpn.logoBg }}
                    >
                      {vpn.logoText}
                    </span>
                    <span className="text-xs">{vpn.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Rating */}
            <tr className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]/50">
              <td className="sticky left-0 z-10 bg-[#1a1614] px-4 py-3 font-medium text-[#fafaf9]">
                Rating
              </td>
              {vpns.map((vpn) => (
                <td key={vpn.id} className="px-4 py-3 text-center">
                  <span className="font-bold text-[#f59e0b]">{vpn.rating}</span>
                  <span className="text-[#a8a29e]">/5</span>
                </td>
              ))}
            </tr>

            {/* Price */}
            <tr className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]/50">
              <td className="sticky left-0 z-10 bg-[#1a1614] px-4 py-3 font-medium text-[#fafaf9]">
                Starting Price
              </td>
              {vpns.map((vpn) => (
                <td key={vpn.id} className="px-4 py-3 text-center">
                  <span className="font-bold text-[#fafaf9]">{vpn.price}</span>
                  <span className="text-xs text-[#a8a29e]">{vpn.pricePeriod}</span>
                </td>
              ))}
            </tr>

            {/* Servers */}
            <tr className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]/50">
              <td className="sticky left-0 z-10 bg-[#1a1614] px-4 py-3 font-medium text-[#fafaf9]">
                Servers
              </td>
              {vpns.map((vpn) => (
                <td key={vpn.id} className="px-4 py-3 text-center text-[#d6d3d1]">
                  {vpn.serverCount.toLocaleString()}
                </td>
              ))}
            </tr>

            {/* Countries */}
            <tr className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]/50">
              <td className="sticky left-0 z-10 bg-[#1a1614] px-4 py-3 font-medium text-[#fafaf9]">
                Countries
              </td>
              {vpns.map((vpn) => (
                <td key={vpn.id} className="px-4 py-3 text-center text-[#d6d3d1]">
                  {vpn.countryCount}
                </td>
              ))}
            </tr>

            {/* Max Devices */}
            <tr className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]/50">
              <td className="sticky left-0 z-10 bg-[#1a1614] px-4 py-3 font-medium text-[#fafaf9]">
                Max Devices
              </td>
              {vpns.map((vpn) => (
                <td key={vpn.id} className="px-4 py-3 text-center font-medium text-[#d6d3d1]">
                  {vpn.maxDevices === Infinity ? "∞" : vpn.maxDevices}
                </td>
              ))}
            </tr>

            {/* Speed */}
            <tr className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]/50">
              <td className="sticky left-0 z-10 bg-[#1a1614] px-4 py-3 font-medium text-[#fafaf9]">
                Speed Rating
              </td>
              {vpns.map((vpn) => (
                <td key={vpn.id} className="px-4 py-3 text-center">
                  <span className="flex items-center justify-center gap-1.5">
                    <span
                      className={`inline-block h-2.5 w-12 rounded-full ${
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
              ))}
            </tr>

            {/* Streaming */}
            <tr className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]/50">
              <td className="sticky left-0 z-10 bg-[#1a1614] px-4 py-3 font-medium text-[#fafaf9]">
                Streaming
              </td>
              {vpns.map((vpn) => (
                <td key={vpn.id} className="px-4 py-3 text-center">
                  <span className="text-xs text-[#84cc16]">
                    {vpn.streamingSupport.filter((s) => s.supported).length}/5
                  </span>
                  <span className="text-xs text-[#a8a29e]"> platforms</span>
                  <div className="mt-1 flex justify-center gap-1">
                    {vpn.streamingSupport.map((s) => (
                      <span
                        key={s.name}
                        className={`inline-flex h-5 w-5 items-center justify-center rounded text-[9px] font-bold ${
                          s.supported
                            ? "bg-[#84cc16]/20 text-[#84cc16]"
                            : "bg-[#44403c]/50 text-[#a8a29e]"
                        }`}
                        title={`${s.name}: ${s.supported ? "Supported" : "Not supported"}`}
                      >
                        {s.name.charAt(0)}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Best For */}
            <tr className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]/50">
              <td className="sticky left-0 z-10 bg-[#1a1614] px-4 py-3 font-medium text-[#fafaf9]">
                Best For
              </td>
              {vpns.map((vpn) => (
                <td key={vpn.id} className="px-4 py-3 text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    {vpn.bestFor.map((tag) => (
                      <span
                        key={tag}
                        className="badge badge-gray text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Link */}
            <tr className="border-t border-[#44403c]/60 transition-colors hover:bg-[#292524]/50">
              <td className="sticky left-0 z-10 bg-[#1a1614] px-4 py-3 font-medium text-[#fafaf9]">
                Review
              </td>
              {vpns.map((vpn) => (
                <td key={vpn.id} className="px-4 py-3 text-center">
                  <Link
                    href={`/reviews/${vpn.slug}`}
                    className="text-xs font-medium text-[#f59e0b] transition-colors hover:text-[#fbbf24]"
                  >
                    Full Review →
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Price comparison cards */}
      <h2 className="section-title mb-6">Pricing Breakdown</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {vpns.map((vpn) => (
          <div key={vpn.id} className="vpn-card">
            <div className="mb-3 flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: vpn.logoBg }}
              >
                {vpn.logoText}
              </span>
              <span className="font-bold text-[#fafaf9]">{vpn.name}</span>
            </div>
            <div className="mb-3 text-center">
              <span className="text-2xl font-bold text-[#f59e0b]">{vpn.price}</span>
              <span className="text-xs text-[#a8a29e]">{vpn.pricePeriod}</span>
            </div>
            <a
              href={vpn.websiteUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block rounded-lg bg-[#d97706] py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#f59e0b]"
            >
              Visit {vpn.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
