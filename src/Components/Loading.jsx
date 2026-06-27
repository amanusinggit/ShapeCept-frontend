// Loader.jsx
export default function Loader({
  size = "md",
  color = "brand", // "brand" | "white" | "mint" | "amber"
  label = "",
}) {
  const sizes = {
    sm: { ring: 20, border: 2 },
    md: { ring: 32, border: 2.5 },
    lg: { ring: 48, border: 3 },
    xl: { ring: 64, border: 3.5 },
  };
  const colors = {
    brand: { track: "rgba(91,106,245,0.15)", arc: "#5B6AF5" },
    white: { track: "rgba(255,255,255,0.2)", arc: "#ffffff" },
    mint: { track: "rgba(45,219,168,0.15)", arc: "#2DDBA8" },
    amber: { track: "rgba(240,168,85,0.15)", arc: "#F0A855" },
  };

  const { ring, border } = sizes[size] ?? sizes.md;
  const { track, arc } = colors[color] ?? colors.brand;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: ring,
          height: ring,
          borderRadius: "50%",
          border: `${border}px solid ${track}`,
          borderTopColor: arc,
          animation: "spin 0.85s linear infinite",
        }}
      />
      {label && (
        <span
          style={{
            fontSize: 13,
            color: "var(--color-text-secondary, #7A7670)",
          }}
        >
          {label}
        </span>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
