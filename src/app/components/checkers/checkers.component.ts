import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Board} from "../../drawable/checkers/board";
import {Vec2} from "../../util/types/vec2";
import {VS} from "../../util/enums/vs";
import {ConfirmComponent} from "../confirm/confirm.component";
import {ExitButton} from "../../drawable/checkers/exit-button";
import {ActivatedRoute, Router} from "@angular/router";
import {CheckersService} from "./checkers.service";
import {SignonService} from "../signon/signon.service";
import {PotentialMove} from "../../util/types/potential-move";
import {CheckersGameState} from "../../util/types/checkers-game-state";
import {User} from "../../util/types/user";
import {Shade} from "../../util/enums/shade";
import {Observable} from "rxjs/Observable";
import {Game} from "../../util/types/game";

@Component({
  selector: 'checkers',
  templateUrl: './checkers.component.html',
  styleUrls: ['./checkers.component.css']
})

export class CheckersComponent implements OnInit, OnDestroy {
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
  gameId: number;
  user: User;

  startMenu = true;
  startDisabled = false;
  availableMatchTypes = [
    VS.COMPUTER,
    VS.PLAYER_LOCAL,
  ];
  selectedMatchType: VS = VS.COMPUTER;
  pollTimer: any;

  constructor(private changeDetector: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private checkersService: CheckersService,
              private signonService: SignonService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('gameId: ', params);
      if (params['gameId']) {
        this.gameId = params['gameId'];
        this.selectedMatchType = VS.ONLINE;
        this.startMenu = false;
        this.startGame(this.gameId);
      }
    });
    if (this.signonService.getSignedInUser()) {
      this.availableMatchTypes.push(VS.ONLINE);
    }
  }

  ngOnDestroy(): void {
    window.clearInterval(this.pollTimer);
  }

  startGame(gameId?: number): void {
    this.startMenu = false;
    this.gameOver = false;
    this.changeDetector.detectChanges();
    this.exitButton = new ExitButton (new Vec2(10, 10));
    this.exitGame = this.exitButton.exit.subscribe(() => {
      this.confirm.confirm('Are you sure you want to exit to the menu?').subscribe((res) => {
        if (res) {
          this.startMenu = true;
          this.gameOver = true;
          this.selectedMatchType = VS.COMPUTER;
          this.gameOverMessage = null;
          if (gameId) {
            this.router.navigate(['/', 'checkers', 'lobby'], {relativeTo: this.route});
          } else {
            this.router.navigate(['/', 'checkers'], {relativeTo: this.route});
          }
        }
      });
    });
    this.user = this.signonService.getSignedInUser();
    this.board = new Board(this.selectedMatchType,
      new Vec2(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight));
    if (gameId) {
      this.board.onlineNextTurn.subscribe(checkersGameState => {
        window.clearInterval(this.pollTimer);
        const game: Game = {
          gameId: this.gameId,
          players: [],
          currentGameState: JSON.stringify(checkersGameState)
        };

        this.checkersService.updateGame(game);
        this.board.pauseWhileMakingMove = false;
        this.pollTimer = window.setInterval(() => { this.pollData(); }, 500);
      });
      this.pollData();
      this.pollTimer = window.setInterval(() => { this.pollData(); }, 500);
    }
    this.board.gameOver.subscribe((res) => {
      this.startMenu = true;
      this.gameOver = true;
      this.gameOverMessage = res;
      this.selectedMatchType = VS.COMPUTER;
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

  gameTypeSelect (): void {
    this.startDisabled = (this.selectedMatchType === VS.ONLINE);
    if (this.startDisabled && this.signonService.getSignedInUser()) {
      this.router.navigate(['.', 'lobby'], {relativeTo: this.route});
    }
  }

  onlineMove (moves: PotentialMove[]) {
    const move = moves.shift();
    if (move) {
      this.board.selectedSquare = move.sourceSquare;
      this.board.movePiece(move.destinationSquare);
      window.setTimeout(() => {
        this.onlineMove(moves);
      }, 400);
    }
  }

  pollData(): void {
    this.checkersService.getGame(this.gameId).subscribe(game => {
      if (this.user.userName === game.players[0]) {
        this.board.playerShade = Shade.DARK;
      } else {
        this.board.playerShade = Shade.LIGHT;
      }
      const state: CheckersGameState = JSON.parse(game.currentGameState);
      if (state) {
        this.board.restoreOnlineState(state);
      }
    });
  }
}
