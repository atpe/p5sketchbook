import { Vector } from "p5"
import Boundary from "./boundary"

export default class Box {
  constructor(position, size, weight, boundingBox) {
    this.position = position
    this.size = size
    this.weight = weight

    this.halfSize = this.calcHalfSize()
    this.sides = this.calcSides()

    if (boundingBox) this.confineWithin(boundingBox)

    this.corners = this.calcCorners()
    this.boundaries = this.calcBoundaries()
  }

  reposition(position) {
    this.position = position

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

  contains(position) {
    const weight = this.weight || 0
    const isValidX = position.x > weight && position.x < this.size.x - weight
    const isValidY = position.y > weight && position.y < this.size.y - weight
    return isValidX && isValidY
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

  createInnerBoxAt(position) {
    const augX = (Math.random() + 1) * 10
    const augY = (Math.random() + 1) * 10
    const size = Vector.div(this.size, [augX, augY])
    const box = new Box(position, size, 0, this)
    return box
  }

  draw(sketch) {
    sketch.push()
    if (this.weight > 0) {
      sketch.noFill()
      sketch.strokeWeight(this.weight)
    } else {
      sketch.noStroke()
      sketch.fill([237, 34, 100, 100])
    }
    const { x, y } = this.position
    sketch.rect(x, y, this.size.x, this.size.y)
    sketch.pop()
  }
}