import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../layouts/Menu';
import authService from '../services/AuthService';

const PrivateRoutes = () => {
   return (
      authService.isConnected() ?
         <>
            <Header />
            <Outlet />
         </>
         :
         <Navigate to="/login" />
   );
};

export default PrivateRoutes;

