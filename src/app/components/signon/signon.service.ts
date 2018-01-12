import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../../util/types/user";
import {environment} from "../../../environments/environment";

@Injectable()
export class SignonService {

  private signedInUser: User;
  private signInEvent: EventEmitter<User> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  public signon (userName: string, password: string, existing: boolean): Observable<User> {
    const body = {
      userName: userName,
      password: password
    };

    if (existing) {
      return this.http.post <User>(`${environment.gameHubServiceUrl}/sign-in`,
        body, {headers: this.headers()});
    } else {
      return this.http.post <User>(`${environment.gameHubServiceUrl}/sign-up`,
        body, {headers: this.headers()});
    }
  }

  public getSignonEvent(): EventEmitter<User> {
    return this.signInEvent;
  }

  public signonSuccessful(user: User): void {
    this.setSignedInUser(user);
    this.signInEvent.emit(user);
  }

  public getSignedInUser(): User {
    return this.signedInUser;
  }

  public setSignedInUser(user: User): void {
    this.signedInUser = user;
  }

  private headers(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
