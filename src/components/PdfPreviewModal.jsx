import { useEffect } from "react";
import { X } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfPreviewModal({ open, onClose, file }) {
  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open || !file) return null;

  return (
    <div
      onMouseDown={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
        display: "grid",
        placeItems: "center",
        padding: 18,
        zIndex: 50,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "min(920px, 96vw)",
          height: "min(86vh, 900px)",
          background: "var(--panel)",
          border: "1px solid var(--line)",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {file.name}
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer" }}>
            <X />
          </button>
        </div>

        <div style={{ padding: 14, overflow: "auto" }}>
          <Document file={file}>
            <Page pageNumber={1} width={840} />
            <div style={{ height: 12 }} />
            <Page pageNumber={2} width={840} />
            <div style={{ height: 12 }} />
            <Page pageNumber={3} width={840} />
            <div style={{ height: 12 }} />
            <Page pageNumber={4} width={840} />
          </Document>
        </div>
      </div>
    </div>
  );
}
