import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import ClinicianPortalPage from './pages/ClinicianPortal';
import AuthenticationRequiredRoute from './components/AuthenticationRequiredRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/portal" element={
        <AuthenticationRequiredRoute>
          <ClinicianPortalPage />
        </AuthenticationRequiredRoute>
      } />
    </Routes>
  );
}
