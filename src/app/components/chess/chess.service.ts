import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ChessService {

  constructor(private http: HttpClient) {
  }

  public test(): void {
    console.log('test service');
  }
}
