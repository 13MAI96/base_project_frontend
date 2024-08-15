import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // providers: [LoginService, AuthGuard]
})
export class AppComponent implements OnInit{
  title = 'basic_project_frontend';

  ngOnInit(): void {}
  
}
