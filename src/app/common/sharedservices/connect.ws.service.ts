import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.services';


const CHAT_URL = 'ws://52.66.147.141:3000';

export interface Message {
	author: string,
	message: string
}

@Injectable()
export class ChatService {
	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = response.data;
				return data;
			});
	}
}
