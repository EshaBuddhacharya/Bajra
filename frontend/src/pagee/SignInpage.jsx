import React, { useState, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, provider, signInWithPopup } from '../firebase';
import Header from '../component/Header';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import FurthureSignIn from '../component/FurthureSignIn'

const InputField = ({ id, label, type, value, onChange, error }) => (
  <div className="form-floating mb-3">
    <input
      type={type}
      className={`form-control ${error ? 'is-invalid' : ''}`}
      id={id}
      placeholder={label}
      value={value}
      onChange={onChange}
    />
    <label htmlFor={id}>{label}</label>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

const OrDivider = () => (
  <div className="text-center text-secondary mb-2 d-flex align-items-center justify-content-center">
    <hr className="flex-grow-1" />
    <span className="px-2">OR</span>
    <hr className="flex-grow-1" />
  </div>
);

const GoogleButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="d-inline-flex align-items-center px-4 py-2 rounded-pill border-0"
    style={{ backgroundColor: '#DEE3E8' }}
  >
    <img src="/images/google_icon.webp" alt="Google" width="32" height="32" className="me-2" />
    <span>Login with Google</span>
  </button>
);

const FooterLinks = () => (
  <div className="d-flex justify-content-center mt-4">
    <Link to="/registerin" className="text-secondary">
      Create account?
    </Link>
    {/* <Link to="/forgotpass" className="text-secondary">
      Forgot Password?
    </Link> */}
  </div>
);

const SignInForm = ({ email, setEmail, password, setPassword, errors, handleSubmit, handleGoogleLogin }) => (
  <div className="container shadow border bg-light rounded-2 p-4" style={{ maxWidth: '30rem', minHeight: '400px' }}>
    <form onSubmit={handleSubmit}>
      <h1 className="h3 mb-4 text-center"><b>Please sign in</b></h1>

      <InputField
        id="floatingInput"
        label="Email address"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={errors.email}
      />

      <InputField
        id="floatingPassword"
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={errors.password}
      />

      <div className="d-flex justify-content-center mb-3">
        <button type="submit" className="btn btn-danger" style={{ width: '8rem' }}>
          Sign in
        </button>
      </div>

      <OrDivider />

      <div className="text-center">
        <GoogleButton onClick={handleGoogleLogin} />
      </div>

      <FooterLinks />
    </form>
  </div>
);

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFurthureSignIn, setIsFurthureSignIn] = useState(false);
  const [authToken, setAuthToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { axiosInstance, setIsAuthenticated, setUser } = useAuth();

  const validate = useCallback(() => {
    const errs = {};
    if (!email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = 'Invalid email format';

    const pw = [];
    if (!password) pw.push('Password is required');
    else if (password.length < 8)
      pw.push('Password must be at least 8 characters');
    if (pw.length) errs.password = pw.join(', ');

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [email, password]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(email, password);
      navigate('/showitems');
    } catch (err) {
      toast.error(err.message || 'Sign-in failed');
    }
  };

  const handleGoogleLogin = async e => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();
      const refreshToken = firebaseUser.refreshToken;
      setAuthToken(idToken);
      setRefreshToken(refreshToken);

      try {
        const response = await axiosInstance.post(
          '/api/auth/loginWithGoogle',
          { authToken: idToken, refreshToken }
        );
        setIsAuthenticated(true)
        setUser(response.data?.user)
        if (response.data?.user?.role === 'admin'){
          return navigate('/admin')
        }
        return navigate('/showItems');
      } catch (error) {
        if (error.response?.status === 400) {
          setIsFurthureSignIn(true);
        } else {
          toast.error('An error occurred during Google login');
        }
      }
    } catch (err) {
      console.error('Google login error:', err);
      toast.error(err.message || 'Google sign-in failed');
    }
  };

  return (
    <>
      <Header />
      {isFurthureSignIn && (
        <FurthureSignIn authToken={authToken} refreshToken={refreshToken} />
      )}
      {!isFurthureSignIn && (
        <SignInForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          errors={errors}
          handleSubmit={handleSubmit}
          handleGoogleLogin={handleGoogleLogin}
        />
      )}
    </>
  );
};

export default SignInPage;
