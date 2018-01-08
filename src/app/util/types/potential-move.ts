
import {BoardSquare} from "../../drawable/checkers/board-square";
import {CheckersPiece} from "../../drawable/checkers/checkers-piece";

export class PotentialMove {
  sourceSquare: BoardSquare;
  destinationSquare: BoardSquare;
  capturedPiece: CheckersPiece;

  constructor (sourceSquare: BoardSquare, destinationSquare: BoardSquare, capturedPiece: CheckersPiece) {
    this.sourceSquare = sourceSquare;
    this.destinationSquare = destinationSquare;
    this.capturedPiece = capturedPiece;
  }
}
