import Ray from "./ray"

export default class Caster {
  static maxRays = 360

  constructor(position, size, viewDistance) {
    this.position = position.copy()
    this.size = size

    this.rays = []
    const separation = 2 * Math.PI / Caster.maxRays
    for (let i = 0; i < Caster.maxRays; i++) {
      const angle = separation * i
      this.rays[i] = new Ray(this.position, angle, viewDistance)
    }
  }

  reset(position) {
    this.position = position
    for (const ray of this.rays) ray.reposition(this.position)
  }

  cast(boxes) {
    for (const ray of this.rays) {
      ray.clearIntersection()
      for (const box of boxes) {
        for (const boundary of box.boundaries) {
          const { x1, y1, x2, y2 } = boundary.points
          ray.calcIntersection(x1, y1, x2, y2)
        }
      }
    }
  }

  isValidMove(move, boxes) {
    const _position = this.position.copy().add(move)

    for (const box of boxes) {
      for (const boundary of box.boundaries) {
        const { x1, y1, x2, y2 } = boundary.points

        const dy = (y2 - y1)
        const dx = (x2 - x1)

        const { x, y } = _position
        const r = this.size / 2

        let dist
        if (dy === 0) {
          if (
            (x1 < x2 && (x + r < x1 || x - r > x2)) ||
            (x1 > x2 && (x - r > x1 || x + r < x2))
          ) continue
          dist = Math.abs(y1 - y)
        } else if (dx === 0) {
          if (
            (y1 < y2 && (y + r < y1 || y - r > y2)) ||
            (y1 > y2 && (y - r > y1 || y + r < y2))
          ) continue
          dist = Math.abs(x1 - x)
        } else {
          const m = dy / dx
          const c = y1 - m * x1
          dist = Math.abs(y + m * x + c) / m
        }

        if (dist <= (boundary.weight + this.size) / 2) return false
      }
    }
    return true
  }

  move(sketch) {
    const move = sketch.createVector()
    if (sketch.keyIsDown(87)) { // W
      move.add(0, -1)
      if (!this.isValidMove(move, sketch.boxes)) move.add(0, +1)
    }
    if (sketch.keyIsDown(65)) { // A
      move.add(-1, 0)
      if (!this.isValidMove(move, sketch.boxes)) move.add(+1, 0)
    }
    if (sketch.keyIsDown(83)) { // S
      move.add(0, +1)
      if (!this.isValidMove(move, sketch.boxes)) move.add(0, -1)
    }
    if (sketch.keyIsDown(68)) { // D
      move.add(+1, 0)
      if (!this.isValidMove(move, sketch.boxes)) move.add(-1, 0)
    }
    this.position.add(move.setMag(1))

    for (const ray of this.rays) ray.reposition(this.position)
  }

  draw(sketch) {
    sketch.push()

    const { x, y } = this.position
    for (const ray of this.rays) ray.draw(sketch)

    sketch.fill([237, 34, 100])
    sketch.noStroke()
    sketch.ellipse(x, y, this.size)

    sketch.pop()
  }
}