import './ChatListItem.css';
import Card from 'react-bootstrap/Card';

function ChatListItem(props) {
	return (
		<div>
			<div className="chat-card">
				<div className="chat-name">{props.name}</div>
				<div className="chat-last-message">{props.lastMessage}</div>
			</div>
				{/* <Card className="chat-card">
					<Card.Body>
						<Card.Title className="chat-name">{props.name}</Card.Title>
						<Card.Subtitle className="chat-last-message text-muted">{props.lastMessage}</Card.Subtitle>
					</Card.Body>
				</Card> */}
		</div>
	);
}

export default ChatListItem;