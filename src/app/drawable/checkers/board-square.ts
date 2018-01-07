
import {Vec2} from "../../util/types/vec2";
import {Shade} from "../../util/enums/shade";
import {Color} from "../../util/enums/color";

export class BoardSquare {
  topLeftPos: Vec2;
  squareDim: number;
  middlePos: Vec2;
  squareShade: Shade;
  squareColor: string;

  constructor (topLeftPos: Vec2, squareDim: number, squareShade: Shade) {
    this.topLeftPos = topLeftPos;
    this.squareDim = squareDim;
    this.squareShade =squareShade;
    this.middlePos = new Vec2(topLeftPos.x + (squareDim / 2), topLeftPos.y + (squareDim / 2));

    switch (squareShade) {
      case Shade.LIGHT:
        this.squareColor = Color.RED;
        break;
      case Shade.DARK:
        this.squareColor = Color.BLACK;
        break;
    }
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.squareColor;
    ctx.fillRect(this.topLeftPos.x, this.topLeftPos.y, this.squareDim, this.squareDim);
  }
}
