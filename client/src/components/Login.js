import React, { useState } from "react";
import { useDispatch } from "react-redux";
import actions from "../actions";

import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect, NavLink } from "react-router-dom";

const Login = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [redirectToHome, setRedirect] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/users/login", { email, password })
      .then(response => {
        if (response.status === 200) {
          setError(null);
          dispatch(actions.login(response.data));
          setRedirect(true);
        }
      })
      .catch(err => setError("email or password is incorrect!"));
  };

  let { from } = props.location.state || { from: { pathname: "/home" } };
  if (redirectToHome) {
    return <Redirect to={from}></Redirect>;
  }
  return (
    <Container className="login text-center">
      <h1>Sign In</h1>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <Form.Control
          type="password"
          className="mt-3"
          placeholder="Password"
          required
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className=" mt-3 text-danger">{error}</p>}
        <Button variant="primary" type="submit" className=" mt-3">
          Login
        </Button>
        <NavLink to="/register">
          <Button variant="primary" className=" ml-5 mt-3">
            Register!
          </Button>
        </NavLink>
      </Form>
    </Container>
  );
};

export default Login;
