import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useCart, CartContext } from "./CartContext"; // Importing the cart context
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"
import { Search } from 'lucide-react';
import { TextField } from '@radix-ui/themes'

const Navbar = () => {
  const { cart, setSearch, search } = useCart(); // Access cart from context
  const { setSelectedCategory } = useContext(CartContext);
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth();

  // Calculate the total number of items in the cart
  const totalItems = cart?.length || 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger text-white sticky-top px-0 px-lg-5">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand text-white d-flex align-items-center gap-2 " to="/#hero"
          onClick={(e) => {
            e.preventDefault()
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
        <img
          src="/images/b.png"
          alt="Logo"
          width="70"
          height="70"
          className="d-inline-block my-4"
        />
        <h4>

          𑐰𑐖𑑂𑐬 <br /> 𑐥𑐮𑐵
        </h4>
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

      <div className="collapse navbar-collapse mx-4" id="navbarSupportedContent">
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
        <TextField.Root
          placeholder="Search"
          value={search}
          type='search'
          color='white'
          style={{ width: '16rem' }}
          onChange={(e) => setSearch(e.target.value)}
        >
          <TextField.Slot>
            <Search height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>
    </div>
    </nav >
  );
};

export default Navbar