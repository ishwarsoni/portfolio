"use client";

interface TechnicalDiagramProps {
  className?: string;
  "aria-label"?: string;
}

export function MotionProcessingDiagram({
  className = "",
  "aria-label": ariaLabel = "BVH to SMPL-H motion processing pipeline architecture blueprint",
}: TechnicalDiagramProps) {
  return (
    <figure className={`w-full overflow-hidden ${className}`} aria-label={ariaLabel} role="img">
      <svg
        viewBox="0 0 1000 520"
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-[1000px] mx-auto select-none"
        aria-hidden="true"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38cfe8" />
            <stop offset="100%" stopColor="#2a9db5" />
          </linearGradient>
          <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#155e75" />
            <stop offset="100%" stopColor="#8b7cf6" />
          </linearGradient>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 z" fill="#2a9db5" />
          </marker>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#12141d" strokeWidth="0.5" />
          </pattern>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="520" fill="#0b0d13" rx="8" />
        <rect width="1000" height="520" fill="url(#grid)" opacity="0.35" rx="8" />
        <rect width="1000" height="520" fill="none" stroke="#12141d" strokeWidth="1" rx="8" />

        {/* Top Title Bar */}
        <g transform="translate(40, 25)">
          <circle cx="6" cy="6" r="4" fill="#38cfe8" filter="url(#glow)" />
          <text x="18" y="9" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="#38cfe8" letterSpacing="0.08em">
            MOTION PROCESSING PIPELINE · BVH TO SMPL-H KINEMATIC RECONSTRUCTION
          </text>
        </g>

        {/* Pipeline flow arrows */}
        <g stroke="#2a9db5" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
          <path d="M160 95 L200 95" />
          <path d="M320 95 L360 95" />
          <path d="M480 95 L520 95" />
          <path d="M640 95 L680 95" />
          <path d="M800 95 L840 95" />
        </g>

        {/* Stage 1: BVH Input */}
        <g transform="translate(40, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#06070b" stroke="#2a9db5" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#eceef4">01. BVH INPUT</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">Hierarchy Node</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">6D Rot Channels</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">Frame Matrix</text>
        </g>

        {/* Stage 2: Parser */}
        <g transform="translate(200, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#06070b" stroke="url(#cyanGrad)" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#38cfe8">02. PARSER</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">Recursive Parse</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">Flatten Joints</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">Channel Index</text>
        </g>

        {/* Stage 3: Joint Mapping */}
        <g transform="translate(360, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#06070b" stroke="#2a9db5" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#eceef4">03. JOINT MAP</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">BVH to SMPL-H</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">21 Body Joints</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">Skip / Remap</text>
        </g>

        {/* Stage 4: Coordinate Transform */}
        <g transform="translate(520, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#06070b" stroke="#8b7cf6" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#8b7cf6">04. COORD XFORM</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">C_bvh2smpl Matrix</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">[-1,0,0; 0,0,1; ...]</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">Y-Up Alignment</text>
        </g>

        {/* Stage 5: SMPL-H Output */}
        <g transform="translate(680, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#06070b" stroke="#46e3a8" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#46e3a8">05. SMPL-H OUT</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">global_orient</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">body_pose (63)</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">transl (meters)</text>
        </g>

        {/* Stage 6: Validation */}
        <g transform="translate(840, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#06070b" stroke="#38cfe8" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#38cfe8">06. VALIDATION</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">MPJPE Metric</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">Vertex Error</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">Floor Align</text>
        </g>

        {/* Technical Details Section - Skeletal Hierarchy (y = 175) */}
        <g transform="translate(40, 175)">
          <rect x="0" y="0" width="280" height="165" rx="4" fill="#06070b" stroke="#12141d" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#38cfe8">SKELETAL HIERARCHY (22 JOINTS)</text>

          <g transform="translate(20, 20)">
            <g stroke="#2a9db5" strokeWidth="1.2" fill="none">
              <line x1="120" y1="35" x2="120" y2="75" />
              <line x1="120" y1="75" x2="70" y2="105" />
              <line x1="120" y1="75" x2="170" y2="105" />
              <line x1="120" y1="35" x2="80" y2="20" />
              <line x1="120" y1="35" x2="160" y2="20" />
            </g>

            <g>
              <circle cx="120" cy="20" r="4" fill="#38cfe8" />
              <circle cx="120" cy="35" r="5" fill="#8b7cf6" />
              <circle cx="120" cy="75" r="4" fill="#2a9db5" />
              <circle cx="70" cy="105" r="3.5" fill="#9ba0ad" />
              <circle cx="170" cy="105" r="3.5" fill="#9ba0ad" />
              <circle cx="80" cy="20" r="3" fill="#9ba0ad" />
              <circle cx="160" cy="20" r="3" fill="#9ba0ad" />
            </g>

            <g fontFamily="var(--font-mono)" fontSize="7.5" fill="#9ba0ad">
              <text x="128" y="22">ROOT</text>
              <text x="128" y="38">HIPS</text>
              <text x="128" y="78">SPINE</text>
              <text x="35" y="108">L-HIP</text>
              <text x="178" y="108">R-HIP</text>
              <text x="45" y="22">L-SHL</text>
              <text x="168" y="22">R-SHL</text>
            </g>
          </g>
        </g>

        {/* Coordinate Frame Visualization (y = 175) */}
        <g transform="translate(340, 175)">
          <rect x="0" y="0" width="320" height="165" rx="4" fill="#06070b" stroke="#12141d" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#38cfe8">COORDINATE FRAMES</text>

          <g transform="translate(40, 20)">
            <g strokeWidth="2" fill="none" markerEnd="url(#arrow)">
              <line x1="80" y1="70" x2="130" y2="70" stroke="#8b7cf6" />
              <line x1="80" y1="70" x2="80" y2="20" stroke="#38cfe8" />
              <line x1="80" y1="70" x2="55" y2="95" stroke="#2a9db5" />
            </g>

            <text x="138" y="73" fontFamily="var(--font-mono)" fontSize="8" fill="#8b7cf6">X (Right)</text>
            <text x="75" y="12" fontFamily="var(--font-mono)" fontSize="8" fill="#38cfe8">Y (Up)</text>
            <text x="40" y="105" fontFamily="var(--font-mono)" fontSize="8" fill="#2a9db5">Z (Fwd)</text>

            <text x="180" y="45" fontFamily="var(--font-mono)" fontSize="8" fill="#9ba0ad">BVH: Y-Up, CM</text>
            <text x="180" y="65" fontFamily="var(--font-mono)" fontSize="8" fill="#9ba0ad">SMPL-H: Y-Up, Meters</text>
            <text x="180" y="85" fontFamily="var(--font-mono)" fontSize="8" fill="#9ba0ad">Alignment: Exact</text>
          </g>
        </g>

        {/* Root Fix / Quaternion (y = 175) */}
        <g transform="translate(680, 175)">
          <rect x="0" y="0" width="280" height="165" rx="4" fill="#06070b" stroke="#12141d" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#38cfe8">ROOT FIX / ORIENTATION</text>

          <g transform="translate(12, 34)">
            <circle cx="50" cy="50" r="35" stroke="#2a9db5" strokeWidth="1" strokeDasharray="4 3" fill="none" />
            <line x1="50" y1="50" x2="85" y2="50" stroke="#8b7cf6" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <line x1="50" y1="50" x2="50" y2="15" stroke="#38cfe8" strokeWidth="1.5" markerEnd="url(#arrow)" />

            <text x="100" y="35" fontFamily="var(--font-mono)" fontSize="8" fill="#8b7cf6" fontWeight="600">AUTO ROOT FIX</text>
            <text x="100" y="52" fontFamily="var(--font-mono)" fontSize="8" fill="#9ba0ad">Frame 0 Inv Apply</text>
            <text x="100" y="70" fontFamily="var(--font-mono)" fontSize="7.5" fill="#9ba0ad">R_root = R_fix @ R_bvh</text>
          </g>
        </g>

        {/* Grounding & Stabilization Modules (y = 360) */}
        <g transform="translate(40, 360)">
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="280" height="52" rx="4" fill="#06070b" stroke="#2a9db5" strokeWidth="1" />
            <text x="140" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" fill="#38cfe8">GROUNDING</text>
            <text x="140" y="37" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#9ba0ad">Percentile Floor Detection</text>
          </g>

          <g transform="translate(300, 0)">
            <rect x="0" y="0" width="320" height="52" rx="4" fill="#06070b" stroke="#8b7cf6" strokeWidth="1" />
            <text x="160" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" fill="#8b7cf6">FOOT LOCK STABILIZATION</text>
            <text x="160" y="37" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#9ba0ad">Translation-Only Deterministic Lock</text>
          </g>

          <g transform="translate(640, 0)">
            <rect x="0" y="0" width="280" height="52" rx="4" fill="#06070b" stroke="#46e3a8" strokeWidth="1" />
            <text x="140" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" fill="#46e3a8">SAVITZKY-GOLAY SMOOTHING</text>
            <text x="140" y="37" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#9ba0ad">Window = 11, Poly = 3 Filter</text>
          </g>
        </g>

        {/* Bottom Bar: Export Formats & Stack (y = 480) */}
        <g transform="translate(40, 480)">
          <text x="0" y="16" fontFamily="var(--font-mono)" fontSize="8.5" fill="#9ba0ad">
            <tspan fill="#38cfe8" fontWeight="600">EXPORTS: </tspan>
            NPZ (poses, transl, joint_names) · BVH (mocap header) · MP4 (3D skeleton render)
          </text>
          <text x="920" y="16" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#155e75">
            Stack: Python · NumPy · SciPy · SMPL-H · BVH · AMASS · Open3D · Matplotlib
          </text>
        </g>
      </svg>
    </figure>
  );
}

export default MotionProcessingDiagram;