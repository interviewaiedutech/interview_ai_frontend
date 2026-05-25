import React from "react";

const HeroIllustration = () => (
  <svg
    width="100%"
    viewBox="0 0 520 400"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: 520 }}
  >
    <defs>
      <linearGradient id="hi-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#120217" />
        <stop offset="100%" stopColor="#0a090a" />
      </linearGradient>
      <radialGradient id="hi-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#6366f1" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
      </radialGradient>
      <filter id="hi-blur">
        <feGaussianBlur stdDeviation="8" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="520" height="400" fill="url(#hi-bg)" rx="20" />

    {/* Grid lines */}
    <g opacity="0.06" stroke="#38bdf8" strokeWidth="0.5">
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((y) => (
        <line key={y} x1="0" y1={y} x2="520" y2={y} />
      ))}
      {[60, 120, 180, 240, 300, 360, 420, 480].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="400" />
      ))}
    </g>

    {/* Central glow */}
    <ellipse
      cx="260"
      cy="196"
      rx="120"
      ry="110"
      fill="url(#hi-core)"
      filter="url(#hi-blur)"
    >
      <animate
        attributeName="opacity"
        values="0.6;1;0.6"
        dur="4s"
        repeatCount="indefinite"
      />
    </ellipse>

    {/* Outer orbit ring 1 */}
    <ellipse
      cx="260"
      cy="196"
      rx="148"
      ry="80"
      fill="none"
      stroke="#38bdf8"
      strokeWidth="0.8"
      strokeDasharray="4,8"
      opacity="0.3"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 260 196;360 260 196"
        dur="18s"
        repeatCount="indefinite"
      />
    </ellipse>

    {/* Orbiting dot on ring 1 */}
    <circle cx="408" cy="196" r="5" fill="#38bdf8">
      <animate
        attributeName="opacity"
        values="0.5;1;0.5"
        dur="2s"
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 260 196;360 260 196"
        dur="18s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Outer orbit ring 2 */}
    <ellipse
      cx="260"
      cy="196"
      rx="110"
      ry="56"
      fill="none"
      stroke="#a78bfa"
      strokeWidth="0.8"
      strokeDasharray="3,10"
      opacity="0.25"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 260 196;-360 260 196"
        dur="24s"
        repeatCount="indefinite"
      />
    </ellipse>

    {/* Orbiting dot on ring 2 */}
    <circle cx="370" cy="196" r="4" fill="#a78bfa">
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 260 196;-360 260 196"
        dur="24s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Connection lines */}
    <line
      x1="260"
      y1="196"
      x2="82"
      y2="196"
      stroke="#38bdf8"
      strokeWidth="0.8"
      strokeDasharray="6,4"
      opacity="0.3"
    />
    <line
      x1="260"
      y1="196"
      x2="438"
      y2="196"
      stroke="#38bdf8"
      strokeWidth="0.8"
      strokeDasharray="6,4"
      opacity="0.3"
    />
    <line
      x1="260"
      y1="196"
      x2="150"
      y2="68"
      stroke="#a78bfa"
      strokeWidth="0.8"
      strokeDasharray="6,4"
      opacity="0.25"
    />
    <line
      x1="260"
      y1="196"
      x2="370"
      y2="68"
      stroke="#a78bfa"
      strokeWidth="0.8"
      strokeDasharray="6,4"
      opacity="0.25"
    />
    <line
      x1="260"
      y1="196"
      x2="150"
      y2="326"
      stroke="#fbbf24"
      strokeWidth="0.8"
      strokeDasharray="6,4"
      opacity="0.2"
    />
    <line
      x1="260"
      y1="196"
      x2="370"
      y2="326"
      stroke="#fbbf24"
      strokeWidth="0.8"
      strokeDasharray="6,4"
      opacity="0.2"
    />

    {/* Central AI Brain */}
    <g>
      <animateTransform
        attributeName="transform"
        type="scale"
        values="1 1;1.04 1.04;1 1"
        dur="3s"
        repeatCount="indefinite"
        additive="sum"
      />
      {/* Dashed outer ring */}
      <circle
        cx="260"
        cy="196"
        r="70"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1"
        strokeDasharray="6,4"
        opacity="0.4"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 260 196;360 260 196"
          dur="20s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Main circle */}
      <circle
        cx="260"
        cy="196"
        r="62"
        fill="#0c1a2e"
        stroke="#1e3a5f"
        strokeWidth="2"
      />
      {/* Hex polygon */}
      <polygon
        points="260,140 307,168 307,224 260,252 213,224 213,168"
        fill="#0a1628"
        stroke="#38bdf8"
        strokeWidth="1.5"
        opacity="0.8"
      />
      {/* Inner glow ring */}
      <circle
        cx="260"
        cy="196"
        r="36"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1"
        opacity="0.6"
      />
      {/* AI face box */}
      <rect
        x="242"
        y="178"
        width="36"
        height="36"
        rx="8"
        fill="#0c1a2e"
        stroke="#38bdf8"
        strokeWidth="1.5"
      />
      {/* AI eyes */}
      <circle cx="253" cy="191" r="5" fill="#38bdf8">
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="5;7;5"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="267" cy="191" r="5" fill="#38bdf8">
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="1.5s"
          begin="0.75s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="5;7;5"
          dur="1.5s"
          begin="0.75s"
          repeatCount="indefinite"
        />
      </circle>
      {/* AI mouth */}
      <rect
        x="249"
        y="202"
        width="20"
        height="4"
        rx="2"
        fill="#38bdf8"
        opacity="0.5"
      />
      <rect x="249" y="202" width="12" height="4" rx="2" fill="#38bdf8" />
      {/* Scan line on AI face */}
      <rect x="242" y="186" width="36" height="2" fill="#38bdf8" opacity="0.5">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,-8;0,8;0,-8"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.1;0.8"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
      {/* Label */}
      <text
        x="260"
        y="226"
        textAnchor="middle"
        fontSize="8"
        fontFamily="monospace"
        fill="#38bdf8"
        fontWeight="700"
      >
        INTERVIEW AI
      </text>
    </g>

    {/* Module 1: Question Bank (left) */}
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
        width="108"
        height="76"
        rx="10"
        fill="#0c1a2e"
        stroke="#1e40af"
        strokeWidth="1.5"
      />
      <text
        x="82"
        y="178"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#60a5fa"
      >
        Question Bank
      </text>
      <rect x="36" y="185" width="92" height="6" rx="3" fill="#1e3a5f" />
      <rect
        x="36"
        y="185"
        width="78"
        height="6"
        rx="3"
        fill="#38bdf8"
        opacity="0.8"
      />
      <rect x="36" y="198" width="92" height="6" rx="3" fill="#1e3a5f" />
      <rect
        x="36"
        y="198"
        width="55"
        height="6"
        rx="3"
        fill="#38bdf8"
        opacity="0.6"
      />
      <rect x="36" y="211" width="92" height="6" rx="3" fill="#1e3a5f" />
      <rect
        x="36"
        y="211"
        width="68"
        height="6"
        rx="3"
        fill="#38bdf8"
        opacity="0.4"
      />
      <text
        x="82"
        y="228"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="#94a3b8"
      >
        500+ Questions
      </text>
    </g>

    {/* Module 2: Live Analytics (right) */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-8;0,0"
        dur="4s"
        begin="0.8s"
        repeatCount="indefinite"
      />
      <rect
        x="385"
        y="155"
        width="108"
        height="82"
        rx="10"
        fill="#0c1a2e"
        stroke="#4ade80"
        strokeWidth="1.5"
      />
      <text
        x="439"
        y="174"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#4ade80"
      >
        Live Score
      </text>
      {/* Animated bars */}
      <g transform="translate(393,178)">
        <rect
          x="0"
          y="20"
          width="12"
          height="8"
          rx="2"
          fill="#4ade80"
          opacity="0.9"
        >
          <animate
            attributeName="height"
            values="8;28;8"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="20;0;20"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="18"
          y="14"
          width="12"
          height="14"
          rx="2"
          fill="#4ade80"
          opacity="0.8"
        >
          <animate
            attributeName="height"
            values="14;36;14"
            dur="1.5s"
            begin="0.3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="14;-8;14"
            dur="1.5s"
            begin="0.3s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="36"
          y="6"
          width="12"
          height="22"
          rx="2"
          fill="#4ade80"
          opacity="0.7"
        >
          <animate
            attributeName="height"
            values="22;10;22"
            dur="1.5s"
            begin="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="6;18;6"
            dur="1.5s"
            begin="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="54"
          y="10"
          width="12"
          height="18"
          rx="2"
          fill="#4ade80"
          opacity="0.8"
        >
          <animate
            attributeName="height"
            values="18;28;18"
            dur="1.5s"
            begin="0.9s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="10;0;10"
            dur="1.5s"
            begin="0.9s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="72"
          y="0"
          width="12"
          height="28"
          rx="2"
          fill="#fbbf24"
          opacity="0.9"
        >
          <animate
            attributeName="height"
            values="28;36;28"
            dur="1.5s"
            begin="1.2s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <text
        x="439"
        y="232"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="#94a3b8"
      >
        Real-time Feedback
      </text>
    </g>

    {/* Module 3: Role Picker (top-left) */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-7;0,0"
        dur="3s"
        begin="0.3s"
        repeatCount="indefinite"
      />
      <rect
        x="90"
        y="34"
        width="120"
        height="68"
        rx="10"
        fill="#0c1a2e"
        stroke="#a78bfa"
        strokeWidth="1.5"
      />
      <text
        x="150"
        y="54"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#c4b5fd"
      >
        Target Role
      </text>
      <rect
        x="100"
        y="62"
        width="100"
        height="14"
        rx="7"
        fill="#1e0a3c"
        stroke="#7c3aed"
        strokeWidth="1"
      />
      <text
        x="150"
        y="73"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="#a78bfa"
      >
        Frontend Dev ▾
      </text>
      <rect
        x="100"
        y="82"
        width="100"
        height="14"
        rx="3"
        fill="#2e1065"
        opacity="0.5"
      />
      <text
        x="150"
        y="93"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="#94a3b8"
      >
        Backend / Full Stack
      </text>
    </g>

    {/* Module 4: Mock Timer (top-right) */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-7;0,0"
        dur="3.8s"
        begin="1s"
        repeatCount="indefinite"
      />
      <rect
        x="310"
        y="30"
        width="120"
        height="72"
        rx="10"
        fill="#0c1a2e"
        stroke="#f97316"
        strokeWidth="1.5"
      />
      <text
        x="370"
        y="50"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#fb923c"
      >
        Mock Timer
      </text>
      <circle
        cx="370"
        cy="74"
        r="20"
        fill="#1c0f00"
        stroke="#f97316"
        strokeWidth="1.5"
      />
      <line
        x1="370"
        y1="74"
        x2="370"
        y2="59"
        stroke="#fb923c"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 370 74;360 370 74"
          dur="10s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="370"
        y1="74"
        x2="381"
        y2="74"
        stroke="#fbbf24"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 370 74;360 370 74"
          dur="60s"
          repeatCount="indefinite"
        />
      </line>
      <circle cx="370" cy="74" r="2" fill="#f97316" />
      <text
        x="370"
        y="102"
        textAnchor="middle"
        fontSize="7"
        fontFamily="monospace"
        fill="#fb923c"
      >
        30:00 min
      </text>
    </g>

    {/* Module 5: Achievement (bottom-left) */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-8;0,0"
        dur="4.5s"
        begin="0.5s"
        repeatCount="indefinite"
      />
      <rect
        x="90"
        y="296"
        width="120"
        height="58"
        rx="10"
        fill="#0c1a2e"
        stroke="#fbbf24"
        strokeWidth="1.5"
      />
      <text
        x="150"
        y="315"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#fde68a"
      >
        Achievement
      </text>
      <circle
        cx="116"
        cy="335"
        r="14"
        fill="#431407"
        stroke="#f97316"
        strokeWidth="1.5"
      />
      <text
        x="116"
        y="340"
        textAnchor="middle"
        fontSize="16"
        fontFamily="sans-serif"
      >
        🏆
      </text>
      <text x="155" y="330" fontSize="8" fontFamily="sans-serif" fill="#94a3b8">
        Interview
      </text>
      <text
        x="155"
        y="342"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#4ade80"
        fontWeight="700"
      >
        Pro Badge
      </text>
      <text x="155" y="353" fontSize="7" fontFamily="sans-serif" fill="#fbbf24">
        +250 XP
      </text>
    </g>

    {/* Module 6: Progress (bottom-right) */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-7;0,0"
        dur="3.2s"
        begin="1.5s"
        repeatCount="indefinite"
      />
      <rect
        x="310"
        y="294"
        width="120"
        height="60"
        rx="10"
        fill="#0c1a2e"
        stroke="#ec4899"
        strokeWidth="1.5"
      />
      <text
        x="370"
        y="313"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#f9a8d4"
      >
        Your Progress
      </text>
      <circle
        cx="350"
        cy="334"
        r="14"
        fill="none"
        stroke="#334155"
        strokeWidth="4"
      />
      <circle
        cx="350"
        cy="334"
        r="14"
        fill="none"
        stroke="#ec4899"
        strokeWidth="4"
        strokeDasharray="70 88"
        strokeLinecap="round"
        transform="rotate(-90,350,334)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-90 350 334;270 350 334;-90 350 334"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x="350"
        y="338"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="white"
        fontWeight="700"
      >
        79%
      </text>
      <text x="388" y="326" fontSize="8" fontFamily="sans-serif" fill="#94a3b8">
        Skill score
      </text>
      <text
        x="388"
        y="340"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#f9a8d4"
        fontWeight="700"
      >
        Advanced
      </text>
      <text x="388" y="352" fontSize="7" fontFamily="sans-serif" fill="#4ade80">
        ↑ 12% this week
      </text>
    </g>

    {/* Floating particles */}
    <circle cx="200" cy="130" r="2.5" fill="#38bdf8" opacity="0.7">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;12,-30;0,0"
        dur="2.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.8;0;0.8"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="310" cy="110" r="2" fill="#a78bfa" opacity="0.6">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;10,-28;0,0"
        dur="3s"
        begin="0.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.7;0;0.7"
        dur="3s"
        begin="0.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="180" cy="270" r="2" fill="#fbbf24" opacity="0.5">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;8,-25;0,0"
        dur="2s"
        begin="1s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.6;0;0.6"
        dur="2s"
        begin="1s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="340" cy="280" r="2.5" fill="#4ade80" opacity="0.6">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;10,-28;0,0"
        dur="2.8s"
        begin="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.7;0;0.7"
        dur="2.8s"
        begin="1.5s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Corner glimmers */}
    <circle cx="34" cy="38" r="3" fill="#38bdf8">
      <animate
        attributeName="opacity"
        values="0.3;1;0.3"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="486" cy="38" r="3" fill="#a78bfa">
      <animate
        attributeName="opacity"
        values="0.3;1;0.3"
        dur="3s"
        begin="1s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="34" cy="362" r="3" fill="#fbbf24">
      <animate
        attributeName="opacity"
        values="0.3;1;0.3"
        dur="2s"
        begin="0.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="486" cy="362" r="3" fill="#4ade80">
      <animate
        attributeName="opacity"
        values="0.3;1;0.3"
        dur="3.5s"
        begin="1.5s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Bottom title bar */}
    <rect
      x="140"
      y="375"
      width="240"
      height="18"
      rx="9"
      fill="#0c1a2e"
      stroke="#1e3a5f"
      strokeWidth="1"
    />
    <text
      x="260"
      y="388"
      textAnchor="middle"
      fontSize="10"
      fontFamily="monospace"
      fill="#38bdf8"
    >
      AI-Powered · Role-Tailored · Real-Time
    </text>
  </svg>
);

export default HeroIllustration;
