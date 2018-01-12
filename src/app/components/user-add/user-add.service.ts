import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../../util/types/user";
import {environment} from "../../../environments/environment";
import {GameRequest} from "../../util/types/game-request";

@Injectable()
export class UserAddService {

  constructor (private http: HttpClient) {
  }

  public getUsers (): Observable<User[]> {
    return this.http.get<User[]>(`${environment.gameHubServiceUrl}/user`,
      {headers: this.headers()});
  }

  public makeRequest(gameRequest: GameRequest): Observable<any> {
    return this.http.post<any>(`${environment.gameHubServiceUrl}/game-request`,
      gameRequest, {headers: this.headers()});
  }

  private headers(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
