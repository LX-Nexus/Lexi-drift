import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useSignIn, useSignUp } from "@clerk/clerk-react";

export default function Welcome() {
  const nav = useNavigate();
  const { isSignedIn } = useAuth();

  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function onContinue() {
    if (!isSignInLoaded || !isSignUpLoaded) return;

    if (isSignedIn) {
      nav("/app/open", { replace: true });
      return;
    }

    setError("");

   
    nav("/boot/a");

    const start = Date.now();
    const MIN_A = 650;
    const MIN_B = 650;

    const waitMin = async (ms) => {
      const elapsed = Date.now() - start;
      const remaining = ms - elapsed;
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
    };

    const goVerify = async () => {
      await new Promise((r) => setTimeout(r, MIN_B));
      nav("/verify");
    };

    try {
   
      const si = await signIn.create({ identifier: email });

      await waitMin(MIN_A);
      nav("/boot/b");

      const emailFactor = si.supportedFirstFactors?.find(
        (f) => f.strategy === "email_code"
      );

      const emailAddressId =
        emailFactor?.emailAddressId || emailFactor?.email_address_id;

      if (!emailAddressId) {
        throw new Error(
          "Email code is enabled, but Clerk did not return an emailAddressId."
        );
      }

      await si.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId,
      });

      sessionStorage.setItem("AUTH_FLOW", "signin");
      await goVerify();
    } catch (e) {
      const msg = (e?.errors?.[0]?.message || e?.message || "").toLowerCase();

      
      if (msg.includes("couldn't find your account") || msg.includes("not found")) {
        try {
          await waitMin(MIN_A);
          nav("/boot/b");

       await signUp.create({ emailAddress: email });
       await signUp.update({
       firstName: "Student",
       lastName: "User",
       });

await signUp.prepareEmailAddressVerification({
  strategy: "email_code",
});

          sessionStorage.setItem("AUTH_FLOW", "signup");
          await goVerify();
          return;
        } catch (e2) {
          console.error(e2);
          setError(
            e2?.errors?.[0]?.message ||
              e2?.message ||
              "Could not start sign-up. Please try again."
          );
          nav("/", { replace: true });
          return;
        }
      }

      console.error(e);
      setError(
        e?.errors?.[0]?.message ||
          e?.message ||
          "Could not start sign-in. Check your email and try again."
      );
      nav("/", { replace: true });
    }
  }

  return (
    <div style={{ height: "100%", display: "grid", placeItems: "center", padding: 20 }}>
      <div style={{ width: "min(420px, 100%)", textAlign: "center" }}>
        <img
          src="/drift-logo.png"
          alt="Lexi Drift"
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            objectFit: "cover",
            margin: "0 auto 12px",
            boxShadow: "0 14px 40px rgba(3,165,216,.20), 0 0 0 1px rgba(255,255,255,.08)",
          }}
        />

        <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Lexi Drift</div>
        <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 18 }}>
          Enter your student email to continue
        </div>

        <div
          style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            padding: 14,
          }}
        >
          <label style={{ display: "block", textAlign: "left", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>
            Institution email
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@university.ac.za"
            style={{
              width: "100%",
              padding: "12px 12px",
              borderRadius: 12,
              border: "1px solid var(--line)",
              background: "rgba(0,0,0,.22)",
              color: "var(--text)",
              outline: "none",
            }}
          />

          <button
            type="button"
            onClick={onContinue}
            disabled={!email.includes("@")}
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
              opacity: !email.includes("@") ? 0.55 : 1,
            }}
          >
            Continue
          </button>

          {error && (
            <div style={{ marginTop: 10, fontSize: 12, color: "#ff7070", textAlign: "left" }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)" }}>
            Secured by your institution
          </div>
        </div>
      </div>
    </div>
  );
}