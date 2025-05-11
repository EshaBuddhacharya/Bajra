import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';  // Import useLocation to track route changes
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  const location = useLocation();

  // i can add more routes here if needed
  const headerHiddenRoutes = [
    '/showitems', '/veg', '/nonveg', '/drinks', '/desserts', 
    '/feastpacks', '/view', '/ordersum', '/confirm', '/cart', 
    '/confirmm', '/order', '/okpage', '/login', '/playground'
  ];
  const footerHiddenRoutes = [
    '/login', '/admin', '/playground'
  ];

  const hideHeader = headerHiddenRoutes.includes(location.pathname);
  const hideFooter = footerHiddenRoutes.includes(location.pathname);

  return (
    <>
      {/* Render Header only if we're not on the /cart page */}
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
