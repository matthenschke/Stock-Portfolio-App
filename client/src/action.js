const login = userObj => {
  return {
    type: "LOGIN",
    payload: userObj
  };
};

const updateBalance = userObj => {
  return {
    type: "BUY_STOCKS",
    payload: userObj
  };
};

export default {
  login,
  updateBalance
};
