import './NotLoggedIn.css';
import { useHistory } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import Alert from 'react-bootstrap/Alert';

function NotLoggedIn() {

	let history = useHistory();
	let isLoggedIn = AuthService.isLoggedIn();
	if (isLoggedIn) {
		history.push('/home');
		return <div></div>
	}

	return <h4 className="not-logged-in-container">
		<Alert variant="danger">
			<div>
				Необходимо авторизоваться, чтобы пользоваться приложением ¯\_(ツ)_/¯
			</div>
			<div>
				Нажмите на кнопку входа в правом верхнем углу.
			</div>
		</Alert>
		
	</h4>
}

export default NotLoggedIn;