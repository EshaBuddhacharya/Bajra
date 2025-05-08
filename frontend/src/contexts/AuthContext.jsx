import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  const logout = useCallback(async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
      withCredentials: true,
    });

    // Attach access token to headers
    instance.interceptors.request.use(
      config => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Intercept 401s and try to refresh token
    instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          originalRequest.url !== '/api/auth/refresh' &&
          refreshToken
        ) {
          originalRequest._retry = true;
          try {
            const res = await axios.post(
              `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/refresh`,
              { refreshToken },
              { withCredentials: true }
            );
            setAccessToken(res.data.accessToken);
            setUser(res.data.user || null);
            setIsAuthenticated(true);

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return axiosInstance(originalRequest);
          } catch (err) {
            await logout();
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [accessToken, refreshToken, logout]);

  const login = useCallback(async (email, password) => {
    const response = await axiosInstance.post('/api/auth/signin', { email, password });
    const { idToken, refreshToken, user } = response.data;

    setAccessToken(idToken);
    setRefreshToken(refreshToken);
    setUser(user);
    setIsAuthenticated(true);
  }, [axiosInstance]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        setAccessToken(res.data.accessToken);
        setUser(res.data.user || null);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setAccessToken(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const authCookie = Cookies.get('loginToken');

  const value = useMemo(() => ({
    user,
    accessToken,
    isAuthenticated,
    authCookie,
    login,
    logout,
    useAuth,
    axiosInstance,
    setIsAuthenticated,
  }), [user, accessToken, isAuthenticated, setIsAuthenticated, authCookie, login, logout, axiosInstance, useAuth]);

if (loading) return null; // or a spinner

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
