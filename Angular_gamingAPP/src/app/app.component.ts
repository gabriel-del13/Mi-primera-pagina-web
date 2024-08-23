import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GamesComponent } from './component/games/games.component';
import { GameSearchComponent } from './component/game-search/game-search.component';
import { GameDetailComponent } from './component/game-detail/game-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GamesComponent, GameSearchComponent, GameDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular_gamingAPP';
}