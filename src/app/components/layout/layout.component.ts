import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { ChatComponent } from '../chat/chat.component';
import { ScreenService } from '../../services/screen/screen.service';
import { BreakpointState } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';
import { PlayersComponent } from '../players/players.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MapComponent, ChatComponent, NgIf, PlayersComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public isSmallScreen: boolean = true;
  public isLandscapeScreen: boolean = false;
  constructor(
    private screenService: ScreenService
  ) {}

  ngOnInit() {
    this.screenService.isSmallScreen().subscribe((state: BreakpointState) => {
      this.isSmallScreen = state.matches
    });

    this.screenService.isLandscape().subscribe((state: BreakpointState) => {
      this.isLandscapeScreen = state.matches
    });
  }
}
