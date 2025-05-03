import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useCart, CartContext } from "./CartContext"; // Importing the cart context
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const { cart } = useCart(); // Access cart from context
  const { setSelectedCategory } = useContext(CartContext);
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth();

  // Calculate the total number of items in the cart
  const totalItems = cart?.length || 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger text-white">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand text-white d-flex align-items-center " to="/">
          <img
            src="/images/b.png"
            alt="Logo"
            width="60"
            height="60"
            className="d-inline-block my-4"
          />
          𑐰𑐖𑑂𑐬 𑐥𑐮𑐵
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/">Home</Link>
            </li>

            {/* Categories Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle text-white"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item text-dark" onClick={() => { setSelectedCategory('all'); navigate('/showItems'); }}>All items</button></li>
                <li><button className="dropdown-item text-dark" onClick={() => { setSelectedCategory('Veg'); navigate('/showItems'); }}>Veg</button></li>
                <li><button className="dropdown-item text-dark" onClick={() => { setSelectedCategory('Nonveg'); navigate('/showItems'); }}>Non-veg</button></li>
                <li><button className="dropdown-item text-dark" onClick={() => { setSelectedCategory('Beverage'); navigate('/showItems'); }}>Drinks</button></li>
                <li><button className="dropdown-item text-dark" onClick={() => { setSelectedCategory('Desserts'); navigate('/showItems'); }}>Desserts</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-dark" onClick={() => { setSelectedCategory('feastpacks'); navigate('/showItems'); }}>Special Feast Packages</button></li>
              </ul>
            </li>

            <li className="nav-item">
              <button className="nav-link text-white" onClick={() => { setSelectedCategory('feastpacks'); navigate('/showItems'); }}>Special Feast Packages</button>
            </li>

            {/* Cart Link with Dynamic Count */}
            <li className="nav-item">
              {isAuthenticated && (
                <Link className="nav-link text-white position-relative" to="/cart">
                  Cart
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-danger">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
            </li>
            {isAuthenticated &&
              (
                <li className="nav-item"><Link to='/OrderPage' className="nav-link text-white">Orders</Link></li>
              )}
          </ul>

          {/* Search Bar */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar