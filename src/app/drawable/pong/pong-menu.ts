export class PongMenu {

  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    let fontSize = this.width / 10;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText('PONG', this.width / 2, (this.height / 10) + (fontSize));
    fontSize = this.width / 20;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = '#ff00ff';
    const measure = ctx.measureText('START');
    ctx.fillRect(this.width / 2 - measure.width * .75 , this.height / 2 + fontSize / 8, measure.width * 1.5 , fontSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('START', this.width / 2, (this.height / 2) + fontSize);
  }

}
