import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
      // Show a success toast notification
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error(error);
      // Show an error toast notification if the update fails
      toast.error("Failed to update order status");
    }
  };

  const handleShippedChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-shipped/${orderId}`, {
        shipped: value,
      });
      getOrders();
      // Show a success toast notification
      toast.success("Order shipment status updated successfully");
    } catch (error) {
      console.error(error);
      // Show an error toast notification if the update fails
      toast.error("Failed to update order shipment status");
    }
  };

  // Placeholder function for handling order confirmation
  const handleOrderConfirmation = (orderId) => {
    // Implement the logic to navigate to the order confirmation page here
    // You can use a router or redirect the user as needed
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-8">
          <h1 className="text-center">All Orders</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Buyer</th>
                <th scope="col">Date</th>
                <th scope="col">Payment</th>
                <th scope="col">Quantity</th>
                <th scope="col">Shipped</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((o, i) => (
                <tr key={o._id}>
                  <td>{i + 1}</td>
                  <td>
                    <Select
                      bordered={false}
                      onChange={(value) => handleChange(o._id, value)}
                      defaultValue={o?.status}
                    >
                      {status.map((s, i) => (
                        <Option key={i} value={s}>
                          {s}
                        </Option>
                      ))}
                    </Select>
                  </td>
                  <td>{o?.buyer?.name}</td>
                  <td>{moment(o?.createAt).fromNow()}</td>
                  <td>
                    <Select
                      bordered={false}
                      onChange={(value) =>
                        handleChange(o._id, value, "paymentStatus")
                      }
                      defaultValue={o?.paymentStatus}
                    >
                      <Option value="Success">Success</Option>
                      <Option value="Failed">Failed</Option>
                    </Select>
                  </td>
                  <td>{o?.products?.length}</td>
                  <td>
                    <Select
                      bordered={false}
                      onChange={(value) => handleShippedChange(o._id, value)}
                      defaultValue={o?.shipped ? "Shipped" : "Not Shipped"}
                    >
                      <Option value="Shipped">Shipped</Option>
                      <Option value="Not Shipped">Not Shipped</Option>
                    </Select>
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => handleOrderConfirmation(o._id)}
                    >
                     Update Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
