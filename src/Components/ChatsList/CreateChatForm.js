import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PersonPlus from '../../Assets/person-plus.svg';
import Col from 'react-bootstrap/Col';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { ServerConnectionContext } from '../../Services/ServerConnection';


class CreateChatForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			chatName: "",
			newMemberEmail: "",
			members: [],
		}

		this.removeMember = this.removeMember.bind(this);
		this.addMember = this.addMember.bind(this);
		this.handleNewMemberEmailChange = this.handleNewMemberEmailChange.bind(this);
		this.handleChatNameChange = this.handleChatNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	removeMember(memberId) {
		let members = this.state.members;
		let memberToRemove = members.find((member) => member.id === memberId);
		let index = members.indexOf(memberToRemove);
		console.log(index);
		members.splice(index, 1);
		this.setState({members: members});
	}

	addMember() {
		let email = this.state.newMemberEmail;
		let serverConnection = this.context.serverConnection;
		serverConnection.getUserByEmail(email)
			.then(user => {
				if (user === null) {
					console.log("user was not found");
					return;
				}

				console.log("addMember: found user by email");
				let member = {
					id: user.id,
					name: user.name,
					email: user.email,
				}
				let members = this.state.members;
				members.push(member);
				this.setState({members: members});
			});
	}

	handleNewMemberEmailChange(event) {
		let newMemberEmail = event.target.value;
		this.setState({newMemberEmail: newMemberEmail});
	}

	handleChatNameChange(event) {
		let chatName = event.target.value;
		this.setState({chatName: chatName});
	}

	handleSubmit(event) {
		event.preventDefault();
		let newChatroomDto = {
			name: this.state.chatName,
			members: this.state.members.map(member => member.email),
		}
		console.log(`newChatroomDto: ${JSON.stringify(newChatroomDto)}`)
		this.context.serverConnection.createChatroomAsync(newChatroomDto)
			.then(() => {
				console.log("Added new chatroom");
				this.props.onNewChatroomCreated();
			});
	}

	render() { 
		return (
			<Form>
				<Form.Group>
					<Form.Label>
						Название чата
					</Form.Label>
					<Form.Control 
						type="text" placeholder="Название чата" 
						value={this.state.chatName} onChange={this.handleChatNameChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Участники
					</Form.Label>
					<Form.Row>
						<Col lg={10}>
							<Form.Control 
								type="email" placeholder="Добавьте участника"
								value={this.state.newMemberEmail} onChange={this.handleNewMemberEmailChange}
							>
							</Form.Control>
						</Col>
						<Col lg={2} flexDirection="row">
							<Button 
								className="button-right"
								onClick={this.addMember}
							>
								<img src={PersonPlus} />
							</Button>
						</Col>
					</Form.Row>
					{this.state.members.map((member, _) => {
						return (
						<ListGroupItem onClick={() => this.removeMember(member.id)}>
							{member.name}
							<Button >
								-
							</Button>
						</ListGroupItem>);
					})}
				</Form.Group>
				<Button type="submit" variant="primary" onClick={this.handleSubmit}>
					Создать
				</Button>
			</Form>
		);
	}
}

CreateChatForm.contextType = ServerConnectionContext;
 
export default CreateChatForm;