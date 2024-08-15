import { Component } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Player } from '../../models/message';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [NgIf, MatListModule, MatIconModule, DatePipe],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
    public players: Player[] = []
  
  constructor(
    private chatService: ChatService
  ) {
    this.chatService.players.subscribe((list: Player[]) => {
        this.players = list;
    })
  }

  ngOnInit() { 

   }
}
