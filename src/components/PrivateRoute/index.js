import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import  {getToken, getCurrentInstitution} from '../../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = getToken();
  const { isAdmin } = token ? getCurrentInstitution(token) : false;

  return rest.isAdminRoute && !isAdmin && token ? (
    <Redirect to="/dashboard" />
  ) : (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      }
    />
  );
};

export default PrivateRoute;
