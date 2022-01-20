// P5 library imports
import { Vector } from "p5"
// Local component imports
import Caster from "./caster"

export default class Ray {
  // Creates a ray
  constructor(start, angle, length) {
    this.start = start
    this.angle = angle
    this.maxLength = length
    this.maxEnd = Vector.add(start, Vector.fromAngle(angle, length))
  }

  get end() {
    return this.intersectedEnd || this.maxEnd
  }

  get length() {
    return this.intersectedLength || this.maxLength
  }

  get points() {
    return { x1: this.start.x, y1: this.start.y, x2: this.end.x, y2: this.end.y }
  }

  // Updates the ray's start point to given position
  reposition(position) {
    this.start = position
    this.maxEnd = Vector.add(this.start, Vector.fromAngle(this.angle, this.maxLength))
  }

  // Resets ray to initial state
  reset() {
    if (this.intersectedEnd) {
      this.intersectedEnd = undefined
      this.intersectedLength = undefined
    }
  }

  // Calculates intersection point (if any) of ray with given boundary points
  calcIntersection(x3, y3, x4, y4) {
    const { x1, y1, x2, y2 } = this.points

    const tNum = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)
    const uNum = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

    if (den === 0) return false

    const t = tNum / den
    const u = uNum / den

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      this.intersectedEnd = new Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1))
      this.intersectedLength = this.start.dist(this.end)
    }
  }

  // Draws the ray to the given sketch
  draw(sketch) {
    const { x1, y1 } = this.points
    sketch.push()
    sketch.noStroke()
    sketch.fill(255, 50)
    sketch.arc(x1, y1, this.length * 2, this.length * 2, this.angle - Caster.maxAngle / 2, this.angle + Caster.maxAngle / 2)
    sketch.pop()
  }
}