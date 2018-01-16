import {Vec2} from "../../../util/types/vec2";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";

export class ChessPiece {

  protected location: Vec2;
  protected color: Color;
  protected shade: Shade;

  constructor(location: Vec2, color: Color, shade: Shade) {
    this.location = location;
    this.color = color;
    this.shade = shade;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    console.log('draw piece');
  }
}
