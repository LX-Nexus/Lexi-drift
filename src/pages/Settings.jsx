import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SignOutButton } from "@clerk/clerk-react";
import AppShell from "../components/AppShell";
import { loadStore } from "../lib/store";
import { ChevronRight, LogOut } from "lucide-react";

function Row({ label, value, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "12px 14px",
        borderRadius: 14,
        border: "1px solid var(--line)",
        background: "rgba(255,255,255,.03)",
        color: "var(--text)",
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <span style={{ color: "var(--muted)", fontSize: 13 }}>{label}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {value && <span style={{ color: "var(--brand)", fontSize: 12 }}>{value}</span>}
        {onClick && <ChevronRight size={16} color="var(--muted)" />}
      </span>
    </button>
  );
}

export default function Settings() {
  const nav = useNavigate();
  const store = useMemo(() => loadStore(), []);
  const chatCount = store.chats.reduce((a, c) => a + c.messages.length, 0);
  const pdfCount = Object.keys(store.pdfs || {}).length;

  return (
    <AppShell>
      <div style={{ height: "100%", display: "grid", placeItems: "center", padding: 18 }}>
        <div style={{ width: "min(520px, 100%)" }}>
          <div style={{ textAlign: "center", fontWeight: 700, marginBottom: 16 }}>Settings</div>

          <div style={{ marginBottom: 12, color: "var(--muted)", fontSize: 12 }}>DATA</div>
          <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
            <Row label="Chat History" value={`${chatCount} messages`} />
            <Row label="Documents Uploaded" value={`${pdfCount}`} />
          </div>

          <div style={{ marginBottom: 12, color: "var(--muted)", fontSize: 12 }}>ABOUT</div>
          <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
            <Row label="Version" value="1.0" />
            <Row label="Current Model" value="Lexi Lite" />
            <Row label="Terms of Service" onClick={() => nav("/app/terms")} />
            <Row label="Privacy Policy" onClick={() => nav("/app/privacy")} />
          </div>

          <SignOutButton>
            <button
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 14,
                border: "1px solid var(--line)",
                background: "rgba(255,255,255,.03)",
                color: "var(--text)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <LogOut size={18} />
              Log Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </AppShell>
  );
}
