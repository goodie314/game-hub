import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Chess} from "../../util/types/chess/chess";
import {LocalChessPlayer} from "../../util/types/chess/local-chess-player";
import {ChessPlayer} from "../../util/types/chess/chess-player";
import {ConfirmComponent} from "../confirm/confirm.component";
import {VS} from "../../util/enums/vs";
import {Vec2} from "../../util/types/vec2";
import {Shade} from "../../util/enums/shade";
import {ComputerChessPlayer} from "../../util/types/chess/computer-chess-player";
import {ActivatedRoute, Router} from "@angular/router";
import {SignonService} from "../signon/signon.service";
import {User} from "../../util/types/user";
import {MessageService} from "../message/message.service";
import {GamesService} from "../../util/services/games.service";
import {OnlineChessPlayer} from "../../util/types/chess/online-chess-player";
import {ChessGameState} from "../../util/types/chess/chess-game-state";

@Component({
  selector: 'chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})

export class ChessComponent implements OnInit {
  @ViewChild('confirm')
  private confirm: ConfirmComponent;
  @ViewChild('canvas')
  private canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;

  private chess: Chess;
  private gameId: number;

  private user: User;

  // Start menu items
  private startMenu = true;
  private availableMatchTypes = [
    VS.COMPUTER,
    VS.PLAYER_LOCAL
  ];
  private selectedMatchType: VS = VS.COMPUTER;

  private mouseDown = false;

  private flip = false;

  constructor(private gamesService: GamesService,
              private signonService: SignonService,
              private messageService: MessageService,
              private changeDetector: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['gameId'];
    });
    this.user = this.signonService.getSignedInUser();
    if (this.user) {
      this.availableMatchTypes.push(VS.ONLINE);
    }
    if (this.gameId) {
      this.startOnlineGame(this.gameId);
    }
  }

  private startGame(): void {
    this.startMenu = false;
    this.changeDetector.detectChanges();
    this.canvas.nativeElement.addEventListener('touchstart', this.canvasMouseDown.bind(this), false);
    this.canvas.nativeElement.addEventListener('touchmove', this.canvasMouseMove.bind(this), false);
    this.canvas.nativeElement.addEventListener('touchend', this.canvasMouseUp.bind(this), false);
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
    this.chess.getGameOverHook().subscribe((gameOverMessage) => {
      this.messageService.success('Game Over', gameOverMessage, 1000 * 30);
      this.startMenu = true;
      this.selectedMatchType = VS.COMPUTER;
    });
    this.draw();
  }

  private startOnlineGame(gameId) {
    this.startMenu = false;
    this.changeDetector.detectChanges();
    const userName = this.user.userName;
    this.gamesService.getGame(gameId).subscribe(game => {
      let darkTurn = true;
      this.flip = game.players[1] === userName;
      if (game.currentGameState) {
        const state: ChessGameState = JSON.parse(game.currentGameState);
        if (state.lastPlayerToUpdate) {
          if (game.players[0] === userName) {
            darkTurn = state.lastPlayerToUpdate !== userName;
          } else {
            darkTurn = state.lastPlayerToUpdate === userName;
          }
        }
      }
      const players: ChessPlayer[] = [
        new OnlineChessPlayer(Shade.DARK, gameId, userName, game.players[0] === userName, this.gamesService),
        new OnlineChessPlayer(Shade.LIGHT, gameId, userName, game.players[1] === userName, this.gamesService)
      ];
      const saveState = JSON.parse(game.currentGameState);
      this.chess = new Chess(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight, players, saveState, darkTurn);
      this.chess.getGameOverHook().subscribe((gameOverMessage) => {
        this.messageService.success('Game Over', gameOverMessage, 1000 * 30);
        this.startMenu = true;
        this.selectedMatchType = VS.COMPUTER;
      });
      this.draw();
    });
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
    if (!this.startMenu) {
      this.resize();
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.chess.draw(this.ctx, this.flip);

      requestAnimationFrame(() => { this.draw(); });
    }
  }

  private canvasClickHandler ($event): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect(), // abs. size of element
      scaleX = this.canvas.nativeElement.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = this.canvas.nativeElement.height / rect.height;  // relationship bitmap vs. element for Y

    const x = ($event.clientX - rect.left) * scaleX;
    const y = ($event.clientY - rect.top) * scaleY;
    this.chess.clickHandler(new Vec2(x, y), this.flip);
  }

  private gameTypeSelect(): void {
    if (this.selectedMatchType === VS.ONLINE) {
      this.router.navigate(['/', 'chess', 'lobby'], { relativeTo: this.route });
    }
  }

  private canvasMouseDown ($event): void {
    if ($event.touches && $event.touches.length) {
      $event.clientX = $event.touches[0].clientX;
      $event.clientY = $event.touches[0].clientY;
    }
    this.mouseDown = true;
    this.canvasClickHandler($event);
  }

  private canvasMouseMove ($event): void {
    if (this.mouseDown) {
      if ($event.touches && $event.touches.length) {
        $event.clientX = $event.touches[0].clientX;
        $event.clientY = $event.touches[0].clientY;
      }
      const rect = this.canvas.nativeElement.getBoundingClientRect(), // abs. size of element
        scaleX = this.canvas.nativeElement.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = this.canvas.nativeElement.height / rect.height;  // relationship bitmap vs. element for Y

      const x = ($event.clientX - rect.left) * scaleX;
      const y = ($event.clientY - rect.top) * scaleY;
      this.chess.dragHandler(new Vec2(x, y));
    }
  }

  private canvasMouseUp ($event): void {
    if ($event.changedTouches && $event.changedTouches) {
      $event.clientX = $event.changedTouches[0].clientX;
      $event.clientY = $event.changedTouches[0].clientY;
    }
    this.mouseDown = false;
    this.canvasClickHandler($event);
  }
}
