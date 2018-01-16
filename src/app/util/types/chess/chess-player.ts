import {Vec2} from "../vec2";

export class ChessPlayer {
  protected myTurn = false;

  constructor() {
  }

  public clickHandler(clickLocation: Vec2): void {
  }

  public yourTurn(): void {
    this.myTurn = true;
  }

  public takeTurn(): void {
    this.myTurn = false;
  }
}
