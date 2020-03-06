class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.activeUser = null;
  }
  // method to authenticate user after user signs up or logs in
  authenticateUser = activeUser => {
    this.isAuthenticated = true;
    this.activeUser = activeUser;
  };

  // method to deauthenticate user when user logs out
  logOut = () => {
    this.isAuthenticated = false;
    this.activeUser = null;
  };
}

export default new Auth();
