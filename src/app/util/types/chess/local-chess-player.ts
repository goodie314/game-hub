import {ChessPlayer} from "./chess-player";
import {Vec2} from "../vec2";

export class LocalChessPlayer extends ChessPlayer {

  constructor() {
    super();
  }

  public clickHandler(clickLocation: Vec2): void {
    if (!this.myTurn) {
      return;
    }
  }

  public yourTurn(): void {
    super.yourTurn();
  }

  public takeTurn(): void {
    super.takeTurn();
  }
}
