import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Forgotpass = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestionAnswer: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Function to validate the form
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Password and Confirm Password must match';
      isValid = false;
    }

    if (!formData.securityQuestionAnswer) {
      errors.securityQuestionAnswer = 'Answer to the security question is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Navigate to the Cart page
      navigate('/cart');
    }
  };

  return (
    <>
      <div
        className="container shadow border bg-light"
        style={{
          marginTop: '-90px',
          paddingBottom: '10px',
          position: 'relative',
          minHeight: '400px',
          width: '1000px'
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal pt-5 text-danger">Forgot Password</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Email address</label>
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">New Password</label>
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingSecurityQuestion"
              name="securityQuestionAnswer"
              placeholder="Answer"
              value={formData.securityQuestionAnswer}
              onChange={handleChange}
            />
            <label htmlFor="floatingSecurityQuestion">
              What is your favorite food?
            </label>
            {errors.securityQuestionAnswer && (
              <small className="text-danger">{errors.securityQuestionAnswer}</small>
            )}
          </div>

          <div className="py-5">
            <Link to="/showitems" className="btn btn-danger py-2 w-100" onClick={() => console.log('Navigating to /cart')}>
              Reset Password
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Forgotpass;
