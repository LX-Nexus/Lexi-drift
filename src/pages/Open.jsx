import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import AppShell from "../components/AppShell";
import ChatInput from "../components/ChatInput";
import PdfPreviewModal from "../components/PdfPreviewModal";
import { loadStore, saveStore, addPdf, createChat, pushMsg, updateMsg } from "../lib/store";

const mid = () => crypto.randomUUID();

export default function Open() {
  const [store, setStore] = useState(() => loadStore());
  const [text, setText] = useState("");
  const [activePdf, setActivePdf] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

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

  async function sendFromOpen() {
    const trimmed = text.trim();
    if (!trimmed && !activePdf) return;

    let next = createChat(store);

    const userMsgId = mid();
    next = pushMsg(next, next.activeChatId, {
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
    next = pushMsg(next, next.activeChatId, {
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
        const errText =
          "Things are a bit hectic on our end. Please retry in a bit.";
        const n2 = updateMsg(next, next.activeChatId, aiMsgId, {
          text: errText,
          status: "error",
        });
        setStore(n2);
        saveStore(n2);
      } else {
        const reply = activePdf
          ? `Got your PDF: ${activePdf.name}. Ask me what you want to find inside it.`
          : `Here’s a helpful answer to: "${trimmed}"`;

        const n2 = updateMsg(next, next.activeChatId, aiMsgId, {
          text: reply,
          status: "ok",
        });
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
        <div
          style={{
            flex: 1,
            display: "grid",
            placeItems: "center",
            padding: 18,
            textAlign: "center",
          }}
        >
          <div>
            <img
              src="/drift-logo.png"
              alt="Lexi Drift"
              style={{
                width: 120,
                height: 120,
                borderRadius: 26,
                objectFit: "cover",
                margin: "0 auto 16px",
                boxShadow:
                  "0 18px 50px rgba(3,165,216,.18), 0 0 0 1px rgba(255,255,255,.08)",
              }}
            />
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              Hi! Let&apos;s get things done.
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              Fire away with your questions.
            </div>
          </div>
        </div>

        <ChatInput
          value={text}
          onChange={setText}
          onSend={sendFromOpen}
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
