export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loggedIn: true
      };
    case "BUY_STOCKS":
      state.user.balance = action.payload;
      return {
        ...state
      };

    default:
      return state;
  }
};
