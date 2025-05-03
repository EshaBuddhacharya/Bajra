import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../component/Header';
import { toast } from 'react-toastify';

const SignInpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const backendBaseUrl = import.meta.env.REACT_APP_BACKEND_BASE_URL;
  const { login } = useContext(AuthContext)

  const validateForm = () => {
    let errors = {};
    let isValid = true;
    let passwordErrors = [];

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      passwordErrors.push('Password is required');
      isValid = false;
    } else {
      if (password.length < 8) {
        passwordErrors.push('Password must be at least 8 characters long');
      }

    }
    if (passwordErrors.length > 0) {
      errors.password = passwordErrors;
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(backendBaseUrl) //debugging
    if (validateForm()) {
      try {
        await login(email, password)
        console.log("Logged in successfully") // debugging
        navigate('/showitems'); // Navigate to the Cart page if validation passes

      }
      catch (error) {
          toast.error("Error signing in");
      }
    }
  };

  return (
    <>
     <Header />
      <div className="container shadow border bg-light" style={{ paddingBottom: "10px", position: "relative", minHeight: "400px", width: "1000px" }}>
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal pt-5" style={{ color: "red" }}><b>Please sign in</b></h1>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
            {errors.password && (
              <div className="text-danger">
                {errors.password.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
          </div>

          <button type="submit" className="btn btn-danger me-8" style={{ width: '120px' }}>Sign in</button>

          <div className="d-flex justify-content-between" style={{ paddingTop: "25px" }}>
            <Link to="/registerin" style={{ color: "grey" }}>Create an account?</Link>
            <Link to="/forgotpass" style={{ color: "grey" }}>Forgot Password?</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInpage;


