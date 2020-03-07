export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loggedIn: true
      };
    default:
      return state;
  }
};
