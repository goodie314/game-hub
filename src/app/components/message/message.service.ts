import {EventEmitter, Injectable} from "@angular/core";
import {Message} from "./message";

@Injectable()
export class MessageService {
  private messageListener: EventEmitter<Message> = new EventEmitter();

  public listenForMessage(): EventEmitter<Message> {
    return this.messageListener;
  }

  public error(title: string, message?: string, timeOut?: number): void {
    this.messageListener.emit({
      title: title,
      type: 'error',
      message: message,
      timeOut: timeOut
    });
  }

  public success(title: string, message?: string, timeOut?: number): void {
    this.messageListener.emit({
      title: title,
      type: 'success',
      message: message,
      timeOut: timeOut
    });
  }

}
