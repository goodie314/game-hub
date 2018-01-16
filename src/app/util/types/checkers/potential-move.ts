import {BoardSquare} from "../../../drawable/checkers/board-square";

export class PotentialMove {
  sourceSquare: BoardSquare;
  destinationSquare: BoardSquare;
  capturedSquare: BoardSquare;

  constructor (sourceSquare: BoardSquare, destinationSquare: BoardSquare, capturedSquare: BoardSquare) {
    this.sourceSquare = sourceSquare;
    this.destinationSquare = destinationSquare;
    this.capturedSquare = capturedSquare;
  }

  copy () {
    return new PotentialMove(this.sourceSquare, this.destinationSquare, this.capturedSquare);
  }
}
