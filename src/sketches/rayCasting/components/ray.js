import { Vector } from "p5"

export default class Ray {
  constructor(start, angle, length) {
    this.start = start
    this.angle = angle
    this.length = length
  }

  get points() {
    const end = this.intersection || Vector.add(this.start, Vector.fromAngle(this.angle, this.length))
    return { x1: this.start.x, y1: this.start.y, x2: end.x, y2: end.y }
  }

  reposition(position) {
    this.start = position
  }

  clearIntersection() {
    if (this.intersection) this.intersection = undefined
  }

  calcIntersection(x3, y3, x4, y4) {
    const { x1, y1, x2, y2 } = this.points

    const tNum = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)
    const uNum = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

    if (den === 0) return false

    const t = tNum / den
    const u = uNum / den

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      this.intersection = new Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1))
      return true
    } else {
      return false
    }
  }

  draw(sketch) {
    sketch.push()
    sketch.stroke(255, 50)
    const { x1, y1, x2, y2 } = this.points
    sketch.line(x1, y1, x2, y2)
    sketch.stroke(255, 255, 0)
    sketch.strokeWeight(10)
    sketch.pop()
  }
}