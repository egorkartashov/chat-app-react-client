function ChatListItem(props) {
	return <div>
		<h4>{props.name}</h4>
		<h5>{props.lastMessage}</h5>
	</div>
}

export default ChatListItem;