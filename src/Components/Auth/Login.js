import React from "react";
import { GoogleLogin } from 'react-google-login';
import { Redirect } from "react-router";
import { GOOGLE_CLIENT_ID } from "../../Constants";
import AuthService from "../../Services/AuthService";



function Login(props) {
	const isLoggedIn = AuthService.isLoggedIn();
	if (isLoggedIn) {
		return <Redirect to="/home" />;
	}

	const handleSuccess = (response) => {
		console.log("Successfully logged in with Google");
		localStorage.setItem("authToken", response.tokenId);
		
		let userInfo = {
			email: response.profileObj.email,
			name: response.profileObj.name,
			imageUrl: response.profileObj.imageUrl
		}

		let userInfoJson = JSON.stringify(userInfo);
		localStorage.setItem("userInfo", userInfoJson);
	
		props.history.push("/home");
	}

	const handleFailure = (response) => {
		console.log("Failure authorizing with Google");
		console.log(response);
	}

	return (  
		<div>
			<GoogleLogin
				clientId={GOOGLE_CLIENT_ID}
				buttonText="Login"
				onSuccess={handleSuccess}
				onFailure={handleFailure}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
}
 
export default Login;