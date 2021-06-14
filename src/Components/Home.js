import "./Home.css";
import {
	ServerConnection,
  ServerConnectionContext,
} from "../Services/ServerConnection";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidePanel from "./ChatsList/SidePanel";
import ChatWindow from "./ChatDetails/ChatWindow";

class Home extends React.Component {
  state = {};

  constructor(props) {
    super(props);

    const serverConnection = new ServerConnection("http://localhost:5002");

    this.state = {
      serverConnection: serverConnection,
      chats: [],
      selectedChatId: null
    };

    this.handleAddContact = this.handleAddContact.bind(this);
    this.handleCreateChat = this.handleCreateChat.bind(this);
    this.handleOnChatClicked = this.handleOnChatClicked.bind(this);
    this.fetchChats = this.fetchChats.bind(this);
  }

  componentDidMount() {
    let serverConnection = this.state.serverConnection;
    serverConnection.connect().then(() => {
      console.log("Connected!");
      this.fetchChats();
    });
  }

  handleAddContact(user, message) {
    this.state.serverConnection
      .sendMessageByEmailAsync(user.email, message)
      .then(() => {
        console.log("Sent personal message!");
        this.fetchChats();
      })
      .catch((error) =>
        console.log(
          `Error sending personal message, error = ${JSON.stringify(error)}`
        )
      );
  }

  handleCreateChat(newChat) {
    console.log(`handleCreateChat: ${newChat}`);
    this.fetchChats();
  }

  handleOnChatClicked(chat) {
    console.log(`handleOnChatClicked: ${JSON.stringify(chat)}`);
    this.setState({selectedChatId: chat.id});
  }

  fetchChats() {
    let serverConnection = this.state.serverConnection;
    serverConnection.getChats().then((chats) => {
      console.log("Received chats!");
      this.setState({ chats: chats });
    });
  }

  render() {
    const serverConnectionContextValue = {
      serverConnection: this.state.serverConnection,
    };

    return (
      <ServerConnectionContext.Provider value={serverConnectionContextValue}>
        <Container fluid className="main-container">
          <Row className="row-height-100">
            <Col lg={4}>
							<SidePanel 
                selectedChatId={this.state.selectedChatId}
								chats={this.state.chats}
								onChatClicked={this.handleOnChatClicked}
                onAddContact={this.handleAddContact}
                onNewChatroomCreated={this.handleCreateChat}
                className="sidepanel"
							/>
						</Col>
            <Col lg={8}>
              <ChatWindow
                className="chat-window"
                selectedChatId={this.state.selectedChatId}
              >
              </ChatWindow>
            </Col>
          </Row>
        </Container>
      </ServerConnectionContext.Provider>
    );
  }
}

export default Home;
