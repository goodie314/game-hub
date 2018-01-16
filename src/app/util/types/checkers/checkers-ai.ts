import {PotentialMove} from "./potential-move";
import {Shade} from "../../enums/shade";
import {Board} from "../../../drawable/checkers/board";

export class CheckersAI {
  playerShade: Shade;

  constructor (playerShade: Shade) {
    this.playerShade = playerShade;
  }

  takeTurn (board: Board) {
    const move = this.evaluateBoard(board);
    window.setTimeout(this.firstHop, 400, this, board, move);
  }

  firstHop (_this, board: Board, move: PotentialMove) {
    board.movePiece(move.destinationSquare);
    if (board.potentialMoves.length) {
      window.setTimeout(_this.doubleHop, 400, _this, board);
    }
  }

  doubleHop (_this, board: Board) {
    const doubleHop = board.potentialMoves[0];
    board.movePiece(doubleHop.destinationSquare);
    if (board.potentialMoves.length) {
      window.setTimeout(_this.doubleHop, 400, board);
    }
  }

  evaluateBoard (board: Board): PotentialMove {
    const squares = board.boardSquares;
    let move;

    for (let i = 0; i < squares.length; i++) {
      const square = squares[i];
      const piece = square.checkersPiece;
      if (piece && piece.shade === this.playerShade) {
        board.highlightMoves(square, i, false, false);
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
