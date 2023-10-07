import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8 mt-4"> {/* Add margin-top here */}
            <div className="card w-80 p-2">       
              <div className="card-header py-3">
                <h3 className="card-title mb-2 text-center">Admin Information</h3>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="info-item">
                      <label>Name:</label>
                      <p>{auth?.user?.name}</p>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <p>{auth?.user?.email}</p>
                    </div>
                    <div className="info-item">
                      <label>Contact:</label>
                      <p>{auth?.user?.phone}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* Add more admin-related information here */}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

