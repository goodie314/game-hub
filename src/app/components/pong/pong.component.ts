import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {PongMenu} from "../../drawable/pong/pong-menu";
@Component({
  selector: 'pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.css']
})

export class PongComponent implements OnInit {
  // Canvas
  @ViewChild('canvas')
  private canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;

  // Start menu
  private menu: PongMenu;

  ngOnInit(): void {
    this.menu = new PongMenu(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight);
    this.draw();
  }

  private resize(): void {
    const parent = this.canvas.nativeElement.parentElement;
    if (parent.clientWidth !== this.canvas.nativeElement.clientWidth || parent.clientHeight !== this.canvas.nativeElement.clientHeight) {
      this.canvas.nativeElement.width = parent.clientWidth;
      this.canvas.nativeElement.height = parent.clientHeight;
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.menu.resize(parent.clientWidth, parent.clientHeight);
    }
  }

  private draw() {
    this.resize();
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight);
    this.menu.draw(this.ctx);
    requestAnimationFrame(() => { this.draw(); });
  }
}
