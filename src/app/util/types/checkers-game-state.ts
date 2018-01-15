import {Board} from "../../drawable/checkers/board";
import {PotentialMove} from "./potential-move";
import {Shade} from "../enums/shade";
import {BoardSquare} from "../../drawable/checkers/board-square";

export interface CheckersGameState {
  boardSquares: BoardSquare[];
  lastMoves: PotentialMove[];
  updatingShade: Shade;
  darkTurn: boolean;
  darkScore: number;
  lightScore: number;
}
