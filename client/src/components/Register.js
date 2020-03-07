import React, { useState } from "react";
import { useDispatch } from "react-redux";
import action from "../action";

import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Register = props => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [redirectToHome, setRedirect] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/users/signup", { name, email, password })
      .then(res => {
        if (res.status === 200) {
          dispatch(action.login(res.data));
          setError(null);
          setRedirect(true);
        }
      })
      .catch(err => setError("account already exists with email!!"));
  };

  let { from } = props.location.state || { from: { pathname: "/home" } };
  if (redirectToHome) {
    return <Redirect to={from}></Redirect>;
  }
  return (
    <Container className="login text-center">
      <h1>Register</h1>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Name"
          required
          onChange={e => setName(e.target.value)}
        />
        <Form.Control
          className="mt-3"
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
        {error && <p className="mt-2 text-danger">{error}</p>}
        <Button variant="primary" type="submit" className="mt-2">
          Create Account
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
