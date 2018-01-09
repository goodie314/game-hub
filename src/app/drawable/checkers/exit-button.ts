import {Vec2} from "../../util/types/vec2";
import {EventEmitter} from "@angular/core";

export class ExitButton {
  location: Vec2;
  width: number;
  height: number;
  exit: EventEmitter<any> = new EventEmitter();

  constructor (location: Vec2) {
    this.location = location;
    this.width = 0;
    this.height = 0;
  }

  contains (clickLocation: Vec2) {
    if (clickLocation.x > this.location.x && clickLocation.x < (this.location.x + this.width)) {
      if (clickLocation.y > this.location.y && clickLocation.y < (this.location.y + this.height)) {
        return true;
      }
    }

    return false;
  }

  draw (ctx: CanvasRenderingContext2D) {
    const dim = ctx.measureText('X').width + 20;
    this.width = dim;
    this.height = dim;
    ctx.fillStyle = '#818181';
    ctx.fillRect(this.location.x, this.location.y, this.width, this.height);
    ctx.fillStyle = '#ff0000';
    ctx.font = '24px Times New Roman';
    ctx.fillText('X', this.location.x + 10, this.location.y + this.height - 10);
  }

  clickHandler (x, y) {
    if (this.contains(new Vec2(x, y))) {
      this.exit.emit();
    }
  }
}
