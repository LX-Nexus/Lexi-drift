import Sidebar from "./Sidebar";
import ModePill from "./ModePill";
import { useNavigate } from "react-router-dom";

export default function AppShell({ children, topRight }) {
  const nav = useNavigate();
  return (
    
    <div
      style={{
        height: "100vh",
        width: "100%",
        padding: 18,
        background: "#0b0f14",
        boxSizing: "border-box",
      }}
    >

      <div
        style={{
          height: "100%",
          maxWidth: 1180,
          margin: "0 auto",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.06)",
          boxShadow: "0 30px 90px rgba(0,0,0,.55)",
          background:
            "radial-gradient(900px 420px at 50% 0%, rgba(3,165,216,.22), transparent 62%), #0b0f14",
          display: "flex",
        }}
      >
        <Sidebar />

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
 
          <header
            style={{
              height: 60,
              padding: "0 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,.06)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.03), transparent)",
            }}
          >
       
            <div
             onClick={() => navigator("/app/open")}
              style={{
                fontWeight: 700,
                letterSpacing: 0.2,
                color: "rgba(255,255,255,.88)",
              }}
            >
              Lexi Drift
            </div>

          
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <ModePill />
              {topRight}
            </div>
          </header>

          <main style={{ flex: 1, overflow: "hidden" }}>{children}</main>
        </div>
      </div>
    </div>
  );
}
