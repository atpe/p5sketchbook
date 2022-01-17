import { Vector } from "p5"

export default class SierpinkskiCarpet {
  constructor(center, size, level) {
    this.center = center
    this.size = size
    this.level = level || 0
    this.square = Vector.div(size, 3)

    this.complete = false
    this.children = []
  }

  reset() {
    this.complete = false
    this.children = []
  }

  iterate() {
    if (this.children.length > 0) {
      for (const sierpinskiCarpet of this.children) {
        this.complete = sierpinskiCarpet.iterate()
      }
    } else {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) continue
          const mod = new Vector(x, y)
          const center = Vector.add(this.center, Vector.mult(this.square, mod))
          if (this.square.x + this.square.y < 6) return true
          this.children.push(new SierpinkskiCarpet(center, this.square, this.level + 1))
        }
      }
    }
    console.log(this.complete);
    return this.complete
  }

  draw(sketch) {
    sketch.push()
    sketch.noStroke()
    const alpha = 255 - 25 * this.level
    sketch.fill([237, 34, 100, alpha])
    sketch.rect(this.center.x, this.center.y, this.square.x, this.square.y)
    if (this.children.length > 0) {
      for (const sierpinskiCarpet of this.children) {
        sierpinskiCarpet.draw(sketch)
      }
    }
    sketch.pop()
  }
}