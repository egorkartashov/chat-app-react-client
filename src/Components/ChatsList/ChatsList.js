import React from 'react';
import ChatListItem from './ChatListItem.js';

class ChatsList extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			chats: [
				{
					key: ["Chatroom-123"],
					name: "Первый чат",
					type: "Chatroom",
					lastMessage: "Hello!"
				},
				{
					key: ["PersonalChat-123"],
					name: "Второй чат",
					type: "PersonalChat",
					lastMessage: "123"
				}
			]
		}
	}

	render() {
		return <div>
			{this.state.chats.map((value, _) => {
				return <ChatListItem key={value.key} name={value.name} lastMessage={value.lastMessage}></ChatListItem>
			})}
		</div>
	}
}

export default ChatsList;