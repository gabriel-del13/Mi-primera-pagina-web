import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameInterface } from '../interfaces/games.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  API_GAMES_URL: string = 'http://127.0.0.1:8000/api/games/';
  API_PLATFORMS_URL: string = 'http://127.0.0.1:8000/api/platforms/';

  constructor(private Http: HttpClient) { }

  getGames(): Observable<any> {

    return this.Http.get(this.API_GAMES_URL).pipe(res=>res)

  }

  getPlatforms(): Observable<any> {

    return this.Http.get(this.API_PLATFORMS_URL);
  }

  getGameById(id: number): Observable<GameInterface> {
    return this.Http.get<GameInterface>(`${this.API_GAMES_URL}/games/${id}`);
  }
}
