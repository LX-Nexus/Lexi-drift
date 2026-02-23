
import PolicyLayout from "../components/PolicyLayout";



export default function Privacy() {

  return (
    <PolicyLayout
      title="Privacy Policy"
      meta="Last Updated : February 28th, 2026"
      backTo="/app/settings"
      >
          <p>Welcome to Kimi!</p>
          <p>
            Moonshot AI PTE. LTD. (“we”, “our”, or “Moonshot AI”) is the provider and controller of services
            offered through our website, applications, and browser extensions("the Services"). We are committed to protecting your Personal
            information. This Privacy Policy explains how we collect, use, disclose, and protect your Personal
            data and outlines your rights.
            By continuing to use the Services, you agree to this Privacy Policy. If you do not agree or
            are under the age of 13(US) or 14(outside the US), you must not access or use 
            the Services.
            <br />
            We would like to specifically remind you that when you access third-party products
            and services through the services, the handling of your perssonal information and 
            privacy will be managed by the third party in accordance with its own policies. 
            We cannot be responsible for the processing activities of third parties.In such
            cases, we recommend that you carefully read the relevant policies of the third parties
            to understand your rights and obligations.
            
            
          </p>

          <h3 style={heading}>1. Personal Information We Collect</h3>
          <h3 style={heading}>1. Personal Information You Provide:</h3>
          <p>Account Information: This includes your username, phone number, profile picture,
          email address, and account credentials that you provide during registration or use of
          your account. We use this information to create and manage your acccount, based 
          on the necessity of performing our contract with you. 
          User Content: This includes prompts, audio, images, videos, files and any content you 
          input or generate while using our products and services. We process this information 
          to provide and improve the Services, including training and optimizing our models. 
          The legal basis for this processing may be our legitmate interests or your consent, 
          depending on your jurisdiction.
          </p>

          <h3 style={heading}>2. How We Use Information</h3>
          <ul style={{ paddingLeft: 20 }}>
            <li>Provide and improve services</li>
            <li>Ensure account security</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h3 style={heading}>3. Contact Us</h3>
          <p>If you have questions, contact us through the app.</p>
   

    </PolicyLayout>
  );
}

const heading = {
  marginTop: 18,
  fontWeight: 700,
  fontSize: 14,
};