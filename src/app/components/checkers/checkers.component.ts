import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Board} from "../../drawable/checkers/board";
import {Vec2} from "../../util/types/vec2";

@Component({
  selector: 'checkers',
  templateUrl: './checkers.component.html',
  styleUrls: ['./checkers.component.css']
})

export class CheckersComponent implements OnInit {
  @ViewChild('canvas')
  canvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  board: Board;

  ngOnInit(): void {
    this.board = new Board(new Vec2(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight));
    this.resize();
    this.draw();
  }

  resize(): void {
    const parent = this.canvas.nativeElement.parentElement;
    if (parent.clientWidth !== this.canvas.nativeElement.clientWidth || parent.clientHeight !== this.canvas.nativeElement.clientHeight) {
      this.canvas.nativeElement.width = parent.clientWidth;
      this.canvas.nativeElement.height = parent.clientHeight;
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.board = new Board(new Vec2(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight));
    }
  }

  resizeWidth(): void {
    const parent = this.canvas.nativeElement.parentElement;
    if (parent.clientWidth !== this.canvas.nativeElement.clientWidth) {
      this.canvas.nativeElement.width = parent.clientWidth;
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.board = new Board(new Vec2(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight));
    }
  }

  draw(): void {
    this.resize();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.board.draw(this.ctx);

    requestAnimationFrame(() => { this.draw(); });
  }

}
