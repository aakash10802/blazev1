import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import SearchInput from "../../components/Form/SearchInput";
import { SiBookalope } from "react-icons/si";
import useCategory from "../../hooks/useCategory";


const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const {cart} = useCart();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <Link to="/" className="navbar-brand">
        &nbsp;&nbsp; <SiBookalope />s&nbsp;&nbsp;Blaze-Store
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ display: 'flex', alignItems: 'center' }}>
  <SearchInput />
  <li className="nav-item">
    <NavLink to="/" className="nav-link">
      Home
    </NavLink>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to={"/categories"} data-bs-toggle="dropdown">
              Categories
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"/categories"}>
                  All Categories
                </Link>
              </li>
              {categories?.map((c) => (
                <li key={c.slug}>
                  <Link className="dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {!auth?.user ? (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleLogout} to="/login" className="dropdown-item">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          )}
          <li className="nav-item">
            <NavLink to="/cart" className="nav-link">
              Cart 
              <Badge
                count={cart?.length || 0}
                showZero
                offset={[2, -15]}
                style={{
                  padding: '-10px 10px',
                  fontSize: '14px',
                }}
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
