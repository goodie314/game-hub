import {Shade} from "../enums/shade";
import {Board} from "../../drawable/checkers/board";
import {PotentialMove} from "./potential-move";

export class CheckersAI {
  playerShade: Shade;

  constructor (playerShade: Shade) {
    this.playerShade = playerShade;
  }

  takeTurn (board: Board) {
    const move = this.evaluateBoard(board);
    board.movePiece(move.destinationSquare);
    while (board.potentialMoves.length) {
      const doubleHop = board.potentialMoves[0];
      board.movePiece(doubleHop.destinationSquare);
    }
  }

  evaluateBoard (board: Board): PotentialMove {
    const squares = board.boardSquares;
    let move;

    for (let i = 0; i < squares.length; i++) {
      const square = squares[i];
      const piece = square.checkersPiece;
      if (piece && piece.shade === this.playerShade) {
        board.highlightMoves(square, i);
      }
    }

    const captures = board.potentialMoves.filter((move) => {
      return move.capturedSquare;
    });

    if (captures.length) {
      const index = Math.floor(Math.random() * (captures.length - 1));
      move = captures[index];
    } else {
      const index = Math.floor(Math.random() * (board.potentialMoves.length - 1));
      move = board.potentialMoves[index];
    }
    board.selectedSquare = move.sourceSquare;

    return move;
  }
}
