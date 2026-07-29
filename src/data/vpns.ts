export interface VpnProvider {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  ratingCount: number;
  price: string;
  pricePeriod: string;
  serverCount: number;
  countryCount: number;
  maxDevices: number;
  logoBg: string;
  logoText: string;
  websiteUrl: string;
  bestFor: string[];
  pros: string[];
  cons: string[];
  speedRating: number; // 1-5
  streamingSupport: { name: string; supported: boolean }[];
  securityFeatures: string[];
  description: string;
  slug: string;
}

export const vpns: VpnProvider[] = [
  {
    id: "surfshark",
    name: "Surfshark",
    tagline: "Best value VPN with unlimited devices",
    rating: 4.6,
    ratingCount: 12500,
    price: "$2.49",
    pricePeriod: "/month (2-year plan)",
    serverCount: 3200,
    countryCount: 100,
    maxDevices: Infinity,
    logoBg: "#0f7b4b",
    logoText: "S",
    websiteUrl: "https://surfshark.com",
    bestFor: ["Budget", "Multi-device", "Streaming"],
    pros: [
      "Unlimited simultaneous connections",
      "Very affordable long-term pricing",
      "Great streaming unblocking ability",
      "Clean UI across all platforms",
      "Includes CleanWeb ad blocker",
    ],
    cons: [
      "Some servers can be slow during peak hours",
      "Customer support response time varies",
      "No free tier available",
    ],
    speedRating: 4.5,
    streamingSupport: [
      { name: "Netflix", supported: true },
      { name: "Disney+", supported: true },
      { name: "Amazon Prime", supported: true },
      { name: "BBC iPlayer", supported: true },
      { name: "HBO Max", supported: true },
    ],
    securityFeatures: [
      "AES-256-GCM encryption",
      "WireGuard & OpenVPN protocols",
      "MultiHop (double VPN)",
      "Kill switch",
      "No-logs policy (audited)",
      "CleanWeb ad/malware blocker",
    ],
    description:
      "Surfshark has rapidly become one of the most popular VPNs on the market, and for good reason. It offers an impressive combination of affordability, unlimited device connections, and strong streaming support. Based in the Netherlands, Surfshark has built a reputation for privacy-conscious users who don't want to compromise on speed or content access.",
    slug: "surfshark",
  },
  {
    id: "nordvpn",
    name: "NordVPN",
    tagline: "Industry leader in security and speed",
    rating: 4.7,
    ratingCount: 18900,
    price: "$3.09",
    pricePeriod: "/month (2-year plan)",
    serverCount: 6400,
    countryCount: 111,
    maxDevices: 10,
    logoBg: "#003c6b",
    logoText: "N",
    websiteUrl: "https://nordvpn.com",
    bestFor: ["Security", "Speed", "Server variety"],
    pros: [
      "Massive server network — 6,400+ servers in 111 countries",
      "NordLynx (WireGuard-based) delivers excellent speeds",
      "Double VPN and Onion over VPN for advanced privacy",
      "Strict no-logs policy, independently audited",
      "Threat Protection blocks ads and trackers",
    ],
    cons: [
      "Slightly more expensive than budget competitors",
      "Desktop app can feel feature-heavy",
      "Some advanced features require manual setup",
    ],
    speedRating: 4.8,
    streamingSupport: [
      { name: "Netflix", supported: true },
      { name: "Disney+", supported: true },
      { name: "Amazon Prime", supported: true },
      { name: "BBC iPlayer", supported: true },
      { name: "HBO Max", supported: true },
    ],
    securityFeatures: [
      "AES-256 encryption",
      "NordLynx (WireGuard) protocol",
      "Double VPN (multi-hop)",
      "Onion over VPN",
      "Strict no-logs policy",
      "Kill switch",
    ],
    description:
      "NordVPN is one of the most recognized names in the VPN industry, serving millions of users worldwide. Headquartered in Panama, it operates a vast network of over 6,400 servers across 111 countries — one of the largest in the industry. Its proprietary NordLynx protocol, built on WireGuard, delivers consistently excellent speeds without sacrificing security.",
    slug: "nordvpn",
  },
  {
    id: "expressvpn",
    name: "ExpressVPN",
    tagline: "Premium performance, trusted worldwide",
    rating: 4.5,
    ratingCount: 15700,
    price: "$8.32",
    pricePeriod: "/month (annual plan)",
    serverCount: 3000,
    countryCount: 105,
    maxDevices: 8,
    logoBg: "#e63946",
    logoText: "E",
    websiteUrl: "https://expressvpn.com",
    bestFor: ["Reliability", "Streaming", "Speed"],
    pros: [
      "Consistently fast and reliable connections",
      "Best-in-class streaming unblocking",
      "TrustedServer technology (RAM-only servers)",
      "24/7 live chat support that actually helps",
      "Lightway protocol is fast and open-source",
    ],
    cons: [
      "More expensive than most competitors",
      "Limited to 8 simultaneous connections",
      "No ad blocker built-in",
    ],
    speedRating: 4.6,
    streamingSupport: [
      { name: "Netflix", supported: true },
      { name: "Disney+", supported: true },
      { name: "Amazon Prime", supported: true },
      { name: "BBC iPlayer", supported: true },
      { name: "HBO Max", supported: true },
    ],
    securityFeatures: [
      "AES-256 encryption",
      "Lightway & OpenVPN protocols",
      "TrustedServer (RAM-only servers)",
      "Private DNS on every server",
      "No-logs policy (audited)",
      "Kill switch",
    ],
    description:
      "ExpressVPN is the premium choice in the VPN market, known for its exceptional speed, rock-solid reliability, and superior streaming capabilities. Based in the British Virgin Islands, it operates over 3,000 servers in 105 countries. Its proprietary Lightway protocol offers a modern, fast, and open-source alternative to traditional VPN protocols.",
    slug: "expressvpn",
  },
  {
    id: "protonvpn",
    name: "ProtonVPN",
    tagline: "Privacy-first VPN from the makers of ProtonMail",
    rating: 4.3,
    ratingCount: 8400,
    price: "$4.99",
    pricePeriod: "/month (annual plan)",
    serverCount: 3200,
    countryCount: 71,
    maxDevices: 10,
    logoBg: "#5c6bc0",
    logoText: "P",
    websiteUrl: "https://protonvpn.com",
    bestFor: ["Privacy", "Free tier", "Transparency"],
    pros: [
      "Free tier with no data caps (best in class)",
      "Strong privacy pedigree — based in Switzerland",
      "Open-source apps and publicly audited",
      "Secure Core servers protect against network attacks",
      "Ad blocker (NetShield) included",
    ],
    cons: [
      "Free servers are slower and more crowded",
      "Smaller server network than top competitors",
      "No live chat support on free plan",
    ],
    speedRating: 4.0,
    streamingSupport: [
      { name: "Netflix", supported: false },
      { name: "Disney+", supported: false },
      { name: "Amazon Prime", supported: false },
      { name: "BBC iPlayer", supported: false },
      { name: "HBO Max", supported: false },
    ],
    securityFeatures: [
      "AES-256 encryption",
      "OpenVPN & IKEv2 protocols",
      "Secure Core (defends against network attacks)",
      "Tor over VPN",
      "No-logs policy (Swiss law)",
      "NetShield ad/malware blocker",
    ],
    description:
      "ProtonVPN stands out as the most privacy-focused VPN on this list, built by the same team behind ProtonMail. Based in Switzerland, it benefits from some of the world's strongest privacy laws. Its free tier is genuinely useful — no data caps, no ads, no tracking — making it an excellent entry point for privacy-conscious users.",
    slug: "protonvpn",
  },
  {
    id: "cyberghost",
    name: "CyberGhost",
    tagline: "User-friendly with dedicated streaming servers",
    rating: 4.2,
    ratingCount: 10200,
    price: "$2.19",
    pricePeriod: "/month (2-year plan)",
    serverCount: 11600,
    countryCount: 100,
    maxDevices: 7,
    logoBg: "#f5a623",
    logoText: "C",
    websiteUrl: "https://cyberghost.com",
    bestFor: ["Streaming", "Ease of use", "Budget"],
    pros: [
      "Massive server network — 11,600+ servers",
      "Dedicated streaming profiles for specific platforms",
      "Very affordable long-term pricing",
      "45-day money-back guarantee (longest in industry)",
      "Beginner-friendly apps",
    ],
    cons: [
      "Not as fast as top competitors on distant servers",
      "Based in Romania (EU jurisdiction)",
      "Advanced features require manual configuration",
    ],
    speedRating: 3.8,
    streamingSupport: [
      { name: "Netflix", supported: true },
      { name: "Disney+", supported: true },
      { name: "Amazon Prime", supported: true },
      { name: "BBC iPlayer", supported: true },
      { name: "HBO Max", supported: false },
    ],
    securityFeatures: [
      "AES-256 encryption",
      "WireGuard & OpenVPN protocols",
      "No-logs policy",
      "Kill switch",
      "DNS leak protection",
      "Dedicated streaming profiles",
    ],
    description:
      "CyberGhost is a Romanian-based VPN provider that focuses on user-friendliness and streaming. With over 11,600 servers across 100 countries, it boasts one of the largest server networks in the industry. CyberGhost is particularly popular among streaming enthusiasts, offering dedicated servers optimized for specific platforms like Netflix, Disney+, and BBC iPlayer.",
    slug: "cyberghost",
  },
];

export const useCases = [
  {
    slug: "streaming",
    title: "Best VPNs for Streaming in 2026",
    description:
      "Unblock Netflix, Disney+, BBC iPlayer, and more. We test each VPN's ability to bypass geo-restrictions on major streaming platforms.",
    icon: "🎬",
  },
  {
    slug: "gaming",
    title: "Best VPNs for Gaming in 2026",
    description:
      "Reduce ping, protect against DDoS attacks, and access region-locked games. Low latency is the name of the game.",
    icon: "🎮",
  },
  {
    slug: "privacy",
    title: "Best VPNs for Privacy in 2026",
    description:
      "Which VPNs truly protect your data? We examine logging policies, jurisdiction, and independent audits.",
    icon: "🔒",
  },
  {
    slug: "torrenting",
    title: "Best VPNs for Torrenting in 2026",
    description:
      "Fast P2P speeds, port forwarding, and strict no-logs policies — the essentials for safe torrenting.",
    icon: "⚡",
  },
  {
    slug: "china",
    title: "Best VPNs for China in 2026",
    description:
      "VPNs that reliably work behind the Great Firewall. Obfuscation, stealth protocols, and field-tested performance.",
    icon: "🌏",
  },
];
