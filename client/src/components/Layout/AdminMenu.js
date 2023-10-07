import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center ">
      <div className="list-group dashboard-menu">
        <h4 className="list-group-item list-group-item-info"
         style={{
          marginTop: '25px',
        }}>ADMIN PANEL</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
         CREATE CATEGORY
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          CREATE PRODUCT
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
        >
          PRODUCTS
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          UPDATE ORDERS
        </NavLink>
        {/* Uncomment the following section if you have a Users link */}
        {/* <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink> */}
      </div>
    </div>
  );
};

export default AdminMenu;
