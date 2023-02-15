import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import authService from '../Services/auth.service';

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

