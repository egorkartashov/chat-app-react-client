import './Header.css';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import AuthService from '../Services/AuthService';
import AuthButton from './Auth/AuthButton';

class Header extends React.Component {

	render() {
		let userInfoString = ""
		if (AuthService.isLoggedIn()) {
			let userInfo = AuthService.getUserInfo();
			userInfoString = `${userInfo.name} (${userInfo.email})`;
		}
		
		return (
		<Navbar className="bg-dark justify-content-between">
			<Navbar.Collapse className="justify-content-end">
				<AuthButton />
			</Navbar.Collapse>
		</Navbar>
		)
	}
}

export default Header;