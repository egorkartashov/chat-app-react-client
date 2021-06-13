import React from 'react';
import ChatListItem from './ChatListItem.js';

class ChatsList extends React.Component {

	render() {
		return <div>
			<ChatListItem name="123" lastMessage="Hello!"></ChatListItem>
		</div>
	}
}

export default ChatsList;