import { FileText, X } from "lucide-react";

export default function PdfChip({ name, onOpen, onRemove }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(255,255,255,.04)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        padding: "8px 10px",
        maxWidth: 340,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          display: "grid",
          placeItems: "center",
          background: "rgba(255,80,80,.16)",
          border: "1px solid rgba(255,80,80,.22)",
        }}
      >
        <FileText size={18} />
      </div>

      <button
        onClick={onOpen}
        style={{
          flex: 1,
          textAlign: "left",
          background: "transparent",
          border: "none",
          color: "var(--text)",
          cursor: "pointer",
          padding: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
        title="Preview PDF"
      >
        {name}
        <div style={{ fontSize: 11, color: "var(--muted)" }}>PDF</div>
      </button>

      <button
        onClick={onRemove}
        aria-label="Remove PDF"
        style={{
          background: "transparent",
          border: "none",
          color: "var(--muted)",
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
