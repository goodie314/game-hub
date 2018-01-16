import {ChessPiece} from "./chess-piece";
import {Vec2} from "../../../util/types/vec2";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";

export class Pawn extends ChessPiece {

  constructor(location: Vec2, color: Color, shade: Shade) {
    super(location, color, shade);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    console.log('draw pawn');
    super.draw(ctx);
  }
}
