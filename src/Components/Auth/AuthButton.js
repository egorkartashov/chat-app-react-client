import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from "../../Services/AuthService";
import { GOOGLE_CLIENT_ID } from '../../Constants';
import { GoogleLogin, GoogleLogout } from 'react-google-login';


function AuthButton() {
	let history = useHistory();

	const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());

	function handleSuccess(response) {
		console.log("Successfully logged in with Google");
		localStorage.setItem("authToken", response.tokenId);
		
		let userInfo = {
			email: response.profileObj.email,
			name: response.profileObj.name,
			imageUrl: response.profileObj.imageUrl
		}

		let userInfoJson = JSON.stringify(userInfo);
		localStorage.setItem("userInfo", userInfoJson);
		setIsLoggedIn(true);
		
		history.push("/home");
	}

	function handleFailure (response) {
		console.log("Failure authorizing with Google");
		console.log(response);
	}

	function logout() {
		AuthService.logout();
		history.push('/login');
		setIsLoggedIn(false);
	}

	if (isLoggedIn) {
		return (
			<GoogleLogout
				clientId={GOOGLE_CLIENT_ID}
				buttonText="Logout"
				onLogoutSuccess={logout} />
		);
	}
	else {
		return (
			<GoogleLogin
				clientId={GOOGLE_CLIENT_ID}
				buttonText="Login"
				onSuccess={handleSuccess}
				onFailure={handleFailure}
				cookiePolicy={'single_host_origin'}
			/>
		);
	}
}

export default AuthButton;