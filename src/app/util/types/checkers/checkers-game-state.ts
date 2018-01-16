import {BoardSquare} from "../../../drawable/checkers/board-square";
import {PotentialMove} from "./potential-move";
import {Shade} from "../../enums/shade";

export interface CheckersGameState {
  boardSquares: BoardSquare[];
  lastMoves: PotentialMove[];
  updatingShade: Shade;
  darkTurn: boolean;
  darkScore: number;
  lightScore: number;
}
