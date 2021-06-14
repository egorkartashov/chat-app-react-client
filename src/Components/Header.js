import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../Constants';
import AuthService from '../Services/AuthService';
import Login from './Auth/Login';
import Navbar from 'react-bootstrap/Navbar';


class Header extends React.Component {

  logout(response) {
    AuthService.logout();
  }

	render() {

		const isLoggedIn = AuthService.isLoggedIn();

		let button;
		if (isLoggedIn) {
			button = (
				<GoogleLogout
					clientId={GOOGLE_CLIENT_ID}
					buttonText="Logout"
					onLogoutSuccess={this.logout}>
				</GoogleLogout>	
			);
		}
		else {
			button = (
				<Login></Login>
			);
		}

		return (
		<Navbar className="bg-dark justify-content-between">
			<Navbar.Collapse className="justify-content-end">
				{button}	
			</Navbar.Collapse>
		</Navbar>
		)
	}
}

export default Header;