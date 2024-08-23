import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/games.service';
import { GameInterface } from '../../interfaces/games.interface';
import { PricePipe } from '../../pipes/price.pipe';
@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, FormsModule, PricePipe],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {
  games: GameInterface[] = [];
  pageSize: number = 12;
  currentPage: number = 1;
  totalPages: number = 0;
  searchTerm: string = '';

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentPage = +params['page'] || 1;
      this.getGames();
    });
  }

  getGames() {
    this.gameService.getGames().subscribe({
      next: (result) => {
        this.games = result;
        this.totalPages = Math.ceil(this.games.length / this.pageSize);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  get paginatedGames(): GameInterface[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.games.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.router.navigate(['/games', page]);
  }

  onSearch() {
    this.router.navigate(['/search'], { queryParams: { term: this.searchTerm } });
  }
}