import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthentication } from '../providers/Authentication';

interface AuthenticationRequiredRouteProps {
  children: JSX.Element
}

export default function AuthenticationRequiredRoute(props: AuthenticationRequiredRouteProps): JSX.Element {
  const { authData } = useAuthentication();
  if (!authData || authData.sessionToken === undefined || authData.sessionToken === '') {
    // If user is not logged in, send them back to login
    return <Navigate to="/" />;
  }
  return props.children;
};
