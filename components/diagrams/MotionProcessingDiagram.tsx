"use client";

interface TechnicalDiagramProps {
  className?: string;
  "aria-label"?: string;
}

export function MotionProcessingDiagram({ className, "aria-label": ariaLabel = "BVH to SMPL-H motion processing pipeline" }: TechnicalDiagramProps) {
  return (
    <figure className={className} aria-label={ariaLabel} role="img">
      <svg
        viewBox="0 0 1000 480"
        className="w-full h-auto max-w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="#80633A" />
          </linearGradient>
          <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E1725" />
            <stop offset="100%" stopColor="#A51C30" />
          </linearGradient>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 z" fill="#80633A" />
          </marker>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A1A20" strokeWidth="0.5" />
          </pattern>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="480" fill="url(#grid)" opacity="0.3" />

        {/* Pipeline flow arrows */}
        <g stroke="#80633A" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
          <path d="M155 85 L195 85" />
          <path d="M315 85 L355 85" />
          <path d="M475 85 L515 85" />
          <path d="M635 85 L675 85" />
          <path d="M795 85 L835 85" />
        </g>

        {/* Stage 1: BVH Input */}
        <g transform="translate(35, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="#80633A" strokeWidth="1.5" opacity="0.9" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#E8E1D2">01. BVH INPUT</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Hierarchy Node</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">6D Rot Channels</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Frame Matrix</text>
        </g>

        {/* Stage 2: Parser */}
        <g transform="translate(195, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">02. PARSER</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Recursive Parse</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Flatten Joints</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Channel Index</text>
        </g>

        {/* Stage 3: Joint Mapping */}
        <g transform="translate(355, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="#80633A" strokeWidth="1.5" opacity="0.9" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#E8E1D2">03. JOINT MAP</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">BVH to SMPL-H</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">21 Body Joints</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Skip / Remap</text>
        </g>

        {/* Stage 4: Coordinate Transform */}
        <g transform="translate(515, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="#A51C30" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#A51C30">04. COORD XFORM</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">C_bvh2smpl Matrix</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">[-1,0,0; 0,0,1; ...]</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Y-Up Alignment</text>
        </g>

        {/* Stage 5: SMPL-H Output */}
        <g transform="translate(675, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="#2D7D46" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#2D7D46">05. SMPL-H OUT</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">global_orient</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">body_pose (63)</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">transl (meters)</text>
        </g>

        {/* Stage 6: Validation */}
        <g transform="translate(835, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="#C6A15B" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">06. VALIDATION</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">MPJPE Metric</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Vertex Error</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Floor Align</text>
        </g>

        {/* Technical Details Section - Skeletal Hierarchy */}
        <g transform="translate(35, 155)">
          <rect x="0" y="0" width="280" height="160" rx="4" fill="#0B0C0E" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">SKELETAL HIERARCHY (22 JOINTS)</text>
          
          <g transform="translate(20, 20)">
            <g stroke="#80633A" strokeWidth="1.2" fill="none">
              <line x1="120" y1="35" x2="120" y2="75" />
              <line x1="120" y1="75" x2="70" y2="105" />
              <line x1="120" y1="75" x2="170" y2="105" />
              <line x1="120" y1="35" x2="80" y2="20" />
              <line x1="120" y1="35" x2="160" y2="20" />
            </g>

            <g>
              <circle cx="120" cy="20" r="4" fill="#C6A15B" />
              <circle cx="120" cy="35" r="5" fill="#A51C30" />
              <circle cx="120" cy="75" r="4" fill="#80633A" />
              <circle cx="70" cy="105" r="3.5" fill="#85858A" />
              <circle cx="170" cy="105" r="3.5" fill="#85858A" />
              <circle cx="80" cy="20" r="3" fill="#85858A" />
              <circle cx="160" cy="20" r="3" fill="#85858A" />
            </g>

            <g fontFamily="var(--font-mono)" fontSize="7.5" fill="#85858A">
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

        {/* Coordinate Frame Visualization */}
        <g transform="translate(335, 155)">
          <rect x="0" y="0" width="320" height="160" rx="4" fill="#0B0C0E" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">COORDINATE FRAMES</text>
          
          <g transform="translate(40, 20)">
            <g strokeWidth="2" fill="none" markerEnd="url(#arrow)">
              <line x1="80" y1="70" x2="130" y2="70" stroke="#A51C30" />
              <line x1="80" y1="70" x2="80" y2="20" stroke="#C6A15B" />
              <line x1="80" y1="70" x2="55" y2="95" stroke="#80633A" />
            </g>

            <text x="138" y="73" fontFamily="var(--font-mono)" fontSize="8" fill="#A51C30">X (Right)</text>
            <text x="75" y="12" fontFamily="var(--font-mono)" fontSize="8" fill="#C6A15B">Y (Up)</text>
            <text x="40" y="105" fontFamily="var(--font-mono)" fontSize="8" fill="#80633A">Z (Fwd)</text>

            <text x="180" y="45" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">BVH: Y-Up, CM</text>
            <text x="180" y="65" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">SMPL-H: Y-Up, Meters</text>
            <text x="180" y="85" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">Alignment: Exact</text>
          </g>
        </g>

        {/* Root Fix / Quaternion */}
        <g transform="translate(675, 155)">
          <rect x="0" y="0" width="280" height="160" rx="4" fill="#0B0C0E" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">ROOT FIX / ORIENTATION</text>
          
          <g transform="translate(12, 34)">
            <circle cx="50" cy="50" r="35" stroke="#80633A" strokeWidth="1" strokeDasharray="4 3" fill="none" />
            <line x1="50" y1="50" x2="85" y2="50" stroke="#A51C30" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <line x1="50" y1="50" x2="50" y2="15" stroke="#C6A15B" strokeWidth="1.5" markerEnd="url(#arrow)" />
            
            <text x="100" y="35" fontFamily="var(--font-mono)" fontSize="8" fill="#A51C30" fontWeight="600">AUTO ROOT FIX</text>
            <text x="100" y="52" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">Frame 0 Inv Apply</text>
            <text x="100" y="70" fontFamily="var(--font-mono)" fontSize="7.5" fill="#85858A">R_root = R_fix @ R_bvh</text>
          </g>
        </g>

        {/* Grounding & Stabilization Modules */}
        <g transform="translate(35, 330)">
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="280" height="48" rx="4" fill="#0B0C0E" stroke="#80633A" strokeWidth="1" opacity="0.8" />
            <text x="140" y="20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" fill="#C6A15B">GROUNDING</text>
            <text x="140" y="35" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">Percentile Floor Detection</text>
          </g>

          <g transform="translate(300, 0)">
            <rect x="0" y="0" width="320" height="48" rx="4" fill="#0B0C0E" stroke="#A51C30" strokeWidth="1" opacity="0.8" />
            <text x="160" y="20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" fill="#A51C30">FOOT LOCK STABILIZATION</text>
            <text x="160" y="35" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">Translation-Only Deterministic Lock</text>
          </g>

          <g transform="translate(640, 0)">
            <rect x="0" y="0" width="280" height="48" rx="4" fill="#0B0C0E" stroke="#2D7D46" strokeWidth="1" opacity="0.8" />
            <text x="140" y="20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" fill="#2D7D46">SAVITZKY-GOLAY SMOOTHING</text>
            <text x="140" y="35" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">Window = 11, Poly = 3 Filter</text>
          </g>
        </g>

        {/* Bottom Bar: Export Formats & Stack */}
        <g transform="translate(35, 400)">
          <text x="0" y="16" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">
            <tspan fill="#C6A15B" fontWeight="600">EXPORTS: </tspan>
            NPZ (poses, transl, joint_names) · BVH (mocap header) · MP4 (3D skeleton render)
          </text>
          <text x="920" y="16" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#5C4A2E">
            Stack: Python · NumPy · SciPy · SMPL-H · BVH · AMASS · Open3D · Matplotlib
          </text>
        </g>
      </svg>
    </figure>
  );
}

export default MotionProcessingDiagram;