import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import authService from '../services/AuthService';

const PrivateRoutes = () => {
   return (
      authService.isConnected() ?
         <>
            <Header />
            <Outlet />
            <Footer />
         </>
         :
         <Navigate to="/login" />
   );
};

export default PrivateRoutes;

