import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/games.service';
import { GameInterface } from '../../interfaces/games.interface';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-game-filter',
  standalone: true,
  imports: [CommonModule, RouterLink, PricePipe],
  templateUrl: './game-filter.component.html',
  styleUrls: ['./game-filter.component.css']
})
export class GameFilterComponent implements OnInit {
  filteredGames: GameInterface[] = [];
  pageSize: number = 12;
  currentPage: number = 1;
  totalPages: number = 0;
  selectedPlatform: string = '';

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedPlatform = params['platform'] || '';
      this.currentPage = +params['page'] || 1;
      this.getFilteredGames();
    });
  }

  getFilteredGames() {
    this.gameService.getGames().subscribe({
      next: (games: GameInterface[]) => {
        this.filteredGames = games.filter(game =>
          game.platforms.some(platform => platform.name === this.selectedPlatform)
        );
        this.totalPages = Math.ceil(this.filteredGames.length / this.pageSize);
      },
      error: (err) => console.log(err)
    });
  }

  get paginatedGames(): GameInterface[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredGames.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
  }

  goBack() {
    localStorage.removeItem('lastSearchTerm');
    const lastPage = localStorage.getItem('lastGamesPage') || '1';
    this.router.navigate(['/games', lastPage]);
  }
}