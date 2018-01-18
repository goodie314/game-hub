import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {GameRequest} from "../../util/types/game-request";
import {Game} from "../../util/types/game";

@Injectable()
export class GameRequestsService {

  constructor(private http: HttpClient) {
  }

  public getGameRequests(game: string, userName: string): Observable<GameRequest[]> {
    return this.http.get<GameRequest[]>(`${environment.gameHubServiceUrl}/game-request/${game}/${userName}`,
      {headers: this.headers()});
  }

  public acceptRequest(request: GameRequest): Observable<Game> {
    return this.http.post<Game>(`${environment.gameHubServiceUrl}/game-request/accept`, request,
      {headers: this.headers()});
  }

  public getActiveGames(gameDescription: string, userName: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.gameHubServiceUrl}/game/${gameDescription}/${userName}`,
      {headers: this.headers()});
  }

  public deleteGame(game: Game): void {
    this.http.delete(`${environment.gameHubServiceUrl}/game/${game.gameId}`).subscribe();
  }

  public declineRequest(request: GameRequest): void {
    this.http.post(`${environment.gameHubServiceUrl}/game-request/decline/${request.gameRequestId}`, null).subscribe();
  }

  private headers(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
