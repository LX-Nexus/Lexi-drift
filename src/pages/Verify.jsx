import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn, useSignUp } from "@clerk/clerk-react";

function Spinner({ size = 16 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "999px",
        border: "2px solid rgba(255,255,255,.35)",
        borderTopColor: "rgba(255,255,255,.95)",
        display: "inline-block",
        animation: "lexiSpin .8s linear infinite",
      }}
    />
  );
}

export default function Verify() {
  const nav = useNavigate();

  const { signIn, setActive: setActiveSignIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, setActive: setActiveSignUp, isLoaded: isSignUpLoaded } = useSignUp();

  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  const flow = sessionStorage.getItem("AUTH_FLOW") || "signin";
  const cleanedCode = useMemo(() => code.replace(/\s+/g, ""), [code]);


  useEffect(() => {
    if (flow === "signup") {
      if (!isSignUpLoaded) return;
      if (!signUp?.id) nav("/", { replace: true });
      return;
    }

    if (!isSignInLoaded) return;
    if (!signIn?.id) nav("/", { replace: true });
  }, [flow, isSignInLoaded, signIn, isSignUpLoaded, signUp, nav]);

  
  useEffect(() => {
    if (!err) return;
    setErr("");
    
  }, [cleanedCode]);

  async function onVerify() {
    if (!isSignInLoaded || !isSignUpLoaded) return;
    if (submitting) return;

    setSubmitting(true);
    setErr("");

    try {
      if (flow === "signup") {
        if (!signUp) {
          setErr("Sign-up session expired. Please try again.");
          nav("/", { replace: true });
          return;
        }

        const res = await signUp.attemptEmailAddressVerification({
          code: cleanedCode,
        });

        if (res.status === "complete") {
          await setActiveSignUp({ session: res.createdSessionId });
          sessionStorage.removeItem("AUTH_FLOW");
          nav("/app/open", { replace: true });
          return;
        }

        setErr("Could not verify code. Please try again.");
        setShake(true);
        return;
      }


      if (!signIn) {
        setErr("Sign-in session expired. Please try again.");
        nav("/", { replace: true });
        return;
      }

      const res = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: cleanedCode,
      });

      if (res.status === "complete") {
        await setActiveSignIn({ session: res.createdSessionId });
        sessionStorage.removeItem("AUTH_FLOW");
        nav("/app/open", { replace: true });
        return;
      }

      setErr("Could not verify code. Please try again.");
      setShake(true);
    } catch (e) {
      setErr(e?.errors?.[0]?.message || "Verification failed. Please try again.");
      setShake(true);
    } finally {
      setSubmitting(false);
    }
  }


  useEffect(() => {
    if (!shake) return;
    const t = setTimeout(() => setShake(false), 420);
    return () => clearTimeout(t);
  }, [shake]);

  const disabled = submitting || cleanedCode.length < 6;

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
   
      <style>{`
        @keyframes lexiIn {
          from { opacity: 0; transform: translateY(10px) scale(.995); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes lexiSpin { to { transform: rotate(360deg); } }
        @keyframes lexiGlow {
          0% { box-shadow: 0 0 0 1px rgba(255,255,255,.10), 0 18px 50px rgba(3,165,216,.08); }
          100% { box-shadow: 0 0 0 1px rgba(255,255,255,.14), 0 18px 60px rgba(3,165,216,.16); }
        }
        @keyframes lexiShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div
        style={{
          width: "min(420px, 100%)",
          animation: "lexiIn .55s ease-out both",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 22,
              margin: "0 auto",
              display: "grid",
              placeItems: "center",
              background:
                "radial-gradient(120px 120px at 30% 20%, rgba(3,165,216,.22), rgba(0,0,0,0))",
              animation: "lexiGlow 2.2s ease-in-out infinite alternate",
            }}
          >
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
          </div>

          <div style={{ marginTop: 10, fontWeight: 800, fontSize: 18 }}>
            Verify your email
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>
            Enter the 6-digit code sent to your email
          </div>
        </div>

        <div
          style={{
            border: "1px solid var(--line)",
            borderRadius: 16,
            padding: 14,
            background: "rgba(255,255,255,.03)",
            boxShadow:
              "0 22px 70px rgba(0,0,0,.22), 0 0 0 1px rgba(255,255,255,.04) inset",
            transform: "translateZ(0)",
            animation: shake ? "lexiShake .42s ease-in-out" : "none",
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
            autoFocus
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
              fontWeight: 700,
              transition: "box-shadow .2s ease, border-color .2s ease, transform .08s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(3,165,216,.55)";
              e.currentTarget.style.boxShadow =
                "0 0 0 4px rgba(3,165,216,.18), 0 0 0 1px rgba(255,255,255,.06) inset";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--line)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
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
            disabled={disabled}
            style={{
              width: "100%",
              marginTop: 12,
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid transparent",
              background: "var(--brand)",
              color: "#FCF9F9",
              fontWeight: 800,
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.6 : 1,
              transition: "transform .12s ease, filter .2s ease, opacity .2s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
            onMouseDown={(e) => {
              if (disabled) return;
              e.currentTarget.style.transform = "translateY(1px)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {submitting ? (
              <>
                <Spinner size={16} />
                Verifying…
              </>
            ) : (
              "Verify"
            )}
          </button>

          <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
            Tip: paste the code
          </div>
        </div>
      </div>
    </div>
  );
}