const login = userObj => {
  return {
    type: "LOGIN",
    payload: userObj
  };
};

export default {
  login
};
