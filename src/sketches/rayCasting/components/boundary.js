export default class Boundary {
  constructor(start, end, weight) {
    this.start = start
    this.end = end
    this.weight = weight
  }

  get points() {
    return { x1: this.start.x, y1: this.start.y, x2: this.end.x, y2: this.end.y }
  }
}