import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
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
  errorTimeout: any;
  loadingBarInterval: any;

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

  constructor(private messageService: MessageService,
              private changeDetector: ChangeDetectorRef) {
  }

  private displayError(): void {
    this.message = this.messageQueue.shift();
    if (this.message) {
      this.updateProgressBar(this.message.timeOut ? this.message.timeOut : 5000);
      this.errorTimeout = window.setTimeout(() => {
        this.displayError();
      }, this.message.timeOut ? this.message.timeOut : 5000);
    } else {
      this.message = null;
    }
  }

  private dismissAllErrors(): void {
    this.messageQueue = [];
    this.message = null;
    window.clearTimeout(this.errorTimeout);
  }

  private updateProgressBar(time: number): void {
    this.changeDetector.detectChanges();
    const bar = document.getElementById('loadingBar');
    let width = 1;
    this.loadingBarInterval = window.setInterval(() => {
      if (width >= 100) {
        window.clearInterval(this.loadingBarInterval);
      } else {
        width += (1000 / time);
        bar.style.width = `${width}%`;
      }
    }, 10);
  }

}
