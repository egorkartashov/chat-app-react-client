import { isJwtExpired } from 'jwt-check-expiration';

export class AuthService {

  isLoggedIn() {
    let authToken = this.getAccessToken();
		console.log(authToken);
    return authToken != null && authToken !== "" && !isJwtExpired(authToken);
  }

  getAccessToken() {
    let authToken = localStorage.getItem("authToken");
    return authToken ?? "";
  }
}