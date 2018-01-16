import {Vec2} from "../../../util/types/vec2";

export class ChessBoard {
  private width: number;
  private height: number;
  private topLeft: Vec2;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.setDimensions(canvasWidth, canvasHeight);
  }

  // set width, height, and corner position
  private setDimensions(canvasWidth: number, canvasHeight: number) {
    this.height = canvasHeight - 80;
    if (canvasWidth < this.height) {
      this.height = canvasWidth;
      this.width = canvasWidth;
    } else {
      this.width = canvasHeight - 80;
    }

    const diffX = canvasWidth - this.width;
    const diffY = canvasHeight - this.height;
    this.topLeft = new Vec2(diffX / 2, diffY / 2);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
  }
}
