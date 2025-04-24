import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';  // Import useLocation to track route changes
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  const location = useLocation();

  // i can add more routes here if needed
  const hideHeader = location.pathname === '/showitems'|| location.pathname === '/veg' ||  location.pathname === '/nonveg' || location.pathname === '/drinks' || location.pathname === '/desserts' || location.pathname ==='/feastpacks'|| location.pathname ==='/view' || location.pathname ==='/ordersum'|| location.pathname ==='/confirm'|| location.pathname==='/cart'|| location.pathname ==='/confirmm'|| location.pathname==='/order'|| location.pathname ==='/okpage'

  return (
    <>
      {/* Render Header only if we're not on the /cart page */}
      {!hideHeader && <Header />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
