import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext"; // Importing the cart context

const Navbar = () => {
  const { cart } = useCart(); // Access cart from context

  // Calculate the total number of items in the cart
  const totalItems =  cart?.length || 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger">
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
                <li><Link className="dropdown-item text-dark" to="/showitems">All items</Link></li>
                <li><Link className="dropdown-item text-dark" to="/veg">Veg</Link></li>
                <li><Link className="dropdown-item text-dark" to="/nonveg">Non-veg</Link></li>
                <li><Link className="dropdown-item text-dark" to="/drinks">Drinks</Link></li>
                <li><Link className="dropdown-item text-dark" to="/desserts">Desserts</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item text-dark" to="/feastpacks">Special Feast Packages</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/feastpacks">Special Feast Packages</Link>
            </li>

            {/* Cart Link with Dynamic Count */}
            <li className="nav-item">
              <Link className="nav-link text-white position-relative" to="/cart">
                Cart
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-danger">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
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