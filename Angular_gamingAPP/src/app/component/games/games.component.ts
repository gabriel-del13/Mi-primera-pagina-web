import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/games.service';
import { GameInterface } from '../../interfaces/games.interface';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [],
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
      },
      error: (err)=>{
        console.log(err);
      }
    })

  }
}
