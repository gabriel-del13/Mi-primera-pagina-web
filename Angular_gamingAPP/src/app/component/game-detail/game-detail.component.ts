import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/games.service';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, PricePipe],
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
      const id = params['id'];
      const title = params['title'];
      this.getGame(id, title);
    });
    
    // Recuperar el término de búsqueda del almacenamiento local
    this.searchTerm = localStorage.getItem('lastSearchTerm') || '';
  }
  
  getGame(id: number, title: string) {
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
    const lastSearchTerm = localStorage.getItem('lastSearchTerm');
    if (lastSearchTerm) {
      // Si hay un término de búsqueda, volver a la página de búsqueda
      this.router.navigate(['/search'], { queryParams: { term: lastSearchTerm } });
    } else {
      // Si no hay término de búsqueda, volver a la última página de juegos
      const lastPage = localStorage.getItem('lastGamesPage') || '1';
      this.router.navigate(['/games', lastPage]);
    }
  }

  onSearch() {
    localStorage.setItem('lastSearchTerm', this.searchTerm);
    this.router.navigate(['/search'], { queryParams: { term: this.searchTerm } });
  }
}