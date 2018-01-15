import {Injectable} from "@angular/core";
import {Game} from "../../util/types/game";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class CheckersService {

  constructor(private http: HttpClient) {
  }

  public getGame(gameId: number): Observable<Game> {
    return this.http.get<Game>(`${environment.gameHubServiceUrl}/game/${gameId}`, {headers: this.headers()});
  }

  public updateGame(game: Game): void {
    this.http.post(`${environment.gameHubServiceUrl}/game/update`, game).subscribe();
  }

  private headers(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
