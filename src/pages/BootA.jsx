import Spinner from "../components/Spinner";

export default function BootA() {
  return (
    <div style={{ height: "100%", display: "grid", placeItems: "center" , position: "relative" }}>
      <div style={{ textAlign: "center" }}>
        <img
          src="/drift-logo.png"
          alt="Lexi Drift"
          style={{
            width: 92,
            height: 92,
            borderRadius: 22,
            objectFit: "cover",
            margin: "0 auto 18px",
            boxShadow: "0 18px 50px rgba(3,165,216,.22), 0 0 0 1px rgba(255,255,255,.08)",
          }}
        />
        <Spinner label="Setting things up [70%]" />
      </div>

      <div style={{ position: "absolute", bottom: 24, color: "var(--muted)", fontSize: 12 }}>
        Please wait while the process completes.
      </div>
    </div>
  );
}
