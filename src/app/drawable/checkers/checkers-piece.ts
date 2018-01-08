
import {Vec2} from "../../util/types/vec2";
import {Shade} from "../../util/enums/shade";
import {BoardSquare} from "./board-square";

export class CheckersPiece {
  color: string;
  pos: Vec2;
  radius: number;
  shade: Shade;
  king: boolean;
  destination: Vec2;
  velocity: Vec2;
  speed = .1;
  disabled = false;

  constructor (color: string, pos: Vec2, radius: number, shade: Shade) {
    this.color = color;
    this.pos = pos;
    this.radius = radius;
    this.shade = shade;
    this.king = false;
    this.destination = this.pos;
    this.velocity = new Vec2(0, 0);
  }

  resize (position: Vec2, radius: number) {
    this.pos = position;
    this.destination = this.pos;
    this.radius = radius;
  }

  draw (ctx: CanvasRenderingContext2D) {
    if (!this.pos.close(this.destination)) {
      this.pos = this.pos.add(this.velocity);
    } else if (this.disabled) {
      return;
    } else {
      this.velocity = new Vec2(0, 0);
    }
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // avoid crashing on resizing to negative numbers
    if (this.radius > 0) {
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    }
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    // avoid crashing on resizing to negative numbers
    if (this.radius * .75 > 0) {
      ctx.arc(this.pos.x, this.pos.y, this.radius * .75, 0, 2 * Math.PI);
    }
    ctx.stroke();
    ctx.closePath();

    if (this.king) {
      ctx.fillStyle = '#f0f022';
      ctx.beginPath();
      ctx.moveTo(this.pos.x - this.radius * .75, this.pos.y);
      ctx.lineTo(this.pos.x, this.pos.y - this.radius * .75);
      ctx.lineTo(this.pos.x + this.radius * .75, this.pos.y);
      ctx.lineTo(this.pos.x, this.pos.y + this.radius *.75);
      ctx.lineTo(this.pos.x - this.radius * .75, this.pos.y);
      ctx.stroke();
      ctx.closePath();
      ctx.fill();
    }
  }

  move (square: BoardSquare): void {
    this.destination = square.middlePos;
    this.velocity = this.destination.minus(this.pos);
    this.velocity = this.velocity.times(this.speed);
  }

  moveOffBoard (destination: Vec2): void {
    this.destination = destination;
    this.velocity = this.destination.minus(this.pos);
    this.velocity = this.velocity.times(this.speed);
    this.disabled = true;
  }

  equals (piece: CheckersPiece) {
    return this.pos === piece.pos;
  }
}
