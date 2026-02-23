import { useRef, useState } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";
import PdfChip from "./PdfChip";

export default function ChatInput({
  value,
  onChange,
  onSend,
  pdfName,
  onPickPdf,
  onOpenPdf,
  onRemovePdf,
  disabled,
}) {
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div style={{ padding: 18, borderTop: "1px solid var(--line)" }}>
      {pdfName && (
        <div style={{ marginBottom: 10 }}>
          <PdfChip name={pdfName} onOpen={onOpenPdf} onRemove={onRemovePdf} />
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f && f.type === "application/pdf") onPickPdf(f);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 14,
          border: `1px solid ${dragOver ? "rgba(3,165,216,.6)" : "var(--line)"}`,
          background: "rgba(255,255,255,.03)",
        }}
      >
        <button
          onClick={() => fileRef.current?.click()}
          aria-label="Upload PDF"
          style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer" }}
        >
          <Paperclip size={18} />
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onPickPdf(f);
          }}
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What can I help you with?"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text)",
            fontSize: 14,
          }}
        />

        <button
          disabled={disabled}
          onClick={onSend}
          aria-label="Send"
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            border: "1px solid transparent",
            background: "rgba(3,165,216,.16)",
            color: "var(--brand)",
            cursor: "pointer",
            opacity: disabled ? 0.5 : 1,
            display: "grid",
            placeItems: "center",
          }}
        >
          <SendHorizontal size={18} />
        </button>
      </div>

      <div style={{ marginTop: 8, fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
        Lexi Drift may make mistakes. Don&apos;t share sensitive information.
      </div>
    </div>
  );
}
