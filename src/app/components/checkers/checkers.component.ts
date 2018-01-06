import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

@Component({
  selector: 'checkers',
  templateUrl: './checkers.component.html',
  styleUrls: ['./checkers.component.css']
})

export class CheckersComponent implements OnInit {
  @ViewChild('canvas')
  canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.resize();
    this.draw();
  }

  resize(): void {
    const parent = this.canvas.nativeElement.parentElement;
    if (parent.clientWidth !== this.canvas.nativeElement.clientWidth || parent.clientHeight !== this.canvas.nativeElement.clientHeight) {
      this.canvas.nativeElement.width = parent.clientWidth;
      this.canvas.nativeElement.height = parent.clientHeight;
      this.ctx = this.canvas.nativeElement.getContext('2d');
    }
  }

  resizeWidth(): void {
    const parent = this.canvas.nativeElement.parentElement;
    this.canvas.nativeElement.width = parent.clientWidth;
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  draw(): void {
    this.resize();
    this.ctx.fillStyle = '#000000';
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    requestAnimationFrame(() => { this.draw(); });
  }

}
