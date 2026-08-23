export function Vignette() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none bg-vignette"
      aria-hidden="true"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 20%, transparent 0%, #08090B 100%)",
      }}
    />
  );
}