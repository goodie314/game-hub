import {Component, EventEmitter, Input, Output} from "@angular/core";
import {POPUP_ANIMATION} from "./confirm.animation";

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
  animations: [POPUP_ANIMATION]
})

export class ConfirmComponent {

  // @Input()
  // styleClass: string;
  // @Input()
  // message: string;
  // @Input()
  // disabled: boolean;
  // @Output()
  // beforeConfirm = new EventEmitter();
  // @Output() confirm = new EventEmitter();

  message: string;
  accept: EventEmitter<boolean> = new EventEmitter();
  popup = false;

  public confirm (message: string): EventEmitter<boolean> {
    this.popup = true;
    this.message = message;
    return this.accept;
  }
}
