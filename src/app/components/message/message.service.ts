import {EventEmitter, Injectable} from "@angular/core";
import {Message} from "./message";

@Injectable()
export class MessageService {
  private errorListener: EventEmitter<Message> = new EventEmitter();

  public listenForError(): EventEmitter<Message> {
    return this.errorListener;
  }

  public error(title: string, message?: string): void {
    this.errorListener.emit({
      title: title,
      message: message
    });
  }

}
