import * as signalR from '@microsoft/signalr';
import AuthService from './AuthService';
import React from 'react';

export class ServerConnection {
	constructor(serverUrl) {
		this.serverUrl = serverUrl;
    this.connected = false;
	}

  isConnected() {
    return this.connection !== undefined && this.connection.connected;
  }

	async connect() {
		const accessToken = AuthService.getAccessToken();
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
      .withUrl(`${this.serverUrl}/chatshub`, options)
      .build();

    connection.on("NotifyMessageReceivedAsync", (message) => { 
      console.log("Server received message and responded: " + message);
    });

    connection.onreconnected(() => {
      console.log("onreconnected");
      this.connected = true;
    });

    connection.onclose(() => {
      console.log("onconnected");
      this.connected = false;
    });

    this.connection = connection;

    let connectionPromise = this.connection.start();
    return connectionPromise;
	}

  async getChats() {
    return await this.connection.invoke("GetChatsAsync");
  }

  async getUserByEmail(email) {
    let result = await this.connection.invoke("GetUserByEmailAsync", email);
    console.log(result);
    return result;
  }

  async sendPersonalMessageAsync(email, messageText) {
    let messageDto = {
      text: messageText,
      sentTimeUtc: new Date(),
    }

    console.log(messageDto);

    this.connection.invoke("SendPersonalMessageAsync", email, messageDto);
  }
}

export const ServerConnectionContext = React.createContext(new ServerConnection(""));