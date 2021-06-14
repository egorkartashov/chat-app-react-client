import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class CreateChatForm extends React.Component {
	state = {  }
	render() { 
		return (
			<Form>
				<Form.Group>
					<Form.Label>
						Название чата
					</Form.Label>
					<Form.Control type="text" />
				</Form.Group>
				<Button type="submit" variant="primary">
					Создать
				</Button>
			</Form>
		);
	}
}
 
export default CreateChatForm;