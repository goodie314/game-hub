import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Board} from "../../drawable/checkers/board";
import {Vec2} from "../../util/types/vec2";
import {VS} from "../../util/enums/vs";
import {ConfirmComponent} from "../confirm/confirm.component";
import {ExitButton} from "../../drawable/checkers/exit-button";

@Component({
  selector: 'checkers',
  templateUrl: './checkers.component.html',
  styleUrls: ['./checkers.component.css']
})

export class CheckersComponent implements OnInit {
  @ViewChild('confirm')
  confirm: ConfirmComponent;
  @ViewChild('canvas')
  canvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  board: Board;
  exitButton: ExitButton;
  exitGame: any;
  gameOver = false;
  gameOverMessage: string;

  startMenu = true;
  availableMatchTypes = [
    VS.COMPUTER,
    VS.PLAYER_LOCAL
  ];
  selectedMatchType: VS = VS.COMPUTER;

  constructor (private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  startGame(): void {
    this.startMenu = false;
    this.gameOver = false;
    this.changeDetector.detectChanges();
    this.exitButton = new ExitButton (new Vec2(10, 10));
    this.exitGame = this.exitButton.exit.subscribe(() => {
      this.confirm.confirm('Are you sure you want to exit to the menu?').subscribe((res) => {
        if (res) {
          this.startMenu = true;
          this.gameOver = true;
          this.gameOverMessage = null;
        }
      });
    });
    this.board = new Board(this.selectedMatchType, new Vec2(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight));
    this.board.gameOver.subscribe((res) => {
      this.startMenu = true;
      this.gameOver = true;
      this.gameOverMessage = res;
    });
    this.resize();
    this.draw();
  }

  resize(): void {
    const parent = this.canvas.nativeElement.parentElement;
    if (parent.clientWidth !== this.canvas.nativeElement.clientWidth || parent.clientHeight !== this.canvas.nativeElement.clientHeight) {
      this.canvas.nativeElement.width = parent.clientWidth;
      this.canvas.nativeElement.height = parent.clientHeight;
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.board = this.board.resize(new Vec2(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight));
    }
  }

  draw(): void {
    if (this.gameOver) {
      return;
    }
    this.resize();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.exitButton.draw(this.ctx);
    this.board.draw(this.ctx);

    requestAnimationFrame(() => { this.draw(); });
  }

  canvasClickHandler ($event): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect(), // abs. size of element
      scaleX = this.canvas.nativeElement.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = this.canvas.nativeElement.height / rect.height;  // relationship bitmap vs. element for Y

    const x = ($event.clientX - rect.left) * scaleX;
    const y = ($event.clientY - rect.top) * scaleY;
    this.board.handleClick(x, y);
    this.exitButton.clickHandler(x, y);
  }

}
