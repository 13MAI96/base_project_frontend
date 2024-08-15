import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { ChatService } from '../../services/chat/chat.service';
import { ChatMessage } from '../../models/message';
import { NgIf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips'


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, MatListModule, NgIf, MatChipsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  public chatHistory: ChatMessage[] = []

  constructor(
    private socketService: ChatService
  ){
    this.socketService.messages.subscribe((history: ChatMessage[]) => {
      this.chatHistory = history
    })
  }

  sendMessage(textBox: HTMLInputElement){
    if(textBox.value.length > 0){
      this.socketService.sendMessage(new ChatMessage(textBox.value, 'Me', Date.now()))
      
      textBox.value = ''
    }
  }


}
