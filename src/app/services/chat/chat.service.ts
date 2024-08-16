import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ChatMessage, Player } from '../../models/message'
import { getCookie } from '../../utils/cookie';
import { Environment } from '../../../environment/dev.environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: WebSocket;
  private history: ChatMessage[] = []
  private voidPlayer: Player[] = [] 
  public players: BehaviorSubject<Player[]> = new BehaviorSubject(this.voidPlayer);
  public messages: BehaviorSubject<ChatMessage[]> = new BehaviorSubject(this.history)

  constructor(
    private loginService: LoginService
  ) {
    this.socket = new WebSocket(`${Environment.ws_protocol}${Environment.api_url}/feed/ws/${loginService.token}`);
    this.socket.onopen = (ev: Event) => {
      console.log("Socket opened.")
    };
    this.socket.onclose = () => {
      console.log("Socket closed.")
    }
    this.socket.onmessage = (message: MessageEvent) => {
      let temp = this.messages.value
      let newMessage: ChatMessage = JSON.parse(message.data)
      if(newMessage.type == 'message' || newMessage.type == 'notify'){
        console.log("Message or Notify", newMessage.type, message)
        temp.push(newMessage)
        this.messages.next(temp)
      } else if(newMessage.type == 'command'){

      } else if(newMessage.type = 'data'){
        this.players.next(newMessage.data)
      } else {
        console.log(newMessage)
      }
    }
   }

   sendMessage(message: ChatMessage){
    this.socket.send(JSON.stringify(message))
   }
}
