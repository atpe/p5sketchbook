import { Vector } from "p5"

export default class Algorithm {
  constructor(center, size, level) {
    this.center = center
    this.size = size
    this.level = level || 1

    this.complete = false
    this.children = []
  }

  reset() {
    this.complete = false
    this.children = []
  }

  iterate() {
    if (this.children.length > 0) {
      for (const child of this.children) {
        this.complete = child.iterate()
      }
    } else {
      if (this.size.x < 2) return true
      console.log(this.complete);
      const size = Vector.div(this.size, [3, 1])
      const centerL = Vector.sub(this.center, [size.x, 0])
      const centerR = Vector.add(this.center, [size.x, 0])
      this.children.push(new Algorithm(centerL, size, this.level + 1))
      this.children.push(new Algorithm(centerR, size, this.level + 1))
    }
    return this.complete
  }

  draw(sketch) {
    sketch.push()
    sketch.noStroke()
    sketch.fill([237, 34, 100, 50])
    sketch.rect(this.center.x, this.center.y, this.size.x, this.size.y)
    if (this.children.length > 0) {
      for (const child of this.children) {
        child.draw(sketch)
      }
    }
    sketch.pop()
  }
}