import { Routes } from '@angular/router';
import { GamesComponent } from './component/games/games.component';
import { GameSearchComponent } from './component/game-search/game-search.component';
import { GameDetailComponent } from './component/game-detail/game-detail.component';
import { GameFilterComponent } from './component/game-filter/game-filter.component';

export const routes: Routes = [
  { path: '', redirectTo: '/games/1', pathMatch: 'full' },
  { path: 'games', redirectTo: '/games/1', pathMatch: 'full' },
  { path: 'games/:page', component: GamesComponent },
  { path: 'search', component: GameSearchComponent },
  { path: 'game/:id/:title', component: GameDetailComponent},
  { path: 'filtered-games', component: GameFilterComponent}

];