import { useEffect, useState } from "react";

export default function ModePill() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const bg = online ? "#dfe3e6" : "#ccfeef";
  const border = online ? "#0890bc" : "#1dc75e";
  const text = online ? "#0890bc" : "#1dc75e";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        border: `2px solid ${border}`,
        background: bg,
        color: text,
        transition: "all 0.3s ease",
      }}
      title={online ? "University Mode" : "Local Mode"}
    >
 
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: border,
          boxShadow: `0 0 8px ${border}`,
        }}
      />

      {online ? "University Mode" : "Local Mode"}
    </span>
  );
}