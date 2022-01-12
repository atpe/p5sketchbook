export default class Boundary {
  constructor(start, end) {
    this.start = start
    this.end = end
    this.weight = 5
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