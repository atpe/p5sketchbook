import { Vector } from "p5"
import Boundary from "./boundary"

export default class Box {
  constructor(position, size, weight) {
    this.position = position
    this.size = size
    this.weight = weight

    this.halfSize = Vector.div(this.size, 2)

    this.t = position.y - this.halfSize.y
    this.r = position.x + this.halfSize.x
    this.b = position.y + this.halfSize.y
    this.l = position.x - this.halfSize.x

    this.corners = this.calcCorners()
    this.boundaries = this.calcBoundaries()
  }

  reposition(position) {
    this.position = position

    this.corners = this.calcCorners()
    this.boundaries = this.calcBoundaries()
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

  isOverlapping(box) {
    const left = this.r <= box.l
    const right = this.l >= box.r
    const above = this.b <= box.t
    const below = this.t >= box.b

    return !(left || right || above || below)
  }

  getRandomInnerPosition(size) {
    const randX = Math.random() * ((this.size.x - size.x) / 2)
    const randY = Math.random() * ((this.size.y - size.y) / 2)
    const offset = Vector.random2D().mult(randX, randY)
    return Vector.add(this.position, offset)
  }

  getInnerBox(boxes) {
    const augX = (Math.random() + 1) * 10
    const augY = (Math.random() + 1) * 10
    const size = Vector.div(this.size, [augX, augY])
    const position = this.getRandomInnerPosition(size)
    const box = new Box(position, size)

    let isValid = false
    let i = 0
    while (!isValid && boxes.length !== 1) {
      let _isValid = true
      for (let i = 1; i < boxes.length; i++) {
        if (box.isOverlapping(boxes[i])) _isValid = false
      }
      isValid = _isValid
      if (!isValid) {
        i++
        box.reposition(this.getRandomInnerPosition(size))
      }
      if (i > 50) return
    }

    return box
  }

  draw(sketch) {
    sketch.push()
    if (this.weight) {
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