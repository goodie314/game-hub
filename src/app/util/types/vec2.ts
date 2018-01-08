
export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vec: Vec2) {
    return new Vec2(this.x + vec.x, this.y + vec.y);
  }

  minus (vec: Vec2): Vec2 {
    return new Vec2(this.x - vec.x, this.y - vec.y);
  }

  times (m: number): Vec2 {
    return new Vec2(this.x * m, this.y * m);
  }

  equals (vec: Vec2): boolean {
    return this.x === vec.x && this.y === vec.y;
  }

  close (vec: Vec2): boolean {
    const diffX = vec.x - this.x;
    const diffY = vec.y - this.y;
    return Math.abs(diffX) < 1 && Math.abs(diffY) < 1;
  }
}
