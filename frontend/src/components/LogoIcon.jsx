export default function LogoIcon({ size = 32 }) {
    const scale = size / 32
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <defs>
                <linearGradient id="logoRibbon" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="40%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="logoLine" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>

            {/* Flowing ribbon wave */}
            <path
                d="M 2 22 C 7 22, 8 6, 14 8 C 20 10, 18 26, 24 24 C 27 22, 28 8, 30 6"
                stroke="url(#logoRibbon)"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
            />

            {/* Data monitoring line overlay */}
            <path
                d="M 3 20 L 9 12 L 15 16 L 21 8 L 27 14 L 30 7"
                stroke="url(#logoLine)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
            />

            {/* Key data dots */}
            <circle cx="3" cy="20" r="1.5" fill="url(#logoLine)" />
            <circle cx="15" cy="16" r="1.5" fill="url(#logoLine)" />
            <circle cx="30" cy="7" r="1.5" fill="url(#logoLine)" />
        </svg>
    )
}
