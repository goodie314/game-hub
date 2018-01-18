import {ChessLocationDto} from "./chess-location-dto";
import {Color} from "../../../enums/color";
import {Shade} from "../../../enums/shade";
import {ChessPieceEnum} from "../../../enums/chess-pieces-enum";

export class ChessPieceDto {
  location: ChessLocationDto;
  color: Color;
  shade: Shade;
  type: ChessPieceEnum;
}
