import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthenticated } from 'redux/selectors';

const RestrictedRoute = ({ children, navigateTo = '/contacts' }) => {
  const authenticated = useSelector(selectAuthenticated);

  return authenticated ? <Navigate to={navigateTo} replace /> : children;
};

export default RestrictedRoute;
