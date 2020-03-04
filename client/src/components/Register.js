import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Auth from "../auth";
import { testData } from "../data";
import { Redirect, NavLink } from "react-router-dom";

const Register = props => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [pw, setPw] = useState(null);
  const [error, setError] = useState(null);
  const [redirectToHome, setRedirect] = useState(false);

  const accountExists = () => {
    if (email === testData.email) {
      return true;
    }

    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (accountExists()) {
      setError("Account already exists!!");
    } else {
      Auth.authenticateUser(email);
      setError(null);
      setRedirect(true);
    }
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
          onChange={e => setPw(e.target.value)}
        />
        {error && <p className="mt-2 text-danger">{error}</p>}
        <Button variant="primary" type="submit" className="mt-3">
          Create Account
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
