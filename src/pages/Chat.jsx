import { useEffect, useMemo, useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import AppShell from "../components/AppShell";
import ChatInput from "../components/ChatInput";
import PdfPreviewModal from "../components/PdfPreviewModal";
import { createChat, loadStore, saveStore, addPdf, pushMsg, updateMsg } from "../lib/store";

const mid = () => crypto.randomUUID();

function Bubble({ role, children }) {
  const isUser = role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "min(720px, 92%)",
          padding: "12px 14px",
          borderRadius: 14,
          background: isUser ? "rgba(94,162,249,.20)" : "rgba(0,0,0,.25)",
          border: "1px solid var(--line)",
          color: "var(--text)",
          whiteSpace: "pre-wrap",
          lineHeight: 1.45,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function SidePanel({ title, children }) {
  return (
    <aside className="sidepanel">
      <div className="sidepanel-title">{title}</div>
      <div className="sidepanel-mono">{children}</div>
    </aside>
  );
}

export default function Chat() {
  const [store, setStore] = useState(() => loadStore());
  const [text, setText] = useState("");
  const [activePdf, setActivePdf] = useState(null); // {id,file,name}
  const [previewOpen, setPreviewOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!store.activeChatId) {
      const next = createChat(store);
      setStore(next);
      saveStore(next);
    }
  }, []);

  const activeChat = useMemo(
    () => store.chats.find((c) => c.id === store.activeChatId) || null,
    [store]
  );

  function pickPdf(file) {
    const { next, pdf } = addPdf(store, file);
    setStore(next);
    saveStore(next);
    setActivePdf({ id: pdf.id, file: pdf.file, name: pdf.name });
  }

  function removePdf() {
    setActivePdf(null);
  }

  function openPdf() {
    setPreviewOpen(true);
  }

  async function send() {
    if (!activeChat) return;
    const trimmed = text.trim();
    if (!trimmed && !activePdf) return;

    const userMsgId = mid();

    let next = pushMsg(store, activeChat.id, {
      id: userMsgId,
      role: "user",
      text: trimmed || undefined,
      pdf: activePdf ? { id: activePdf.id, name: activePdf.name } : undefined,
      createdAt: Date.now(),
      status: "ok",
    });
    setStore(next);
    saveStore(next);
    setText("");

    setGenerating(true);

    const aiMsgId = mid();
    next = pushMsg(next, activeChat.id, {
      id: aiMsgId,
      role: "ai",
      text: "Generating…",
      createdAt: Date.now(),
      status: "sending",
    });
    setStore(next);
    saveStore(next);

    try {
      await new Promise((r) => setTimeout(r, 1100));
      const fail = Math.random() < 0.15;

      if (fail) {
        const errText = "Things are a bit hectic on our end. Please retry in a bit.";
        const n2 = updateMsg(next, activeChat.id, aiMsgId, { text: errText, status: "error" });
        setStore(n2);
        saveStore(n2);
      } else {
        const reply = activePdf
          ? `Got your PDF: ${activePdf.name}. Ask me what you want to find inside it.`
          : `Here’s a helpful answer to: "${trimmed}"`;

        const n2 = updateMsg(next, activeChat.id, aiMsgId, { text: reply, status: "ok" });
        setStore(n2);
        saveStore(n2);
      }
    } finally {
      setGenerating(false);
    }
  }

  return (
    <AppShell topRight={<UserButton />}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflow: "auto", padding: 18 }}>
          {(!activeChat || activeChat.messages.length === 0) && (
            <div style={{ height: "100%", display: "grid", placeItems: "center", textAlign: "center", opacity: 0.95 }}>
              <div>
                
                <img src="/drift-logo.png" alt="Lexi Drift" style={{ width: 86, height: 86, borderRadius: 20, margin: "0 auto 14px", objectFit: "cover" }} /> 
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Hi! Let&apos;s get things done.</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>Fire away with your questions.</div>
              </div>
            </div>
          )}

          {activeChat?.messages.map((m) => {
            const isAI = m.role === "ai";

          
            const showPanel = isAI && (m.status === "sending" || m.status === "error" || !!activePdf);

            return (
              <div key={m.id} style={{ marginBottom: 12 }}>
                <div className={showPanel ? "msg-row" : ""}>
       
                  <div>
                    <Bubble role={m.role}>
                      {m.status === "error" ? (
                        <span style={{ color: "var(--danger)" }}>{m.text}</span>
                      ) : (
                        <>
                          {m.text}
                          {m.pdf && (
                            <div style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
                              Attached:{" "}
                              <button
                                onClick={openPdf}
                                style={{ color: "var(--brand)", background: "transparent", border: "none", cursor: "pointer" }}
                              >
                                {m.pdf.name}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </Bubble>

                    {generating && m.role === "user" && (
                      <div
                        style={{
                          marginTop: 10,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          color: "var(--muted)",
                          fontSize: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,.18)",
                            borderTopColor: "var(--brand)",
                            animation: "spin 1s linear infinite",
                          }}
                        />
                        Generating…
                        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                      </div>
                    )}
                  </div>

              
                  {showPanel ? (
                    <div>
                      {m.status === "sending" ? (
                        <SidePanel title="Status">
                          Generating response…
                          {"\n"}Please wait.
                        </SidePanel>
                      ) : m.status === "error" ? (
                        <SidePanel title="System">
                          Things are a bit hectic on our end.
                          {"\n"}Retry your message in a bit.
                        </SidePanel>
                      ) : activePdf ? (
                        <div className="sidepanel">
                          <div className="sidepanel-title">Document</div>
                          <div className="sidepanel-mono">
                            Attached PDF:
                            {"\n"}
                            <span style={{ color: "rgba(255,255,255,.92)" }}>{activePdf.name}</span>
                          </div>
                          <hr />
                          <button type="button" className="sidepanel-btn" onClick={openPdf}>
                            Preview PDF
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <ChatInput
          value={text}
          onChange={setText}
          onSend={send}
          pdfName={activePdf?.name || null}
          onPickPdf={pickPdf}
          onOpenPdf={openPdf}
          onRemovePdf={removePdf}
          disabled={generating}
        />

        <PdfPreviewModal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          file={activePdf?.file || null}
        />
      </div>
    </AppShell>
  );
}