import './ChatWindow.css';
import React from "react";
import { MessageList } from 'react-chat-elements';
import { ServerConnectionContext } from "../../Services/ServerConnection";
import { Input } from 'react-chat-elements';
import { Button as SendButton } from 'react-chat-elements';
import Button from 'react-bootstrap/Button';

class ChatWindow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			selectedChatId: null,
			inputMessage: ""
		}

		this.fetchMessages = this.fetchMessages.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSendMessage = this.handleSendMessage.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.selectedChatId !== prevProps.selectedChatId) {
			this.fetchMessages();
		}
	}

	render() {

		return ( 
			<div className="chat-window-container">
				<div className="refresh-messages-button">
					<Button 
						variant="light"
						onClick={this.fetchMessages}
					>
						Обновить сообщения
					</Button>
				</div>
				<div className="message-list-container">
					<MessageList 
						dataSource={this.state.messages}
					/>
				</div>
				<div className="message-input-container">
					<Input
						placeholder="New message..."
						onChange={this.handleOnChange}
						rightButtons={
							<SendButton
								color="white"
								backgroundColor="black"
								text="Send"
								onClick={this.handleSendMessage}
								 />}
						/>
				</div>
			</div>
		 );
	}

	handleOnChange(event) {
		console.log("handleOnChange");
		this.setState({inputMessage: event.target.value});
	}

	handleSendMessage() {
		console.log(`sendMessage: ${this.state.inputMessage}`);
		const serverConnection = this.context.serverConnection;

		let message = {
			text: this.state.inputMessage,
			sentTimeUtc: new Date(),
		}

		let selectedChatId = this.props.selectedChatId;
		serverConnection.sendMessageToChatAsync(selectedChatId, message)
			.then(_ => {
				console.log(`ChatWindow: Sent message ${this.state.inputMessage} to chat ${selectedChatId}`);
				this.setState({inputMessage: ""});
				this.fetchMessages();
			})
			.catch(error => console.log(`ChatWindow: Error while sending message to chat: ${error}`));
	}

	fetchMessages() {
		if (this.props.selectedChatId === undefined)
			return;

		let selectedChatId = this.props.selectedChatId;
		
		const serverConnection = this.context.serverConnection;
		serverConnection.getChatMessages(selectedChatId)
			.then(messages => {
				console.log(`ChatWindow: Received messages, count = ${messages.length}`);
				this.setState({messages: messages});
			})
			.catch(error => console.log(`ChatWindow: Error while requesting chat messages: ${error}`));
	}
}

ChatWindow.contextType = ServerConnectionContext;
 
export default ChatWindow;