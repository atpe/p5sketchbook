import { Vector } from "p5"
import Boundary from "./boundary"

export default class Box {
  constructor(position, size, weight, boundingBox) {
    this.position = position.copy()
    this.size = size.copy()
    this.weight = weight

    this.halfSize = this.calcHalfSize()
    this.sides = this.calcSides()

    if (boundingBox) this.confineWithin(boundingBox)

    this.corners = this.calcCorners()
    this.boundaries = this.calcBoundaries()
  }

  calcHalfSize() {
    return Vector.div(this.size, 2)
  }

  calcSides() {
    return {
      t: this.position.y - this.halfSize.y,
      r: this.position.x + this.halfSize.x,
      b: this.position.y + this.halfSize.y,
      l: this.position.x - this.halfSize.x,
    }
  }

  calcCorners() {
    return [
      Vector.add(this.position, Vector.mult(this.halfSize, [-1, -1])),
      Vector.add(this.position, Vector.mult(this.halfSize, [+1, -1])),
      Vector.add(this.position, Vector.mult(this.halfSize, [+1, +1])),
      Vector.add(this.position, Vector.mult(this.halfSize, [-1, +1])),
    ]
  }

  calcBoundaries() {
    return [
      new Boundary(this.corners[0], this.corners[1], this.weight),
      new Boundary(this.corners[1], this.corners[2], this.weight),
      new Boundary(this.corners[2], this.corners[3], this.weight),
      new Boundary(this.corners[3], this.corners[0], this.weight),
    ]
  }

  contains(object) {
    const radius = (object.size ? object.size / 2 : 0) - this.weight
    const { x, y } = object.position ? object.position : object
    const isWithinX = x + radius > this.sides.l && x - radius < this.sides.r
    const isWithinY = y + radius > this.sides.t && y - radius < this.sides.b
    return isWithinX && isWithinY
  }

  confineWithin(box) {
    let isModified = false
    const dt = (box.sides.t + box.weight / 2) - (this.sides.t - this.weight / 2)
    if (dt > 0) {
      isModified = true
      this.size.y -= dt
      this.position.y += dt / 2
    }
    const dl = (box.sides.l + box.weight / 2) - (this.sides.l - this.weight / 2)
    if (dl > 0) {
      isModified = true
      this.size.x -= dl
      this.position.x += dl / 2
    }
    const db = (box.sides.b - box.weight / 2) - (this.sides.b + this.weight / 2)
    if (db < 0) {
      isModified = true
      this.size.y += db
      this.position.y += db / 2
    }
    const dr = (box.sides.r - box.weight / 2) - (this.sides.r + this.weight / 2)
    if (dr < 0) {
      isModified = true
      this.size.x += dr
      this.position.x += dr / 2
    }

    if (isModified) {
      this.halfSize = this.calcHalfSize()
      this.sides = this.calcSides()
    }
  }

  overlaps(box) {
    const left = this.sides.r <= box.sides.l
    const right = this.sides.l >= box.sides.r
    const above = this.sides.b <= box.sides.t
    const below = this.sides.t >= box.sides.b

    return !(left || right || above || below)
  }

  draw(sketch) {
    sketch.push()
    sketch.noStroke()
    sketch.fill([237, 34, 100, 100])
    const { x, y } = this.position
    sketch.rect(x, y, this.size.x, this.size.y)
    sketch.pop()
  }
}