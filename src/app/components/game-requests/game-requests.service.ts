import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {GameRequest} from "../../util/types/game-request";

@Injectable()
export class GameRequestsService {

  constructor(private http: HttpClient) {
  }

  public getGameRequests(game: string, userName: string): Observable<GameRequest[]> {
    return this.http.get<GameRequest[]>(`${environment.gameHubServiceUrl}/game-request/${game}/${userName}`,
      {headers: this.headers()});
  }

  private headers(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
