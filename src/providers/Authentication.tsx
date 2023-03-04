import React, { createContext, useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Constants from '../shared/Constants';

export interface AuthData {
  sessionToken: string
}

const setupProviderValue = () => {
  // Different forms of state persistence can be used here. For the sake of this assessment I'm sticking with useState.
  // However, if you want to keep the user logged in on refresh, etc. I would suggest a method to save the token
  // in a localStorage or cookie type mechanism.
  const [authData, setAuthData] = useState<AuthData>({ sessionToken: '' });
  const navigate = useNavigate();

  const login = async (loginAuthData: AuthData) => {
    setAuthData(loginAuthData);
    navigate(Constants.ROUTES.PORTAL);
  }
  // Might not end up using this for the assessment, but doesn't hurt to have on hand in case
  const logout = async () => {
    setAuthData({ sessionToken: '' });
    navigate(Constants.ROUTES.LOGIN, { replace: true });
  }

  return useMemo( () => ({
      authData,
      login,
      logout
    }),
    [authData]
  );
}

export const AuthenticationContext = createContext({} as ReturnType<typeof setupProviderValue>);

interface AuthenticationProviderProps {
  children?: JSX.Element
}

export const AuthenticationProvider = (props: AuthenticationProviderProps) => {
  return (
    <AuthenticationContext.Provider value={setupProviderValue()}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
