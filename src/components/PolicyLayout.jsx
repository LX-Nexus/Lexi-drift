import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PolicyLayout({
  title,
  meta,
  backTo = "/app/settings",
  children,
}) {
  const nav = useNavigate();

  return (
    <div style={{ height: "100%", padding: 24, display: "grid", placeItems: "center" }}>
      <div
        style={{
          width: "min(920px, 100%)",
          height: "min(760px, 100%)",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,.08)",
          background: "rgba(0,0,0,.18)",
          boxShadow: "0 18px 60px rgba(0,0,0,.5)",
          overflow: "hidden",
        }}
      >
       
        <div
          style={{
            height: 86,
            display: "grid",
            gridTemplateColumns: "72px 1fr 72px",
            alignItems: "center",
            padding: "0 18px",
            borderBottom: "1px solid rgba(255,255,255,.07)",
            background: "linear-gradient(180deg, rgba(255,255,255,.03), transparent)",
          }}
        >
          <button
            type="button"
            onClick={() => nav(backTo)}
            aria-label="Back"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,.10)",
              background: "rgba(255,255,255,.03)",
              color: "rgba(255,255,255,.90)",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
            }}
          >
            <ArrowLeft size={20} />
          </button>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: "rgba(255,255,255,.92)" }}>
              {title}
            </div>

            {meta ? (
              <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.55)" }}>
                {meta}
              </div>
            ) : null}
          </div>

          <div />
        </div>

  
        <div
          className="policy-scroll"
          style={{
            height: "calc(100% - 86px)",
            overflowY: "auto",
            padding: "20px 28px 28px",
            color: "rgba(255,255,255,.78)",
            fontSize: 13,
            lineHeight: 1.65,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}