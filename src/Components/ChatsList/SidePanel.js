import { Component } from 'react';
import Row from 'react-bootstrap/Row';
import ModalShownOnButtonClick from './../Common/ModalShownOnButtonClick';
import AddContactForm from './AddContactForm';
import CreateChatForm from './CreateChatForm';
import Col from 'react-bootstrap/Col';
import PersonPlus from '../../Assets/person-plus.svg';
import CreateChatIcon from '../../Assets/chat-icon.svg';
import { ChatList } from 'react-chat-elements';
import ChatIcon from '../../Assets/chat-left-dots.svg';

class SidePanel extends Component {
  state = {};
  render() {

    return (
      <div>
        <Row className="justify-space-between">
          <ModalShownOnButtonClick
            title="Новый контакт"
            body={
              <AddContactForm
                onAddContact={this.props.onAddContact}
              ></AddContactForm>
            }
          >
            <img src={PersonPlus} />
          </ModalShownOnButtonClick>

          <ModalShownOnButtonClick
            title="Новый чат"
            body={
              <CreateChatForm
                onNewChatroomCreated={this.props.onNewChatroomCreated}
              ></CreateChatForm>
            }
          >
						<img src={CreateChatIcon} /> 
          </ModalShownOnButtonClick>
        </Row>
        <Row>
          <Col>
            <ChatList 
              onClick={this.props.onChatClicked}
              dataSource={this.props.chats.map(chatDto => 
                ({ 
                  id: chatDto.id,
                  title: chatDto.name,
                  subtitle: chatDto.lastMessage,
                  date: Date.parse(chatDto.lastMessageTime),
                  avatar: ChatIcon
                }))}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SidePanel;
