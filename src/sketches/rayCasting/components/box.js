import { Vector } from "p5"
import Boundary from "./boundary"

export default class Box {
  constructor(position, size) {
    this.position = position
    this.size = size

    this.corners = this.calcCorners()
    this.boundaries = this.calcBoundaries()
  }

  calcCorners() {
    const halfSize = Vector.div(this.size, 2)
    return [
      Vector.add(this.position, Vector.mult(halfSize, [-1, -1])),
      Vector.add(this.position, Vector.mult(halfSize, [+1, -1])),
      Vector.add(this.position, Vector.mult(halfSize, [+1, +1])),
      Vector.add(this.position, Vector.mult(halfSize, [-1, +1])),
    ]
  }

  calcBoundaries() {
    return [
      new Boundary(this.corners[0], this.corners[1]),
      new Boundary(this.corners[1], this.corners[2]),
      new Boundary(this.corners[2], this.corners[3]),
      new Boundary(this.corners[3], this.corners[0]),
    ]
  }

  draw(sketch) {
    sketch.push()
    for (const boundary of this.boundaries) boundary.draw(sketch)
    sketch.pop()
  }
}