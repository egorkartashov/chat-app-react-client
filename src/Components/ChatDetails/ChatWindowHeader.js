import Alert from 'react-bootstrap/Alert';

function ChatWindowHeader(props) {
  

  return (
    <Alert variant="info">
      {props.chat.name}
    </Alert>
  );
}

export default ChatWindowHeader;