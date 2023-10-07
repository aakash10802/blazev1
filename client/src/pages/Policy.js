import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.jpg"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4 ">
                    <h1 >Privacy-Policies</h1>
                    <p><br />At Blaze, we collect personal information when you create an account
                        or place an order. We use this information to process orders, provide
                        customer support, and improve our services. We may send you
                        transactional and promotional emails with your consent.
                        Your data security is important to us, and we employ
                        industry-standard measures to protect your information.
                        We may share your information with trusted third-party service
                        providers. We use cookies for a better browsing experience.
                        You have the right to access, correct, or delete your information.
                        Our Privacy Policy may change, so please review it periodically.
                        <br />If you have any concerns, contact us at<b > privacyinblazeshopgmail.com</b>.
                        By using our website, you consent to our Privacy Policy.</p>
                  
                    <br />
                </div>
      </div>
    </Layout>
  );
};

export default Policy;
