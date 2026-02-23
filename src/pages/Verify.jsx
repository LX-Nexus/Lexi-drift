import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";

export default function Verify() {
  const nav = useNavigate();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  
  useEffect(() => {
    if (!isLoaded) return;
    if (!signIn) return;

    
    if (!signIn?.id) {
      nav("/", { replace: true });
    }
  }, [isLoaded, signIn, nav]);

  async function onVerify() {
    if (!isLoaded) return;

    setErr("");

    try {
      if (!signIn) {
        setErr("Sign-in session expired. Please try again.");
        nav("/", { replace: true });
        return;
      }

      const res = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: code.trim(),
      });

      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        nav("/app/open", { replace: true });
        return;
      }

  
      setErr("Could not verify code. Please try again.");
    } catch (e) {
      setErr(e?.errors?.[0]?.message || "Invalid code. Please try again.");
    }
  }

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
      <div style={{ width: "min(420px, 100%)" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <img
            src="/drift-logo.png"
            alt="Lexi Drift"
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              objectFit: "cover",
              boxShadow:
                "0 14px 40px rgba(3,165,216,.20), 0 0 0 1px rgba(255,255,255,.08)",
            }}
          />
          <div style={{ marginTop: 10, fontWeight: 700, fontSize: 18 }}>
            Verify your email
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>
            Enter the 6-digit code sent to your email
          </div>
        </div>

        <div
          style={{
            border: "1px solid var(--line)",
            borderRadius: 14,
            padding: 14,
            background: "rgba(255,255,255,.03)",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "var(--muted)",
              marginBottom: 6,
            }}
          >
            Verification code
          </label>

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            inputMode="numeric"
            style={{
              width: "100%",
              padding: "12px 12px",
              borderRadius: 12,
              border: "1px solid var(--line)",
              background: "rgba(0,0,0,.22)",
              color: "var(--text)",
              outline: "none",
              letterSpacing: 6,
              textAlign: "center",
              fontSize: 16,
              fontWeight: 600,
            }}
          />

          {err && (
            <div style={{ marginTop: 10, color: "#ff7070", fontSize: 12 }}>
              {err}
            </div>
          )}

          <button
            type="button"
            onClick={onVerify}
            disabled={code.trim().length < 6}
            style={{
              width: "100%",
              marginTop: 12,
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid transparent",
              background: "var(--brand)",
              color: "#FCF9F9",
              fontWeight: 700,
              cursor: "pointer",
              opacity: code.trim().length < 6 ? 0.55 : 1,
            }}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}