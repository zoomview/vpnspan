"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/reviews", label: "Reviews" },
  { href: "/compare", label: "Compare" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#44403c]/80 bg-[#1a1614]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d97706] text-sm font-bold text-white">
            V
          </span>
          <span className="text-lg font-bold tracking-tight text-[#fafaf9]">
            VPNSpan
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#d6d3d1] transition-colors hover:bg-[#292524] hover:text-[#fafaf9]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center p-2 text-[#d6d3d1] md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="border-t border-[#44403c]/80 bg-[#292524] px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#d6d3d1] transition-colors hover:bg-[#3f3a36] hover:text-[#fafaf9]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
