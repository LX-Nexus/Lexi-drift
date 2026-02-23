import { ArrowLeft } from "lucide-react";
import PolicyLayout from "../components/PolicyLayout";


export default function Terms() {
  return (
    <PolicyLayout
    title="Terms of Service"
      meta="Effective Date: February 28th, 2025"
      backTo="/app/settings"
      >
    <div style={{ height: "100%", padding: 18 }}>
      <button onClick={() => nav(-1)} style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer" }}>
        <ArrowLeft />
      </button>

      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <h2 style={{ marginTop: 10 }}>Terms of Service</h2>
         <h3 style={heading}>Effective Date: July 7th, 2025</h3>
        

        <div style={{ lineHeight: 1.7 }}>
          <p>Thank your for using Kimi!
            These Terms of Service ("Terms") form a legally binding agreement between you 
            ("you" or "user") and Moonshot AI PTE. LTD, a company registered in Singapore, 
            and its affiliates("Moonshot AI," "we," "us," or "our").These Terms govern your access to 
            and use of Kimi and its related products, services, and features (collectively, the "Services"), including
            through websites, applications, browser extensions,and other digital interfaces.
            <br />
            By accessing or using the Services, you agree to be bound by these Terms. If you do not
            agree, do not use the Services. If you are under the age of majority in your jurisdiction
            (typically 18), you must obtain permission from a parent or legal guardian
            before using the Services.
            For more information on how we collect, use, and protect your personal information,
            you can read our Privacy Policy.
          </p>
          <br />
          <h4>1. Eligibility and User Accounts</h4>
          <p>You may access the Services with or without creating an account. Certain features
            may require registration. You agree to:
            Provide accurate and complete information.
            Keep your login credentials secure.
            Not register or operate multiple accounts for abusive purposes.
            You are responsible for all activities that occur under your account. 
            You may not share your account credentials or make your account available to anyone else.

            <br />
            <p>
            You may request to terminate your account and delete your personalinformation by 
            contacting us. Upon termination , we will delete your data except where retention
            is required by law.
            </p>
          </p>
        </div>
      </div>
    </div>
    </PolicyLayout>
  );
}


const heading = {
  marginTop: 18,
  fontWeight: 700,
  fontSize: 14,
};