import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from "axios";
import { AuthContext } from '../contexts/AuthContext'
import Cookies from 'js-cookie'
import Header from '../component/Header';

const Registerpage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    countryCode: '+977'
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook for navigation
  const { setIsAuthenticated, setAuthCookie } = useContext(AuthContext)


  // Function to validate form
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      errors.firstName = 'First Name must contain only letters';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.lastName = 'Last Name must contain only letters';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.phone) {
      errors.phone = 'Phone Number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone Number must be exactly 10 digits';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      try {
        const response = axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/auth/register`, {
          "name": `${formData.firstName} ${formData.lastName}`,
          "password": formData.password,
          "email": formData.email,
          "address": formData.address,
          "phone": `${formData.countryCode} ${formData.phone}`
        }, { withCredentials: true })
        setIsAuthenticated(true)
        setAuthCookie(Cookies.get('loginToken'))
        console.log('user registereed Successfully');
        navigate('/showitems'); // Redirect to the Cart page if validation passes
      }
      catch (error) {
        alert('Error registering user: ', error)
      }
    }
  };

  return (
    <>
      <Header></Header>
      <div
        className="container shadow border bg-light pt-5"
        style={{
          position: 'relative',
          minHeight: '400px',
          width: '1000px'
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-floating d-flex justify-content-between gap-3">
            <div className="form-floating" style={{ flex: 1 }}>
              <input
                type="text"
                className="form-control"
                id="floatingFirstName"
                name="firstName"
                placeholder="Your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <label htmlFor="floatingFirstName">First Name</label>
              {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
            </div>
            <div className="form-floating" style={{ flex: 1 }}>
              <input
                type="text"
                className="form-control"
                id="floatingLastName"
                name="lastName"
                placeholder="Your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <label htmlFor="floatingLastName">Last Name</label>
              {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="form-floating d-flex justify-content-between gap-4 pt-2">
            {/* Email Field */}
            <div className="form-floating" style={{ flex: 1 }}>
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                name="email"
                placeholder="abc@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="floatingEmail">Email</label>
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            {/* Phone Field */}
            <div className="form-floating" style={{ flex: 1 }}>
              <div className="input-group" style={{ display: 'flex', width: '100%' }}>
                {/* Country Code */}
                <select
                  name="countryCode"
                  className="form-select"
                  value={formData.countryCode}
                  disabled
                  style={{ height: '58px', width: '80px' }} // Fixed width for country code
                >
                  <option value="+977">+977</option>
                </select>

                {/* Phone Input */}
                <input
                  type="text"
                  className="form-control"
                  id="floatingPhone"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  style={{ height: '58px', flexGrow: 1 }} // Fixed height & flexible width
                />
              </div>
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>
          </div>

          {/* Password & Address */}
          <div className="form-floating d-flex justify-content-between gap-4 pt-2">
            <div className="form-floating" style={{ flex: 1 }}>
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            <div className="form-floating" style={{ flex: 1 }}>
              <input
                type="text"
                className="form-control"
                id="floatingAddress"
                name="address"
                placeholder="Your address"
                value={formData.address}
                onChange={handleChange}
              />
              <label htmlFor="floatingAddress">Address</label>
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="container pt-4" style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="btn btn-danger w-25">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registerpage;
