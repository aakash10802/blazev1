import React from 'react'
import Layout from '../components/Layout/Layout';


const About = () => {
    return (
        <Layout title={"About us - Blaze-Store"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/about.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-6">
                    <p className="text-justify mt-4">
                        Welcome to Blaze-Store, your ultimate destination for all things shopping!
                        We are passionate about bringing you the best selection of products,
                        at the best prices, all in one convenient place.
                        At  Blaze-Store, we strive to provide a seamless and enjoyable shopping experience for our
                        valued customers. Whether you're looking for trendy fashion apparel,
                        high-quality electronics, stylish home decor, or unique gifts, we have got you covered.
                        We carefully curate our collection to ensure that every item meets our high standards of
                        quality, style, and affordability.
                        Customer satisfaction is our top priority. <br />

                        Join our community of satisfied shoppers and experience the joy of finding exactly what you need, all in one place. <br />We are thrilled to embark on this shopping journey with you and look forward to serving you with the best products and exceptional service.
                        <br />
                        <br />
                        <br />
                        Thank you for choosing Blaze-Store. Happy shopping!

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />



                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default About;