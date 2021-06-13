import ChatsList from "./ChatsList/ChatsList";
import ContactSearch from "./ChatsList/ContactSearch";
import Sidebar from "react-sidebar";
import Header from "./Header";
import { ServerConnection, ServerConnectionContext } from "../Services/ServerConnection";
import React from "react";


class Home extends React.Component {
	state = {  }

	constructor(props) {
		super(props);

		const serverConnection = new ServerConnection("http://localhost:5002");
		serverConnection.connect();
		
		this.state = {
			serverConnection: serverConnection,
		};
	}

	render() { 

		const serverConnectionContextValue = {
			serverConnection: this.state.serverConnection,
		};

		return ( 
			<ServerConnectionContext.Provider value={serverConnectionContextValue}>
        <header className="App-header">
          <Header title="123"></Header>
        </header>
        <div>
          <Sidebar
						sidebar={<div>
							<ContactSearch></ContactSearch>
							<ChatsList></ChatsList>
						</div>}	
            docked={true}
            styles={{ sidebar: {background: "white"} }}>
							<div />
          </Sidebar>
        </div>
      </ServerConnectionContext.Provider>
		 );
	}
}
 
export default Home;