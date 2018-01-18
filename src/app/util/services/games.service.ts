import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Game} from "../types/game";

@Injectable()
export class GamesService {

  constructor(private http: HttpClient) {
  }

  public getGame(gameId: number): Observable<Game> {
    return this.http.get<Game>(`${environment.gameHubServiceUrl}/game/${gameId}`, {headers: this.headers()});
  }

  public updateGame(game: Game): Observable<any> {
    return this.http.post<any>(`${environment.gameHubServiceUrl}/game/update`, game);
  }

  private headers(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
