import * as signalR from '@microsoft/signalr';
import { AuthService } from './AuthService';
import React from 'react';

export class ServerConnection {
	constructor(serverUrl) {
		this.serverUrl = serverUrl;
		this.authService = new AuthService();
    this.connected = false;
	}

	connect() {
		const accessToken = this.authService.getAccessToken();
    if (accessToken === "") {
      console.log("Access token not found");
      return;
    }

    const options = {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => {
        return `Bearer ${accessToken}`;
      }
    }

    let connection  = new signalR.HubConnectionBuilder()
      .withUrl(`${this.serverUrl}/signalr`, options)
      .build();

    connection.on("NotifyMessageReceived", (message) => { 
      console.log("Server received message and responded: " + message);
    });

    connection
      .start()
      .then(() => {
        console.log('Connection started');
      })
      .catch(err => console.log('Error while starting connection: ' + err));

    this.connection = connection;
    this.connected = true;
	}

  async getUserByEmail(email) {
    if (!this.connected)
      return;

    let result = await this.connection.invoke("GetUserByEmailAsync", email);
    console.log(result);
    return result;
  }
}

export const ServerConnectionContext = React.createContext(new ServerConnection(""));