import React from "react";
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router";

const handleSuccess = (response, history) => {
	console.log("Successfully logged in with Google");
	console.log(response);
	localStorage.setItem("authToken", response.tokenId);
	history.push("/home");
}

const handleFailure = (response) => {
	console.log("Failure authorizing with Google");
	console.log(response);
}

function Login() {
	const history = useHistory();
	return (  
		<div>
			<GoogleLogin
				clientId="997100717241-922g5fo8qnljvt44mv09ns0p2gdtr86h.apps.googleusercontent.com"
				buttonText="Login"
				onSuccess={(response) => handleSuccess(response, history)}
				onFailure={handleFailure}
				cookiePolicy={'single_host_origin'}
				isSignedIn={true}
			/>
		</div>
	);
}
 
export default Login;