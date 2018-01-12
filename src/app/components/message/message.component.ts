import {Component, OnInit} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./message";

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
  messageQueue: Message[] = [];
  message: Message;

  ngOnInit(): void {
    this.messageService.listenForError().subscribe((message) => {
      if (this.messageQueue.length || this.message) {
        this.messageQueue.push(message);
      } else {
        this.messageQueue.push(message);
        this.displayError();
      }
    });
  }

  constructor(private messageService: MessageService) {
  }

  private displayError(): void {
    this.message = this.messageQueue.shift();
    if (this.message) {
      console.log(this.message);
      window.setTimeout(() => {
        this.displayError();
      }, 3000);
    } else {
      this.message = null;
      console.log('end of queue');
    }
  }

}
