import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header/';

const Layout = () => {
  const location = useLocation();
  const shouldShowHeader = !['/signin', '/signup'].includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
