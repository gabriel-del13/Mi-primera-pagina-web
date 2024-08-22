import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/games.service';
import { GameInterface } from '../../interfaces/games.interface';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit{
  games: GameInterface[]=[];  
  
  constructor(private MethodsGameService: GameService){}

  ngOnInit(): void {
    this.getGames()
  }

  getGames(){
    this.MethodsGameService.getGames().subscribe({
      next: (result) =>{
        this.games = result;
        console.log('Games Loaded', this.games);
      },
      error: (err)=>{
        console.log('Error Loading Games:',err);
      }
    })

  }
}
