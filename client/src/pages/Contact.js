
import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
const Contact = () => {
    const phoneNumber = '+919447947858';
    return (
        <Layout title={"Contact us"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/contactus.jpg"
                        alt="contactus"
                        style={{ width: "80%" }}
                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                    <p className="text-justify mt-2">
                        We would love to hear from you! If you have any questions, concerns,
                        or simply want to share your shopping experience with us,
                        please don't hesitate to get in touch. Our dedicated customer support
                        team is here to assist you and ensure your satisfaction.
                        Contact us today and let us help you with anything you need.
                    </p>
                    <p className="mt-3">

                        <BiMailSend /> :<a href="mailto:helpatblaze@gmail.com">helpatblaze@gmail.com</a>
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall /> : <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                    </p>

                </div>
            </div>
        </Layout>
    );
};

export default Contact;