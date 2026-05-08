'use client'

/**
 * CoffeeSteam — Realistic animated steam rising from a coffee cup.
 * Uses SVG paths with sinusoidal curves that drift, expand, and fade.
 */
export default function CoffeeSteam() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <svg
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          {/* Fade-out gradient for wisps */}
          <linearGradient id="steamFade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="40%" stopColor="white" stopOpacity="0.25" />
            <stop offset="70%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="steamFade2" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="50%" stopColor="white" stopOpacity="0.12" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="steamFadeWarm" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>

          <filter id="steamBlur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="steamBlurWide">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* ─ Wisp 1: Left curl ─ */}
        <path
          d="M 80 170 Q 75 140, 82 120 Q 90 100, 78 75 Q 68 55, 74 30"
          stroke="url(#steamFade)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#steamBlur)"
          className="animate-wisp1"
        />

        {/* ─ Wisp 2: Center tall ─ */}
        <path
          d="M 100 170 Q 105 145, 97 125 Q 88 105, 100 80 Q 112 55, 105 25"
          stroke="url(#steamFade)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#steamBlur)"
          className="animate-wisp2"
        />

        {/* ─ Wisp 3: Right curl ─ */}
        <path
          d="M 118 170 Q 125 145, 115 120 Q 105 100, 120 75 Q 132 55, 125 30"
          stroke="url(#steamFade)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#steamBlur)"
          className="animate-wisp3"
        />

        {/* ─ Wisp 4: Thin left accent ─ */}
        <path
          d="M 88 170 Q 82 150, 90 130 Q 98 110, 85 85 Q 75 65, 82 40"
          stroke="url(#steamFade2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#steamBlur)"
          className="animate-wisp4"
        />

        {/* ─ Wisp 5: Thin right accent ─ */}
        <path
          d="M 110 170 Q 118 148, 108 128 Q 100 108, 115 85 Q 125 65, 118 40"
          stroke="url(#steamFade2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#steamBlur)"
          className="animate-wisp5"
        />

        {/* ─ Wide diffused cloud 1 ─ */}
        <path
          d="M 85 168 Q 78 140, 88 115 Q 96 95, 82 65"
          stroke="url(#steamFade2)"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#steamBlurWide)"
          className="animate-wisp6"
        />

        {/* ─ Wide diffused cloud 2 ─ */}
        <path
          d="M 112 168 Q 120 138, 108 110 Q 98 88, 115 60"
          stroke="url(#steamFade2)"
          strokeWidth="14"
          strokeLinecap="round"
          filter="url(#steamBlurWide)"
          className="animate-wisp7"
        />

        {/* ─ Golden warm wisp ─ */}
        <path
          d="M 95 170 Q 100 145, 92 120 Q 85 100, 96 72"
          stroke="url(#steamFadeWarm)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#steamBlurWide)"
          className="animate-wisp8"
        />

        {/* ─ Wisp 9: Far left curl ─ */}
        <path
          d="M 65 165 Q 50 135, 70 110 Q 90 85, 60 55 Q 40 35, 50 10"
          stroke="url(#steamFade)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#steamBlur)"
          className="animate-wisp9"
        />

        {/* ─ Wisp 10: Far right curl ─ */}
        <path
          d="M 135 165 Q 150 135, 130 110 Q 110 85, 140 55 Q 160 35, 150 10"
          stroke="url(#steamFade)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#steamBlur)"
          className="animate-wisp10"
        />
      </svg>
    </div>
  )
}
