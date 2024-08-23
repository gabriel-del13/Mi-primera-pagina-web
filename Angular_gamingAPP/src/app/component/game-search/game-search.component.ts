import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/games.service';
import { GameInterface } from '../../interfaces/games.interface';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-game-search',
  standalone: true,
  imports: [CommonModule, FormsModule, PricePipe],
  templateUrl: './game-search.component.html',
  styleUrl: './game-search.component.css'
})
export class GameSearchComponent implements OnInit {
  searchResults: GameInterface[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'] || '';
      this.searchGames();
    });
  }

  searchGames() {
    this.gameService.getGames().subscribe({
      next: (games: GameInterface[]) => {
        this.searchResults = games.filter((game: GameInterface) => 
          game.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.totalPages = Math.ceil(this.searchResults.length / this.pageSize);
        this.currentPage = 1;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  get paginatedSearchResults(): GameInterface[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.searchResults.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onSearch() {
    this.router.navigate(['/search'], { queryParams: { term: this.searchTerm } });
    this.searchGames();
  }
}