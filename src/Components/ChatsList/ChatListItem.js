import Card from 'react-bootstrap/Card';

function ChatListItem(props) {
	return (
	<Card>
		<Card.Body>
			<Card.Title>{props.name}</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">{props.lastMessage}</Card.Subtitle>
		</Card.Body>
	</Card>
	);
}

export default ChatListItem;