/**
 * Ambient depth layer for the hero — a slow-drifting antique-gold glow over a
 * fine film grain. Pure CSS (no JS, no 3D library): the drift is a transform
 * animation that composites on the GPU, and the grain is a static SVG texture.
 * Both are frozen under prefers-reduced-motion (see globals.css).
 */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__glow" />
      <div className="ambient__glow ambient__glow--crimson" />
      <div className="ambient__grain" />
    </div>
  );
}

export default AmbientBackground;
