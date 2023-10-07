import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";  

const Dashboard = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();  

  return (
    <Layout title={"Your Blaze Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="card p-4 ">
              <h2>Your Blaze-Store Profile</h2>
              <div className="mt-4">
                <h4>Name: {auth?.user?.name}</h4>
                <h4>Email: {auth?.user?.email}</h4><br/><hr/>
                <h4 className="text-center">Address Details </h4>
                <p>Street Name: {auth.user.address.streetName}</p>
                <p>Postal Code: {auth.user.address.postalCode}</p>
                <p>City: {auth.user.address.city}</p>
                <p>State: {auth.user.address.state}</p>
                <p>Country: {auth.user.address.country}</p>
              </div>
            
              <button className="btn btn-primary mt-3" onClick={() => navigate("/dashboard/user/profile")}>Edit Profile</button>
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
