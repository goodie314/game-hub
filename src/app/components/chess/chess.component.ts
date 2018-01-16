import {Component, OnInit} from "@angular/core";
import {ChessPiece} from "../../drawable/chess/piece/chess-piece";
import {Pawn} from "../../drawable/chess/piece/pawn";
import {Vec2} from "../../util/types/vec2";
import {Color} from "../../util/enums/color";
import {Shade} from "../../util/enums/shade";

@Component({
  selector: 'chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})

export class ChessComponent implements OnInit {

  ngOnInit(): void {
    const piece: ChessPiece = new Pawn(new Vec2(0, 0), Color.BLACK, Shade.DARK);
    piece.draw(null);
  }
}
