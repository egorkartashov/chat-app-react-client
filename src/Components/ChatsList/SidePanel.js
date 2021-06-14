import { Component } from 'react';
import Row from 'react-bootstrap/Row';
import ModalShownOnButtonClick from './../Common/ModalShownOnButtonClick';
import AddContactForm from './AddContactForm';
import CreateChatForm from './CreateChatForm';
import Col from 'react-bootstrap/Col';
import PersonPlus from '../../Assets/person-plus.svg';
import ChatIcon from '../../Assets/chat-icon.svg';
import { ChatList } from 'react-chat-elements';

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
						<img src={ChatIcon} /> 
          </ModalShownOnButtonClick>
        </Row>
        <Row>
          <Col>
            <ChatList 
              dataSource={this.props.chats}
              onClick={this.props.onChatClicked}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SidePanel;
