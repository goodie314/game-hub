
import {Vec2} from "../../util/types/vec2";

export class Board {
  width: number;
  height: number;
  topLeft: Vec2;

  constructor(canvasDimensions: Vec2) {
    this.height = canvasDimensions.y - 80;
    if (canvasDimensions.x < this.height) {
      this.height = canvasDimensions.x;
      this.width = canvasDimensions.x;
    } else {
      this.width = canvasDimensions.y - 80;
    }

    const diffX = canvasDimensions.x - this.width;
    const diffY = canvasDimensions.y - this.height;
    this.topLeft = new Vec2(diffX / 2, diffY / 2);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
  }
}
