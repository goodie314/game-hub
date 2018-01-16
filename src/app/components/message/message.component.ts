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
  messageTimeout: any;
  loadingBarInterval: any;

  ngOnInit(): void {
    this.messageService.listenForMessage().subscribe((message) => {
      if (this.messageQueue.length || this.message) {
        this.messageQueue.push(message);
      } else {
        this.messageQueue.push(message);
        this.displayMessage();
      }
    });
  }

  constructor(private messageService: MessageService,
              private changeDetector: ChangeDetectorRef) {
  }

  private displayMessage(): void {
    this.message = this.messageQueue.shift();
    this.changeDetector.detectChanges();
    const container = document.getElementById('container');
    if (this.message) {
      this.updateProgressBar(this.message.timeOut ? this.message.timeOut : 5000);
      container.classList.add(this.message.type);
      this.messageTimeout = window.setTimeout(() => {
        this.displayMessage();
      }, this.message.timeOut ? this.message.timeOut : 5000);
    }
  }

  private dismissAllMessages(): void {
    this.messageQueue = [];
    this.message = null;
    window.clearTimeout(this.messageTimeout);
    window.clearInterval(this.loadingBarInterval);
  }

  private updateProgressBar(time: number): void {
    const bar = document.getElementById('loadingBar');
    bar.classList.add(`${this.message.type}-bar`);
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
