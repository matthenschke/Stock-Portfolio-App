import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import auth from "../auth";
import axios from "axios";
import { Redirect, NavLink } from "react-router-dom";

const Login = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [redirectToHome, setRedirect] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/users/login", { email, password })
      .then(res => {
        if (res.status === 200) {
          auth.authenticateUser(res.data);
          setError(null);
          setRedirect(true);
        }
      })
      .catch(err => setError("email or password is incorrect!"));
  };

  let { from } = props.location.state || { from: { pathname: "/home" } };
  if (redirectToHome) {
    return <Redirect to="/home"></Redirect>;
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
