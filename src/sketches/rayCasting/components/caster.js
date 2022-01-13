import { Vector } from "p5"
import Ray from "./ray"

export default class Caster {
  static maxRays = 720
  static maxAngle = 2 * Math.PI / Caster.maxRays
  static maxSpeed = 2

  constructor(position, size, viewDistance) {
    this.position = position.copy()
    this.size = size

    this.rays = []

    for (let i = 0; i < Caster.maxRays; i++) {
      const angle = Caster.maxAngle * i
      this.rays[i] = new Ray(this.position, angle, viewDistance)
    }
  }

  reset(position) {
    this.position = position
    for (const ray of this.rays) ray.reposition(this.position)
  }

  cast(sketch) {
    for (const ray of this.rays) {
      ray.clearIntersection()
      for (const box of [sketch.world, ...sketch.world.obstacles]) {
        for (const boundary of box.boundaries) {
          const { x1, y1, x2, y2 } = boundary.points
          ray.calcIntersection(x1, y1, x2, y2)
        }
      }
    }
  }

  isValidMove(move, world) {
    const proposal = { position: Vector.add(this.position, move), size: this.size }
    if (!world.contains(proposal)) return false
    for (const box of world.obstacles) {
      if (box.contains(proposal)) return false
    }

    // for (const boundary of boundaries) {
    //   const { x1, y1, x2, y2 } = boundary.points

    //   const dy = (y2 - y1)
    //   const dx = (x2 - x1)

    //   const { x, y } = this.position.copy().add(move)
    //   const r = (boundary.weight + this.size) / 2

    //   let dist
    //   if (dy === 0) {
    //     if (
    //       (x1 < x2 && (x + r < x1 || x - r > x2)) ||
    //       (x1 > x2 && (x - r > x1 || x + r < x2))
    //     ) continue
    //     dist = Math.abs(y1 - y)
    //   } else if (dx === 0) {
    //     if (
    //       (y1 < y2 && (y + r < y1 || y - r > y2)) ||
    //       (y1 > y2 && (y - r > y1 || y + r < y2))
    //     ) continue
    //     dist = Math.abs(x1 - x)
    //   } else {
    //     const m = dy / dx
    //     const c = y1 - m * x1
    //     dist = Math.abs(y + m * x + c) / m
    //   }

    //   if (r >= dist) return false
    // }

    return true
  }

  move(sketch) {
    const move = sketch.createVector()
    if (sketch.keyIsDown(87)) { // W
      move.add(0, -1)
      if (!this.isValidMove(move, sketch.world)) move.add(0, +1)
    }
    if (sketch.keyIsDown(65)) { // A
      move.add(-1, 0)
      if (!this.isValidMove(move, sketch.world)) move.add(+1, 0)
    }
    if (sketch.keyIsDown(83)) { // S
      move.add(0, +1)
      if (!this.isValidMove(move, sketch.world)) move.add(0, -1)
    }
    if (sketch.keyIsDown(68)) { // D
      move.add(+1, 0)
      if (!this.isValidMove(move, sketch.world)) move.add(-1, 0)
    }

    const fullMove = move.copy().setMag(Caster.maxSpeed)
    if (this.isValidMove(fullMove, sketch.world)) move.set(fullMove)

    this.position.add(move)

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