import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { RiWhatsappLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import "../styles/CartStyles.css"; 

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const { cart, setCart } = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showQRCode, setShowQRCode] = useState(false);

  // Total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  // Remove item from the cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Show QR code section
  const showQRCodeSection = () => {
    setShowQRCode(true);
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row mb-3" key={p._id}>
                  <div className="col-md-4 mt-3 mx-3 my-3">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="80%"
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <h2>{p.name}</h2>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price: ₹{p.price}</p>
                  </div>
                  <div className="col-md-2 cart-remove-btn d-flex align-items-center">
                    <button
                      className="btn btn-outline-danger text-center w-100"
                      onClick={() => removeCartItem(p._id)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-12 cart-summary">
              <h2>Cart Summary</h2>
             
              <hr />
              <h4>Total: {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3 text-right">
                 <table className="table">
  
    <tr>
      <td colSpan="2" className="text-right">
        <button
          className="btn btn-outline-warning"
          onClick={() => navigate("/dashboard/user/profile")}
        >
          Update Address
        </button>
      </td>
    </tr>
</table>

                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <hr />
              <div className="col-md-6 mt-2 mx-auto">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <p className="lead text-center">
                      In case of payment failure using <b>GPAY or ANY OTHER UPI MODES</b>, click on <b>Card</b> for transaction.
                    </p>
                    <DropIn
                       options={{
                        authorization: clientToken,
                        
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-outline-primary w-70 text-center mb-4"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
              <div className="gap-3 mb-4">
                <hr className="custom-hr" />
                {showQRCode ? (
                  <div className="text-center">
                    <h3>Please follow the instructions:</h3>
                    <hr className="danger" />
                    <li className="lead mt-2">
                      Share the <b>Screenshot</b> of the product by tapping the button below the QR code.
                    </li>
                    <li className="lead mt-2">
                      Send your <b>Shipping details</b> to the WhatsApp Number where you are redirected.
                    </li>
                    <li className="lead mt-2">
                      After getting a reply from our side, you can inquire about <b>Payment modes</b>, etc.
                    </li>
                    <li className="lead mt-2">
                      After placing an order via WhatsApp, you can select the mode of Shipment.
                    </li>
                    <div>
                      <h3>G-PAY (ID)</h3>
                      <img
                        src="\images\qr.jpg"
                        alt="contactus"
                        style={{ width: "20%" }}
                      />
                    </div>
                    <div>
                      <button className="btn btn-outline-success w-70 text-center">
                        <a
                          href="https://wa.me/message/6LXGRUTGFXPOF1"
                          className="custom-link"
                        >
                          SEND THROUGH WHATSAPP &nbsp;
                          <span className="whatsapp-logo">
                            <RiWhatsappLine />
                          </span>
                        </a>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-primary w-70 text-center mb-4"
                    onClick={showQRCodeSection}
                  >
                    Show QR Code
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
