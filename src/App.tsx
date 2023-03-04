import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import ClinicianPortalPage from './pages/ClinicianPortal';
import AuthenticationRequiredRoute from './components/AuthenticationRequiredRoute';
import Constants from './shared/Constants';

export default function App() {
  return (
    <Routes>
      <Route path={Constants.ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={Constants.ROUTES.PORTAL} element={
        <AuthenticationRequiredRoute>
          <ClinicianPortalPage />
        </AuthenticationRequiredRoute>
      } />
    </Routes>
  );
}
