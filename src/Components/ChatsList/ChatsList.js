import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { ChatItem } from 'react-chat-elements';

class ChatsList extends React.Component {

	constructor(props) {
		super(props);

		this.chatCardClicked = this.chatCardClicked.bind(this);
	}

	chatCardClicked(chatId) {
		this.props.onChatClicked(chatId);
	}

	render() {
		return <ListGroup>
			{this.props.chats.map((value, _) => {
				return (
				<ListGroup.Item 
					action onClick={() => this.chatCardClicked(value.id)}
					active={value.id.toString() === this.props.selectedChatId}
				>
					<ChatItem
						title={value.name}
						subtitle={value.lastMessage}
						
					>

					</ChatItem>
				</ListGroup.Item>);
			})}
		</ListGroup>
	}
}

export default ChatsList;