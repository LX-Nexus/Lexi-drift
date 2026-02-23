export default function Spinner({ label }) {
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,.14)",
          borderTopColor: "var(--brand)",
          animation: "spin 1s linear infinite",
        }}
      />
      <div style={{ fontWeight: 600 }}>{label}</div>
      <div style={{ width: 220, height: 6, borderRadius: 999, background: "rgba(255,255,255,.08)" }}>
        <div style={{ width: 120, height: 6, borderRadius: 999, background: "var(--brand)" }} />
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
