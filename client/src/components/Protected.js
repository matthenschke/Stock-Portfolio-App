import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector(state => state.loggedIn);
  return (
    <Route
      {...rest}
      render={props => {
        if (loggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default Protected;
