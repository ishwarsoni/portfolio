"use client";

interface TechnicalDiagramProps {
  className?: string;
  "aria-label"?: string;
}

export function MotionProcessingDiagram({ className, "aria-label": ariaLabel = "BVH to SMPL-H motion processing pipeline" }: TechnicalDiagramProps) {
  return (
    <figure className={className} aria-label={ariaLabel} role="img">
      <svg
        viewBox="0 0 1000 580"
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
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#80633A" />
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

        <rect width="1000" height="580" fill="url(#grid)" opacity="0.3" />

        {/* Stage headers */}
        <g fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C4A2E">
          <text x="60" y="550" textAnchor="middle">BVH INPUT</text>
          <text x="220" y="550" textAnchor="middle">PARSER</text>
          <text x="380" y="550" textAnchor="middle">JOINT MAP</text>
          <text x="540" y="550" textAnchor="middle">COORD XFORM</text>
          <text x="700" y="550" textAnchor="middle">SMPL-H OUT</text>
          <text x="860" y="550" textAnchor="middle">VALIDATION</text>
        </g>

        {/* Pipeline flow arrows */}
        <g stroke="#80633A" strokeWidth="2" fill="none" markerEnd="url(#arrow)">
          <path d="M150 200 L200 200" />
          <path d="M310 200 L360 200" />
          <path d="M470 200 L520 200" />
          <path d="M630 200 L680 200" />
          <path d="M790 200 L840 200" />
        </g>

        {/* Stage 1: BVH Input */}
        <g transform="translate(40, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="#80633A" strokeWidth="1.5" opacity="0.8" />
          <text x="60" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#E8E1D2">BVH FILE</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Hierarchy</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Channels</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Frames</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Frame Time</text>
        </g>

        {/* Stage 2: Parser */}
        <g transform="translate(200, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="url(#goldGrad)" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#C6A15B">BVH LOADER</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Recursive Parse</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Flatten Hierarchy</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Channel Index</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Frame Matrix</text>
        </g>

        {/* Stage 3: Joint Mapping */}
        <g transform="translate(360, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="#80633A" strokeWidth="1.5" opacity="0.8" />
          <text x="60" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#E8E1D2">JOINT MAP</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">BVH to SMPL-H</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">21 Body Joints</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Missing to Skip</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Extra to Ignore</text>
        </g>

        {/* Stage 4: Coordinate Transform */}
        <g transform="translate(520, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="#A51C30" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#A51C30">COORD XFORM</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">C_bvh2smpl</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">[-1,0,0]</text>
          <text x="60" y="78" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">[0,0,1]</text>
          <text x="60" y="91" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">[0,1,0]</text>
        </g>

        {/* Stage 5: SMPL-H Output */}
        <g transform="translate(680, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="#2D7D46" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#2D7D46">SMPL-H</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">global_orient</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">body_pose (63)</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">transl (meters)</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">betas (16)</text>
        </g>

        {/* Stage 6: Validation */}
        <g transform="translate(840, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="#C6A15B" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#C6A15B">VALIDATE</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">MPJPE</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Vertex Error</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">Floor Align</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">FK Verify</text>
        </g>

        {/* Technical Details Section - Skeletal Hierarchy */}
        <g transform="translate(60, 260)" filter="url(#glow)">
          <text x="0" y="0" fontFamily="JetBrains Mono" fontSize="11" fill="#C6A15B">SKELETAL HIERARCHY (22 JOINTS)</text>
          
          <g stroke="#80633A" strokeWidth="1.5" fill="none">
            <line x1="120" y1="50" x2="120" y2="120" />
            <line x1="120" y1="120" x2="60" y2="170" />
            <line x1="120" y1="120" x2="180" y2="170" />
            <line x1="60" y1="170" x2="40" y2="230" />
            <line x1="180" y1="170" x2="200" y2="230" />
            <line x1="120" y1="50" x2="120" y2="20" />
            <line x1="120" y1="20" x2="80" y2="40" />
            <line x1="120" y1="20" x2="160" y2="40" />
            <line x1="80" y1="40" x2="60" y2="70" />
            <line x1="160" y1="40" x2="180" y2="70" />
          </g>

          <g>
            <circle cx="120" cy="20" r="5" fill="#C6A15B" />
            <circle cx="120" cy="50" r="6" fill="#A51C30" />
            <circle cx="60" cy="120" r="5" fill="#80633A" />
            <circle cx="180" cy="120" r="5" fill="#80633A" />
            <circle cx="40" cy="170" r="4" fill="#85858A" />
            <circle cx="200" cy="170" r="4" fill="#85858A" />
            <circle cx="60" cy="40" r="3" fill="#85858A" />
            <circle cx="180" cy="40" r="3" fill="#85858A" />
            <circle cx="20" cy="230" r="3" fill="#5C4A2E" />
            <circle cx="220" cy="230" r="3" fill="#5C4A2E" />
            <circle cx="50" cy="70" r="2.5" fill="#5C4A2E" />
            <circle cx="190" cy="70" r="2.5" fill="#5C4A2E" />
          </g>

          <g fontFamily="JetBrains Mono" fontSize="7" fill="#85858A">
            <text x="130" y="22">ROOT</text>
            <text x="130" y="52">HIPS</text>
            <text x="10" y="122">L-HIP</text>
            <text x="190" y="122">R-HIP</text>
            <text x="0" y="172">L-KNEE</text>
            <text x="210" y="172">R-KNEE</text>
            <text x="50" y="42">L-SHL</text>
            <text x="180" y="42">R-SHL</text>
            <text x="20" y="72">L-ELB</text>
            <text x="200" y="72">R-ELB</text>
            <text x="-5" y="232">L-ANK</text>
            <text x="215" y="232">R-ANK</text>
          </g>
        </g>

        {/* Coordinate Frame Visualization */}
        <g transform="translate(400, 260)">
          <text x="0" y="0" fontFamily="JetBrains Mono" fontSize="11" fill="#C6A15B">COORDINATE FRAMES</text>
          
          <g strokeWidth="2.5" fill="none" markerEnd="url(#arrow)">
            <line x1="100" y1="80" x2="160" y2="80" stroke="#A51C30" />
            <line x1="100" y1="80" x2="100" y2="20" stroke="#C6A15B" />
            <line x1="100" y1="80" x2="70" y2="110" stroke="#80633A" />
          </g>

          <text x="170" y="78" fontFamily="JetBrains Mono" fontSize="8" fill="#A51C30">X (Right)</text>
          <text x="95" y="10" fontFamily="JetBrains Mono" fontSize="8" fill="#C6A15B">Y (Up)</text>
          <text x="60" y="115" fontFamily="JetBrains Mono" fontSize="8" fill="#80633A">Z (Forward)</text>

          <text x="100" y="140" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#85858A">BVH: Y-Up, Right-Handed, CM</text>
          <text x="100" y="155" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#85858A">SMPL-H: Y-Up, Right-Handed, Meters</text>
        </g>

        {/* Root Fix / Quaternion */}
        <g transform="translate(700, 260)">
          <text x="0" y="0" fontFamily="JetBrains Mono" fontSize="11" fill="#C6A15B">ROOT FIX / ORIENTATION</text>
          
          <circle cx="100" cy="80" r="50" stroke="#1A1A20" strokeWidth="1" fill="none" />
          <circle cx="100" cy="80" r="50" stroke="#80633A" strokeWidth="1" strokeDasharray="8 4" fill="none" />
          
          <line x1="100" y1="80" x2="150" y2="80" stroke="#A51C30" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="100" y1="80" x2="100" y2="30" stroke="#C6A15B" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="100" y1="80" x2="70" y2="110" stroke="#80633A" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="155" y="78" fontFamily="JetBrains Mono" fontSize="7" fill="#A51C30">i</text>
          <text x="95" y="25" fontFamily="JetBrains Mono" fontSize="7" fill="#C6A15B">j</text>
          <text x="60" y="113" fontFamily="JetBrains Mono" fontSize="7" fill="#80633A">k</text>
          
          <text x="100" y="155" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#85858A">AUTO ROOT FIX</text>
          <text x="100" y="170" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#85858A">Frame 0 Inverse Apply All</text>
          <text x="100" y="185" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#85858A">R_root = R_fix @ R_bvh2smpl</text>
        </g>

        {/* Grounding & Stabilization */}
        <g transform="translate(60, 450)">
          <text x="0" y="0" fontFamily="JetBrains Mono" fontSize="11" fill="#C6A15B">POST-PROCESSING</text>
          
          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="280" height="50" rx="4" fill="#0B0C0E" stroke="#80633A" strokeWidth="1" opacity="0.6" />
            <text x="140" y="20" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#C6A15B">GROUNDING</text>
            <text x="140" y="35" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#85858A">Percentile Floor Detection transl[:,1] -= min_y</text>
          </g>

          <g transform="translate(300, 20)">
            <rect x="0" y="0" width="280" height="50" rx="4" fill="#0B0C0E" stroke="#A51C30" strokeWidth="1" opacity="0.6" />
            <text x="140" y="20" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#A51C30">FOOT LOCK</text>
            <text x="140" y="35" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#85858A">Translation-Only Deterministic Stabilization</text>
          </g>

          <g transform="translate(600, 20)">
            <rect x="0" y="0" width="280" height="50" rx="4" fill="#0B0C0E" stroke="#2D7D46" strokeWidth="1" opacity="0.6" />
            <text x="140" y="20" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#2D7D46">SMOOTHING</text>
            <text x="140" y="35" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#85858A">Savitzky-Golay Filter (window=11, poly=3)</text>
          </g>
        </g>

        {/* Export Flow */}
        <g transform="translate(60, 530)">
          <text x="0" y="0" fontFamily="JetBrains Mono" fontSize="11" fill="#5C4A2E">EXPORT FORMATS</text>
          <g fontFamily="JetBrains Mono" fontSize="9" fill="#85858A">
            <text x="0" y="20">NPZ (poses, transl, joint_names, mocap_framerate)</text>
            <text x="0" y="35">BVH (template-based, preserves original header)</text>
            <text x="0" y="50">MP4 (Matplotlib 3D skeleton + ground grid)</text>
          </g>
        </g>

        <g fontFamily="JetBrains Mono" fontSize="8" fill="#5C4A2E">
          <text x="500" y="570" textAnchor="middle" fill="#5C4A2E">Stack: Python NumPy SciPy SMPL-H BVH AMASS Open3D/Trimesh Matplotlib PyBullet</text>
        </g>
      </svg>
    </figure>
  );
}