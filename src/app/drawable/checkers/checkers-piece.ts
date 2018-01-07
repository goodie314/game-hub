
import {Vec2} from "../../util/types/vec2";
import {Shade} from "../../util/enums/shade";

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

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius * .75, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
}
