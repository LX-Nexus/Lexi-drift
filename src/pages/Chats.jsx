import { useMemo, useState } from "react";
import { Search, MessageCirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import { loadStore, saveStore, setActiveChat, createChat } from "../lib/store";
import { timeAgo } from "../lib/timeAgo";

export default function Chats() {
  const nav = useNavigate();
  const [store, setStore] = useState(() => loadStore());
  const [q, setQ] = useState("");

  const hasChats = store.chats.length > 0;

  const items = useMemo(() => {
    const list = store.chats;
    if (!q.trim()) return list;
    const qq = q.toLowerCase();
    return list.filter((c) => (c.title || "").toLowerCase().includes(qq));
  }, [store.chats, q]);

  function openChat(id) {
    const next = setActiveChat(store, id);
    setStore(next);
    saveStore(next);
    nav("/app");
  }

  function newChat() {
    const next = createChat(store);
    setStore(next);
    saveStore(next);
    nav("/app");
  }

  return (
    <AppShell>
      <div style={{ height: "100%", display: "grid", placeItems: "center", padding: 18 }}>
        <div style={{ width: "min(720px, 100%)" }}>
          <div style={{ textAlign: "center", fontWeight: 700, marginBottom: 14 }}>
            Chats
          </div>

        
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 14,
              border: "1px solid var(--line)",
              background: "rgba(255,255,255,.03)",
              marginBottom: 16,
            }}
          >
            <Search size={16} color="var(--muted)" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for chats..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text)",
              }}
            />
          </div>

          
          {!hasChats ? (
            <div
              style={{
                height: 420,
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                color: "var(--muted)",
                padding: "10px 10px",
              }}
            >
              <div>
                 <img
                  src="/drift-logo.png"
                  alt="Lexi Drift"
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: 20,
                    objectFit: "cover",
                    margin: "0 auto 16px",
                    boxShadow: "0 18px 50px rgba(3,165,216,.22), 0 0 0 1px rgba(255,255,255,.10)",
                  }}
                />

                <div
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: 999,
                    margin: "0 auto 14px",
                    display: "grid",
                    placeItems: "center",
                    border: "2px solid rgba(255,255,255,.18)",
                    background: "rgba(255,255,255,.02)",
                  }}
                >
                  <MessageCirclePlus size={40} strokeWidth={1.8} color="rgba(255,255,255,.85)" />
                </div>

                <div style={{ fontWeight: 800, color: "rgba(255,255,255,.92)", marginBottom: 6 }}>
                  Ready for your first chat?
                </div>

                <div style={{ fontSize: 12, lineHeight: 1.6, maxWidth: 360, margin: "0 auto 16px" }}>
                  Let Lexi help you—from understanding your documents to quick questions.
                  Your chats will show up here.
                </div>

                <button
                  type="button"
                  onClick={newChat}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,.14)",
                    background: "rgba(255,255,255,.04)",
                    color: "rgba(255,255,255,.92)",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  New chat
                </button>
              </div>
            </div>
          ) : (
            <>
              
              {items.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--muted)", padding: "22px 10px" }}>
                  No chats match your search.
                </div>
              ) : (
                <div style={{ marginTop: 14 }}>
                  {items.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => openChat(c.id)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "12px 2px",
                        background: "transparent",
                        border: "none",
                        color: "var(--text)",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,.78)" }}>
                          {c.title}
                        </span>
                        <span style={{ fontSize: 12, color: "var(--brand)" }}>
                          {timeAgo(c.updatedAt)}
                        </span>
                      </div>

                  
                      <div style={{ height: 1, background: "rgba(255,255,255,.08)", marginTop: 10 }} />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}