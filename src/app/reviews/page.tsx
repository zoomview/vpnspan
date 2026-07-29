import type { Metadata } from "next";
import Link from "next/link";
import { vpns } from "@/data/vpns";

export const metadata: Metadata = {
  title: "VPN Reviews — In-Depth Tests & Comparisons",
  description:
    "Read our detailed VPN reviews. We test speed, streaming support, security, and pricing for ExpressVPN, NordVPN, Surfshark, and more.",
  openGraph: {
    title: "VPN Reviews — In-Depth Tests & Comparisons | VPNSpan",
    description:
      "Read our detailed VPN reviews. We test speed, streaming support, security, and pricing.",
  },
};

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-10">
        <h1 className="section-title">All VPN Reviews</h1>
        <p className="section-subtitle">
          Every review is based on hands-on testing. We check speed, streaming
          performance, security features, and pricing — so you know exactly what
          you are getting.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vpns.map((vpn, index) => (
          <Link
            key={vpn.id}
            href={`/reviews/${vpn.slug}`}
            className="vpn-card group animate-fade-in"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white"
                style={{ backgroundColor: vpn.logoBg }}
              >
                {vpn.logoText}
              </span>
              <div>
                <h2 className="text-lg font-bold text-[#fafaf9] group-hover:text-[#f59e0b] transition-colors">
                  {vpn.name} Review
                </h2>
                <p className="text-xs text-[#a8a29e]">{vpn.tagline}</p>
              </div>
            </div>

            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-[#d6d3d1]">
              {vpn.description}
            </p>

            <div className="mb-4 flex items-center gap-2 text-sm">
              <span className="font-semibold text-[#f59e0b]">{vpn.rating}</span>
              <span className="text-[#a8a29e]">/ 5</span>
              <span className="text-[#a8a29e]">·</span>
              <span className="text-[#a8a29e]">{vpn.price}{vpn.pricePeriod}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {vpn.bestFor.map((tag) => (
                <span key={tag} className="badge badge-gray">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
