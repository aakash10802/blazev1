import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  const [address, setAddress] = useState({
    streetName: "",
    postalCode: "",
    city: "",
    state: "",
    country: ""
  })

  // State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  // Destructure form data
  const { name, email, password, phone } = formData;

  // Get user data on component mount
  useEffect(() => {
    if (auth?.user) {
      setAddress(auth.user.address)
      setFormData({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone,
      });
    }
  }, [auth?.user]);

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {...formData, address});
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });

        // Update local storage
        let ls = JSON.parse(localStorage.getItem("auth")) || {};
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <Layout title="Your Profile">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
         
          </div>
          <div className="col-md-6">
          
            <div className="form-container" style={{ marginTop: "-40px", display: "flex", flexDirection: "column" }}>
              
              <form onSubmit={handleSubmit}>
               <h4 className="title" style={{ fontStyle: "bol", fontFamily: "Arial, sans-serif" }}>
                   USER PROFILE
              </h4>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                </div>

                
              
              
               <h4 className="title" style={{ fontStyle: "bol", fontFamily: "Arial, sans-serif" }}>
                  Address
              </h4>
                <div className="mb-3">
                  <input
                    type="text"
                    name="streetName"
                    value={address.streetName}
                    onChange={handleAddressChange}
                    className="form-control"
                    placeholder="Address"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="postalCode"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                    className="form-control"
                    placeholder="Postal Code"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="form-control"
                    placeholder="City"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="form-control"
                    placeholder="State"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    className="form-control"
                    placeholder="Country"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
                
                <br/>
                <br/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
