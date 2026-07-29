import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#44403c]/60 bg-[#292524]">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d97706] text-xs font-bold text-white">
                V
              </span>
              <span className="text-base font-bold text-[#fafaf9]">
                VPNSpan
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#a8a29e]">
              Independent VPN reviews and comparisons. We test, compare, and
              rank the top VPN services so you can find the one that actually
              works for you.
            </p>
          </div>

          {/* Reviews */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[#fafaf9]">
              Reviews
            </h4>
            <ul className="space-y-2">
              {[
                "Surfshark",
                "NordVPN",
                "ExpressVPN",
                "ProtonVPN",
                "CyberGhost",
              ].map((name) => (
                <li key={name}>
                  <Link
                    href={`/reviews/${name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-[#a8a29e] transition-colors hover:text-[#f59e0b]"
                  >
                    {name} Review
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[#fafaf9]">
              Compare
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/compare"
                  className="text-sm text-[#a8a29e] transition-colors hover:text-[#f59e0b]"
                >
                  Full Comparison
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-sm text-[#a8a29e] transition-colors hover:text-[#f59e0b]"
                >
                  All Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[#fafaf9]">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[#a8a29e] transition-colors hover:text-[#f59e0b]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[#a8a29e] transition-colors hover:text-[#f59e0b]"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-sm text-[#a8a29e]">
                  Contact:{" "}
                  <a
                    href="mailto:contact@vpnspan.com"
                    className="text-[#f59e0b] hover:text-[#fbbf24]"
                  >
                    contact@vpnspan.com
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#44403c]/60 pt-6">
          <p className="text-center text-xs text-[#a8a29e]">
            &copy; {new Date().getFullYear()} VPNSpan. All rights reserved.
          </p>
          <p className="mt-2 text-center text-xs text-[#a8a29e]/70">
            This site contains affiliate links. We may earn a commission if you
            purchase through these links, at no additional cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
