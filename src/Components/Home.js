import './Home.css';
import ChatsList from "./ChatsList/ChatsList";
import ModalShownOnButtonClick from "./Common/ModalShownOnButtonClick";
import { ServerConnection, ServerConnectionContext } from "../Services/ServerConnection";
import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import AddContactForm from "./ChatsList/AddContactForm";
import CreateChatForm from "./ChatsList/CreateChatForm";


class Home extends React.Component {
	state = {  }

	constructor(props) {
		super(props);

		const serverConnection = new ServerConnection("http://localhost:5002");

		this.state = {
			serverConnection: serverConnection,
			chats: []
		};

		this.handleAddContact = this.handleAddContact.bind(this);
		this.handleCreateChat = this.handleCreateChat.bind(this);
	}

	componentDidMount() {
		let serverConnection = this.state.serverConnection;
		serverConnection.connect().then(() => {
			console.log("Connected!");
			serverConnection.getChats()
				.then((chats) => {
					console.log("Received chats!");
					console.log(chats);
					this.setState({chats: chats})
				});
		});
	}

	handleAddContact(user, message) {
		this.state.serverConnection.sendPersonalMessageAsync(user.email, message)
			.then(() => console.log("Sent personal message!"))
			.catch((error) => console.log(`Error sending personal message, error = ${JSON.stringify(error)}`));
	}

	handleCreateChat(newChat) {
		console.log(`handleCreateChat: ${newChat}`);
	}

	render() { 

		const serverConnectionContextValue = {
			serverConnection: this.state.serverConnection,
		};

		return ( 
			<ServerConnectionContext.Provider value={serverConnectionContextValue}>
				<Container fluid>
					<Row>
						<Col lg={3}>
							<Row>
								<Col>
									<ModalShownOnButtonClick 
										title="Новый контакт"
										body={<AddContactForm onAddContact={this.handleAddContact}></AddContactForm>}
									>	
										Новый контакт
									</ModalShownOnButtonClick>
								</Col>
								<Col>
									<ModalShownOnButtonClick 
										title="Новый чат"
										body={<CreateChatForm onAddContact={this.handleCreateChat}></CreateChatForm>}
									>	
										Новый чат
									</ModalShownOnButtonClick>
								</Col>
							</Row>
							<Row>
								<Col>
									<ChatsList></ChatsList>
								</Col>
							</Row>
						</Col>
						<Col lg={9}>
							<div>Chat window!</div>
						</Col>
					</Row>
				</Container>
      </ServerConnectionContext.Provider>
		 );
	}
}
 
export default Home;