class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.activeUser = "";
  }
  // method to authenticate user after user signs up or logs in
  authenticateUser = activeUser => {
    this.isAuthenticated = true;
    this.activeUser = activeUser;
  };

  // method to deauthenticate user when user logs out
  logOut = () => {
    this.isAuthenticated = false;
    this.activeUser = "";
  };
}

export default new Auth();
