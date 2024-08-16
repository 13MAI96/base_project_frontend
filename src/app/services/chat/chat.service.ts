import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ChatMessage, Player } from '../../models/message'
import { getCookie } from '../../utils/cookie';
import { Environment } from '../../../environment/dev.environment';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: WebSocket;
  private history: ChatMessage[] = []
  private voidPlayer: Player[] = [] 
  public players: BehaviorSubject<Player[]> = new BehaviorSubject(this.voidPlayer);
  public messages: BehaviorSubject<ChatMessage[]> = new BehaviorSubject(this.history)
  private connect_intents: number = 0

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.socket = new WebSocket(`${Environment.ws_protocol}${Environment.api_url}/feed/ws/${this.loginService.token}`);
    this.socket.onopen = (ev: Event) => {
      this.connect_intents = 0;
      console.log("Socket opened.")
    };
    this.socket.onclose = () => {
      this.connect_intents++
      if(this.connect_intents < 3) {
        this.socket = new WebSocket(`${Environment.ws_protocol}${Environment.api_url}/feed/ws/${this.loginService.token}`);
        return
      }
      console.log("Socket closed.")
      this.router.navigate(["login"])
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
