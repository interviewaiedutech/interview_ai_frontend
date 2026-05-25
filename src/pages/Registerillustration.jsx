import React from "react";

const RegisterIllustration = () => (
  <svg
    width="100%"
    viewBox="0 0 520 420"
    xmlns="http://www.w3.org/2000/svg"
    // style={{ maxWidth: 520 }}
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="ri-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0d1117" />
        <stop offset="100%" stopColor="#1a0533" />
      </linearGradient>
      <linearGradient id="ri-skin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#fdba74" />
      </linearGradient>
      <linearGradient id="ri-shirt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#5b21b6" />
      </linearGradient>
      <linearGradient id="ri-rocket" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f9fafb" />
        <stop offset="100%" stopColor="#e5e7eb" />
      </linearGradient>
      <radialGradient id="ri-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
      </radialGradient>
      <filter id="ri-blur">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="520" height="420" fill="url(#ri-bg)" rx="20" />

    {/* Stars */}
    <circle cx="42" cy="50" r="2" fill="white">
      <animate
        attributeName="opacity"
        values="0.2;1;0.2"
        dur="2.1s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="100" cy="30" r="1.5" fill="white">
      <animate
        attributeName="opacity"
        values="0.2;1;0.2"
        dur="3s"
        begin="0.4s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="180" cy="22" r="2" fill="white">
      <animate
        attributeName="opacity"
        values="0.2;1;0.2"
        dur="2.5s"
        begin="0.8s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="330" cy="18" r="1.5" fill="white">
      <animate
        attributeName="opacity"
        values="0.2;1;0.2"
        dur="2s"
        begin="1.2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="440" cy="40" r="2" fill="white">
      <animate
        attributeName="opacity"
        values="0.2;1;0.2"
        dur="3.5s"
        begin="0.2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="480" cy="90" r="1.5" fill="white">
      <animate
        attributeName="opacity"
        values="0.2;1;0.2"
        dur="2.8s"
        begin="0.9s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="60" cy="150" r="1.5" fill="white">
      <animate
        attributeName="opacity"
        values="0.2;1;0.2"
        dur="2.3s"
        begin="1.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="490" cy="200" r="2" fill="white">
      <animate
        attributeName="opacity"
        values="0.2;1;0.2"
        dur="3.2s"
        begin="0.6s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Glow aura */}
    <ellipse
      cx="260"
      cy="210"
      rx="160"
      ry="140"
      fill="url(#ri-glow)"
      filter="url(#ri-blur)"
    >
      <animate
        attributeName="opacity"
        values="0.5;1;0.5"
        dur="4s"
        repeatCount="indefinite"
      />
    </ellipse>

    {/* Roadmap dashed path */}
    <path
      d="M80,340 Q130,280 180,260 Q240,238 300,250 Q360,262 400,220 Q440,180 460,130"
      fill="none"
      stroke="#7c3aed"
      strokeWidth="2"
      strokeDasharray="8,6"
      opacity="0.5"
    >
      <animate
        attributeName="strokeDashoffset"
        values="400;0"
        dur="3s"
        fill="freeze"
        repeatCount="1"
      />
    </path>

    {/* Milestone dots */}
    <circle
      cx="130"
      cy="295"
      r="8"
      fill="#1a0533"
      stroke="#7c3aed"
      strokeWidth="2"
    />
    <circle cx="130" cy="295" r="4" fill="#7c3aed" />

    <circle
      cx="240"
      cy="245"
      r="8"
      fill="#1a0533"
      stroke="#a78bfa"
      strokeWidth="2"
    />
    <circle cx="240" cy="245" r="4" fill="#a78bfa" />

    <circle
      cx="380"
      cy="232"
      r="8"
      fill="#1a0533"
      stroke="#fbbf24"
      strokeWidth="2"
    />
    <circle cx="380" cy="232" r="4" fill="#fbbf24" />

    <circle
      cx="460"
      cy="132"
      r="10"
      fill="#1a0533"
      stroke="#4ade80"
      strokeWidth="2"
    />
    <circle cx="460" cy="132" r="5" fill="#4ade80">
      <animate
        attributeName="opacity"
        values="0.4;1;0.4"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Milestone labels */}
    <rect
      x="100"
      y="310"
      width="62"
      height="18"
      rx="5"
      fill="#1e0a3c"
      stroke="#7c3aed"
      strokeWidth="1"
    />
    <text
      x="131"
      y="323"
      textAnchor="middle"
      fontSize="8"
      fontFamily="sans-serif"
      fill="#a78bfa"
    >
      Register
    </text>

    <rect
      x="210"
      y="258"
      width="60"
      height="18"
      rx="5"
      fill="#1e0a3c"
      stroke="#a78bfa"
      strokeWidth="1"
    />
    <text
      x="240"
      y="271"
      textAnchor="middle"
      fontSize="8"
      fontFamily="sans-serif"
      fill="#c4b5fd"
    >
      Practice
    </text>

    <rect
      x="350"
      y="246"
      width="70"
      height="18"
      rx="5"
      fill="#1e0a3c"
      stroke="#fbbf24"
      strokeWidth="1"
    />
    <text
      x="385"
      y="259"
      textAnchor="middle"
      fontSize="8"
      fontFamily="sans-serif"
      fill="#fde68a"
    >
      Mock Interview
    </text>

    <rect
      x="432"
      y="146"
      width="60"
      height="18"
      rx="5"
      fill="#052e16"
      stroke="#4ade80"
      strokeWidth="1"
    />
    <text
      x="462"
      y="159"
      textAnchor="middle"
      fontSize="8"
      fontFamily="sans-serif"
      fill="#4ade80"
    >
      Dream Job!
    </text>

    {/* Person platform */}
    <ellipse cx="240" cy="360" rx="70" ry="14" fill="#2d1b69" opacity="0.8" />

    {/* Legs */}
    <rect x="222" y="318" width="14" height="42" rx="7" fill="#374151" />
    <rect x="244" y="318" width="14" height="42" rx="7" fill="#374151" />
    {/* Shoes */}
    <ellipse cx="229" cy="362" rx="12" ry="6" fill="#1e293b" />
    <ellipse cx="251" cy="362" rx="12" ry="6" fill="#1e293b" />

    {/* Torso */}
    <rect
      x="210"
      y="256"
      width="60"
      height="68"
      rx="10"
      fill="url(#ri-shirt)"
    />
    {/* Laptop */}
    <rect
      x="216"
      y="290"
      width="48"
      height="34"
      rx="4"
      fill="#111827"
      stroke="#334155"
      strokeWidth="1"
    />
    <rect x="220" y="294" width="40" height="24" rx="2" fill="#0f172a" />
    <rect
      x="220"
      y="294"
      width="40"
      height="24"
      rx="2"
      fill="#7c3aed"
      opacity="0.25"
    />
    <text
      x="240"
      y="306"
      textAnchor="middle"
      fontSize="6"
      fontFamily="monospace"
      fill="#a78bfa"
    >
      InterviewAI
    </text>
    <text
      x="240"
      y="315"
      textAnchor="middle"
      fontSize="6"
      fontFamily="monospace"
      fill="#4ade80"
    >
      Ready ✓
    </text>

    {/* Arms */}
    <rect x="192" y="265" width="22" height="38" rx="9" fill="url(#ri-shirt)" />
    <rect x="266" y="265" width="22" height="38" rx="9" fill="url(#ri-shirt)" />
    {/* Hands */}
    <ellipse cx="203" cy="305" rx="10" ry="8" fill="url(#ri-skin)" />
    <ellipse cx="277" cy="305" rx="10" ry="8" fill="url(#ri-skin)" />

    {/* Neck */}
    <rect x="229" y="244" width="22" height="18" rx="5" fill="url(#ri-skin)" />

    {/* Head */}
    <ellipse cx="240" cy="228" rx="26" ry="28" fill="url(#ri-skin)" />
    {/* Hair */}
    <ellipse cx="240" cy="203" rx="26" ry="10" fill="#92400e" />
    <rect x="214" y="202" width="52" height="12" rx="5" fill="#92400e" />
    {/* Eyes */}
    <ellipse cx="231" cy="222" rx="5" ry="6" fill="#1e293b" />
    <ellipse cx="249" cy="222" rx="5" ry="6" fill="#1e293b" />
    <circle cx="233" cy="220" r="2" fill="white" />
    <circle cx="251" cy="220" r="2" fill="white" />
    {/* Eyebrows raised */}
    <path
      d="M226,214 Q231,210 236,214"
      fill="none"
      stroke="#92400e"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M244,214 Q249,210 254,214"
      fill="none"
      stroke="#92400e"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Smile */}
    <path
      d="M228,236 Q240,248 252,236"
      fill="#fda4af"
      stroke="#9f1239"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Ears */}
    <ellipse cx="214" cy="228" rx="5" ry="8" fill="#fdba74" />
    <ellipse cx="266" cy="228" rx="5" ry="8" fill="#fdba74" />

    {/* Rocket */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;6,-12;0,0"
        dur="2.5s"
        repeatCount="indefinite"
      />
      {/* Rocket body */}
      <ellipse cx="370" cy="120" rx="18" ry="36" fill="url(#ri-rocket)" />
      {/* Nose */}
      <ellipse cx="370" cy="84" rx="18" ry="14" fill="#f87171" />
      {/* Window */}
      <circle
        cx="370"
        cy="115"
        r="9"
        fill="#0ea5e9"
        stroke="#bae6fd"
        strokeWidth="1.5"
      />
      <circle cx="370" cy="115" r="5" fill="#38bdf8" />
      {/* Fins */}
      <polygon points="352,142 344,162 360,148" fill="#f87171" />
      <polygon points="388,142 396,162 380,148" fill="#f87171" />
      {/* Flame */}
      <ellipse cx="370" cy="160" rx="8" ry="14" fill="#fbbf24" opacity="0.85">
        <animate
          attributeName="ry"
          values="14;8;14"
          dur="0.4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.85;0.5;0.85"
          dur="0.4s"
          repeatCount="indefinite"
        />
      </ellipse>
      <ellipse cx="370" cy="166" rx="5" ry="10" fill="#f97316" opacity="0.7">
        <animate
          attributeName="ry"
          values="10;5;10"
          dur="0.4s"
          begin="0.1s"
          repeatCount="indefinite"
        />
      </ellipse>
      <ellipse cx="370" cy="170" rx="3" ry="7" fill="#ef4444" opacity="0.5">
        <animate
          attributeName="ry"
          values="7;3;7"
          dur="0.4s"
          begin="0.2s"
          repeatCount="indefinite"
        />
      </ellipse>
    </g>

    {/* Achievement card */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-8;0,0"
        dur="3s"
        repeatCount="indefinite"
      />
      <rect
        x="28"
        y="218"
        width="80"
        height="46"
        rx="8"
        fill="#0d1117"
        stroke="#7c3aed"
        strokeWidth="1"
      />
      <circle cx="50" cy="241" r="12" fill="#7c3aed" opacity="0.2" />
      <text
        x="50"
        y="246"
        textAnchor="middle"
        fontSize="14"
        fontFamily="sans-serif"
      >
        🏆
      </text>
      <text x="72" y="237" fontSize="8" fontFamily="sans-serif" fill="#94a3b8">
        Interview
      </text>
      <text
        x="72"
        y="249"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#a78bfa"
        fontWeight="700"
      >
        Ready
      </text>
      <text x="72" y="260" fontSize="8" fontFamily="sans-serif" fill="#4ade80">
        ✓ Unlocked
      </text>
    </g>

    {/* Progress ring card */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-7;0,0"
        dur="4s"
        begin="1s"
        repeatCount="indefinite"
      />
      <rect
        x="415"
        y="248"
        width="70"
        height="70"
        rx="10"
        fill="#0d1117"
        stroke="#334155"
        strokeWidth="1"
      />
      <circle
        cx="450"
        cy="283"
        r="24"
        fill="none"
        stroke="#334155"
        strokeWidth="4"
      />
      <circle
        cx="450"
        cy="283"
        r="24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="4"
        strokeDasharray="150 200"
        strokeLinecap="round"
        transform="rotate(-90,450,283)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-90 450 283;270 450 283;-90 450 283"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x="450"
        y="280"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="white"
        fontWeight="700"
      >
        82%
      </text>
      <text
        x="450"
        y="292"
        textAnchor="middle"
        fontSize="7"
        fontFamily="sans-serif"
        fill="#94a3b8"
      >
        Ready
      </text>
    </g>

    {/* Skill chips */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-12;0,0"
        dur="3.5s"
        repeatCount="indefinite"
      />
      <rect
        x="40"
        y="100"
        width="60"
        height="22"
        rx="11"
        fill="#1e3a5f"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <text
        x="70"
        y="115"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#60a5fa"
      >
        React ✓
      </text>
    </g>
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-10;0,0"
        dur="4s"
        begin="0.5s"
        repeatCount="indefinite"
      />
      <rect
        x="116"
        y="82"
        width="54"
        height="22"
        rx="11"
        fill="#1e3a5f"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <text
        x="143"
        y="97"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#60a5fa"
      >
        Node.js
      </text>
    </g>
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,-9;0,0"
        dur="3s"
        begin="1s"
        repeatCount="indefinite"
      />
      <rect
        x="186"
        y="68"
        width="48"
        height="22"
        rx="11"
        fill="#1e0a3c"
        stroke="#a78bfa"
        strokeWidth="1"
      />
      <text
        x="210"
        y="83"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="#c4b5fd"
      >
        Python
      </text>
    </g>

    {/* Bottom label */}
    <rect
      x="145"
      y="385"
      width="230"
      height="24"
      rx="12"
      fill="#1e0a3c"
      stroke="#7c3aed"
      strokeWidth="1"
    />
    <text
      x="260"
      y="402"
      textAnchor="middle"
      fontSize="11"
      fontFamily="sans-serif"
      fill="#a78bfa"
    >
      Your Journey to Dream Job Starts Here
    </text>
  </svg>
);

export default RegisterIllustration;
