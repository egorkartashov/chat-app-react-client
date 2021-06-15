import './ChatWindowHeader.css';
import Alert from 'react-bootstrap/Alert';

function ChatWindowHeader(props) {
  return (
    <Alert variant="info" className="chat-name">
      <div>Название чата: {props.chat.name}</div>
    </Alert>
  );
}

export default ChatWindowHeader;