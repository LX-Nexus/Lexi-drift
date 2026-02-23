import { useMemo, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import { loadStore, saveStore, setActiveChat } from "../lib/store";
import { timeAgo } from "../lib/timeAgo";

export default function Recent() {
  const [confirmId, setConfirmId] = useState(null);
  const nav = useNavigate();
  const [store, setStore] = useState(() => loadStore());
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const sorted = [...store.chats].sort((a, b) => b.updatedAt - a.updatedAt);
    if (!q.trim()) return sorted;
    const qq = q.toLowerCase();
    return sorted.filter((c) => c.title.toLowerCase().includes(qq));
  }, [store.chats, q]);

  function openChat(id) {
    const next = setActiveChat(store, id);
    setStore(next);
    saveStore(next);
    nav("/app");
  }

 function deleteChat(id, e) {
  e.stopPropagation();

  const confirmed = window.confirm("Are you sure you want to delete this chat?");
  if (!confirmed) return;

  const updatedChats = store.chats.filter((c) => c.id !== id);

  const next = {
    ...store,
    chats: updatedChats,
    activeChatId:
      store.activeChatId === id
        ? updatedChats[0]?.id || null
        : store.activeChatId,
  };

  setStore(next);
  saveStore(next);
}

  return (
    <AppShell>
      <div style={{ height: "100%", display: "grid", placeItems: "center", padding: 18 }}>
        <div style={{ width: "min(720px, 100%)" }}>
          <div style={{ textAlign: "center", fontWeight: 700, marginBottom: 14 }}>
            Recent
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

          <div style={{ marginTop: 14 }}>
            {items.map((c) => (
              <div
                key={c.id}
                onClick={() => openChat(c.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 2px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
           
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,.78)" }}>
                      {c.title}
                    </span>
                  </div>

             
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, color: "var(--brand)" }}>
                      {timeAgo(c.updatedAt)}
                    </span>

                    <button
             onClick={(e) => {
             e.stopPropagation();
             setConfirmId(c.id);
              }}
              style={{
               border: "none",
               background: "transparent",
               cursor: "pointer",
                padding: 4,
                }}
                 >
                 <Trash2 size={16} color="rgba(255,120,120,.85)" />
                  </button>
                  </div>
                </div>

                <div
                  style={{
                    height: 1,
                    background: "rgba(255,255,255,.08)",
                    marginTop: 10,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {confirmId && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.6)",
      display: "grid",
      placeItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        width: 320,
        padding: 20,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,.12)",
        background: "rgba(20,20,25,.95)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>
        Delete chat?
      </div>

      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
        This action cannot be undone.
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button
          onClick={() => setConfirmId(null)}
          style={{
            padding: "8px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,.12)",
            background: "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={() => {
            const updatedChats = store.chats.filter((c) => c.id !== confirmId);

            const next = {
              ...store,
              chats: updatedChats,
              activeChatId:
                store.activeChatId === confirmId
                  ? updatedChats[0]?.id || null
                  : store.activeChatId,
            };

            setStore(next);
            saveStore(next);
            setConfirmId(null);
          }}
          style={{
            padding: "8px 14px",
            borderRadius: 10,
            border: "none",
            background: "rgba(255,70,70,.85)",
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </AppShell>
  );
}