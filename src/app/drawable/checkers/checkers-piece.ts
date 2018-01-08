
import {Vec2} from "../../util/types/vec2";
import {Shade} from "../../util/enums/shade";
import {BoardSquare} from "./board-square";

export class CheckersPiece {
  color: string;
  pos: Vec2;
  radius: number;
  shade: Shade;
  king: boolean;

  constructor (color: string, pos: Vec2, radius: number, shade: Shade) {
    this.color = color;
    this.pos = pos;
    this.radius = radius;
    this.shade = shade;
    this.king = false;
  }

  resize (position: Vec2, radius: number) {
    this.pos = position;
    this.radius = radius;
  }

  draw (ctx: CanvasRenderingContext2D) {
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
    this.pos = square.middlePos;
  }

  equals (piece: CheckersPiece) {
    return this.pos === piece.pos;
  }
}
