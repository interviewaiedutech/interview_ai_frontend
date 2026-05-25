import React from "react";

const LoginIllustration = () => (
  <svg
    width="100%"
    viewBox="0 0 525 420"
    xmlns="http://www.w3.org/2000/svg"
    // style={{ maxWidth: 520 }}
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="li-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e1b4b" />
      </linearGradient>
      <linearGradient id="li-screen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e40af" />
        <stop offset="100%" stopColor="#312e81" />
      </linearGradient>
      <linearGradient id="li-face" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="li-shirt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <radialGradient id="li-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
      </radialGradient>
      <filter id="li-blur">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <clipPath id="li-clip">
        <rect x="110" y="80" width="190" height="140" rx="8" />
      </clipPath>
    </defs>

    {/* Background */}
    <rect width="520" height="420" fill="url(#li-bg)" rx="20" />

    {/* Glow aura */}
    <ellipse
      cx="205"
      cy="155"
      rx="120"
      ry="90"
      fill="url(#li-glow)"
      filter="url(#li-blur)"
    >
      <animate
        attributeName="opacity"
        values="0.5;1;0.5"
        dur="3s"
        repeatCount="indefinite"
      />
    </ellipse>

    {/* Decorative grid dots */}
    <circle cx="60" cy="60" r="2" fill="#38bdf8" opacity="0.15" />
    <circle cx="90" cy="60" r="2" fill="#38bdf8" opacity="0.15" />
    <circle cx="60" cy="90" r="2" fill="#38bdf8" opacity="0.15" />
    <circle cx="90" cy="90" r="2" fill="#38bdf8" opacity="0.15" />
    <circle cx="430" cy="300" r="2" fill="#a78bfa" opacity="0.15" />
    <circle cx="460" cy="300" r="2" fill="#a78bfa" opacity="0.15" />
    <circle cx="430" cy="330" r="2" fill="#a78bfa" opacity="0.15" />
    <circle cx="460" cy="330" r="2" fill="#a78bfa" opacity="0.15" />

    {/* Monitor body */}
    <rect
      x="98"
      y="68"
      width="214"
      height="158"
      rx="12"
      fill="#1e293b"
      stroke="#334155"
      strokeWidth="1.5"
    />
    <rect
      x="110"
      y="80"
      width="190"
      height="134"
      rx="6"
      fill="url(#li-screen)"
    />

    {/* Monitor stand */}
    <rect x="188" y="228" width="34" height="18" rx="2" fill="#334155" />
    <rect x="165" y="244" width="80" height="6" rx="3" fill="#475569" />

    {/* Screen content */}
    <g clipPath="url(#li-clip)">
      <rect x="110" y="80" width="190" height="134" fill="#1e3a5f" />

      {/* Scan line */}
      <rect x="110" y="80" width="190" height="3" fill="#38bdf8" opacity="0.5">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,130;0,0"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.2;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>

      {/* AI face circle */}
      <circle
        cx="205"
        cy="147"
        r="38"
        fill="#1e40af"
        stroke="#60a5fa"
        strokeWidth="1.5"
      />

      {/* AI eyes */}
      <circle cx="193" cy="140" r="6" fill="#38bdf8">
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="217" cy="140" r="6" fill="#38bdf8">
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2s"
          begin="0.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="193" cy="140" r="3" fill="white" />
      <circle cx="217" cy="140" r="3" fill="white" />

      {/* AI smile */}
      <path
        d="M196,154 Q205,163 214,154"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* LIVE badge */}
      <rect x="114" y="84" width="36" height="14" rx="3" fill="#ef4444" />
      <text
        x="132"
        y="95"
        textAnchor="middle"
        fontSize="9"
        fontFamily="monospace"
        fill="white"
        fontWeight="700"
      >
        LIVE
      </text>

      {/* AI BOT badge */}
      <rect x="155" y="84" width="40" height="14" rx="3" fill="#00000066" />
      <text
        x="175"
        y="95"
        textAnchor="middle"
        fontSize="9"
        fontFamily="monospace"
        fill="#fbbf24"
      >
        AI BOT
      </text>

      {/* Sound waves */}
      <path
        d="M248,138 Q255,131 248,124"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M254,142 Q265,131 254,120"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M260,146 Q275,131 260,116"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.25"
      />
    </g>

    {/* Screen border glow */}
    <rect
      x="110"
      y="80"
      width="190"
      height="134"
      rx="6"
      fill="none"
      stroke="#60a5fa"
      strokeWidth="1"
      opacity="0.4"
    />

    {/* Desk */}
    <rect x="290" y="255" width="185" height="12" rx="4" fill="#334155" />
    <rect x="280" y="262" width="200" height="6" rx="3" fill="#1e293b" />

    {/* Laptop */}
    <rect
      x="310"
      y="220"
      width="120"
      height="78"
      rx="4"
      fill="#1e293b"
      stroke="#334155"
      strokeWidth="1"
    />
    <rect x="316" y="226" width="108" height="60" rx="2" fill="#0f172a" />
    <text x="322" y="242" fontSize="7" fontFamily="monospace" fill="#4ade80">
      const ans = () =&gt;
    </text>
    <text x="322" y="254" fontSize="7" fontFamily="monospace" fill="#60a5fa">
      {" "}
      "confident";
    </text>
    <rect x="322" y="257" width="6" height="9" rx="1" fill="#fbbf24">
      <animate
        attributeName="opacity"
        values="1;0;1"
        dur="1s"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="295" y="296" width="150" height="5" rx="2" fill="#334155" />

    {/* Chair */}
    <rect
      x="360"
      y="290"
      width="80"
      height="80"
      rx="6"
      fill="#1e293b"
      stroke="#334155"
      strokeWidth="1"
    />
    <rect x="390" y="368" width="8" height="28" rx="4" fill="#334155" />
    <rect x="415" y="368" width="8" height="28" rx="4" fill="#334155" />
    <ellipse cx="410" cy="396" rx="22" ry="6" fill="#0f172a" />

    {/* Person body */}
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 380 290;3 380 290;-2 380 290;0 380 290"
        dur="4s"
        repeatCount="indefinite"
      />
      {/* Torso */}
      <rect
        x="350"
        y="250"
        width="60"
        height="70"
        rx="8"
        fill="url(#li-shirt)"
      />
      {/* Tie */}
      <polygon
        points="380,252 375,285 380,295 385,285"
        fill="#fbbf24"
        opacity="0.9"
      />
      {/* Neck */}
      <rect
        x="372"
        y="238"
        width="16"
        height="18"
        rx="4"
        fill="url(#li-face)"
      />
      {/* Head */}
      <ellipse cx="380" cy="222" rx="28" ry="30" fill="url(#li-face)" />
      {/* Hair */}
      <rect x="352" y="192" width="56" height="18" rx="8" fill="#1e293b" />
      {/* Eyes */}
      <ellipse cx="370" cy="220" rx="5" ry="6" fill="#1e293b" />
      <ellipse cx="390" cy="220" rx="5" ry="6" fill="#1e293b" />
      <circle cx="372" cy="219" r="2" fill="white" />
      <circle cx="392" cy="219" r="2" fill="white" />
      {/* Eyebrows */}
      <path
        d="M364,213 Q370,210 376,213"
        fill="none"
        stroke="#92400e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M384,213 Q390,210 396,213"
        fill="none"
        stroke="#92400e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Nose & mouth */}
      <circle cx="380" cy="228" r="2.5" fill="#d97706" opacity="0.6" />
      <path
        d="M372,236 Q380,244 388,236"
        fill="none"
        stroke="#92400e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Headphone band */}
      <path
        d="M352,213 Q380,190 408,213"
        fill="none"
        stroke="#1e293b"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Headphone cups */}
      <ellipse
        cx="353"
        cy="222"
        rx="8"
        ry="10"
        fill="#334155"
        stroke="#60a5fa"
        strokeWidth="1.5"
      />
      <ellipse
        cx="407"
        cy="222"
        rx="8"
        ry="10"
        fill="#334155"
        stroke="#60a5fa"
        strokeWidth="1.5"
      />
      {/* Arms */}
      <rect
        x="310"
        y="260"
        width="40"
        height="16"
        rx="8"
        fill="url(#li-shirt)"
        transform="rotate(-20,330,268)"
      />
      <rect
        x="390"
        y="258"
        width="40"
        height="16"
        rx="8"
        fill="url(#li-shirt)"
        transform="rotate(15,410,266)"
      />
    </g>

    {/* Floating card: Score */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-8;0,0"
        dur="3.5s"
        repeatCount="indefinite"
      />
      <rect
        x="28"
        y="158"
        width="84"
        height="52"
        rx="8"
        fill="#1e293b"
        stroke="#334155"
        strokeWidth="1"
      />
      <text
        x="70"
        y="178"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#94a3b8"
      >
        Score
      </text>
      <text
        x="70"
        y="200"
        textAnchor="middle"
        fontSize="20"
        fontFamily="sans-serif"
        fill="#4ade80"
        fontWeight="700"
      >
        92%
      </text>
    </g>

    {/* Floating card: Questions */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-6;0,0"
        dur="4s"
        begin="0.5s"
        repeatCount="indefinite"
      />
      <rect
        x="420"
        y="130"
        width="82"
        height="58"
        rx="8"
        fill="#1e293b"
        stroke="#334155"
        strokeWidth="1"
      />
      <text
        x="461"
        y="150"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="#94a3b8"
      >
        Questions
      </text>
      <text
        x="461"
        y="170"
        textAnchor="middle"
        fontSize="16"
        fontFamily="sans-serif"
        fill="#60a5fa"
        fontWeight="700"
      >
        12/15
      </text>
      <text
        x="461"
        y="184"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="#94a3b8"
      >
        answered
      </text>
    </g>

    {/* Floating card: Confidence */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-7;0,0"
        dur="5s"
        begin="1s"
        repeatCount="indefinite"
      />
      <rect
        x="400"
        y="306"
        width="95"
        height="44"
        rx="8"
        fill="#1e293b"
        stroke="#334155"
        strokeWidth="1"
      />
      <text
        x="447"
        y="322"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="#94a3b8"
      >
        Confidence
      </text>
      <rect x="410" y="328" width="70" height="6" rx="3" fill="#334155" />
      <rect x="410" y="328" width="52" height="6" rx="3" fill="#fbbf24" />
      <text
        x="447"
        y="346"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="#fbbf24"
      >
        High
      </text>
    </g>

    {/* Speech bubble */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-6;0,0"
        dur="3s"
        repeatCount="indefinite"
      />
      <rect
        x="300"
        y="150"
        width="110"
        height="38"
        rx="10"
        fill="#1e40af"
        stroke="#60a5fa"
        strokeWidth="1"
      />
      <polygon points="315,188 305,200 328,188" fill="#1e40af" />
      <text
        x="355"
        y="168"
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="sans-serif"
        fill="white"
      >
        "My experience
      </text>
      <text
        x="355"
        y="181"
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="sans-serif"
        fill="#fbbf24"
      >
        with React: 3 yrs"
      </text>
    </g>

    {/* Ripple rings on screen */}
    <circle
      cx="205"
      cy="155"
      r="20"
      fill="none"
      stroke="#38bdf8"
      strokeWidth="1"
    >
      <animate
        attributeName="r"
        values="20;50;20"
        dur="2.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.5;0;0.5"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Bottom label */}
    <rect
      x="160"
      y="382"
      width="200"
      height="24"
      rx="12"
      fill="#1e293b"
      stroke="#334155"
      strokeWidth="1"
    />
    <text
      x="260"
      y="399"
      textAnchor="middle"
      fontSize="11"
      fontFamily="sans-serif"
      fill="#94a3b8"
    >
      AI Mock Interview Session
    </text>
  </svg>
);

export default LoginIllustration;
