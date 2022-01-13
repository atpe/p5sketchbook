export default class Boundary {
  constructor(start, end, weight) {
    this.start = start
    this.end = end
    this.weight = weight
    this.dy = Math.abs(this.start.x - this.end.x)
    this.dx = Math.abs(this.start.y - this.end.y)
  }

  get points() {
    return { x1: this.start.x, y1: this.start.y, x2: this.end.x, y2: this.end.y }
  }

  draw(sketch) {
    sketch.push()
    sketch.stroke(0)
    sketch.strokeWeight(this.weight)
    const { x1, y1, x2, y2 } = this.points
    sketch.line(x1, y1, x2, y2)
    sketch.pop()
  }
}