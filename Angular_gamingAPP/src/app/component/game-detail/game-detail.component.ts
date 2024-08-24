import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/games.service';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, PricePipe, RouterLink],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit {
  game: any;
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getGame(id);
    });
  }
  
  getGame(id: number) {
    this.gameService.getGameById(id).subscribe({
      next: (result) => {
        this.game = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goBack() {
    const lastPage = localStorage.getItem('lastGamesPage') || '1';
    this.router.navigate(['/games', lastPage]);
  }

  onSearch() {
    this.router.navigate(['/search'], { queryParams: { term: this.searchTerm } });
  }
}