import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../../util/types/user";

@Injectable()
export class SignonService {

  constructor(private http: HttpClient) {
  }

  signon (userName: string, password: string): Observable<User> {
    const body = {
      userName: userName,
      password: password
    };

    return this.http.post <User> ('', body, {headers: this.headers()});
  }

  private headers(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
