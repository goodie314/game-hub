import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ChessService} from "./chess.service";
import {Chess} from "../../util/types/chess/chess";
import {LocalChessPlayer} from "../../util/types/chess/local-chess-player";
import {ChessPlayer} from "../../util/types/chess/chess-player";
import {ConfirmComponent} from "../confirm/confirm.component";
import {VS} from "../../util/enums/vs";
import {Vec2} from "../../util/types/vec2";
import {Shade} from "../../util/enums/shade";
import {ComputerChessPlayer} from "../../util/types/chess/computer-chess-player";

@Component({
  selector: 'chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})

export class ChessComponent implements OnInit {
  private chess: Chess;
  @ViewChild('confirm')
  confirm: ConfirmComponent;
  @ViewChild('canvas')
  canvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  gameOverMessage: string;
  gameId: number;

  startMenu = false;
  startDisabled = false;
  availableMatchTypes = [
    VS.COMPUTER,
    VS.PLAYER_LOCAL,
  ];
  selectedMatchType: VS = VS.COMPUTER;

  constructor(private chessService: ChessService) {
  }

  ngOnInit(): void {
    this.startGame();
  }

  private startGame(): void {
    const players: ChessPlayer[] = [new LocalChessPlayer(Shade.DARK)];
    switch (this.selectedMatchType) {
      case VS.COMPUTER:
        players.push(new ComputerChessPlayer(Shade.LIGHT));
        break;
      case VS.PLAYER_LOCAL:
        players.push(new LocalChessPlayer(Shade.LIGHT));
        break;
    }
    this.chess = new Chess(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight, players);
    this.draw();
  }

  private resize(): void {
    const parent = this.canvas.nativeElement.parentElement;
    if (parent.clientWidth !== this.canvas.nativeElement.clientWidth || parent.clientHeight !== this.canvas.nativeElement.clientHeight) {
      this.canvas.nativeElement.width = parent.clientWidth;
      this.canvas.nativeElement.height = parent.clientHeight;
      this.chess.resize(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight);
      this.ctx = this.canvas.nativeElement.getContext('2d');
    }
  }

  private draw(): void {
    this.resize();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.chess.draw(this.ctx);

    requestAnimationFrame(() => { this.draw(); });
  }

  private canvasClickHandler ($event): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect(), // abs. size of element
      scaleX = this.canvas.nativeElement.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = this.canvas.nativeElement.height / rect.height;  // relationship bitmap vs. element for Y

    const x = ($event.clientX - rect.left) * scaleX;
    const y = ($event.clientY - rect.top) * scaleY;
    this.chess.clickHandler(new Vec2(x, y));
  }
}
