const login = userObj => {
  return {
    type: "LOGIN",
    payload: userObj
  };
};

const updateBalance = newBalance => {
  return {
    type: "BUY_STOCKS",
    payload: newBalance
  };
};

export default {
  login,
  updateBalance
};
