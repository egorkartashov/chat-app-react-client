import React from 'react';
import { ServerConnectionContext } from '../../Services/ServerConnection';

class ContactSearch extends React.Component {

	static contextType = ServerConnectionContext;

	constructor(props) {
		super(props);

		this.state = {
			inputEmail: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return <div>
			<form onSubmit={this.handleSubmit}>
				<label>
					Добавить контакт:
					<input type="email" value={this.state.inputEmail} onChange={this.handleChange}/>
				</label>
				<input type="submit" value="Добавить"/>
			</form>
		</div>
	}

	handleChange(event) {
		let email = event.target.value;
		this.setState({inputEmail: email});
	}

	handleSubmit(event) {
		event.preventDefault();
		const serverConnection = this.context.serverConnection;
		var result = serverConnection.getUserByEmail(this.state.inputEmail);
		console.log("getUserByEmail");
		console.log(result);
	}
}

export default ContactSearch;